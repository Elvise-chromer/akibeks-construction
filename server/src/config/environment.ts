import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  
  // Database
  DATABASE_URL: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  // Security
  PASSWORD_PEPPER: z.string().default('akibeks_construction_pepper_2024!@#$%'),
  SESSION_SECRET: z.string().min(32),
  SESSION_MAX_AGE: z.coerce.number().default(24 * 60 * 60 * 1000), // 24 hours
  
  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().default('/api/auth/google/callback'),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  
  // Redis (optional)
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().default(0),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  SMTP_SECURE: z.coerce.boolean().default(false),
  
  // Admin
  ADMIN_EMAIL: z.string().email().optional(),
  SUPER_ADMIN_EMAIL: z.string().email().optional(),
  SUPER_ADMIN_PASSWORD: z.string().optional(),
  SUPER_ADMIN_FIRSTNAME: z.string().optional(),
  SUPER_ADMIN_LASTNAME: z.string().optional(),
  
  // Features
  FEATURE_CONTACT_FORM_SMTP: z.coerce.boolean().default(false),
  CONTACT_FORM_RECIPIENT: z.string().email().optional(),
  
  // File Upload
  UPLOAD_MAX_SIZE: z.coerce.number().default(5 * 1024 * 1024), // 5MB
  UPLOAD_PATH: z.string().default('./uploads'),
  UPLOAD_COMPRESSION_ENABLED: z.coerce.boolean().default(true),
  UPLOAD_COMPRESSION_QUALITY: z.coerce.number().default(80),
  UPLOAD_COMPRESSION_RESIZE_MAX_WIDTH: z.coerce.number().default(1920),
  UPLOAD_COMPRESSION_RESIZE_MAX_HEIGHT: z.coerce.number().default(1080),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  
  // Company
  COMPANY_NAME: z.string().default('Akibeks Engineering Solutions'),
  COMPANY_ADDRESS: z.string().optional(),
  COMPANY_PHONE: z.string().optional(),
  COMPANY_EMAIL: z.string().email().optional(),
  COMPANY_WEBSITE: z.string().url().optional(),
  
  // API Keys
  OPENAI_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

export type EnvironmentConfig = z.infer<typeof envSchema>;

// Validate and export environment
let config: EnvironmentConfig;

try {
  config = envSchema.parse(process.env);
} catch (error) {
  console.error('❌ Environment validation failed:');
  if (error instanceof z.ZodError) {
    console.error(error.issues.map(err => `  - ${err.path.join('.')}: ${err.message}`).join('\n'));
  }
  process.exit(1);
}

// Log configuration status
if (config.NODE_ENV === 'development') {
  console.log('🔧 Environment Configuration:');
  console.log(`  - Node Environment: ${config.NODE_ENV}`);
  console.log(`  - Port: ${config.PORT}`);
  console.log(`  - Database: ${config.DB_NAME}@${config.DB_HOST}:${config.DB_PORT}`);
  console.log(`  - JWT Expiry: ${config.JWT_EXPIRES_IN}`);
  console.log(`  - Google OAuth: ${config.GOOGLE_CLIENT_ID ? '✅' : '❌'}`);
  console.log(`  - Redis: ${config.REDIS_HOST}:${config.REDIS_PORT}`);
  console.log(`  - SMTP: ${config.SMTP_HOST ? '✅' : '❌'}`);
  console.log(`  - File Upload Max Size: ${(config.UPLOAD_MAX_SIZE / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  - Rate Limiting: ${config.RATE_LIMIT_MAX_REQUESTS} requests per ${config.RATE_LIMIT_WINDOW_MS / 1000 / 60} minutes`);
}

export { config };
export default config;