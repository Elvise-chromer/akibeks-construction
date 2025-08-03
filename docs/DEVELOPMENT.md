# Akibeks Construction - Development Guide

## 🚀 Quick Start (Development)

### Option 1: Frontend Only (Recommended for Demo)
```bash
cd frontend
npm start
```
Visit: http://localhost:3000

### Option 2: Full Stack (Requires PostgreSQL)
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

### Option 3: Both with Concurrently
```bash
npm run dev
```

## 🏗️ What's Been Built

### ✅ Completed Features

#### Frontend (React + TypeScript + TailwindCSS)
- **Modern Responsive Design** with Kenyan localization
- **Hero Slider** with construction project showcases
- **Professional Header** with navigation and contact info
- **Comprehensive Footer** with hidden admin access (5 clicks on logo)
- **Home Page** with services, testimonials, and stats
- **Contact Page** with advanced forms and WhatsApp integration
- **Admin Login** with authentication context
- **Placeholder Pages** for About, Services, Projects, Blog
- **Mobile-First Design** with hamburger menu
- **Kenyan Context**: KSH currency, local phone numbers, Kenya flag

#### Backend (Node.js + TypeScript + PostgreSQL)
- **Express Server** with TypeScript configuration
- **Database Schema** with Drizzle ORM (comprehensive tables)
- **Authentication System** with JWT and bcrypt
- **API Structure** with routes, controllers, middleware
- **File Upload Support** with Multer
- **Email Integration** with Nodemailer
- **Environment Configuration** with dotenv
- **CORS and Security** middleware

#### Database Design
- **Users & Authentication** (admin, manager, user roles)
- **Services Management** (construction services catalog)
- **Projects Portfolio** (with milestones, gallery, timeline)
- **Client Testimonials** (ratings and reviews)
- **Blog System** (posts, categories, SEO)
- **Contact Inquiries** (lead management)
- **Invoice & Quotations** (billing system)
- **File Management** (document storage)
- **Calendar Events** (project scheduling)
- **Team Members** (staff profiles)

### 🔄 In Progress
- Database connection and migrations
- API endpoints implementation
- Admin dashboard functionality

### 📋 Next Phase Features
- Complete admin dashboard
- Project management system
- Invoice generation and PDF export
- Document automation templates
- Calendar integration
- Client portal access
- Advanced project timeline tracking
- WhatsApp API integration
- M-Pesa payment integration

## 🎨 Design System

### Colors (Kenyan Construction Theme)
- **Primary**: Orange (#f97316) - Construction, energy
- **Secondary**: Gray (#64748b) - Professional, modern  
- **Accent**: Green (#10b981) - Growth, success
- **Kenya Integration**: Subtle flag colors throughout

### Typography
- **Poppins**: Display font for headings
- **Inter**: Body text font
- **Responsive**: Mobile-first approach

### Components
- Custom button classes (btn-primary, btn-secondary, btn-outline)
- Card components with hover effects
- Form inputs with validation
- Responsive navigation system

## 🔐 Admin Access

### Demo Credentials
- **URL**: http://localhost:3000/admin
- **Email**: admin@akibeks.co.ke  
- **Password**: admin123

### Hidden Access
- Click footer logo 5 times for admin access
- Secure authentication with JWT tokens

## 📱 Mobile Features

- **WhatsApp Integration**: Floating button and contact links
- **Responsive Design**: Works on all device sizes
- **Touch-Friendly**: Optimized for mobile interaction
- **Fast Loading**: Optimized images and performance

## 🇰🇪 Kenyan Localization

### Business Context
- **Currency**: All prices in Kenyan Shillings (KSH)
- **Location**: References to Nairobi, Kiambu, Westlands
- **Phone Numbers**: Kenyan format (+254)
- **Business Hours**: Local time zones
- **Regulations**: Kenyan construction standards

### Cultural Elements
- **Language**: Professional English with local context
- **Testimonials**: Kenyan client names and locations
- **Services**: Tailored to Kenyan construction market
- **Pricing**: Competitive rates for local market

## 🛠️ Technical Architecture

### Frontend Stack
```
React 18 + TypeScript
├── TailwindCSS (Styling)
├── Framer Motion (Animations)
├── React Router (Navigation)
├── React Hook Form (Forms)
├── Axios (API Calls)
└── React Icons (Icons)
```

### Backend Stack
```
Node.js + Express + TypeScript
├── Drizzle ORM (Database)
├── PostgreSQL (Database)
├── JWT (Authentication)
├── Multer (File Uploads)
├── Nodemailer (Email)
└── bcryptjs (Password Hashing)
```

### Database Schema
```
Users ─┬─ Projects ─┬─ Milestones
       │            ├─ Invoices
       │            └─ Calendar Events
       ├─ Services
       ├─ Blog Posts
       ├─ Testimonials
       ├─ Inquiries
       ├─ Files
       └─ Settings
```

## 🚀 Deployment Ready

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Domain configured
- [ ] Email SMTP configured
- [ ] File storage configured (AWS S3)
- [ ] Performance optimization
- [ ] SEO meta tags
- [ ] Analytics integration

### Build Commands
```bash
# Frontend production build
cd frontend && npm run build

# Backend production build  
cd backend && npm run build

# Start production server
npm start
```

## 📈 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Static asset caching
- **SEO**: Meta tags and structured data

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Form and API validation
- **CORS Configuration**: Cross-origin security
- **File Upload Limits**: Security restrictions
- **SQL Injection Protection**: ORM-based queries

## 📞 Support & Contact

- **Email**: support@akibeks.co.ke
- **Phone**: +254 700 123 456
- **WhatsApp**: Direct integration throughout site
- **Location**: Kiambu Road, Nairobi, Kenya

---

**🇰🇪 Built with pride in Kenya for Akibeks Construction Ltd**