# Database Migration Guide - Akibeks Construction

## Overview

This guide covers how to set up, migrate, and manage the database for the Akibeks Construction application using Drizzle ORM with MySQL.

## Prerequisites

1. **MySQL Database Server** (version 8.0+ recommended)
2. **Node.js** (version 18+)
3. **Environment Variables** configured

## Environment Setup

### 1. Create `.env` file in the server directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=akibeks_construction
DB_USER=your_username
DB_PASSWORD=your_password

# Connection URLs (for Drizzle)
DATABASE_URL=mysql://your_username:your_password@localhost:3306/akibeks_construction
DATABASE_URL_UNPOOLED=mysql://your_username:your_password@localhost:3306/akibeks_construction

# Server Configuration
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Redis Configuration (for sessions)
REDIS_URL=redis://localhost:6379

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### 2. Create MySQL Database:

```sql
CREATE DATABASE akibeks_construction CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'akibeks_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON akibeks_construction.* TO 'akibeks_user'@'localhost';
FLUSH PRIVILEGES;
```

## Migration Commands

### 1. Generate Migration Files

```bash
# Navigate to server directory
cd server

# Generate migration files from schema changes
npm run db:generate
```

This will create migration files in the `drizzle` directory based on changes in `src/db/schema.ts`.

### 2. Push Schema Changes (Development)

```bash
# Push schema changes directly to database (for development)
npm run db:push
```

### 3. Run Manual Migration

```bash
# Run the comprehensive migration script
npm run db:migrate
```

This runs the `src/db/migrate.ts` script which creates all tables with proper schema.

### 4. Verify Database Connection

```bash
# Test database connection
npm run db:test
```

## Database Schema Overview

### Core Tables

1. **users** - User authentication and profiles
2. **user_sessions** - Session management
3. **activity_logs** - Security auditing
4. **permissions** - Role-based access control
5. **services** - Company services offered
6. **projects** - Construction projects
7. **invoices** - Financial management
8. **quotations** - Project quotations
9. **leads** - Lead management
10. **documents** - File management
11. **calendar_events** - Scheduling system

### Key Features

- **UUID Support** - All tables use UUIDs for external references
- **Timestamps** - Automatic created_at/updated_at tracking
- **Soft Deletes** - Data preservation with deletion flags
- **JSON Fields** - Flexible data storage for complex objects
- **Foreign Keys** - Proper referential integrity
- **Indexes** - Optimized for common queries

## Step-by-Step Migration Process

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit with your database credentials
nano .env
```

### Step 3: Generate Initial Migration

```bash
# Generate migration files
npm run db:generate

# This creates files in drizzle/ directory
```

### Step 4: Run Migration

```bash
# Option 1: Push schema (development)
npm run db:push

# Option 2: Run manual migration (production)
npm run db:migrate
```

### Step 5: Verify Migration

```bash
# Check if tables were created
npm run db:verify
```

## Production Migration

### 1. Backup Existing Data

```bash
# Create database backup
mysqldump -u your_username -p akibeks_construction > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Run Migration in Production

```bash
# Set production environment
export NODE_ENV=production

# Run migration
npm run db:migrate
```

### 3. Verify Production Migration

```bash
# Test connection and schema
npm run db:verify
```

## Rollback Migration

### 1. Manual Rollback

```bash
# Drop specific tables (be careful!)
mysql -u your_username -p akibeks_construction -e "DROP TABLE IF EXISTS table_name;"
```

### 2. Full Database Reset

```bash
# Drop and recreate database
mysql -u your_username -p -e "DROP DATABASE akibeks_construction;"
mysql -u your_username -p -e "CREATE DATABASE akibeks_construction CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migration again
npm run db:migrate
```

## Seed Data

### 1. Create Seed Script

```bash
# Create seed directory
mkdir -p src/db/seeds

# Create seed files
touch src/db/seeds/01-users.ts
touch src/db/seeds/02-services.ts
touch src/db/seeds/03-permissions.ts
```

### 2. Run Seeds

```bash
# Add seed script to package.json
npm run db:seed
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   ```bash
   # Check MySQL service
   sudo systemctl status mysql
   
   # Start MySQL if stopped
   sudo systemctl start mysql
   ```

2. **Access Denied**
   ```bash
   # Check user permissions
   mysql -u root -p -e "SHOW GRANTS FOR 'akibeks_user'@'localhost';"
   ```

3. **Migration Fails**
   ```bash
   # Check logs
   tail -f /var/log/mysql/error.log
   
   # Verify schema
   npm run db:verify
   ```

### Debug Commands

```bash
# Test database connection
npm run db:test

# List all tables
npm run db:list-tables

# Check migration status
npm run db:status
```

## Monitoring and Maintenance

### 1. Database Health Check

```bash
# Check table sizes
mysql -u your_username -p -e "
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'akibeks_construction'
ORDER BY (data_length + index_length) DESC;
"
```

### 2. Performance Monitoring

```bash
# Check slow queries
mysql -u your_username -p -e "SHOW VARIABLES LIKE 'slow_query_log';"

# Check connection count
mysql -u your_username -p -e "SHOW STATUS LIKE 'Threads_connected';"
```

### 3. Backup Strategy

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u your_username -p your_password akibeks_construction > backup_$DATE.sql
gzip backup_$DATE.sql
```

## Security Considerations

1. **Use Strong Passwords** for database users
2. **Limit Database Access** to application server only
3. **Enable SSL** for database connections in production
4. **Regular Backups** with encryption
5. **Monitor Access Logs** for suspicious activity

## Next Steps

After successful migration:

1. **Start the server**: `npm run dev`
2. **Test API endpoints**: Verify all routes work
3. **Create admin user**: Use the registration endpoint
4. **Configure email**: Set up SMTP for notifications
5. **Set up monitoring**: Configure logging and alerts

## Support

For migration issues:

1. Check the logs in `server/logs/`
2. Verify environment variables
3. Test database connection manually
4. Review the schema file for syntax errors
5. Check MySQL error logs

---

**Note**: Always backup your database before running migrations in production!