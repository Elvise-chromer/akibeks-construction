# 🚀 Akibeks Construction - Development Setup Guide

Welcome to the Akibeks Construction web application! This guide will help you set up the development environment for our enhanced, security-focused construction management platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **PostgreSQL** (v13 or higher) - [Download here](https://postgresql.org/)

## 🏗️ Project Structure

```
akibeks-construction/
├── frontend/           # Vite + React + TypeScript
├── backend/           # Node.js + Express + TypeScript
├── scripts/          # Build and deployment scripts
├── package.json      # Root package.json for workspace
└── README.md         # Project documentation
```

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd akibeks-construction
```

### 2. Install Dependencies

```bash
npm run install:all
```

This command will install dependencies for the root project, frontend, and backend.

### 3. Environment Setup

#### Frontend Environment
Copy the environment file and configure:
```bash
cp frontend/.env frontend/.env.local
```

Edit `frontend/.env.local` with your configuration:
```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Akibeks Construction
VITE_ENABLE_DEVTOOLS=true
```

#### Backend Environment
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:
```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/akibeks_dev
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in `backend/.env`
3. Run database migrations:
```bash
cd backend
npm run db:migrate
```

### 5. Start Development Servers

```bash
npm run dev
```

This will start:
- Frontend (Vite dev server) at http://localhost:3000
- Backend (Express server) at http://localhost:5000

## 🛠️ Development Commands

### Root Commands (run from project root)

```bash
# Start both frontend and backend
npm run dev

# Build for production
npm run build

# Build production package
npm run build:production

# Type checking
npm run type-check

# Linting
npm run lint

# Clean all builds and dependencies
npm run clean

# Install all dependencies
npm run install:all

# Security audit
npm run security:audit
```

### Frontend Commands (run from frontend/)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Backend Commands (run from backend/)

```bash
# Start development server
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Database migrations
npm run db:migrate

# Generate database schema
npm run db:generate
```

## 🔧 Technology Stack

### Frontend
- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form management
- **React Router** - Client-side routing
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Drizzle ORM** - Database ORM
- **JWT** - Authentication
- **Helmet** - Security headers
- **Rate Limiting** - API protection

## 🔒 Security Features

### Frontend Security
- Content Security Policy (CSP)
- XSS Protection
- CSRF Protection
- Environment variable validation
- Production build security

### Backend Security
- Rate limiting (100 requests/15 minutes)
- Authentication rate limiting (5 attempts/15 minutes)
- Helmet security headers
- XSS sanitization
- HTTP Parameter Pollution protection
- CORS configuration
- Input validation and sanitization

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px-1920px)
- Tablet (768px-1024px)
- Mobile (320px-768px)

## 🚀 Build and Deployment

### Development Build
```bash
npm run build
```

### Production Build
```bash
npm run build:production
```

This creates a `production/` directory with:
- Optimized frontend assets
- Compiled backend code
- Environment templates
- Deployment scripts

### Deployment Options

1. **Traditional Hosting**
   - Upload `production/` contents to your server
   - Configure nginx/apache to serve static files
   - Set up PM2 for process management

2. **Docker Deployment**
   - Dockerfile included for containerization
   - Docker Compose for multi-service setup

3. **Cloud Platforms**
   - Vercel/Netlify for frontend
   - Railway/Heroku for backend

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test
```

## 📊 Performance

### Frontend Optimization
- Code splitting
- Tree shaking
- Asset optimization
- Lazy loading
- Service worker caching

### Backend Optimization
- Compression middleware
- Caching strategies
- Database query optimization
- Connection pooling

## 🐛 Debugging

### Frontend Debugging
- React DevTools extension
- Vite dev server with HMR
- TypeScript error overlay
- Console logging in development

### Backend Debugging
- Detailed error logging
- Request/response logging
- Database query logging
- Health check endpoints

## 📚 Useful Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Express Documentation](https://expressjs.com/)

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port
   lsof -i :3000
   # Kill process
   kill -9 <PID>
   ```

2. **Node modules issues**
   ```bash
   npm run clean
   npm run install:all
   ```

3. **Database connection issues**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Check database credentials

4. **Build failures**
   ```bash
   npm run clean:build
   npm run type-check
   npm run lint
   ```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

This project is proprietary to Akibeks Construction Ltd.

---

For additional help, contact the development team or check the project documentation.