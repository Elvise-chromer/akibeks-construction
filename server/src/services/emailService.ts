import nodemailer from 'nodemailer';
import { config } from '../config/environment';

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: any[];
}

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  company?: string;
}

interface TestEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = false;
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    try {
      if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASSWORD) {
        console.warn('⚠️ SMTP configuration incomplete. Email functionality disabled. Please configure SMTP settings in your environment variables.');
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.SMTP_SECURE,
        auth: {
          user: config.SMTP_USER,
          pass: config.SMTP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates in development
        },
      });

      this.isConfigured = true;
      console.log('✅ Email service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      this.isConfigured = false;
    }
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.isConfigured) {
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('✅ SMTP connection verified');
      return true;
    } catch (error) {
      console.error('❌ SMTP connection failed:', error);
      return false;
    }
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.isConfigured) {
      return {
        success: false,
        error: 'Email service not configured'
      };
    }

    try {
      const mailOptions = {
        from: config.SMTP_FROM || config.SMTP_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error: any) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const recipient = config.CONTACT_FORM_RECIPIENT || config.ADMIN_EMAIL;
    
    if (!recipient) {
      return {
        success: false,
        error: 'No contact form recipient configured'
      };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #f97316;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            This message was sent through the Akibeks Engineering Solutions contact form.
            Please respond directly to the sender's email address.
          </p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Contact Information:
Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.company ? `Company: ${data.company}` : ''}

Message:
${data.message}

---
This message was sent through the Akibeks Engineering Solutions contact form.
Please respond directly to the sender's email address.
    `;

    return this.sendEmail({
      to: recipient,
      subject: data.subject || `New Contact Form Submission from ${data.name}`,
      text: textContent,
      html: htmlContent,
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const verificationUrl = `${config.CLIENT_URL}/verify-email?token=${token}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 40px 20px;">
          <h1 style="color: #f97316; margin-bottom: 30px;">Verify Your Email Address</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px;">
            Thank you for registering with Akibeks Engineering Solutions. 
            Please verify your email address by clicking the button below.
          </p>
          
          <a href="${verificationUrl}" 
             style="display: inline-block; background-color: #f97316; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Verify Email Address
          </a>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${verificationUrl}" style="color: #f97316;">${verificationUrl}</a>
          </p>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            This verification link will expire in 24 hours.
          </p>
        </div>
      </div>
    `;

    const textContent = `
Verify Your Email Address

Thank you for registering with Akibeks Engineering Solutions.
Please verify your email address by visiting the following link:

${verificationUrl}

This verification link will expire in 24 hours.

If you didn't request this verification, please ignore this email.
    `;

    return this.sendEmail({
      to: email,
      subject: 'Verify your email address - Akibeks Engineering Solutions',
      text: textContent,
      html: htmlContent,
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const resetUrl = `${config.CLIENT_URL}/reset-password?token=${token}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 40px 20px;">
          <h1 style="color: #f97316; margin-bottom: 30px;">Reset Your Password</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px;">
            We received a request to reset your password for your Akibeks Engineering Solutions account. 
            Click the button below to set a new password.
          </p>
          
          <a href="${resetUrl}" 
             style="display: inline-block; background-color: #f97316; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${resetUrl}" style="color: #f97316;">${resetUrl}</a>
          </p>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            This password reset link will expire in 1 hour.
          </p>
          
          <p style="margin-top: 20px; font-size: 14px; color: #999;">
            If you didn't request a password reset, please ignore this email. 
            Your password will remain unchanged.
          </p>
        </div>
      </div>
    `;

    const textContent = `
Reset Your Password

We received a request to reset your password for your Akibeks Engineering Solutions account.
Visit the following link to set a new password:

${resetUrl}

This password reset link will expire in 1 hour.

If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
    `;

    return this.sendEmail({
      to: email,
      subject: 'Reset your password - Akibeks Engineering Solutions',
      text: textContent,
      html: htmlContent,
    });
  }

  async sendTestEmail(email: string): Promise<TestEmailResult> {
    if (!email) {
      return {
        success: false,
        error: 'Email address is required'
      };
    }

    const result = await this.sendEmail({
      to: email,
      subject: 'Test Email - Akibeks Engineering Solutions',
      text: 'This is a test email to verify SMTP configuration.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #f97316;">Test Email</h2>
          <p>This is a test email to verify SMTP configuration for Akibeks Engineering Solutions.</p>
          <p>If you received this email, the SMTP settings are working correctly.</p>
        </div>
      `,
    });

    return result;
  }

  isEnabled(): boolean {
    return this.isConfigured;
  }

  getConfiguration(): { enabled: boolean; host?: string; port?: number; secure?: boolean } {
    return {
      enabled: this.isConfigured,
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
    };
  }
}

// Create and export singleton instance
const emailService = new EmailService();
export { emailService };
export default emailService;