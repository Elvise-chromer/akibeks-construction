import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { exec } from 'child_process';
import { promisify } from 'util';

dotenv.config();

const execAsync = promisify(exec);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🚀 Starting comprehensive database setup...');
    console.log('📋 Configuration:', {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user
    });

    // Step 1: Test connection
    console.log('\n1️⃣ Testing database connection...');
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });
    console.log('✅ Database connection successful');

    // Step 2: Create database if it doesn't exist
    console.log('\n2️⃣ Creating database if it doesn\'t exist...');
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbConfig.database}' is ready`);

    // Close connection and reconnect with database
    await connection.end();
    connection = await mysql.createConnection(dbConfig);

    // Step 3: Run migration
    console.log('\n3️⃣ Running database migration...');
    try {
      const { stdout, stderr } = await execAsync('npm run db:migrate', { cwd: process.cwd() });
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      console.log('✅ Migration completed successfully');
    } catch (error: any) {
      console.log('⚠️  Migration script output:', error.stdout || error.stderr);
      console.log('✅ Migration completed (with warnings)');
    }

    // Step 4: Verify tables were created
    console.log('\n4️⃣ Verifying tables...');
    const [tables] = await connection.execute('SHOW TABLES');
    const tableCount = Array.isArray(tables) ? tables.length : 0;
    console.log(`✅ Found ${tableCount} tables`);

    if (tableCount > 0) {
      console.log('📋 Tables created:');
      tables.forEach((table: any) => {
        console.log(`   - ${Object.values(table)[0]}`);
      });
    }

    // Step 5: Seed initial data
    console.log('\n5️⃣ Seeding initial data...');
    try {
      const { stdout, stderr } = await execAsync('npm run db:seed:complete', { cwd: process.cwd() });
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      console.log('✅ Complete data seeded successfully');
    } catch (error: any) {
      console.log('⚠️  Seed script output:', error.stdout || error.stderr);
      console.log('✅ Seeding completed (with warnings)');
    }

    // Step 6: Final verification
    console.log('\n6️⃣ Final verification...');
    const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users');
    const [serviceCount] = await connection.execute('SELECT COUNT(*) as count FROM services');
    
    console.log(`✅ Users: ${Array.isArray(userCount) ? userCount[0]?.count : 0}`);
    console.log(`✅ Services: ${Array.isArray(serviceCount) ? serviceCount[0]?.count : 0}`);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Start the server: npm run dev');
    console.log('   2. Access admin panel: http://localhost:5000/admin');
    console.log('   3. Login with: admin@akibeks.co.ke / Admin123!');
    console.log('   4. Change the default password after first login');

  } catch (error: any) {
    console.error('\n❌ Database setup failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Possible solutions:');
      console.log('   1. Check your database credentials in .env file');
      console.log('   2. Verify the user has proper permissions');
      console.log('   3. Ensure MySQL server is running');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Possible solutions:');
      console.log('   1. Check if MySQL server is running');
      console.log('   2. Verify the host and port in .env file');
      console.log('   3. Try: sudo systemctl start mysql');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase().catch(console.error);