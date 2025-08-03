import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

async function createAdminUser() {
  let connection;
  
  try {
    console.log('🌱 Creating admin user...');
    
    connection = await mysql.createConnection(dbConfig);
    
    // Check if admin user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@akibeks.co.ke']
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    // Create admin user
    const adminUuid = uuidv4();
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    const [result] = await connection.execute(
      `INSERT INTO users (
        uuid, email, password_hash, first_name, last_name, 
        role, status, email_verified, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        adminUuid,
        'admin@akibeks.co.ke',
        hashedPassword,
        'Admin',
        'User',
        'admin',
        'active',
        true
      ]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@akibeks.co.ke');
    console.log('🔑 Password: Admin123!');
    console.log('⚠️  Please change the password after first login');

  } catch (error: any) {
    console.error('❌ Failed to create admin user:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the seed
createAdminUser().catch(console.error);