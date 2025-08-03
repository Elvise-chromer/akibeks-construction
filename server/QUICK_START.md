# Quick Start - Database Migration

## 🚀 One-Command Setup

For a complete database setup with all tables and initial data:

```bash
cd server
npm run db:setup
```

This will:
1. ✅ Test database connection
2. ✅ Create database if it doesn't exist
3. ✅ Run all migrations
4. ✅ Seed initial data (admin user + services)
5. ✅ Verify everything is working

## 📋 Prerequisites

1. **MySQL Server** running
2. **Environment variables** configured in `.env` file
3. **Node.js** installed

## 🔧 Environment Setup

Create `.env` file in the server directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=akibeks_construction
DB_USER=your_username
DB_PASSWORD=your_password

# Connection URLs
DATABASE_URL=mysql://your_username:your_password@localhost:3306/akibeks_construction
DATABASE_URL_UNPOOLED=mysql://your_username:your_password@localhost:3306/akibeks_construction

# Server Configuration
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
```

## 🛠️ Manual Steps (if needed)

### 1. Test Connection
```bash
npm run db:test
```

### 2. Run Migration
```bash
npm run db:migrate
```

### 3. Seed Data
```bash
npm run db:seed
```

### 4. Verify Setup
```bash
npm run db:verify
```

## 🔍 Troubleshooting

### Connection Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Start MySQL if stopped
sudo systemctl start mysql

# Test connection manually
mysql -u your_username -p
```

### Permission Issues
```sql
-- Create user and grant permissions
CREATE USER 'akibeks_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON akibeks_construction.* TO 'akibeks_user'@'localhost';
FLUSH PRIVILEGES;
```

### Reset Database (Development)
```bash
npm run db:reset
npm run db:setup
```

## 🎯 After Setup

1. **Start the server**: `npm run dev`
2. **Access admin panel**: http://localhost:5000/admin
3. **Login credentials**:
   - Email: `admin@akibeks.co.ke`
   - Password: `Admin123!`
4. **Change password** after first login

## 📊 Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:setup` | Complete database setup |
| `npm run db:test` | Test database connection |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed initial data |
| `npm run db:verify` | Verify database setup |
| `npm run db:reset` | Reset database (development) |
| `npm run db:generate` | Generate migration files |
| `npm run db:push` | Push schema changes |

## 🔐 Security Notes

- Change default admin password after first login
- Use strong passwords for database users
- Enable SSL in production
- Regular backups recommended

---

**Need help?** Check the full `DATABASE_MIGRATION_GUIDE.md` for detailed instructions.