import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './config/passport';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import hpp from 'hpp';
import { sql } from 'drizzle-orm';
import dotenv from 'dotenv';
import redis from 'redis';
import ConnectRedis from 'connect-redis';
import { initializeDb, closeConnection, db } from './db/connection';

// Import routes
import adminAuthRoutes from './routes/admin/auth';
import adminQuotesRoutes from './routes/admin/quotes';
import adminAnalyticsRoutes from './routes/admin/analytics';
import adminInvoicesRoutes from './routes/admin/invoices';
import adminCompanyRoutes from './routes/admin/company';
import adminProjectsRoutes from './routes/admin/projects';
import adminServicesRoutes from './routes/admin/services';
import adminBlogRoutes from './routes/admin/blog';
import adminTeamRoutes from './routes/admin/team';
import contactRoutes from './routes/contact';
import { auditLog, auditLogRouter } from './middleware/auditLog';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Redis client for session storage (optional)
let redisClient: any = null;
let RedisStore: any = null;

// Initialize Redis if configured
const initializeRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.log('Redis not configured, using memory session store');
    return;
  }
  try {
    if (process.env.REDIS_HOST) {
      redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT || '6379'}/${process.env.REDIS_DB || '0'}`
      });

      redisClient.on('error', (err: any) => console.log('Redis Client Error', err));
      await redisClient.connect();
      RedisStore = ConnectRedis(session);
      
      console.log('✅ Redis connected successfully');
    }
  } catch (error) {
    console.warn('⚠️ Redis connection failed, using memory store:', error);
  }
};

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// Basic middleware
app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.LOG_FORMAT || 'combined'));
}

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Speed limiter
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: 500,
  maxDelayMs: 5000,
});

app.use(limiter);
app.use(speedLimiter);

// Session configuration
const sessionConfig: session.SessionOptions = {
  name: 'akibeks.sid',
  secret: process.env.SESSION_SECRET || 'akibeks-construction-session-secret-2024',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '3600000'),
    sameSite: 'strict',
  },
};

// Request ID middleware
app.use((req: express.Request & { requestId?: string }, res: express.Response, next: express.NextFunction) => {
  req.requestId = Math.random().toString(36).substring(2, 15);
  res.setHeader('X-Request-ID', req.requestId);
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Health check endpoint
app.get('/api/health', async (req: express.Request, res: express.Response) => {
  try {
    let dbStatus: 'connected' | 'disconnected' | 'error' = 'disconnected';
    let dbError: string | null = null;
    
    try {
      await db.execute(sql`SELECT 1 as test`);
      dbStatus = 'connected';
    } catch (error) {
      dbStatus = 'error';
      dbError = error instanceof Error ? error.message : 'Unknown database error';
    }

    let redisStatus: 'connected' | 'disabled' | 'error' = 'disabled';
    if (redisClient) {
      try {
        await redisClient.ping();
        redisStatus = 'connected';
      } catch (error) {
        redisStatus = 'error';
      }
    }

    const isHealthy = dbStatus === 'connected';
    
    res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.APP_VERSION || '2.0.0',
      services: {
        database: dbStatus,
        redis: redisStatus,
        session: 'active',
      },
      ...(dbError && { error: dbError }),
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      services: {
        database: 'error',
        redis: 'unknown',
        session: 'unknown',
      },
    });
  }
});

// API Routes
app.use('/api/auth', adminAuthRoutes);
app.use('/api/admin/quotes', adminQuotesRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);
app.use('/api/admin/audit', auditLogRouter);
app.use(auditLog); // Register after authentication middleware
app.use('/api/admin/invoices', adminInvoicesRoutes);
app.use('/api/admin/company', adminCompanyRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);
app.use('/api/admin/services', adminServicesRoutes);
app.use('/api/admin/blog', adminBlogRoutes);
app.use('/api/admin/team', adminTeamRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request & { requestId?: string }, res: express.Response, next: express.NextFunction) => {
  console.error('[' + (req.requestId || 'no-id') + '] Error:', err);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorResponse = {
    success: false,
    message: isDevelopment ? err.message : 'Internal server error',
    requestId: req.requestId,
    ...(isDevelopment && { stack: err.stack }),
  };
  res.status((err as any).status || 500).json(errorResponse);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// Initialize and start server
const startServer = async () => {
  try {
    // Initialize Redis first
    await initializeRedis();
    
    // Configure session with Redis if available
    if (RedisStore && redisClient) {
      sessionConfig.store = new RedisStore({
        client: redisClient,
        prefix: 'akibeks:sess:',
        ttl: 3600,
      });
    }

    // Initialize session
    app.use(session(sessionConfig));

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Initialize database
    await initializeDb();

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('public'));
      
      // Handle React Router routes
      app.get('*', (req, res) => {
        res.sendFile('index.html', { root: 'public' });
      });
    }

    // Error handling middleware
    app.use((err: any, req: any, res: any, next: any) => {
      console.error(`[${req.requestId}] Error:`, err);
      const isDevelopment = process.env.NODE_ENV === 'development';
      const errorResponse = {
        success: false,
        message: isDevelopment ? err.message : 'Internal server error',
        requestId: req.requestId,
        ...(isDevelopment && { stack: err.stack }),
      };
      res.status(err.status || 500).json(errorResponse);
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl,
      });
    });

    // Start the server
    const server = app.listen(PORT, () => {
      console.log('Server is running on port ' + PORT);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Security: Enhanced with 2FA, sessions, and encryption');
      console.log('Cookies: Secure HTTP-only cookies enabled');
      console.log('Rate limiting:', (process.env.RATE_LIMIT_MAX_REQUESTS || 100) + ' requests per ' + ((parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 60000)) + ' minutes');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('CORS origins:', corsOptions.origin);
        console.log('Redis:', redisClient ? 'Connected' : 'Memory store (no Redis)');
      }
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal: string) => {
      console.log('\nSignal', signal, 'received. Initiating graceful shutdown...');
      
      server.close(async () => {
        try {
          if (redisClient) {
            await redisClient.quit();
            console.log('Redis connection closed');
          }
          await closeConnection();
          console.log('Database connection closed');
          console.log('Server shut down successfully');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

export default app;
