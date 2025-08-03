const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  port: 3306,
  database: 'akibeks_construction',
  user: 'root',
  password: ''
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

    // Create database if it doesn't exist
    await testConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbConfig.database}' is ready`);

    await testConnection.end();

    // Test connection with database
    connection = await mysql.createConnection(dbConfig);
    console.log(`✅ Successfully connected to database '${dbConfig.database}'`);

    // Test basic query
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test successful');

    // Check existing tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Found ${Array.isArray(tables) ? tables.length : 0} existing tables`);

    if (Array.isArray(tables) && tables.length > 0) {
      console.log('📋 Existing tables:');
      tables.forEach((table) => {
        console.log(`   - ${Object.values(table)[0]}`);
      });
    }

    console.log('🎉 Database connection test completed successfully!');
    console.log('🚀 Ready to run migrations');

  } catch (error) {
    console.error('❌ Database connection test failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Possible solutions:');
      console.log('   1. Check your database credentials');
      console.log('   2. Verify the user has proper permissions');
      console.log('   3. Ensure MySQL server is running');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Possible solutions:');
      console.log('   1. Check if MySQL server is running');
      console.log('   2. Verify the host and port');
      console.log('   3. Try: sudo systemctl start mysql');
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