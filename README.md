# 🏗️ Akibeks Engineering Solutions Website

A comprehensive full-stack web application for Akibeks Engineering Solutions, featuring advanced authentication, client portal, project management, and business analytics.

## ✨ Features Completed

### 🔐 Authentication & Security
- **Complete Authentication System** with peppered, salted, and encrypted passwords
- **Google OAuth Integration** for seamless login
- **Two-Factor Authentication (2FA)** with TOTP and backup codes
- **Email Verification** with beautiful OTP templates
- **Password Reset** with secure OTP flow
- **Session Management** with Redis-backed storage
- **Account Security** with lockout protection and rate limiting
- **Cookie-based Token Management** with automatic refresh

### 🎨 User Interface
- **Responsive Design** with modern UI/UX
- **Akibeks Logo Integration** throughout the site
- **Dark/Light Theme Support**
- **Animated Components** with Framer Motion
- **Toast Notifications** for user feedback
- **Loading States** and error handling

### 🏢 Client Portal
- **Project Dashboard** with real-time progress tracking
- **Document Management** with secure file access
- **Message Center** for client-team communication
- **Project Timeline** and milestone tracking
- **Budget and Financial Overview**
- **Mobile-Responsive Design**

### 📊 Analytics Dashboard
- **Business KPIs** with visual charts
- **Revenue Tracking** and financial metrics
- **Project Performance** analytics
- **Client Statistics** and engagement metrics
- **Interactive Charts** with multiple data views
- **Export Functionality** for reports

### 🛠️ Admin Panel
- **Complete CRUD Operations** for all entities
- **Project Management** with status tracking
- **Team Member Management**
- **Service Portfolio Management**
- **Blog Content Management**
- **User Administration**
- **Audit Logging** for all actions
- **Analytics and Reporting**

### 📧 Communication
- **Contact Form** with SMTP integration
- **Email Templates** for all communications
- **OTP Message Design** with branded templates
- **Notification System** for updates
- **Multi-channel Communication** (Email, SMS ready)

### 🗄️ Data Management
- **PostgreSQL Database** with comprehensive schema
- **Drizzle ORM** for type-safe database operations
- **Database Migrations** for schema management
- **Data Validation** with express-validator
- **File Upload** with compression and optimization

## 🏗️ Architecture

### Frontend (React TypeScript)
```
app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── views/              # Page components
│   │   ├── admin/          # Admin panel pages
│   │   ├── client/         # Client-specific pages
│   │   └── portals/        # Portal applications
│   ├── lib/                # Core libraries and contexts
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Global styles and themes
└── public/                 # Static assets including logo
```

### Backend (Node.js TypeScript)
```
server/
├── src/
│   ├── routes/             # API endpoints
│   │   └── admin/          # Admin-only routes
│   ├── middleware/         # Authentication & security
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   ├── db/                 # Database schema and migrations
│   └── config/             # Configuration management
└── uploads/                # File storage
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- Redis (optional, for sessions)
- SMTP service (for emails)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd akibeks-construction
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Copy example environment file
cp server/.env.example server/.env

# Edit the environment file with your settings
nano server/.env
```

4. **Setup database**
```bash
# Create PostgreSQL database
createdb akibeks_db

# Run migrations
cd server
npm run migrate
```

5. **Start development servers**
```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:app    # Frontend only
npm run dev:server # Backend only
```

6. **Build for production**
```bash
npm run build
```

## 🔧 Configuration

### Required Environment Variables

#### Database
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_HOST`, `REDIS_PORT` - Redis configuration (optional)

#### Authentication
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `PASSWORD_PEPPER` - Additional password security
- `SESSION_SECRET` - Session encryption secret

#### Google OAuth
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - OAuth callback URL

#### Email Configuration
- `SMTP_HOST`, `SMTP_PORT` - SMTP server details
- `SMTP_USER`, `SMTP_PASSWORD` - SMTP credentials
- `SMTP_FROM` - Default from email address

#### Company Information
- `COMPANY_NAME`, `COMPANY_EMAIL` - Company details
- `COMPANY_PHONE`, `COMPANY_ADDRESS` - Contact information

### Optional Features
- File upload and compression
- Rate limiting configuration
- Logging levels and destinations
- Development/production toggles

## 🔒 Security Features

### Password Security
- **Bcrypt Hashing** with configurable rounds
- **Pepper Addition** for extra security layer
- **Salt Generation** per password
- **Strong Password Requirements**

### Session Security
- **Redis-backed Sessions** for scalability
- **Secure Cookie Configuration** 
- **Session Timeout** management
- **CSRF Protection** (ready)

### API Security
- **Rate Limiting** to prevent abuse
- **Request Validation** on all endpoints
- **SQL Injection Protection** with parameterized queries
- **XSS Prevention** with input sanitization

### Account Protection
- **Account Lockout** after failed attempts
- **Email Verification** requirement
- **2FA Support** with backup codes
- **Audit Logging** for all actions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Key Mobile Features
- Touch-friendly navigation
- Optimized forms and inputs
- Compressed images for faster loading
- Progressive Web App ready

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run frontend tests
npm run test:app

# Run backend tests
npm run test:server

# Run with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests** for utilities and services
- **Integration Tests** for API endpoints
- **Component Tests** for React components
- **E2E Tests** for critical user flows

## 📦 Deployment

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set up HTTPS certificates
4. Configure reverse proxy (nginx)
5. Set up monitoring and logging

### Docker Deployment
```bash
# Build Docker image
docker build -t akibeks-app .

# Run with docker-compose
docker-compose up -d
```

## 🔧 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/verify-email` - Email verification

### 2FA Endpoints
- `POST /api/auth/setup-2fa` - Setup 2FA
- `POST /api/auth/verify-2fa-setup` - Verify 2FA setup
- `POST /api/auth/disable-2fa` - Disable 2FA
- `POST /api/auth/verify-2fa-login` - 2FA login verification

### Google OAuth
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback

### Admin APIs
- `GET /api/admin/projects` - List projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

Similar CRUD patterns for:
- Services (`/api/admin/services`)
- Team Members (`/api/admin/team`)
- Blog Posts (`/api/admin/blog`)
- Analytics (`/api/admin/analytics`)

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

## 📄 License

This project is proprietary software developed for Akibeks Engineering Solutions.

## 🆘 Support

For technical support or questions:
- **Email**: support@akibeks.com
- **Phone**: +254 700 123 456
- **Documentation**: [Internal Wiki](./docs/)

## 🔄 Changelog

### Version 2.0.0 (Current)
- ✅ Complete authentication system with 2FA
- ✅ Google OAuth integration
- ✅ Comprehensive client portal
- ✅ Analytics dashboard
- ✅ OTP messaging system
- ✅ Logo integration
- ✅ Mobile responsive design
- ✅ All CRUD operations functional
- ✅ Advanced security features

### Planned Features
- [ ] SMS integration for OTP
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Advanced project timeline visualization
- [ ] Financial reporting module
- [ ] Multi-language support
- [ ] API documentation with Swagger

---

**Built with ❤️ by the Akibeks Engineering Solutions development team**