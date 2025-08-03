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

async function testConnection() {
  let connection;
  
  try {
    console.log('🔍 Testing database connection...');
    console.log('📋 Configuration:', {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password ? '***' : 'undefined'
    });

    // Test connection without database first
    const testConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    console.log('✅ Successfully connected to MySQL server');

    // Check if database exists
    const [databases] = await testConnection.execute(
      'SHOW DATABASES LIKE ?',
      [dbConfig.database]
    );

    if (Array.isArray(databases) && databases.length === 0) {
      console.log(`⚠️  Database '${dbConfig.database}' does not exist`);
      console.log('💡 You can create it with:');
      console.log(`   CREATE DATABASE ${dbConfig.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    } else {
      console.log(`✅ Database '${dbConfig.database}' exists`);
    }

    await testConnection.end();

    // Test connection with database
    connection = await mysql.createConnection(dbConfig);
    console.log(`✅ Successfully connected to database '${dbConfig.database}'`);

    // Test basic query
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test successful');

    // Check existing tables
    const [tables] = await connection.execute(
      'SHOW TABLES'
    );

    console.log(`📊 Found ${Array.isArray(tables) ? tables.length : 0} existing tables`);

    if (Array.isArray(tables) && tables.length > 0) {
      console.log('📋 Existing tables:');
      tables.forEach((table: any) => {
        console.log(`   - ${Object.values(table)[0]}`);
      });
    }

    console.log('🎉 Database connection test completed successfully!');
    console.log('🚀 Ready to run migrations');

  } catch (error: any) {
    console.error('❌ Database connection test failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Possible solutions:');
      console.log('   1. Check your database credentials in .env file');
      console.log('   2. Verify the user has proper permissions');
      console.log('   3. Ensure MySQL server is running');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Possible solutions:');
      console.log('   1. Check if MySQL server is running');
      console.log('   2. Verify the host and port in .env file');
      console.log('   3. Try: sudo systemctl start mysql');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Possible solutions:');
      console.log('   1. Create the database first');
      console.log('   2. Check the database name in .env file');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the test
testConnection();
