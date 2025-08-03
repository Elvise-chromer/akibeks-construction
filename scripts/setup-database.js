#!/usr/bin/env node
/**
 * AKIBEKS CONSTRUCTION - Simple Database Setup
 * Sets up the database schema using the provided Neon credentials
 */

import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const config = {
  databaseUrl: process.env.DATABASE_URL,
  databaseUrlUnpooled: process.env.DATABASE_URL_UNPOOLED,
  schemaPath: path.join(__dirname, './neon-schema.sql')
};

async function setupDatabase() {
  console.log('🚀 Starting Akibeks Construction Database Setup...');
  console.log('🔗 Database URL configured:', config.databaseUrl ? '✅' : '❌');
  
  if (!config.databaseUrl) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Use the direct connection for schema setup
  const connectionString = config.databaseUrlUnpooled || config.databaseUrl;
  
  try {
    // Test connection
    console.log('🔄 Testing database connection...');
    const client = postgres(connectionString, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });

    const result = await client`SELECT version() as postgres_version`;
    console.log('✅ Database connection successful!');
    console.log('📊 PostgreSQL Version:', result[0].postgres_version);

    // Check if schema file exists
    if (fs.existsSync(config.schemaPath)) {
      console.log('📄 Loading database schema...');
      const schema = fs.readFileSync(config.schemaPath, 'utf8');
      
      console.log('🔧 Executing database schema...');
      await client.unsafe(schema);
      console.log('✅ Database schema executed successfully!');
    } else {
      console.log('⚠️ Schema file not found, creating basic tables...');
      
      // Create basic user table if schema file doesn't exist
      await client`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          uuid UUID DEFAULT gen_random_uuid() NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          phone VARCHAR(20),
          role VARCHAR(50) NOT NULL DEFAULT 'user',
          status VARCHAR(20) NOT NULL DEFAULT 'active',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `;
      console.log('✅ Basic user table created!');
    }

    // Test the setup
    console.log('🧪 Testing database setup...');
    const tables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    console.log('📋 Tables in database:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });

    await client.end();
    console.log('✅ Database setup completed successfully!');
    console.log('🎉 Your Neon database is ready for the Akibeks Construction application!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDatabase().catch(console.error);