import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { emailService } from './emailService';
import { config } from '../config/environment';

export interface OTPTemplate {
  subject: string;
  html: string;
  text: string;
  sms?: string;
}

export interface OTPResult {
  success: boolean;
  otp?: string;
  qrCode?: string;
  secret?: string;
  backupCodes?: string[];
  error?: string;
}

export interface SendOTPResult {
  success: boolean;
  messageId?: string;
  error?: string;
  method: 'email' | 'sms' | 'app';
}

class OTPService {
  private readonly issuer = 'Akibeks Engineering Solutions';
  private readonly algorithm = 'sha1';
  private readonly digits = 6;
  private readonly period = 30; // 30 seconds for TOTP
  private readonly window = 2; // Allow 2 time steps before/after

  /**
   * Generate a new TOTP secret for 2FA setup
   */
  generateTOTPSecret(userEmail: string, userName?: string): {
    secret: string;
    qrCodeUrl: string;
    manualEntryKey: string;
  } {
    const secret = speakeasy.generateSecret({
      issuer: this.issuer,
      name: userName || userEmail,
      length: 32
    });

    return {
      secret: secret.base32!,
      qrCodeUrl: secret.otpauth_url!,
      manualEntryKey: secret.base32!
    };
  }

  /**
   * Generate QR code image data URL
   */
  async generateQRCode(otpauthUrl: string): Promise<string> {
    try {
      return await QRCode.toDataURL(otpauthUrl, {
        errorCorrectionLevel: 'M',
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 200
      });
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error}`);
    }
  }

  /**
   * Verify TOTP token
   */
  verifyTOTP(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      step: this.period,
      window: this.window
    });
  }

  /**
   * Generate a simple OTP for email/SMS verification
   */
  generateSimpleOTP(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }

  /**
   * Generate backup codes for 2FA
   */
  generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      // Generate 8-character backup codes
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    return codes;
  }

  /**
   * Create OTP message templates
   */
  createOTPTemplate(type: 'email_verification' | 'login_verification' | '2fa_setup' | 'password_reset', data: {
    otp: string;
    userName?: string;
    expiryMinutes?: number;
    ipAddress?: string;
    userAgent?: string;
    location?: string;
  }): OTPTemplate {
    const { otp, userName = 'User', expiryMinutes = 10, ipAddress, userAgent, location } = data;
    
    switch (type) {
      case 'email_verification':
        return this.createEmailVerificationTemplate(otp, userName, expiryMinutes);
      
      case 'login_verification':
        return this.createLoginVerificationTemplate(otp, userName, expiryMinutes, ipAddress, userAgent, location);
      
      case '2fa_setup':
        return this.create2FASetupTemplate(otp, userName);
      
      case 'password_reset':
        return this.createPasswordResetTemplate(otp, userName, expiryMinutes, ipAddress);
      
      default:
        throw new Error(`Unknown OTP template type: ${type}`);
    }
  }

  /**
   * Send OTP via email
   */
  async sendOTPEmail(email: string, template: OTPTemplate): Promise<SendOTPResult> {
    try {
      const result = await emailService.sendEmail({
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text
      });

      return {
        success: result.success,
        messageId: result.messageId,
        error: result.error,
        method: 'email'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        method: 'email'
      };
    }
  }

  /**
   * Complete 2FA setup flow
   */
  async setup2FA(userEmail: string, userName?: string): Promise<OTPResult> {
    try {
      // Generate TOTP secret
      const secretData = this.generateTOTPSecret(userEmail, userName);
      
      // Generate QR code
      const qrCodeDataURL = await this.generateQRCode(secretData.qrCodeUrl);
      
      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      return {
        success: true,
        secret: secretData.secret,
        qrCode: qrCodeDataURL,
        backupCodes
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to setup 2FA'
      };
    }
  }

  // Private template methods
  private createEmailVerificationTemplate(otp: string, userName: string, expiryMinutes: number): OTPTemplate {
    const subject = 'Verify Your Email Address - Akibeks Engineering Solutions';
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; }
          .otp-container { background: #f97316; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace; }
          .otp-label { font-size: 14px; margin-bottom: 10px; opacity: 0.9; }
          .warning { background: #fef3c7; color: #92400e; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 10px 0; }
          .security-tips { background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .security-tips h3 { color: #1e40af; margin-top: 0; }
          .security-tips ul { margin: 0; padding-left: 20px; }
          .security-tips li { margin: 5px 0; color: #374151; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏗️ AKIBEKS</div>
          <div>Engineering Solutions</div>
        </div>
        
        <div class="content">
          <h1>Verify Your Email Address</h1>
          <p>Hello ${userName},</p>
          <p>Welcome to Akibeks Engineering Solutions! To complete your registration and secure your account, please verify your email address using the verification code below:</p>
          
          <div class="otp-container">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>This code will expire in ${expiryMinutes} minutes.</strong></p>
          
          <div class="security-tips">
            <h3>🔒 Security Tips</h3>
            <ul>
              <li>Never share this code with anyone</li>
              <li>Our team will never ask for this code via phone or email</li>
              <li>If you didn't request this verification, please ignore this email</li>
              <li>Ensure you're on our official website when entering this code</li>
            </ul>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important:</strong> If you didn't create an account with Akibeks Engineering Solutions, please ignore this email. Your email address may have been entered by mistake.
          </div>
          
          <p>After verification, you'll have access to:</p>
          <ul>
            <li>Project management dashboard</li>
            <li>Quote requests and tracking</li>
            <li>Direct communication with our engineering team</li>
            <li>Priority customer support</li>
          </ul>
          
          <p>If you have any questions, feel free to contact our support team.</p>
          
          <p>Best regards,<br>
          <strong>The Akibeks Engineering Solutions Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>Akibeks Engineering Solutions</strong></p>
          <p>Building Excellence, Engineering the Future</p>
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Akibeks Engineering Solutions. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    const text = `
AKIBEKS ENGINEERING SOLUTIONS - Email Verification

Hello ${userName},

Welcome to Akibeks Engineering Solutions! Please verify your email address using the code below:

VERIFICATION CODE: ${otp}

This code will expire in ${expiryMinutes} minutes.

SECURITY REMINDER:
- Never share this code with anyone
- Our team will never ask for this code via phone or email
- If you didn't request this verification, please ignore this email

After verification, you'll have access to our project management dashboard, quote requests, and priority support.

Best regards,
The Akibeks Engineering Solutions Team

Building Excellence, Engineering the Future
    `;

    const sms = `Akibeks Engineering: Your verification code is ${otp}. Valid for ${expiryMinutes} minutes. Never share this code. If you didn't request this, ignore this message.`;

    return { subject, html, text, sms };
  }

  private createLoginVerificationTemplate(otp: string, userName: string, expiryMinutes: number, ipAddress?: string, userAgent?: string, location?: string): OTPTemplate {
    const subject = 'Secure Login Verification - Akibeks Engineering Solutions';
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Verification</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; }
          .otp-container { background: #1e40af; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace; }
          .otp-label { font-size: 14px; margin-bottom: 10px; opacity: 0.9; }
          .login-details { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .security-alert { background: #fef2f2; color: #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; }
          .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: 500; color: #374151; }
          .detail-value { color: #6b7280; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🔐 AKIBEKS</div>
          <div>Secure Login Verification</div>
        </div>
        
        <div class="content">
          <h1>Login Verification Required</h1>
          <p>Hello ${userName},</p>
          <p>We detected a login attempt to your Akibeks Engineering Solutions account. To ensure your account security, please verify this login with the code below:</p>
          
          <div class="otp-container">
            <div class="otp-label">Your Login Verification Code</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>This code will expire in ${expiryMinutes} minutes.</strong></p>
          
          <div class="login-details">
            <h3>🔍 Login Attempt Details</h3>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${new Date().toLocaleString()}</span>
            </div>
            ${ipAddress ? `
            <div class="detail-row">
              <span class="detail-label">IP Address:</span>
              <span class="detail-value">${ipAddress}</span>
            </div>
            ` : ''}
            ${location ? `
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-value">${location}</span>
            </div>
            ` : ''}
            ${userAgent ? `
            <div class="detail-row">
              <span class="detail-label">Device:</span>
              <span class="detail-value">${userAgent.split(' ')[0]}</span>
            </div>
            ` : ''}
          </div>
          
          <div class="security-alert">
            <strong>🚨 Security Alert:</strong> If this wasn't you, please:
            <ul>
              <li>Do NOT enter this verification code</li>
              <li>Change your password immediately</li>
              <li>Contact our security team</li>
              <li>Review your account activity</li>
            </ul>
          </div>
          
          <p><strong>What to do next:</strong></p>
          <ol>
            <li>Go back to the login page</li>
            <li>Enter this 6-digit verification code</li>
            <li>Complete your secure login</li>
          </ol>
          
          <p>This extra security step helps protect your account and project data from unauthorized access.</p>
          
          <p>Best regards,<br>
          <strong>Akibeks Security Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>Akibeks Engineering Solutions</strong></p>
          <p>Your Security is Our Priority</p>
          <p>This is an automated security message. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `;

    const text = `
AKIBEKS ENGINEERING SOLUTIONS - Login Verification

Hello ${userName},

We detected a login attempt to your account. Please verify with this code:

VERIFICATION CODE: ${otp}

This code expires in ${expiryMinutes} minutes.

LOGIN DETAILS:
Time: ${new Date().toLocaleString()}
${ipAddress ? `IP: ${ipAddress}` : ''}
${location ? `Location: ${location}` : ''}

If this wasn't you:
- Don't enter this code
- Change your password immediately
- Contact our security team

Best regards,
Akibeks Security Team
    `;

    const sms = `Akibeks Security Alert: Login verification code: ${otp}. Valid ${expiryMinutes}min. If not you, don't use this code and change your password.`;

    return { subject, html, text, sms };
  }

  private create2FASetupTemplate(otp: string, userName: string): OTPTemplate {
    const subject = 'Complete Your 2FA Setup - Akibeks Engineering Solutions';
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>2FA Setup</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; }
          .otp-container { background: #059669; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace; }
          .otp-label { font-size: 14px; margin-bottom: 10px; opacity: 0.9; }
          .benefits { background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
          .benefits h3 { color: #059669; margin-top: 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; }
          .setup-steps { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .setup-steps ol { margin: 0; padding-left: 20px; }
          .setup-steps li { margin: 10px 0; color: #374151; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🔐 AKIBEKS</div>
          <div>Two-Factor Authentication Setup</div>
        </div>
        
        <div class="content">
          <h1>Complete Your 2FA Setup</h1>
          <p>Hello ${userName},</p>
          <p>You're almost done setting up Two-Factor Authentication (2FA) for your Akibeks account! Please use the verification code below to complete the setup:</p>
          
          <div class="otp-container">
            <div class="otp-label">2FA Setup Verification Code</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="setup-steps">
            <h3>📱 Setup Steps</h3>
            <ol>
              <li>Open your authenticator app (Google Authenticator, Authy, etc.)</li>
              <li>Scan the QR code provided on the setup page</li>
              <li>Enter the 6-digit code from your authenticator app</li>
              <li>Save your backup codes in a secure location</li>
            </ol>
          </div>
          
          <div class="benefits">
            <h3>🛡️ 2FA Benefits</h3>
            <ul>
              <li><strong>Enhanced Security:</strong> Protects against password breaches</li>
              <li><strong>Account Protection:</strong> Prevents unauthorized access</li>
              <li><strong>Peace of Mind:</strong> Your projects and data stay secure</li>
              <li><strong>Industry Standard:</strong> Used by top engineering firms</li>
            </ul>
          </div>
          
          <p><strong>Important Reminders:</strong></p>
          <ul>
            <li>Keep your backup codes in a safe place</li>
            <li>Don't share your authenticator app with others</li>
            <li>If you lose your device, use backup codes to access your account</li>
            <li>Contact support if you need help with 2FA</li>
          </ul>
          
          <p>Once setup is complete, you'll need both your password and authenticator code to login.</p>
          
          <p>Thank you for taking this important step to secure your account!</p>
          
          <p>Best regards,<br>
          <strong>The Akibeks Security Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>Akibeks Engineering Solutions</strong></p>
          <p>Secure Engineering, Secure Future</p>
          <p>This is an automated security message. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `;

    const text = `
AKIBEKS ENGINEERING SOLUTIONS - 2FA Setup

Hello ${userName},

Complete your Two-Factor Authentication setup with this code:

VERIFICATION CODE: ${otp}

Setup Steps:
1. Open your authenticator app
2. Scan the QR code on the setup page
3. Enter this 6-digit code
4. Save your backup codes securely

2FA Benefits:
- Enhanced account security
- Protection against password breaches
- Industry-standard security practice

Important: Keep backup codes safe and don't share your authenticator app.

Best regards,
Akibeks Security Team
    `;

    return { subject, html, text };
  }

  private createPasswordResetTemplate(otp: string, userName: string, expiryMinutes: number, ipAddress?: string): OTPTemplate {
    const subject = 'Password Reset Verification - Akibeks Engineering Solutions';
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; }
          .otp-container { background: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace; }
          .otp-label { font-size: 14px; margin-bottom: 10px; opacity: 0.9; }
          .security-alert { background: #fef2f2; color: #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; }
          .reset-steps { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🔑 AKIBEKS</div>
          <div>Password Reset Request</div>
        </div>
        
        <div class="content">
          <h1>Reset Your Password</h1>
          <p>Hello ${userName},</p>
          <p>We received a request to reset your Akibeks Engineering Solutions account password. Use the verification code below to proceed:</p>
          
          <div class="otp-container">
            <div class="otp-label">Password Reset Code</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>This code will expire in ${expiryMinutes} minutes.</strong></p>
          
          <div class="reset-steps">
            <h3>🔄 Next Steps</h3>
            <ol>
              <li>Return to the password reset page</li>
              <li>Enter this verification code</li>
              <li>Create a new, strong password</li>
              <li>Confirm your new password</li>
            </ol>
          </div>
          
          ${ipAddress ? `
          <p><strong>Request Details:</strong></p>
          <ul>
            <li>Time: ${new Date().toLocaleString()}</li>
            <li>IP Address: ${ipAddress}</li>
          </ul>
          ` : ''}
          
          <div class="security-alert">
            <strong>🚨 Security Alert:</strong> If you didn't request this password reset:
            <ul>
              <li>Do NOT use this verification code</li>
              <li>Your current password is still secure</li>
              <li>Consider enabling 2FA for extra protection</li>
              <li>Contact our security team if you're concerned</li>
            </ul>
          </div>
          
          <p><strong>Password Security Tips:</strong></p>
          <ul>
            <li>Use at least 12 characters</li>
            <li>Include uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid personal information</li>
            <li>Don't reuse passwords from other accounts</li>
            <li>Consider using a password manager</li>
          </ul>
          
          <p>If you need assistance, our support team is here to help.</p>
          
          <p>Best regards,<br>
          <strong>The Akibeks Security Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>Akibeks Engineering Solutions</strong></p>
          <p>Protecting Your Digital Infrastructure</p>
          <p>This is an automated security message. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `;

    const text = `
AKIBEKS ENGINEERING SOLUTIONS - Password Reset

Hello ${userName},

Reset your account password with this verification code:

VERIFICATION CODE: ${otp}

This code expires in ${expiryMinutes} minutes.

Next Steps:
1. Return to password reset page
2. Enter this verification code
3. Create a new, strong password
4. Confirm your new password

${ipAddress ? `Request from IP: ${ipAddress} at ${new Date().toLocaleString()}` : ''}

If you didn't request this reset, ignore this email and your password remains secure.

Password Tips:
- Use 12+ characters
- Mix uppercase, lowercase, numbers, symbols
- Avoid personal information
- Don't reuse passwords

Best regards,
Akibeks Security Team
    `;

    const sms = `Akibeks: Your password reset code is ${otp}. Valid for ${expiryMinutes} minutes. If you didn't request this, ignore this message.`;

    return { subject, html, text, sms };
  }
}

// Export singleton instance
export const otpService = new OTPService();
export default otpService;