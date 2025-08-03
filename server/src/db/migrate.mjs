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

    // Create all tables
    
    // Create users table first as it's referenced by other tables
    await client.query(`
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
        two_fa_enabled BOOLEAN DEFAULT false,
        two_fa_secret VARCHAR(32),
        backup_codes JSON,
        password_reset_token VARCHAR(255),
        password_reset_expires DATETIME,
        email_verification_token VARCHAR(255),
        email_verified BOOLEAN DEFAULT false,
        failed_login_attempts INT DEFAULT 0,
        locked_until DATETIME,
        google_id VARCHAR(255),
        google_access_token VARCHAR(512),
        google_refresh_token VARCHAR(512),
        avatar VARCHAR(255),
        timezone VARCHAR(50) DEFAULT 'Africa/Nairobi',
        language VARCHAR(10) DEFAULT 'en',
        preferences JSON,
        last_login DATETIME,
        last_password_change DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // Create quotations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS quotations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        quotation_number VARCHAR(50) NOT NULL UNIQUE,
        client_name VARCHAR(200) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        client_phone VARCHAR(20),
        client_address TEXT,
        project_title VARCHAR(200) NOT NULL,
        project_description TEXT,
        items JSON NOT NULL,
        subtotal DECIMAL(12,2) NOT NULL,
        tax_rate DECIMAL(5,2) DEFAULT 16.00,
        tax_amount DECIMAL(12,2),
        discount DECIMAL(12,2) DEFAULT 0.00,
        total DECIMAL(12,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'KSH',
        valid_until DATETIME NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'draft',
        terms TEXT,
        notes TEXT,
        created_by INT,
        sent_at DATETIME,
        accepted_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      ) ENGINE=InnoDB;
    `);

    // Create invoices table
    await client.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        invoice_number VARCHAR(50) NOT NULL UNIQUE,
        quotation_id INT,
        project_id INT,
        client_name VARCHAR(200) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        client_phone VARCHAR(20),
        client_address TEXT,
        items JSON NOT NULL,
        subtotal DECIMAL(12,2) NOT NULL,
        tax_rate DECIMAL(5,2) DEFAULT 16.00,
        tax_amount DECIMAL(12,2),
        discount DECIMAL(12,2) DEFAULT 0.00,
        total DECIMAL(12,2) NOT NULL,
        amount_paid DECIMAL(12,2) DEFAULT 0.00,
        balance DECIMAL(12,2),
        currency VARCHAR(10) DEFAULT 'KSH',
        due_date DATETIME NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'draft',
        payment_method VARCHAR(100),
        payment_reference VARCHAR(200),
        terms TEXT,
        notes TEXT,
        created_by INT,
        sent_at DATETIME,
        paid_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (quotation_id) REFERENCES quotations(id)
      ) ENGINE=InnoDB;
    `);

    // Create files table
    await client.query(`
      CREATE TABLE IF NOT EXISTS files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size INT NOT NULL,
        path VARCHAR(500) NOT NULL,
        url VARCHAR(500),
        category VARCHAR(100),
        entity_type VARCHAR(100),
        entity_id INT,
        tags JSON,
        description TEXT,
        is_public BOOLEAN DEFAULT false,
        uploaded_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
      ) ENGINE=InnoDB;
    `);

    // Create settings table
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

    // Insert default settings
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

    console.log('✅ Database schema created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Schema creation failed:', error);
    return false;
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (err) {
        console.error('Error closing connection:', err);
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
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate().catch(error => {
  console.error('Migration error:', error);
  process.exit(1);
});
