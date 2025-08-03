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

async function resetDatabase() {
  let connection;
  
  try {
    console.log('⚠️  WARNING: This will drop all tables and data!');
    console.log('📋 Database:', dbConfig.database);
    
    // Ask for confirmation
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise<string>((resolve) => {
      rl.question('Are you sure you want to reset the database? (yes/no): ', resolve);
    });

    rl.close();

    if (answer.toLowerCase() !== 'yes') {
      console.log('❌ Database reset cancelled');
      return;
    }

    console.log('🔄 Resetting database...');
    
    connection = await mysql.createConnection(dbConfig);

    // Get all table names
    const [tables] = await connection.execute('SHOW TABLES');
    
    if (Array.isArray(tables) && tables.length > 0) {
      console.log(`🗑️  Dropping ${tables.length} tables...`);
      
      // Disable foreign key checks
      await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
      
      // Drop all tables
      for (const table of tables) {
        const tableName = Object.values(table)[0];
        await connection.execute(`DROP TABLE IF EXISTS \`${tableName}\``);
        console.log(`   - Dropped table: ${tableName}`);
      }
      
      // Re-enable foreign key checks
      await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
      
      console.log('✅ All tables dropped successfully');
    } else {
      console.log('ℹ️  No tables found to drop');
    }

    console.log('🎉 Database reset completed!');
    console.log('💡 Run "npm run db:migrate" to recreate tables');
    console.log('💡 Run "npm run db:seed" to add initial data');

  } catch (error: any) {
    console.error('❌ Database reset failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the reset
resetDatabase().catch(console.error);