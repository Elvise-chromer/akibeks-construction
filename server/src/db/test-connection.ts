import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Abwaoh132!',
      database: 'akibeks'
    });

    console.log('Connected to MySQL successfully!');

    // Try to create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS akibeks');
    console.log('Database "akibeks" is ready');

    // Test query
    const [rows] = await connection.query('SELECT 1');
    console.log('Test query successful:', rows);

    await connection.end();
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testConnection();
