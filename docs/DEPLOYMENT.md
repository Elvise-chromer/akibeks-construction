# Akibeks Construction - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Linux server (Ubuntu 20.04+ recommended)
- Node.js 18+ and npm
- PostgreSQL 13+
- Nginx (reverse proxy)
- SSL certificate (Let's Encrypt)
- Domain name (e.g., akibeks.co.ke)

## 📋 Deployment Steps

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

### 2. Database Setup
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE akibeks_construction;
CREATE USER akibeks_user WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE akibeks_construction TO akibeks_user;
\q
```

### 3. Application Deployment
```bash
# Clone repository
git clone <repository-url> /var/www/akibeks-construction
cd /var/www/akibeks-construction

# Install dependencies
npm run install:all

# Build applications
npm run build

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with production values
```

### 4. Environment Configuration
```bash
# backend/.env (Production)
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://akibeks_user:secure_password_here@localhost:5432/akibeks_construction

# JWT
JWT_SECRET=your_very_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email (Gmail SMTP example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@akibeks.co.ke
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@akibeks.co.ke
FROM_NAME=Akibeks Construction

# Frontend URL
FRONTEND_URL=https://akibeks.co.ke

# Admin
ADMIN_EMAIL=admin@akibeks.co.ke
ADMIN_PASSWORD=secure_admin_password
```

### 5. PM2 Process Management
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'akibeks-backend',
      cwd: '/var/www/akibeks-construction/backend',
      script: 'dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/log/pm2/akibeks-backend-error.log',
      out_file: '/var/log/pm2/akibeks-backend-out.log',
      log_file: '/var/log/pm2/akibeks-backend.log',
      time: true
    }
  ]
};
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Nginx Configuration
```bash
# Create Nginx site configuration
sudo tee /etc/nginx/sites-available/akibeks.co.ke << EOF
server {
    listen 80;
    server_name akibeks.co.ke www.akibeks.co.ke;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name akibeks.co.ke www.akibeks.co.ke;
    
    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/akibeks.co.ke/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/akibeks.co.ke/privkey.pem;
    
    # SSL Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Root directory for React build
    root /var/www/akibeks-construction/frontend/build;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # API routes to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # File uploads
    location /uploads {
        alias /var/www/akibeks-construction/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # React app - serve static files
    location / {
        try_files \$uri \$uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/akibeks.co.ke /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d akibeks.co.ke -d www.akibeks.co.ke

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 8. Firewall Configuration
```bash
# Configure UFW
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm run install:all
    
    - name: Build applications
      run: npm run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/akibeks-construction
          git pull origin main
          npm run install:all
          npm run build
          pm2 restart akibeks-backend
```

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs akibeks-backend

# Application status
pm2 status
```

### System Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔒 Security Checklist

- [ ] SSL certificate installed and configured
- [ ] Firewall configured (UFW)
- [ ] Database secured with strong passwords
- [ ] JWT secrets are secure and random
- [ ] File upload limits configured
- [ ] Rate limiting implemented
- [ ] Security headers configured in Nginx
- [ ] Regular security updates scheduled
- [ ] Backup strategy implemented
- [ ] Monitoring and alerting configured

## 💾 Backup Strategy

### Database Backup
```bash
# Create backup script
cat > /home/ubuntu/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -h localhost -U akibeks_user akibeks_construction > $BACKUP_DIR/db_backup_$DATE.sql

# File uploads backup
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz /var/www/akibeks-construction/backend/uploads

# Keep only last 30 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
EOF

chmod +x /home/ubuntu/backup-db.sh

# Schedule daily backups
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup-db.sh
```

## 🚀 Performance Optimization

### Nginx Optimization
- Gzip compression enabled
- Static file caching (1 year)
- HTTP/2 enabled
- SSL session caching

### Application Optimization
- PM2 cluster mode for Node.js
- Database connection pooling
- Image optimization
- CDN for static assets (optional)

## 📈 Analytics & SEO

### Google Analytics
Add tracking code to `frontend/public/index.html`

### Search Console
- Submit sitemap.xml
- Monitor search performance
- Fix crawl errors

### SEO Optimization
- Meta tags configured
- Structured data implemented
- XML sitemap generated
- Robots.txt configured

## 📞 Production Support

### Health Checks
- API health endpoint: `https://akibeks.co.ke/api/health`
- Database connectivity monitoring
- SSL certificate expiry monitoring

### Emergency Contacts
- **Technical Support**: support@akibeks.co.ke
- **Emergency**: +254 700 123 456
- **System Admin**: admin@akibeks.co.ke

---

**🇰🇪 Production deployment for Akibeks Construction Ltd**