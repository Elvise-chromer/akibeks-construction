import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import speakeasy from 'speakeasy';

// Security constants
const SALT_ROUNDS = 12; // High number for better security
const PEPPER = process.env.PASSWORD_PEPPER || 'akibeks_construction_pepper_2024!@#$%'; // Global pepper

/**
 * Enhanced password security utility
 */
export class PasswordSecurity {
  /**
   * Hash a password with salt and pepper
   * @param password - Plain text password
   * @returns Promise<string> - Hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      // Add pepper to password (global secret)
      const pepperedPassword = password + PEPPER;
      
      // Generate salt and hash
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(pepperedPassword, salt);
      
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Password hashing failed');
    }
  }

  /**
   * Verify a password against its hash
   * @param password - Plain text password
   * @param hashedPassword - Stored hash
   * @returns Promise<boolean> - True if password matches
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      // Add pepper to password (same as during hashing)
      const pepperedPassword = password + PEPPER;
      
      // Compare with stored hash
      return await bcrypt.compare(pepperedPassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  /**
   * Generate a secure random password
   * @param length - Password length (default 12)
   * @returns string - Generated password
   */
  static generateSecurePassword(length: number = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }

  /**
   * Validate password strength
   * @param password - Password to validate
   * @returns object - Validation result with score and requirements
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    requirements: {
      minLength: boolean;
      hasUppercase: boolean;
      hasLowercase: boolean;
      hasNumbers: boolean;
      hasSpecialChars: boolean;
    };
    suggestions: string[];
  } {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const score = Object.values(requirements).filter(Boolean).length;
    const isValid = score >= 4 && requirements.minLength;

    const suggestions: string[] = [];
    if (!requirements.minLength) suggestions.push('Use at least 8 characters');
    if (!requirements.hasUppercase) suggestions.push('Include uppercase letters');
    if (!requirements.hasLowercase) suggestions.push('Include lowercase letters');
    if (!requirements.hasNumbers) suggestions.push('Include numbers');
    if (!requirements.hasSpecialChars) suggestions.push('Include special characters');

    return {
      isValid,
      score,
      requirements,
      suggestions,
    };
  }

  /**
   * Generate password reset token
   * @returns string - Secure random token
   */
  static generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate email verification token
   * @returns string - Secure random token
   */
  static generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate backup codes for 2FA
   * @param count - Number of backup codes to generate (default 10)
   * @returns string[] - Array of backup codes
   */
  static generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      // Generate 8-digit backup code
      const code = crypto.randomInt(10000000, 99999999).toString();
      codes.push(code);
    }
    
    return codes;
  }

  /**
   * Hash backup codes for storage
   * @param codes - Array of backup codes
   * @returns Promise<string[]> - Array of hashed backup codes
   */
  static async hashBackupCodes(codes: string[]): Promise<string[]> {
    const hashedCodes: string[] = [];
    
    for (const code of codes) {
      const hashedCode = await bcrypt.hash(code + PEPPER, 10); // Lower salt rounds for backup codes
      hashedCodes.push(hashedCode);
    }
    
    return hashedCodes;
  }

  /**
   * Verify backup code
   * @param code - Backup code to verify
   * @param hashedCodes - Array of stored hashed backup codes
   * @returns Promise<number> - Index of matched code (-1 if not found)
   */
  static async verifyBackupCode(code: string, hashedCodes: string[]): Promise<number> {
    for (let i = 0; i < hashedCodes.length; i++) {
      const isMatch = await bcrypt.compare(code + PEPPER, hashedCodes[i]);
      if (isMatch) {
        return i;
      }
    }
    return -1;
  }
}

/**
 * Two-Factor Authentication utility
 */
export class TwoFactorAuth {
  /**
   * Generate 2FA secret for user
   * @param userEmail - User's email
   * @returns object - Secret and QR code data
   */
  static generateSecret(userEmail: string): {
    secret: string;
    qrCodeUrl: string;
    manualEntryKey: string;
  } {
    const secret = speakeasy.generateSecret({
      name: userEmail,
      issuer: 'Akibeks Construction',
      length: 32,
    });

    return {
      secret: secret.base32,
      qrCodeUrl: secret.otpauth_url || '',
      manualEntryKey: secret.base32,
    };
  }

  /**
   * Verify 2FA token
   * @param token - 6-digit token from authenticator app
   * @param secret - User's 2FA secret
   * @param window - Time window for token validity (default 2)
   * @returns boolean - True if token is valid
   */
  static verifyToken(token: string, secret: string, window: number = 2): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: window,
    });
  }

  /**
   * Generate backup tokens for 2FA
   * @param count - Number of tokens to generate
   * @returns string[] - Array of backup tokens
   */
  static generateBackupTokens(count: number = 10): string[] {
    return PasswordSecurity.generateBackupCodes(count);
  }
}

/**
 * Session security utility
 */
export class SessionSecurity {
  /**
   * Generate secure session token
   * @returns string - Session token
   */
  static generateSessionToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  /**
   * Generate CSRF token
   * @returns string - CSRF token
   */
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hash session token for storage
   * @param token - Session token
   * @returns string - Hashed token
   */
  static hashSessionToken(token: string): string {
    return crypto.createHash('sha256').update(token + PEPPER).digest('hex');
  }

  /**
   * Verify session token
   * @param token - Token to verify
   * @param hashedToken - Stored hash
   * @returns boolean - True if token matches
   */
  static verifySessionToken(token: string, hashedToken: string): boolean {
    const computedHash = this.hashSessionToken(token);
    return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(hashedToken));
  }
}

/**
 * Account security utility
 */
export class AccountSecurity {
  /**
   * Check if account should be locked based on failed attempts
   * @param failedAttempts - Number of failed login attempts
   * @param lastFailedAt - Timestamp of last failed attempt
   * @returns object - Lock status and duration
   */
  static checkAccountLock(failedAttempts: number, lastFailedAt?: Date): {
    isLocked: boolean;
    lockDuration: number; // in minutes
    unlockAt?: Date;
  } {
    if (failedAttempts < 3) {
      return { isLocked: false, lockDuration: 0 };
    }

    let lockDuration: number;
    
    if (failedAttempts >= 10) {
      lockDuration = 60; // 1 hour
    } else if (failedAttempts >= 7) {
      lockDuration = 30; // 30 minutes
    } else if (failedAttempts >= 5) {
      lockDuration = 15; // 15 minutes
    } else {
      lockDuration = 5; // 5 minutes
    }

    const unlockAt = lastFailedAt 
      ? new Date(lastFailedAt.getTime() + lockDuration * 60 * 1000)
      : new Date(Date.now() + lockDuration * 60 * 1000);

    return {
      isLocked: true,
      lockDuration,
      unlockAt,
    };
  }

  /**
   * Generate secure API key
   * @param prefix - API key prefix (default 'ak_')
   * @returns string - Generated API key
   */
  static generateApiKey(prefix: string = 'ak_'): string {
    const randomPart = crypto.randomBytes(24).toString('hex');
    return `${prefix}${randomPart}`;
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns boolean - True if valid email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check if password has been compromised (basic check)
   * @param password - Password to check
   * @returns boolean - True if password appears compromised
   */
  static isCommonPassword(password: string): boolean {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey',
      '1234567890', 'password1', '123123', 'qwerty123'
    ];
    
    return commonPasswords.includes(password.toLowerCase());
  }
}

export default {
  PasswordSecurity,
  TwoFactorAuth,
  SessionSecurity,
  AccountSecurity,
};