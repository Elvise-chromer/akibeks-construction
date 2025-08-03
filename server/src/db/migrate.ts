import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

if (!dbConfig.database || !dbConfig.user) {
  throw new Error('Database configuration is not complete. Check your .env file.');
}

async function createComprehensiveSchema() {
  let client;
  try {
    client = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Create all tables with proper schema
      await client.query(`
      -- Users table with comprehensive fields
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        
        -- Security fields
        two_fa_enabled BOOLEAN DEFAULT false,
        two_fa_secret VARCHAR(32),
        backup_codes JSON,
        password_reset_token VARCHAR(255),
        password_reset_expires DATETIME,
        email_verification_token VARCHAR(255),
        email_verified BOOLEAN DEFAULT false,
        failed_login_attempts INT DEFAULT 0,
        locked_until DATETIME,
        
        -- OAuth fields
        google_id VARCHAR(255),
        google_access_token VARCHAR(512),
        google_refresh_token VARCHAR(512),
        
        -- Profile fields
        avatar VARCHAR(255),
        timezone VARCHAR(50) DEFAULT 'Africa/Nairobi',
        language VARCHAR(10) DEFAULT 'en',
        preferences JSON,
        
        -- Timestamps
        last_login DATETIME,
        last_password_change DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- User sessions table
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        user_id INT NOT NULL,
        refresh_token VARCHAR(512) NOT NULL UNIQUE,
        ip_address VARCHAR(45),
        user_agent TEXT,
        is_active BOOLEAN DEFAULT true,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- Services table
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        short_description VARCHAR(500),
        icon VARCHAR(100),
        image VARCHAR(255),
        features JSON,
        starting_price DECIMAL(10,2),
        currency VARCHAR(10) DEFAULT 'KSH',
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        seo_title VARCHAR(200),
        seo_description VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- Projects table
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        short_description VARCHAR(500),
        client VARCHAR(200),
        location VARCHAR(200),
        category VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'planning',
        start_date DATETIME,
        end_date DATETIME,
        completion_date DATETIME,
        budget DECIMAL(12,2),
        final_cost DECIMAL(12,2),
        currency VARCHAR(10) DEFAULT 'KSH',
        featured_image VARCHAR(255),
        gallery JSON,
        features JSON,
        challenges TEXT,
        solutions TEXT,
        team_members JSON,
        is_public BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        sort_order INTEGER DEFAULT 0,
        seo_title VARCHAR(200),
        seo_description VARCHAR(500),
        created_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- Project milestones table
      CREATE TABLE IF NOT EXISTS project_milestones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        project_id INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        target_date DATETIME,
        completed_date DATETIME,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        progress INTEGER DEFAULT 0,
        notes TEXT,
        attachments JSON,
        created_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- Blog posts table
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt VARCHAR(500),
        featured_image VARCHAR(255),
        category VARCHAR(100),
        tags JSON,
        author_id INT,
        status VARCHAR(50) NOT NULL DEFAULT 'draft',
        is_public BOOLEAN DEFAULT false,
        is_featured BOOLEAN DEFAULT false,
        published_at DATETIME,
        seo_title VARCHAR(200),
        seo_description VARCHAR(500),
        read_time INTEGER,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- Contact submissions table
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        name VARCHAR(200) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(200),
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        service_type VARCHAR(100),
        project_budget VARCHAR(50),
        timeline VARCHAR(100),
        status VARCHAR(50) NOT NULL DEFAULT 'new',
        priority VARCHAR(20) DEFAULT 'medium',
        assigned_to INT,
        notes TEXT,
        follow_up_date DATETIME,
        source VARCHAR(100) DEFAULT 'website',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // Add missing columns to existing settings table if they don't exist
    try {
      await client.query(`
        ALTER TABLE settings ADD COLUMN IF NOT EXISTS description TEXT;
      `);
      await client.query(`
        ALTER TABLE settings ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';
      `);
      await client.query(`
        ALTER TABLE settings ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
      `);
      await client.query(`
        ALTER TABLE settings ADD COLUMN IF NOT EXISTS updated_by INT;
      `);
      await client.query(`
        ALTER TABLE settings ADD COLUMN IF NOT EXISTS created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
      `);
      await client.query(`
        ALTER TABLE settings ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
      `);
    } catch (error) {
      console.log('Note: Some settings table columns may already exist');
    }

    await client.query(`
      -- System logs table
      CREATE TABLE IF NOT EXISTS system_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        user_id VARCHAR(50),
        action VARCHAR(100) NOT NULL,
        details TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        resource VARCHAR(100),
        resource_id VARCHAR(50),
        success BOOLEAN DEFAULT true,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await client.query(`
      -- Project media table for galleries
      CREATE TABLE IF NOT EXISTS project_media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        project_id INT NOT NULL,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(100) NOT NULL,
        file_size INTEGER NOT NULL,
        caption TEXT,
        sort_order INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        uploaded_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);


    // Create audit_logs table for MySQL
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(36) PRIMARY KEY,
        user_id INT,
        action VARCHAR(255),
        resource_type VARCHAR(100),
        resource_id VARCHAR(100),
        old_values JSON,
        new_values JSON,
        details JSON,
        ip_address VARCHAR(45),
        user_agent VARCHAR(512),
        severity VARCHAR(20) DEFAULT 'info',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);


    // Create settings table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(100) NOT NULL UNIQUE,
        value TEXT NOT NULL,
        description TEXT,
        category VARCHAR(50) DEFAULT 'general',
        is_public BOOLEAN DEFAULT false,
        updated_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // Insert default settings (only if they don't exist)
    await client.query(`
      INSERT IGNORE INTO settings (\`key\`, value)
      VALUES 
        ('company_name', '"Akibeks Engineering Solutions"'),
        ('company_email', '"info@akibeks.com"'),
        ('company_phone', '"+254700000000"'),
        ('company_address', '"Nairobi, Kenya"'),
        ('website_title', '"Akibeks Engineering Solutions"'),
        ('website_description', '"Professional construction and engineering services"');
    `);

    console.log('✅ Comprehensive database schema created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Schema creation failed:', error);
    return false;
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}

async function migrate() {
  console.log('🚀 Starting database migration...');

  try {
    const schemaSuccess = await createComprehensiveSchema();
    if (!schemaSuccess) {
      throw new Error('Schema creation failed');
    }

    console.log('✅ Database migration completed successfully!');
    console.log('🎉 All tables are ready to use with proper relationships.');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  migrate().catch(error => {
    console.error('Migration error:', error);
    process.exit(1);
  });
}

export { migrate as default, createComprehensiveSchema };