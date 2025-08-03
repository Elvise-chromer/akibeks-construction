import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get database configuration from environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || 'akibeks';

// Validate required environment variables
if (!DB_PASSWORD) {
  throw new Error('Database password is required. Set DB_PASSWORD environment variable.');
}

// Create the connection URL
const DATABASE_URL = process.env.DATABASE_URL || 
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Create the connection pool
const pool = mysql.createPool({
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Initialize drizzle instance
const db = drizzle(pool, { schema, mode: 'default' });

// Initialize database connection and ensure database exists
export async function initializeDb() {
  try {
    // Create database if it doesn't exist
    const tempPool = await mysql.createConnection({
      host: DB_HOST,
      port: parseInt(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD
    });

    await tempPool.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await tempPool.end();
    
    // Test the connection
    await pool.query('SELECT 1');
    console.log('✅ Database connection successful');
    
    return db;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

// Export the database instance
export { db };

// Graceful shutdown function
export const closeConnection = async () => {
  try {
    if (pool) {
      await pool.end();
      console.log('✅ Database connection closed successfully');
    }
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};