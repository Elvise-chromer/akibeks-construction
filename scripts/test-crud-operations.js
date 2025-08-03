#!/usr/bin/env node
/**
 * AKIBEKS CONSTRUCTION - CRUD Operations Test Script
 * Tests all Create, Read, Update, Delete operations for each table
 */

import postgres from 'postgres';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const config = {
  databaseUrl: process.env.DATABASE_URL,
  databaseUrlUnpooled: process.env.DATABASE_URL_UNPOOLED,
};

let testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(testName, success, details = '') {
  testResults.tests.push({ name: testName, success, details });
  if (success) {
    testResults.passed++;
    console.log(`✅ ${testName}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName} - ${details}`);
  }
}

async function testCRUDOperations() {
  console.log('🧪 Starting CRUD Operations Test...');
  
  if (!config.databaseUrl) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  const connectionString = config.databaseUrlUnpooled || config.databaseUrl;
  
  try {
    const client = postgres(connectionString, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });

    console.log('🔗 Connected to database\n');

    // ================================
    // 1. USERS TABLE CRUD TESTS
    // ================================
    console.log('👥 Testing USERS table CRUD operations...');
    
    try {
      // CREATE - Insert a test user
      const hashedPassword = await bcrypt.hash('TestPassword123!', 12);
      const newUsers = await client`
        INSERT INTO users (email, password_hash, first_name, last_name, phone, role, status, email_verified)
        VALUES ('test.crud@example.com', ${hashedPassword}, 'Test', 'User', '+254-700-000-999', 'user', 'active', true)
        RETURNING id, email, first_name, last_name
      `;
      const testUserId = newUsers[0].id;
      logTest('Users CREATE', newUsers.length === 1 && newUsers[0].email === 'test.crud@example.com');

      // READ - Select the user
      const readUsers = await client`SELECT * FROM users WHERE id = ${testUserId}`;
      logTest('Users READ', readUsers.length === 1 && readUsers[0].first_name === 'Test');

      // UPDATE - Update the user
      const updatedUsers = await client`
        UPDATE users SET first_name = 'Updated', last_name = 'TestUser' 
        WHERE id = ${testUserId} 
        RETURNING first_name, last_name
      `;
      logTest('Users UPDATE', updatedUsers[0].first_name === 'Updated' && updatedUsers[0].last_name === 'TestUser');

      // DELETE - Delete the user
      const deletedUsers = await client`DELETE FROM users WHERE id = ${testUserId} RETURNING id`;
      logTest('Users DELETE', deletedUsers.length === 1 && deletedUsers[0].id === testUserId);

    } catch (error) {
      logTest('Users CRUD', false, error.message);
    }

    // ================================
    // 2. SERVICES TABLE CRUD TESTS
    // ================================
    console.log('\n🏗️ Testing SERVICES table CRUD operations...');
    
    try {
      // CREATE
      const newServices = await client`
        INSERT INTO services (title, description, short_description, category, price_range, duration_estimate, features, is_active)
        VALUES ('Test Service', 'Test service description', 'Short test description', 'Test', 'KES 100K - 500K', '1-3 months', '["Test feature 1", "Test feature 2"]'::jsonb, true)
        RETURNING id, title, category
      `;
      const testServiceId = newServices[0].id;
      logTest('Services CREATE', newServices.length === 1 && newServices[0].title === 'Test Service');

      // READ
      const readServices = await client`SELECT * FROM services WHERE id = ${testServiceId}`;
      logTest('Services READ', readServices.length === 1 && readServices[0].category === 'Test');

      // UPDATE
      const updatedServices = await client`
        UPDATE services SET title = 'Updated Test Service', price_range = 'KES 200K - 800K' 
        WHERE id = ${testServiceId} 
        RETURNING title, price_range
      `;
      logTest('Services UPDATE', updatedServices[0].title === 'Updated Test Service');

      // DELETE
      const deletedServices = await client`DELETE FROM services WHERE id = ${testServiceId} RETURNING id`;
      logTest('Services DELETE', deletedServices.length === 1);

    } catch (error) {
      logTest('Services CRUD', false, error.message);
    }

    // ================================
    // 3. PROJECTS TABLE CRUD TESTS
    // ================================
    console.log('\n📋 Testing PROJECTS table CRUD operations...');
    
    try {
      // Get an existing user for foreign key
      const existingUser = await client`SELECT id FROM users LIMIT 1`;
      const userId = existingUser[0].id;

      // CREATE
      const newProjects = await client`
        INSERT INTO projects (title, description, status, priority, client_name, client_email, client_phone, estimated_cost, location, created_by)
        VALUES ('Test Project', 'Test project description', 'planning', 'medium', 'Test Client', 'test@client.com', '+254-700-999-888', 1000000.00, 'Test Location', ${userId})
        RETURNING id, title, status
      `;
      const testProjectId = newProjects[0].id;
      logTest('Projects CREATE', newProjects.length === 1 && newProjects[0].title === 'Test Project');

      // READ
      const readProjects = await client`SELECT * FROM projects WHERE id = ${testProjectId}`;
      logTest('Projects READ', readProjects.length === 1 && readProjects[0].status === 'planning');

      // UPDATE
      const updatedProjects = await client`
        UPDATE projects SET status = 'in_progress', priority = 'high', actual_cost = 950000.00
        WHERE id = ${testProjectId} 
        RETURNING status, priority, actual_cost
      `;
      logTest('Projects UPDATE', updatedProjects[0].status === 'in_progress' && updatedProjects[0].priority === 'high');

      // DELETE
      const deletedProjects = await client`DELETE FROM projects WHERE id = ${testProjectId} RETURNING id`;
      logTest('Projects DELETE', deletedProjects.length === 1);

    } catch (error) {
      logTest('Projects CRUD', false, error.message);
    }

    // ================================
    // 4. CONTACT SUBMISSIONS TABLE CRUD TESTS
    // ================================
    console.log('\n📧 Testing CONTACT_SUBMISSIONS table CRUD operations...');
    
    try {
      // CREATE
      const newSubmissions = await client`
        INSERT INTO contact_submissions (name, email, phone, subject, message, service_interest, status, ip_address)
        VALUES ('Test Contact', 'test.contact@example.com', '+254-712-000-000', 'Test Subject', 'Test message content', 'Test Service', 'new', '192.168.1.200'::inet)
        RETURNING id, name, subject, status
      `;
      const testSubmissionId = newSubmissions[0].id;
      logTest('Contact Submissions CREATE', newSubmissions.length === 1 && newSubmissions[0].name === 'Test Contact');

      // READ
      const readSubmissions = await client`SELECT * FROM contact_submissions WHERE id = ${testSubmissionId}`;
      logTest('Contact Submissions READ', readSubmissions.length === 1 && readSubmissions[0].subject === 'Test Subject');

      // UPDATE
      const updatedSubmissions = await client`
        UPDATE contact_submissions SET status = 'responded', notes = 'Test response notes'
        WHERE id = ${testSubmissionId} 
        RETURNING status, notes
      `;
      logTest('Contact Submissions UPDATE', updatedSubmissions[0].status === 'responded');

      // DELETE
      const deletedSubmissions = await client`DELETE FROM contact_submissions WHERE id = ${testSubmissionId} RETURNING id`;
      logTest('Contact Submissions DELETE', deletedSubmissions.length === 1);

    } catch (error) {
      logTest('Contact Submissions CRUD', false, error.message);
    }

    // ================================
    // 5. BLOG POSTS TABLE CRUD TESTS
    // ================================
    console.log('\n📝 Testing BLOG_POSTS table CRUD operations...');
    
    try {
      // Get an existing user for foreign key
      const existingUser = await client`SELECT id FROM users LIMIT 1`;
      const userId = existingUser[0].id;

      // CREATE
      const newPosts = await client`
        INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, status, author_id, reading_time)
        VALUES ('Test Blog Post', 'test-blog-post', 'Test excerpt', 'Test blog post content', 'Test Category', '["test", "blog"]'::jsonb, 'draft', ${userId}, 3)
        RETURNING id, title, slug, status
      `;
      const testPostId = newPosts[0].id;
      logTest('Blog Posts CREATE', newPosts.length === 1 && newPosts[0].title === 'Test Blog Post');

      // READ
      const readPosts = await client`SELECT * FROM blog_posts WHERE id = ${testPostId}`;
      logTest('Blog Posts READ', readPosts.length === 1 && readPosts[0].slug === 'test-blog-post');

      // UPDATE
      const updatedPosts = await client`
        UPDATE blog_posts SET status = 'published', views_count = 100, published_at = NOW()
        WHERE id = ${testPostId} 
        RETURNING status, views_count
      `;
      logTest('Blog Posts UPDATE', updatedPosts[0].status === 'published' && updatedPosts[0].views_count === 100);

      // DELETE
      const deletedPosts = await client`DELETE FROM blog_posts WHERE id = ${testPostId} RETURNING id`;
      logTest('Blog Posts DELETE', deletedPosts.length === 1);

    } catch (error) {
      logTest('Blog Posts CRUD', false, error.message);
    }

    // ================================
    // 6. SETTINGS TABLE CRUD TESTS
    // ================================
    console.log('\n⚙️ Testing SETTINGS table CRUD operations...');
    
    try {
      // CREATE
      const newSettings = await client`
        INSERT INTO settings (key, value, type, description, is_public)
        VALUES ('test_setting', 'test_value', 'string', 'Test setting description', false)
        RETURNING key, value, type
      `;
      logTest('Settings CREATE', newSettings.length === 1 && newSettings[0].key === 'test_setting');

      // READ
      const readSettings = await client`SELECT * FROM settings WHERE key = 'test_setting'`;
      logTest('Settings READ', readSettings.length === 1 && readSettings[0].value === 'test_value');

      // UPDATE
      const updatedSettings = await client`
        UPDATE settings SET value = 'updated_test_value', description = 'Updated description'
        WHERE key = 'test_setting' 
        RETURNING value, description
      `;
      logTest('Settings UPDATE', updatedSettings[0].value === 'updated_test_value');

      // DELETE
      const deletedSettings = await client`DELETE FROM settings WHERE key = 'test_setting' RETURNING key`;
      logTest('Settings DELETE', deletedSettings.length === 1);

    } catch (error) {
      logTest('Settings CRUD', false, error.message);
    }

    // ================================
    // 7. SYSTEM LOGS TABLE CRUD TESTS
    // ================================
    console.log('\n📊 Testing SYSTEM_LOGS table CRUD operations...');
    
    try {
      // Get an existing user for foreign key
      const existingUser = await client`SELECT id FROM users LIMIT 1`;
      const userId = existingUser[0].id;

             // CREATE
       const newLogs = await client`
         INSERT INTO system_logs (user_id, action, resource_type, resource_id, details, ip_address)
         VALUES (${userId}, 'test_action', 'test_resource', 'test_id', '{"test": true}'::jsonb, '192.168.1.100'::inet)
         RETURNING id, action, resource_type
       `;
      const testLogId = newLogs[0].id;
      logTest('System Logs CREATE', newLogs.length === 1 && newLogs[0].action === 'test_action');

      // READ
      const readLogs = await client`SELECT * FROM system_logs WHERE id = ${testLogId}`;
      logTest('System Logs READ', readLogs.length === 1 && readLogs[0].resource_type === 'test_resource');

      // UPDATE (Note: System logs are typically append-only, but testing update capability)
      const updatedLogs = await client`
        UPDATE system_logs SET details = '{"test": true, "updated": true}'::jsonb
        WHERE id = ${testLogId} 
        RETURNING details
      `;
      logTest('System Logs UPDATE', updatedLogs[0].details.updated === true);

      // DELETE
      const deletedLogs = await client`DELETE FROM system_logs WHERE id = ${testLogId} RETURNING id`;
      logTest('System Logs DELETE', deletedLogs.length === 1);

    } catch (error) {
      logTest('System Logs CRUD', false, error.message);
    }

    // ================================
    // 8. COMPLEX QUERIES AND RELATIONSHIPS
    // ================================
    console.log('\n🔗 Testing complex queries and relationships...');
    
    try {
      // Test JOIN operations
      const projectsWithUsers = await client`
        SELECT p.title, p.status, u.first_name, u.last_name, u.role
        FROM projects p
        JOIN users u ON p.created_by = u.id
        LIMIT 3
      `;
      logTest('JOIN Projects with Users', projectsWithUsers.length > 0 && projectsWithUsers[0].first_name);

      // Test aggregate functions
      const projectStats = await client`
        SELECT 
          COUNT(*) as total_projects,
          AVG(estimated_cost) as avg_cost,
          SUM(estimated_cost) as total_estimated
        FROM projects
        WHERE estimated_cost IS NOT NULL
      `;
      logTest('Aggregate Functions', projectStats.length === 1 && projectStats[0].total_projects > 0);

      // Test JSONB operations
      const servicesWithFeatures = await client`
        SELECT title, features, jsonb_array_length(features) as feature_count
        FROM services
        WHERE features IS NOT NULL
        LIMIT 3
      `;
      logTest('JSONB Operations', servicesWithFeatures.length > 0 && servicesWithFeatures[0].feature_count > 0);

      // Test full-text search (if supported)
      const searchResults = await client`
        SELECT title, excerpt
        FROM blog_posts
        WHERE title ILIKE '%building%' OR content ILIKE '%construction%'
        LIMIT 3
      `;
      logTest('Text Search', searchResults.length >= 0); // Allow 0 results as data might not match

    } catch (error) {
      logTest('Complex Queries', false, error.message);
    }

    await client.end();
    
    // ================================
    // FINAL RESULTS
    // ================================
    console.log('\n' + '='.repeat(60));
    console.log('🧪 CRUD OPERATIONS TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`📊 Total: ${testResults.passed + testResults.failed}`);
    console.log(`🎯 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
    
    if (testResults.failed > 0) {
      console.log('\n❌ Failed Tests:');
      testResults.tests.filter(t => !t.success).forEach(test => {
        console.log(`   - ${test.name}: ${test.details}`);
      });
    }
    
    console.log('\n🎉 CRUD operations testing completed!');
    
    if (testResults.failed === 0) {
      console.log('✅ All database CRUD operations are working correctly!');
      process.exit(0);
    } else {
      console.log('⚠️ Some tests failed. Please review the errors above.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ CRUD testing failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
testCRUDOperations().catch(console.error);