import express, { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { rateLimit } from 'express-rate-limit';
import passport from 'passport';
import { db } from '../../db/connection';
import { sql } from 'drizzle-orm';
import { PasswordSecurity, AccountSecurity, TwoFactorAuth } from '../../utils/passwordSecurity';
import { authenticateToken, requireRole, AuthRequest } from '../../middleware/auth';
import { otpService } from '../../services/otpService';

import { emailService } from '../../services/emailService';

const router = express.Router();
// Use static methods from security classes - no need for instances

// Rate limiting
const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictAuthLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many failed attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('phone').optional().matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please provide a valid phone number'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  body('totpCode').optional().isLength({ min: 6, max: 6 }).withMessage('TOTP code must be 6 digits'),
];

const otpValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('type').isIn(['email_verification', 'login_verification', 'password_reset']).withMessage('Invalid OTP type'),
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

// Helper functions
const generateTokens = (userId: string, email: string, role: string) => {
  const payload = { userId, email, role };
  const accessTokenSecret = process.env.JWT_SECRET as string;
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET as string;
  
  const accessTokenOptions: SignOptions = { 
    expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any
  };
  
  const refreshTokenOptions: SignOptions = { 
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any
  };
  
  const accessToken = jwt.sign(payload, accessTokenSecret, accessTokenOptions);
  const refreshToken = jwt.sign(payload, refreshTokenSecret, refreshTokenOptions);
  
  return { accessToken, refreshToken };
};

const setTokenCookies = (res: express.Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/'
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  });
};

const logActivity = async (userId: string, action: string, details: string, ipAddress?: string, userAgent?: string) => {
  try {
    await db.execute(sql`
      INSERT INTO activity_logs (user_id, action, details, ip_address, user_agent, created_at)
      VALUES (${userId}, ${action}, ${details}, ${ipAddress || null}, ${userAgent || null}, NOW())
    `);
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Routes

// User Registration
router.post('/register', authLimit, registerValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUserResult = await db.execute(sql`
      SELECT id, email_verified FROM users WHERE email = ${email}
    `);

    if ((existingUserResult as any).rows?.length > 0) {
      const existingUser = (existingUserResult as any).rows[0];
      if (existingUser.email_verified) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      } else {
        // User exists but email not verified, allow re-registration
        await db.execute(sql`DELETE FROM users WHERE email = ${email} AND email_verified = false`);
      }
    }

    // Hash password with pepper and salt
    const hashedPassword = await PasswordSecurity.hashPassword(password);

    // Create user
    const userResult = await db.execute(sql`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, role, status, created_at, updated_at)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName}, ${phone || null}, 'user', 'pending', NOW(), NOW())
      RETURNING id, email, first_name, last_name, role, status
    `);

    const newUser = (userResult as any).rows?.[0];
    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create user account'
      });
    }

    // Generate email verification OTP
    const verificationOTP = otpService.generateSimpleOTP(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await db.execute(sql`
      INSERT INTO user_otps (user_id, otp_code, otp_type, expires_at, created_at)
      VALUES (${newUser.id}, ${verificationOTP}, 'email_verification', ${expiresAt}, NOW())
    `);

    // Send verification email
    if (emailService.isEnabled()) {
      const template = otpService.createOTPTemplate('email_verification', {
        otp: verificationOTP,
        userName: `${firstName} ${lastName}`,
        expiryMinutes: 10
      });

      const emailResult = await otpService.sendOTPEmail(email, template);
      if (!emailResult.success) {
        console.error('Failed to send verification email:', emailResult.error);
      }
    }

    await logActivity(newUser.id, 'USER_REGISTRATION', `User registered with email: ${email}`, req.ip, req.get('User-Agent'));

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email for verification code.',
      data: {
        userId: newUser.id,
        email: newUser.email,
        requiresEmailVerification: true
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account. Please try again.'
    });
  }
});

// Email Verification
router.post('/verify-email', authLimit, otpValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, otp, type } = req.body;

    if (type !== 'email_verification') {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP type for email verification'
      });
    }

    // Find user and OTP
    const result = await db.execute(sql`
      SELECT u.id, u.email, u.first_name, u.last_name, u.status, o.otp_code, o.expires_at, o.used_at
      FROM users u
      JOIN user_otps o ON u.id = o.user_id
      WHERE u.email = ${email} AND o.otp_type = 'email_verification' AND o.used_at IS NULL
      ORDER BY o.created_at DESC
      LIMIT 1
    `);

    const userOtp = (result as any).rows?.[0];
    if (!userOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

    // Check if OTP has expired
    if (new Date() > new Date(userOtp.expires_at)) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (userOtp.otp_code !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    // Mark OTP as used and verify user email
    await db.execute(sql`
      UPDATE user_otps SET used_at = NOW() 
      WHERE user_id = ${userOtp.id} AND otp_type = 'email_verification' AND used_at IS NULL
    `);

    await db.execute(sql`
      UPDATE users 
      SET email_verified = true, status = 'active', updated_at = NOW()
      WHERE id = ${userOtp.id}
    `);

    await logActivity(userOtp.id, 'EMAIL_VERIFICATION', 'Email address verified successfully', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Email verified successfully. You can now log in to your account.',
      data: {
        userId: userOtp.id,
        email: userOtp.email,
        emailVerified: true
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify email. Please try again.'
    });
  }
});

// Resend Verification Email
router.post('/resend-verification', authLimit, async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Find unverified user
    const userResult = await db.execute(sql`
      SELECT id, email, first_name, last_name, email_verified, status
      FROM users 
      WHERE email = ${email} AND email_verified = false
    `);

    const user = (userResult as any).rows?.[0];
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No unverified account found with this email address'
      });
    }

    // Mark previous OTPs as used
    await db.execute(sql`
      UPDATE user_otps 
      SET used_at = NOW() 
      WHERE user_id = ${user.id} AND otp_type = 'email_verification' AND used_at IS NULL
    `);

    // Generate new verification OTP
    const verificationOTP = otpService.generateSimpleOTP(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.execute(sql`
      INSERT INTO user_otps (user_id, otp_code, otp_type, expires_at, created_at)
      VALUES (${user.id}, ${verificationOTP}, 'email_verification', ${expiresAt}, NOW())
    `);

    // Send verification email
    if (emailService.isEnabled()) {
      const template = otpService.createOTPTemplate('email_verification', {
        otp: verificationOTP,
        userName: `${user.first_name} ${user.last_name}`,
        expiryMinutes: 10
      });

      const emailResult = await otpService.sendOTPEmail(email, template);
      if (!emailResult.success) {
        console.error('Failed to send verification email:', emailResult.error);
        return res.status(500).json({
          success: false,
          message: 'Failed to send verification email. Please try again.'
        });
      }
    }

    await logActivity(user.id, 'VERIFICATION_RESENT', 'Verification email resent', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Verification code sent successfully. Please check your email.'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend verification code. Please try again.'
    });
  }
});

// User Login
router.post('/login', strictAuthLimit, loginValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, totpCode } = req.body;

    // Find user
    const userResult = await db.execute(sql`
      SELECT id, email, password_hash, first_name, last_name, role, status, 
             email_verified, two_factor_enabled, two_factor_secret, failed_login_attempts, 
             account_locked_until, last_login
      FROM users 
      WHERE email = ${email}
    `);

    const user = (userResult as any).rows?.[0];
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check account status
    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: user.status === 'pending' ? 'Please verify your email address first' : 'Account is suspended'
      });
    }

    if (!user.email_verified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email address first',
        requiresEmailVerification: true
      });
    }

    // Check account lockout
    if (user.account_locked_until && new Date() < new Date(user.account_locked_until)) {
      const lockoutTime = Math.ceil((new Date(user.account_locked_until).getTime() - Date.now()) / 60000);
      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked. Please try again in ${lockoutTime} minutes.`
      });
    }

    // Verify password
    const isPasswordValid = await PasswordSecurity.verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      // Increment failed login attempts
      const newFailedAttempts = (user.failed_login_attempts || 0) + 1;
      let lockoutTime = null;
      
      if (newFailedAttempts >= 5) {
        lockoutTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes lockout
      }

      await db.execute(sql`
        UPDATE users 
        SET failed_login_attempts = ${newFailedAttempts}, 
            account_locked_until = ${lockoutTime}
        WHERE id = ${user.id}
      `);

      await logActivity(user.id, 'LOGIN_FAILED', `Invalid password attempt ${newFailedAttempts}`, req.ip, req.get('User-Agent'));

      return res.status(401).json({
        success: false,
        message: newFailedAttempts >= 5 ? 'Too many failed attempts. Account locked for 30 minutes.' : 'Invalid email or password'
      });
    }

    // Check 2FA if enabled
    if (user.two_factor_enabled) {
      if (!totpCode) {
        // Generate login verification OTP as backup
        const loginOTP = otpService.generateSimpleOTP(6);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        await db.execute(sql`
          INSERT INTO user_otps (user_id, otp_code, otp_type, expires_at, created_at)
          VALUES (${user.id}, ${loginOTP}, 'login_verification', ${expiresAt}, NOW())
        `);

        // Send login verification email
        if (emailService.isEnabled()) {
          const template = otpService.createOTPTemplate('login_verification', {
            otp: loginOTP,
            userName: `${user.first_name} ${user.last_name}`,
            expiryMinutes: 5,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
          });

          await otpService.sendOTPEmail(email, template);
        }

        return res.status(200).json({
          success: false,
          message: 'Two-factor authentication required',
          requires2FA: true,
          backupOTPSent: emailService.isEnabled()
        });
      }

      // Verify TOTP code (6 digits from authenticator app)
      if (totpCode.length === 6 && /^\d+$/.test(totpCode)) {
        const isTotpValid = TwoFactorAuth.verifyToken(totpCode, user.two_factor_secret);
        if (!isTotpValid) {
          // Check if it's a backup OTP from email
          const otpResult = await db.execute(sql`
            SELECT otp_code, expires_at 
            FROM user_otps 
            WHERE user_id = ${user.id} AND otp_type = 'login_verification' 
              AND used_at IS NULL AND expires_at > NOW()
            ORDER BY created_at DESC 
            LIMIT 1
          `);

          const backupOtp = (otpResult as any).rows?.[0];
          if (!backupOtp || backupOtp.otp_code !== totpCode) {
            await logActivity(user.id, 'LOGIN_2FA_FAILED', 'Invalid TOTP/OTP code', req.ip, req.get('User-Agent'));
            return res.status(401).json({
              success: false,
              message: 'Invalid verification code'
            });
          }

          // Mark backup OTP as used
          await db.execute(sql`
            UPDATE user_otps SET used_at = NOW() 
            WHERE user_id = ${user.id} AND otp_type = 'login_verification' AND used_at IS NULL
          `);
        }
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid verification code format'
        });
      }
    }

    // Reset failed login attempts and generate tokens
    await db.execute(sql`
      UPDATE users 
      SET failed_login_attempts = 0, account_locked_until = NULL, last_login = NOW(), updated_at = NOW()
      WHERE id = ${user.id}
    `);

    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    // Store refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await db.execute(sql`
      INSERT INTO user_sessions (user_id, refresh_token, expires_at, ip_address, user_agent, created_at)
      VALUES (${user.id}, ${refreshToken}, ${expiresAt}, ${req.ip}, ${req.get('User-Agent')}, NOW())
    `);

    // Set cookies
    setTokenCookies(res, accessToken, refreshToken);

    await logActivity(user.id, 'LOGIN_SUCCESS', 'User logged in successfully', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          twoFactorEnabled: user.two_factor_enabled
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google'));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
  async (req: any, res) => {
    try {
      const user = req.user;
      
      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user.id.toString(), user.email, user.role);

      // Store session
      await db.execute(sql`
        INSERT INTO user_sessions (user_id, refresh_token, ip_address, user_agent, expires_at)
        VALUES (${user.id}, ${refreshToken}, ${req.ip}, ${req.get('User-Agent') || ''}, 
                ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
      `);

      // Set secure cookies
      setTokenCookies(res, accessToken, refreshToken);

      await logActivity(user.id, 'LOGIN_SUCCESS', 'Successful Google OAuth login', req.ip);

      // Redirect to dashboard or intended page
      res.redirect(`${process.env.CLIENT_URL}/dashboard?auth=success`);

    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect('/login?error=oauth_callback_failed');
    }
  }
);

// 2FA Setup
router.post('/setup-2fa', authenticateToken, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user!.id;

    // Check if 2FA is already enabled
    const userResult = await db.execute(sql`
      SELECT two_factor_enabled FROM users WHERE id = ${userId}
    `);

    const user = (userResult as any).rows?.[0];
    if (user?.two_factor_enabled) {
      return res.status(400).json({
        success: false,
        message: 'Two-factor authentication is already enabled'
      });
    }

    // Get user's full name from database for 2FA setup
    const userDetailsResult = await db.execute(sql`
      SELECT first_name, last_name FROM users WHERE id = ${userId}
    `);
    const userDetails = (userDetailsResult as any).rows?.[0];
    const setup2FAResult = await otpService.setup2FA(req.user.email, `${userDetails.first_name} ${userDetails.last_name}`);

    if (!setup2FAResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to setup 2FA',
        error: setup2FAResult.error
      });
    }

    // Store the secret temporarily (user needs to verify before enabling)
    await db.execute(sql`
      UPDATE users 
      SET two_factor_temp_secret = ${setup2FAResult.secret}
      WHERE id = ${userId}
    `);

    res.json({
      success: true,
      message: '2FA setup initiated. Please scan the QR code and verify with your authenticator app.',
      data: {
        qrCode: setup2FAResult.qrCode,
        manualEntryKey: setup2FAResult.secret,
        backupCodes: setup2FAResult.backupCodes
      }
    });

  } catch (error) {
    console.error('2FA setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to setup 2FA. Please try again.'
    });
  }
});

// Verify and Enable 2FA
router.post('/verify-2fa-setup', authenticateToken, async (req: AuthRequest, res: express.Response) => {
      try {
      const { totpCode } = req.body;
      const userId = req.user!.id;

    if (!totpCode || totpCode.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Valid 6-digit TOTP code is required'
      });
    }

    // Get temporary secret
    const userResult = await db.execute(sql`
      SELECT two_factor_temp_secret FROM users WHERE id = ${userId}
    `);

    const user = (userResult as any).rows?.[0];
    if (!user?.two_factor_temp_secret) {
      return res.status(400).json({
        success: false,
        message: 'No pending 2FA setup found. Please start the setup process again.'
      });
    }

    // Verify TOTP code
    const isValid = TwoFactorAuth.verifyToken(totpCode, user.two_factor_temp_secret);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please try again.'
      });
    }

    // Enable 2FA and move temp secret to permanent
    await db.execute(sql`
      UPDATE users 
      SET two_factor_enabled = true, 
          two_factor_secret = two_factor_temp_secret, 
          two_factor_temp_secret = NULL,
          updated_at = NOW()
      WHERE id = ${userId}
    `);

    await logActivity(userId.toString(), '2FA_ENABLED', 'Two-factor authentication enabled', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Two-factor authentication has been successfully enabled for your account.',
      data: {
        twoFactorEnabled: true
      }
    });

  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify 2FA setup. Please try again.'
    });
  }
});

// Disable 2FA
router.post('/disable-2fa', authenticateToken, async (req: AuthRequest, res: express.Response) => {
      try {
      const { password, totpCode } = req.body;
      const userId = req.user!.id;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required to disable 2FA'
      });
    }

    // Get user data
    const userResult = await db.execute(sql`
      SELECT password_hash, two_factor_enabled, two_factor_secret 
      FROM users WHERE id = ${userId}
    `);

    const user = (userResult as any).rows?.[0];
    if (!user?.two_factor_enabled) {
      return res.status(400).json({
        success: false,
        message: 'Two-factor authentication is not enabled'
      });
    }

    // Verify password
    const isPasswordValid = await PasswordSecurity.verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Verify TOTP code if provided
    if (totpCode) {
      const isTotpValid = TwoFactorAuth.verifyToken(totpCode, user.two_factor_secret);
      if (!isTotpValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid verification code'
        });
      }
    }

    // Disable 2FA
    await db.execute(sql`
      UPDATE users 
      SET two_factor_enabled = false, 
          two_factor_secret = NULL,
          updated_at = NOW()
      WHERE id = ${userId}
    `);

    await logActivity(userId.toString(), '2FA_DISABLED', 'Two-factor authentication disabled', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Two-factor authentication has been disabled for your account.',
      data: {
        twoFactorEnabled: false
      }
    });

  } catch (error) {
    console.error('2FA disable error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to disable 2FA. Please try again.'
    });
  }
});

// Forgot Password
router.post('/forgot-password', authLimit, async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Find user
    const userResult = await db.execute(sql`
      SELECT id, email, first_name, last_name, status, email_verified
      FROM users 
      WHERE email = ${email} AND status = 'active'
    `);

    const user = (userResult as any).rows?.[0];
    
    // Always return success to prevent email enumeration
    const successResponse = {
      success: true,
      message: 'If an account with this email exists, a password reset code has been sent.'
    };

    if (!user || !user.email_verified) {
      return res.json(successResponse);
    }

    // Mark previous reset OTPs as used
    await db.execute(sql`
      UPDATE user_otps 
      SET used_at = NOW() 
      WHERE user_id = ${user.id} AND otp_type = 'password_reset' AND used_at IS NULL
    `);

    // Generate password reset OTP
    const resetOTP = otpService.generateSimpleOTP(6);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await db.execute(sql`
      INSERT INTO user_otps (user_id, otp_code, otp_type, expires_at, created_at)
      VALUES (${user.id}, ${resetOTP}, 'password_reset', ${expiresAt}, NOW())
    `);

    // Send password reset email
    if (emailService.isEnabled()) {
      const template = otpService.createOTPTemplate('password_reset', {
        otp: resetOTP,
        userName: `${user.first_name} ${user.last_name}`,
        expiryMinutes: 15,
        ipAddress: req.ip
      });

      const emailResult = await otpService.sendOTPEmail(email, template);
      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error);
      }
    }

    await logActivity(user.id, 'PASSWORD_RESET_REQUESTED', 'Password reset OTP sent', req.ip, req.get('User-Agent'));

    res.json(successResponse);

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request. Please try again.'
    });
  }
});

// Reset Password with OTP
router.post('/reset-password', authLimit, resetPasswordValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { token, password } = req.body;

    // Find user by OTP token
    const result = await db.execute(sql`
      SELECT u.id, u.email, u.first_name, u.last_name, o.otp_code, o.expires_at, o.used_at
      FROM users u
      JOIN user_otps o ON u.id = o.user_id
      WHERE o.otp_code = ${token} AND o.otp_type = 'password_reset' AND o.used_at IS NULL
      ORDER BY o.created_at DESC
      LIMIT 1
    `);

    const userOtp = (result as any).rows?.[0];
    if (!userOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code'
      });
    }

    // Check if OTP has expired
    if (new Date() > new Date(userOtp.expires_at)) {
      return res.status(400).json({
        success: false,
        message: 'Reset code has expired. Please request a new one.'
      });
    }

    // Hash new password
    const hashedPassword = await PasswordSecurity.hashPassword(password);

    // Update password and mark OTP as used
    await db.execute(sql`
      UPDATE user_otps SET used_at = NOW() 
      WHERE user_id = ${userOtp.id} AND otp_type = 'password_reset' AND used_at IS NULL
    `);

    await db.execute(sql`
      UPDATE users 
      SET password_hash = ${hashedPassword}, 
          failed_login_attempts = 0,
          account_locked_until = NULL,
          updated_at = NOW()
      WHERE id = ${userOtp.id}
    `);

    // Invalidate all existing sessions
    await db.execute(sql`
      DELETE FROM user_sessions WHERE user_id = ${userOtp.id}
    `);

    await logActivity(userOtp.id, 'PASSWORD_RESET_SUCCESS', 'Password reset successfully completed', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
      data: {
        userId: userOtp.id,
        email: userOtp.email
      }
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.'
    });
  }
});

// Send OTP for login verification
router.post('/send-login-otp', authLimit, [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    const userResult = await db.execute(sql`
      SELECT id, first_name, last_name, email, two_factor_enabled
      FROM users 
      WHERE email = ${email} AND status = 'active'
    `);

    const user = (userResult as any).rows?.[0];
    if (!user) {
      // Don't reveal if email exists
      return res.json({
        success: true,
        message: 'If the email exists, an OTP has been sent'
      });
    }

    // Generate OTP
    const otp = otpService.generateSimpleOTP(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.execute(sql`
      UPDATE users 
      SET login_otp = ${otp},
          login_otp_expires_at = ${expiresAt.toISOString()},
          updated_at = NOW()
      WHERE id = ${user.id}
    `);

    // Send OTP email
    if (emailService.isEnabled()) {
      const userName = `${user.first_name} ${user.last_name}`.trim();
      const template = otpService.createOTPTemplate('login_verification', {
        otp,
        userName,
        expiryMinutes: 10,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      const emailResult = await otpService.sendOTPEmail(email, template);
      if (!emailResult.success) {
        console.error('Failed to send login OTP email:', emailResult.error);
      }
    }

    await logActivity(user.id, 'login_otp_sent', 'Login OTP sent via email', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'If the email exists, an OTP has been sent'
    });

  } catch (error) {
    console.error('Login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify login OTP
router.post('/verify-login-otp', authLimit, [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, otp } = req.body;

    const userResult = await db.execute(sql`
      SELECT id, email, role, login_otp, login_otp_expires_at
      FROM users 
      WHERE email = ${email} 
      AND login_otp = ${otp}
      AND login_otp_expires_at > NOW()
      AND status = 'active'
    `);

    const user = (userResult as any).rows?.[0];
    if (!user) {
      await db.execute(sql`
        INSERT INTO activity_logs (user_id, action, details, ip_address, user_agent, created_at)
        VALUES (NULL, 'login_otp_failed', ${{ email, reason: 'invalid_otp' }}, ${req.ip}, ${req.get('User-Agent')}, NOW())
      `);
      
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Clear OTP
    await db.execute(sql`
      UPDATE users 
      SET login_otp = NULL,
          login_otp_expires_at = NULL,
          last_login = NOW(),
          updated_at = NOW()
      WHERE id = ${user.id}
    `);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    // Store refresh token and create session
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await db.execute(sql`
      INSERT INTO user_sessions (id, user_id, refresh_token, expires_at, ip_address, user_agent, created_at)
      VALUES (${sessionId}, ${user.id}, ${refreshToken}, ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}, ${req.ip}, ${req.get('User-Agent')}, NOW())
    `);

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    await logActivity(user.id, 'login_otp_verified', 'Login OTP verified successfully', req.ip, req.get('User-Agent'));

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        accessToken,
        sessionId
      }
    });

  } catch (error) {
    console.error('Login OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify 2FA during login
router.post('/verify-2fa-login', authLimit, otpValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format',
        errors: errors.array()
      });
    }

    const { email, otp, loginToken } = req.body;

    if (!email || !loginToken) {
      return res.status(400).json({
        success: false,
        message: 'Email and login token are required'
      });
    }

    // Verify login token (temporary token issued during login)
    let decoded;
    try {
      decoded = jwt.verify(loginToken, process.env.JWT_SECRET!) as any;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired login session'
      });
    }

    if (decoded.email !== email || decoded.purpose !== '2fa_pending') {
      return res.status(401).json({
        success: false,
        message: 'Invalid login session'
      });
    }

    const userResult = await db.execute(sql`
      SELECT id, email, role, two_factor_secret, two_factor_backup_codes, status
      FROM users 
      WHERE email = ${email} AND id = ${decoded.userId}
    `);
    
    const user = (userResult as any).rows?.[0];
    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    let otpValid = false;

    // Try TOTP first
    if (user.two_factor_secret) {
      otpValid = otpService.verifyTOTP(otp, user.two_factor_secret);
    }

    // If TOTP fails, try backup codes
    if (!otpValid && user.two_factor_backup_codes) {
      try {
        const backupCodes = JSON.parse(user.two_factor_backup_codes);
        const codeIndex = backupCodes.indexOf(otp);
        
        if (codeIndex !== -1) {
          otpValid = true;
          // Remove used backup code
          backupCodes.splice(codeIndex, 1);
          await db.execute(sql`
            UPDATE users 
            SET two_factor_backup_codes = ${JSON.stringify(backupCodes)}
            WHERE id = ${user.id}
          `);
        }
      } catch (error) {
        console.error('Error processing backup codes:', error);
      }
    }

    if (!otpValid) {
      await logActivity(user.id, 'failed_2fa_verification', req.ip, req.get('User-Agent'));
      return res.status(401).json({
        success: false,
        message: 'Invalid 2FA code'
      });
    }

    // Generate final tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    // Store refresh token
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await db.execute(sql`
      INSERT INTO user_sessions (id, user_id, refresh_token, expires_at, created_at)
      VALUES (${sessionId}, ${user.id}, ${refreshToken}, ${expiresAt.toISOString()}, NOW())
    `);

    // Update last login
    await db.execute(sql`
      UPDATE users 
      SET last_login = NOW(),
          updated_at = NOW()
      WHERE id = ${user.id}
    `);

    await logActivity(user.id, 'login_success_with_2fa', req.ip, req.get('User-Agent'));

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: 'Login completed successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;