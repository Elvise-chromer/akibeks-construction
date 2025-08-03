import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { emailService } from '../services/emailService';
import { config } from '../config/environment';

const router = express.Router();

// Rate limiting for contact form
const contactFormLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for test endpoints
const testLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per minute
  message: {
    success: false,
    message: 'Too many test requests, please try again later.'
  },
});

// Contact form validation
const contactFormValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s.-]+$/)
    .withMessage('Name can only contain letters, spaces, dots, and hyphens'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must be less than 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
];

// Submit contact form
router.post('/', contactFormLimit, contactFormValidation, async (req: express.Request, res: express.Response) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message, phone, company } = req.body;

    // Prepare contact form data
    const contactFormData = {
      name,
      email,
      subject: subject || `New contact from ${name}`,
      message,
      phone,
      company
    };

    // Log the contact attempt
    console.log('📧 Processing contact form submission:', {
      name,
      email,
      subject: contactFormData.subject,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    // Send email if service is enabled
    let emailSent = false;
    let emailError = null;

    if (emailService.isEnabled()) {
      try {
        const emailResult = await emailService.sendContactForm(contactFormData);
        emailSent = emailResult.success;
        if (!emailResult.success) {
          emailError = emailResult.error;
          console.error('❌ Email sending failed:', emailResult.error);
        } else {
          console.log('✅ Contact form email sent successfully');
        }
      } catch (error) {
        console.error('❌ Email service error:', error);
        emailError = 'Email service temporarily unavailable';
      }
    } else {
      console.log('📧 Email service disabled - contact form data logged only');
    }

    // Always respond with success to user, regardless of email status
    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        emailSent,
        emailError: emailError || undefined,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const emailConfig = emailService.getConfiguration();
    
    res.json({
      success: true,
      status: 'Contact service is running',
      email: {
        enabled: emailConfig.enabled,
        configured: !!emailConfig.host
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test SMTP connection endpoint (development only)
router.get('/test-smtp', testLimit, async (req, res) => {
  try {
    if (config.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Test endpoints not available in production'
      });
    }

    // Test connection
    const connectionTest = await emailService.verifyConnection();
    
    // Send test email if connection works and email is provided
    const testEmail = req.query.email as string;
    let testEmailResult = null;
    
    if (connectionTest && testEmail) {
      try {
        testEmailResult = await emailService.sendTestEmail(testEmail);
      } catch (error) {
        console.error('Test email failed:', error);
        testEmailResult = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    res.json({
      success: true,
      connection: {
        status: connectionTest ? 'connected' : 'failed',
        timestamp: new Date().toISOString()
      },
      testEmail: testEmailResult,
      config: emailService.getConfiguration()
    });

  } catch (error) {
    console.error('SMTP test error:', error);
    res.status(500).json({
      success: false,
      message: 'SMTP test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get email service status
router.get('/status', async (req, res) => {
  try {
    const smtpTest = await emailService.verifyConnection();
    const config = emailService.getConfiguration();
    
    res.json({
      success: true,
      status: {
        emailEnabled: config.enabled,
        smtpHost: config.host,
        smtpPort: config.port,
        smtpSecure: config.secure,
        connectionStatus: smtpTest ? 'connected' : 'disconnected',
        featuresEnabled: {
          contactForm: true,
          emailNotifications: config.enabled
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get email service status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;