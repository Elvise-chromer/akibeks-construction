# Akibeks Construction Ltd - Website & Management System

A comprehensive, modern construction company website with integrated project management, document automation, and client portal features, specifically designed for the Kenyan construction industry.

![Akibeks Construction](https://img.shields.io/badge/Status-Development-yellow)
![React](https://img.shields.io/badge/Frontend-React%2018-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)

## 🏗️ Project Overview

Akibeks Construction Ltd's website is a full-stack application that serves as both a professional company website and a comprehensive construction project management system. Built with modern technologies and localized for Kenya (KSH currency, local regulations, etc.).

### 🌟 Key Features

#### Public Website
- **Responsive Design**: Modern, mobile-first design optimized for all devices
- **Hero Slider**: Dynamic homepage with construction project showcases
- **Service Catalog**: Detailed construction services with Kenyan pricing (KSH)
- **Project Portfolio**: Interactive gallery with filtering and detailed project views
- **Client Testimonials**: Social proof from satisfied Kenyan clients
- **Blog System**: Industry insights and company updates
- **Contact Forms**: Advanced inquiry forms with WhatsApp integration
- **SEO Optimized**: Meta tags, structured data, and performance optimization

#### Admin Management System
- **Secure Authentication**: JWT-based authentication with role-based access
- **Project Management**: Complete project lifecycle management
- **Client Portal**: Dedicated client access to project updates
- **Invoice & Quotation System**: Automated billing with Kenyan tax compliance
- **Document Automation**: Template-based document generation
- **Calendar Integration**: Project scheduling and milestone tracking
- **File Manager**: Centralized document storage and organization
- **Team Management**: Staff profiles and project assignments

#### Kenyan Localization
- **Currency**: All pricing in Kenyan Shillings (KSH)
- **Regulations**: Compliance with Kenyan construction standards
- **Local Context**: References to Nairobi, Kiambu, and other Kenyan locations
- **Contact Integration**: Kenyan phone numbers and WhatsApp integration
- **Business Registration**: Proper Kenyan business formatting

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for form handling
- **Axios** for API calls
- **React Icons** for iconography

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email services
- **bcryptjs** for password hashing

### Database
- **PostgreSQL** with comprehensive schema
- **Drizzle ORM** for type-safe database queries
- **Automated migrations** and seeding

## 📁 Project Structure

```
akibeks-construction/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── layout/      # Header, Footer, Navigation
│   │   │   ├── ui/          # Buttons, Cards, Forms
│   │   │   └── forms/       # Form components
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin panel pages
│   │   │   └── ...          # Public pages
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── db/              # Database configuration
│   │   └── types/           # TypeScript types
│   ├── uploads/             # File upload directory
│   └── package.json
├── database/                # Database scripts and migrations
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd akibeks-construction
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/akibeks_construction
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb akibeks_construction

# Run migrations (when implemented)
npm run db:migrate
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

### 5. Start Development Servers

#### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

#### Frontend (Terminal 2)
```bash
cd frontend
npm start
```
Website runs on: http://localhost:3000

### 6. Admin Access
- Navigate to http://localhost:3000
- Click the footer logo 5 times to access admin
- Or directly visit: http://localhost:3000/admin
- Demo credentials:
  - Email: admin@akibeks.co.ke
  - Password: admin123

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/akibeks_construction

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📋 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/services` - List construction services
- `GET /api/projects` - List public projects
- `GET /api/blog` - List blog posts
- `POST /api/contact` - Submit contact inquiry

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/projects` - Manage projects
- `GET /api/admin/invoices` - Manage invoices
- `GET /api/admin/calendar` - Calendar events

## 🎨 Design System

### Colors
- **Primary**: Orange tones (#f97316) - Construction/Building theme
- **Secondary**: Gray tones (#64748b) - Professional, modern
- **Accent**: Green tones (#10b981) - Success, growth
- **Kenyan Flag Colors**: Integrated subtly throughout

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (content)
- **Responsive**: Mobile-first design approach

### Components
- Custom button styles (btn-primary, btn-secondary, btn-outline)
- Card components with hover effects
- Form inputs with validation states
- Responsive navigation with mobile menu

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting (to be implemented)
- File upload restrictions
- SQL injection protection via ORM

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Responsive navigation with hamburger menu
- Touch-friendly interface elements
- Optimized images and performance
- WhatsApp integration for mobile users

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

### Environment Setup
- Configure production database
- Set secure JWT secrets
- Configure SMTP for emails
- Set up file storage (AWS S3, etc.)
- Configure domain and SSL

## 📈 Future Enhancements

### Phase 1 (Current)
- ✅ Basic website structure
- ✅ Responsive design
- ✅ Contact forms
- ✅ Admin authentication
- 🔄 Database integration

### Phase 2 (Next)
- [ ] Complete admin dashboard
- [ ] Project management system
- [ ] Invoice generation
- [ ] Document automation
- [ ] Calendar integration

### Phase 3 (Advanced)
- [ ] Client portal
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Payment integration (M-Pesa)
- [ ] WhatsApp API integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Akibeks Construction Ltd.

## 📞 Support

For technical support or questions:
- Email: support@akibeks.co.ke
- Phone: +254 700 123 456
- WhatsApp: [Chat with us](https://wa.me/254700123456)

---

**Built with ❤️ in Kenya 🇰🇪 for Akibeks Construction Ltd**
