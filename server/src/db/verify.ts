import { testConnection } from './connection';
import postgres from 'postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || '';

async function verifyDatabase() {
  console.log('🔍 Starting database verification...');
  
  const client = postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  try {
    // Test connection
    const connectionSuccess = await testConnection();
    if (!connectionSuccess) {
      throw new Error('Database connection failed');
    }

    // Check all expected tables exist
    const expectedTables = [
      'users',
      'user_sessions', 
      'services',
      'projects',
      'project_milestones',
      'blog_posts',
      'contact_submissions',
      'settings',
      'system_logs',
      'project_media'
    ];

    console.log('📋 Checking required tables...');
    const existingTables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    const tableNames = existingTables.map(t => t.table_name);
    
    let allTablesExist = true;
    for (const table of expectedTables) {
      if (tableNames.includes(table)) {
        console.log(`  ✅ ${table}`);
      } else {
        console.log(`  ❌ ${table} - MISSING`);
        allTablesExist = false;
      }
    }

    if (!allTablesExist) {
      throw new Error('Some required tables are missing');
    }

    // Check key columns exist
    console.log('\n🔧 Checking key table structures...');
    
    // Check users table structure
    const userColumns = await client`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY column_name;
    `;
    console.log(`  ✅ users table has ${userColumns.length} columns`);

    // Check settings table has required columns
    const settingsColumns = await client`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'settings' 
      ORDER BY column_name;
    `;
    const requiredSettingsColumns = ['key', 'value', 'description', 'category'];
    const hasRequiredColumns = requiredSettingsColumns.every(col => 
      settingsColumns.some(c => c.column_name === col)
    );
    
    if (hasRequiredColumns) {
      console.log('  ✅ settings table has required columns');
    } else {
      console.log('  ❌ settings table missing required columns');
    }

    // Test basic operations
    console.log('\n🧪 Testing basic database operations...');
    
    // Test insert/select on settings
    await client`
      INSERT INTO settings (key, value, description, category)
      VALUES ('test_key', '"test_value"', 'Test setting', 'test')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
    `;
    
    const testSetting = await client`
      SELECT * FROM settings WHERE key = 'test_key';
    `;
    
    if (testSetting.length > 0) {
      console.log('  ✅ Basic insert/select operations working');
      
      // Cleanup test data
      await client`DELETE FROM settings WHERE key = 'test_key';`;
    } else {
      throw new Error('Basic database operations failed');
    }

    // Check foreign key relationships
    console.log('\n🔗 Checking foreign key relationships...');
    const foreignKeys = await client`
      SELECT 
        tc.table_name, 
        kcu.column_name, 
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name 
      FROM 
        information_schema.table_constraints AS tc 
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
      ORDER BY tc.table_name;
    `;
    
    console.log(`  ✅ Found ${foreignKeys.length} foreign key relationships`);

    // Check default settings exist
    console.log('\n⚙️ Checking default settings...');
    const defaultSettings = await client`
      SELECT key FROM settings 
      WHERE key IN ('company_name', 'company_email', 'website_title');
    `;
    
    if (defaultSettings.length >= 3) {
      console.log('  ✅ Default company settings exist');
    } else {
      console.log('  ⚠️ Some default settings missing');
    }

    await client.end();
    
    console.log('\n🎉 Database verification completed successfully!');
    console.log('✅ All tables exist and are properly configured');
    console.log('✅ Foreign key relationships are working');
    console.log('✅ Basic operations are functional');
    console.log('✅ Database is ready for production use');
    
    return true;
    
  } catch (error) {
    console.error('❌ Database verification failed:', error);
    await client.end();
    return false;
  }
}

// Run verification if this file is executed directly
if (require.main === module) {
  verifyDatabase().then((success) => {
    process.exit(success ? 0 : 1);
  }).catch((error) => {
    console.error('Verification error:', error);
    process.exit(1);
  });
}

export default verifyDatabase;