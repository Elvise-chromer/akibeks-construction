import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);

const dbConfig = {
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port || '3306'),
  database: dbUrl.pathname.replace('/', ''),
  user: dbUrl.username,
  password: dbUrl.password
};

async function verifyTables() {
  let client;
  try {
    client = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Get all tables
    const [tables] = await client.query(`
      SELECT table_name, table_rows
      FROM information_schema.tables
      WHERE table_schema = ?
    `, [dbConfig.database]);

    console.log('\nTables in database:');
    console.log('------------------');
    for (const table of tables) {
      console.log(`✓ ${table.table_name}`);
      
      // Get table columns
      const [columns] = await client.query(`
        SELECT column_name, column_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = ? AND table_name = ?
      `, [dbConfig.database, table.table_name]);
      
      console.log('  Columns:');
      columns.forEach(col => {
        console.log(`    - ${col.column_name} (${col.column_type})`);
      });
      console.log();
    }

  } catch (error) {
    console.error('Verification failed:', error);
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

verifyTables().catch(console.error);
