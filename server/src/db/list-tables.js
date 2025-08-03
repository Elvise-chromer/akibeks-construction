import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function listTables() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    const [rows] = await connection.query('SHOW TABLES');
    console.log('Tables in database:');
    console.log('------------------');
    rows.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`✓ ${tableName}`);
    });
  } finally {
    await connection.end();
  }
}

listTables().catch(console.error);
