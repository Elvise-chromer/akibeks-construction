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

    // Create admin user with proper role
    const adminUuid = uuidv4();
    const hashedPassword = '$2b$12$L9WHNcx1Rl6SNCPEalc2Q.kKlck4SveW7dQFVDuh2CPj8.tVduw8i'; // Admin123!
    
    const [result] = await connection.execute(
      `INSERT INTO users (
        uuid, email, password_hash, first_name, last_name, 
        role, status, email_verified, two_fa_enabled, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        adminUuid,
        'admin@akibeks.co.ke',
        hashedPassword,
        'Admin',
        'User',
        'admin', // Ensure role is 'admin'
        'active',
        true,
        false // Disable 2FA for initial setup
      ]
    );

    const adminId = (result as any).insertId;

    // Create basic permissions if they don't exist
    const permissions = [
      { name: 'admin_access', description: 'Full administrative access', category: 'admin' },
      { name: 'project_manage', description: 'Manage projects', category: 'project' },
      { name: 'invoice_manage', description: 'Manage invoices', category: 'financial' },
      { name: 'quotation_manage', description: 'Manage quotations', category: 'financial' },
      { name: 'user_manage', description: 'Manage users', category: 'admin' },
      { name: 'content_manage', description: 'Manage content', category: 'content' },
      { name: 'analytics_view', description: 'View analytics', category: 'analytics' },
      { name: 'settings_manage', description: 'Manage settings', category: 'admin' }
    ];

    for (const permission of permissions) {
      // Check if permission exists
      const [existingPerm] = await connection.execute(
        'SELECT id FROM permissions WHERE name = ?',
        [permission.name]
      );

      if (Array.isArray(existingPerm) && existingPerm.length === 0) {
        // Create permission
        await connection.execute(
          `INSERT INTO permissions (name, description, category, created_at) 
           VALUES (?, ?, ?, NOW())`,
          [permission.name, permission.description, permission.category]
        );
        console.log(`✅ Created permission: ${permission.name}`);
      }
    }

    // Grant all permissions to admin user
    for (const permission of permissions) {
      // Get permission ID
      const [permResult] = await connection.execute(
        'SELECT id FROM permissions WHERE name = ?',
        [permission.name]
      );

      if (Array.isArray(permResult) && permResult.length > 0) {
        const permissionId = permResult[0].id;

        // Check if user already has this permission
        const [existingUserPerm] = await connection.execute(
          'SELECT id FROM user_permissions WHERE user_id = ? AND permission_id = ?',
          [adminId, permissionId]
        );

        if (Array.isArray(existingUserPerm) && existingUserPerm.length === 0) {
          // Grant permission
          await connection.execute(
            `INSERT INTO user_permissions (user_id, permission_id, granted_by, granted_at) 
             VALUES (?, ?, ?, NOW())`,
            [adminId, permissionId, adminId]
          );
        }
      }
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@akibeks.co.ke');
    console.log('🔑 Password: Admin123!');
    console.log('👑 Role: admin');
    console.log('🔐 Permissions: All admin permissions granted');
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