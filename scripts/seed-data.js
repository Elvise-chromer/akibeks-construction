#!/usr/bin/env node
/**
 * AKIBEKS CONSTRUCTION - Seed Data Script
 * Populates the database with realistic test data for development and testing
 */

import postgres from 'postgres';
import fs from 'fs';
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

async function seedDatabase() {
  console.log('🌱 Starting Akibeks Construction Database Seeding...');
  
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

    console.log('🔗 Connected to database');

    // Clear existing seed data (keep admin user)
    console.log('🧹 Cleaning existing seed data...');
    await client`DELETE FROM project_media WHERE id > 0`;
    await client`DELETE FROM projects WHERE id > 0`;
    await client`DELETE FROM contact_submissions WHERE id > 0`;
    await client`DELETE FROM blog_posts WHERE id > 0`;
    await client`DELETE FROM services WHERE id > 0`;
    await client`DELETE FROM user_sessions WHERE id > 0`;
    await client`DELETE FROM system_logs WHERE id > 0`;
    await client`DELETE FROM users WHERE email != 'admin@akibeks.co.ke'`;

    // Hash passwords for test users
    const defaultPassword = await bcrypt.hash('TestUser2024!', 12);

    // 1. SEED USERS
    console.log('👥 Seeding users...');
    const users = await client`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, role, status, email_verified) VALUES
      ('manager@akibeks.co.ke', ${defaultPassword}, 'John', 'Manager', '+254-712-345-678', 'manager', 'active', true),
      ('engineer@akibeks.co.ke', ${defaultPassword}, 'Mary', 'Engineer', '+254-723-456-789', 'user', 'active', true),
      ('client1@example.com', ${defaultPassword}, 'James', 'Mwangi', '+254-734-567-890', 'client', 'active', true),
      ('client2@example.com', ${defaultPassword}, 'Grace', 'Wanjiku', '+254-745-678-901', 'client', 'active', true),
      ('contractor@akibeks.co.ke', ${defaultPassword}, 'David', 'Contractor', '+254-756-789-012', 'user', 'active', true)
      RETURNING id, email, first_name, last_name, role
    `;
    
    console.log(`✅ Created ${users.length} users`);

    // Get user IDs for foreign keys
    const allUsers = await client`SELECT id, email, role FROM users ORDER BY id`;
    const adminUser = allUsers.find(u => u.email === 'admin@akibeks.co.ke');
    const managerUser = allUsers.find(u => u.email === 'manager@akibeks.co.ke');
    const engineerUser = allUsers.find(u => u.email === 'engineer@akibeks.co.ke');

    // 2. SEED SERVICES
    console.log('🏗️ Seeding services...');
    const services = await client`
      INSERT INTO services (title, description, short_description, category, price_range, duration_estimate, features, is_active, display_order) VALUES
      (
        'Residential Construction', 
        'Complete residential building services from foundation to finishing. We specialize in modern homes, traditional houses, and custom designs that meet your family needs and budget.',
        'Complete home building from foundation to finishing',
        'Residential',
        'KES 2M - 15M',
        '6-18 months',
        '["Foundation work", "Structural framing", "Roofing", "Electrical installation", "Plumbing", "Interior finishing", "Landscaping"]'::jsonb,
        true,
        1
      ),
      (
        'Commercial Buildings', 
        'Professional commercial construction including offices, retail spaces, warehouses, and industrial facilities. We ensure compliance with all building codes and regulations.',
        'Office buildings, retail spaces, and commercial facilities',
        'Commercial',
        'KES 5M - 50M',
        '8-24 months',
        '["Site preparation", "Structural engineering", "MEP systems", "Fire safety systems", "Accessibility compliance", "Project management"]'::jsonb,
        true,
        2
      ),
      (
        'Renovation & Remodeling', 
        'Transform your existing space with our comprehensive renovation services. From kitchen remodels to complete home makeovers, we bring new life to old structures.',
        'Kitchen, bathroom, and complete home renovations',
        'Renovation',
        'KES 500K - 5M',
        '2-8 months',
        '["Design consultation", "Permit handling", "Demolition", "Structural modifications", "Modern installations", "Quality finishing"]'::jsonb,
        true,
        3
      ),
      (
        'Infrastructure Development', 
        'Large-scale infrastructure projects including roads, bridges, water systems, and urban development projects. We work with government and private sector clients.',
        'Roads, bridges, water systems, and urban development',
        'Infrastructure',
        'KES 10M - 100M+',
        '12-36 months',
        '["Survey and planning", "Environmental compliance", "Heavy construction", "Utility installation", "Quality assurance", "Project delivery"]'::jsonb,
        true,
        4
      ),
      (
        'Interior Design & Finishing', 
        'Professional interior design services to create beautiful, functional spaces. From concept to completion, we handle all aspects of interior transformation.',
        'Complete interior design and finishing services',
        'Interior',
        'KES 200K - 3M',
        '1-6 months',
        '["Design consultation", "3D visualization", "Material selection", "Furniture procurement", "Installation", "Final styling"]'::jsonb,
        true,
        5
      )
      RETURNING id, title
    `;
    
    console.log(`✅ Created ${services.length} services`);

    // 3. SEED PROJECTS
    console.log('📋 Seeding projects...');
    const projects = await client`
      INSERT INTO projects (
        title, description, status, priority, client_name, client_email, client_phone, 
        start_date, end_date, estimated_cost, actual_cost, location, 
        project_manager_id, created_by
      ) VALUES
      (
        'Mwangi Family Residence',
        'A modern 4-bedroom family home in Kileleshwa with contemporary design, solar installation, and landscaped garden. Includes garage, servants quarters, and rainwater harvesting system.',
        'completed',
        'high',
        'James Mwangi',
        'james.mwangi@example.com',
        '+254-712-123-456',
        '2024-01-15',
        '2024-08-30',
        4500000.00,
        4200000.00,
        'Kileleshwa, Nairobi',
        ${managerUser?.id || adminUser?.id},
        ${adminUser?.id}
      ),
      (
        'Westlands Office Complex',
        'A 6-story commercial office building with basement parking, conference facilities, and modern amenities. LEED certified green building with energy-efficient systems.',
        'in_progress',
        'high',
        'Corporate Properties Ltd',
        'info@corporateproperties.co.ke',
        '+254-720-555-0123',
        '2024-06-01',
        '2025-03-15',
        25000000.00,
        NULL,
        'Westlands, Nairobi',
        ${managerUser?.id || adminUser?.id},
        ${adminUser?.id}
      ),
      (
        'Karen Villa Renovation',
        'Complete renovation of a colonial-style villa including modernization of electrical and plumbing systems, kitchen remodel, and addition of a swimming pool.',
        'planning',
        'medium',
        'Grace Wanjiku',
        'grace.wanjiku@example.com',
        '+254-734-567-890',
        '2024-12-01',
        '2025-05-30',
        2800000.00,
        NULL,
        'Karen, Nairobi',
        ${engineerUser?.id || adminUser?.id},
        ${adminUser?.id}
      ),
      (
        'Machakos County Hospital',
        'Construction of a 100-bed county hospital with emergency services, maternity ward, laboratory, and administrative offices. Includes staff housing and ambulance bay.',
        'bidding',
        'high',
        'Machakos County Government',
        'procurement@machakos.go.ke',
        '+254-700-000-001',
        '2025-02-01',
        '2026-08-31',
        180000000.00,
        NULL,
        'Machakos Town, Machakos County',
        ${managerUser?.id || adminUser?.id},
        ${adminUser?.id}
      ),
      (
        'Nakuru Industrial Park',
        'Development of an industrial park with 10 factory units, shared utilities, waste treatment facility, and administrative complex. Phase 1 of 3.',
        'on_hold',
        'medium',
        'Kenya Industrial Development Corporation',
        'projects@kidc.co.ke',
        '+254-710-000-002',
        '2025-06-01',
        '2027-12-31',
        350000000.00,
        NULL,
        'Nakuru, Nakuru County',
        ${managerUser?.id || adminUser?.id},
        ${adminUser?.id}
      )
      RETURNING id, title, status
    `;
    
    console.log(`✅ Created ${projects.length} projects`);

    // 4. SEED CONTACT SUBMISSIONS
    console.log('📧 Seeding contact submissions...');
    const submissions = await client`
      INSERT INTO contact_submissions (
        name, email, phone, subject, message, service_interest, status, ip_address
      ) VALUES
      (
        'Peter Kiprotich',
        'peter.kiprotich@example.com',
        '+254-722-111-222',
        'House Construction Inquiry',
        'I am planning to build a 3-bedroom house on my plot in Eldoret. Could you provide a quotation and timeline for the project? The plot is 50x100 feet.',
        'Residential Construction',
        'new',
        '192.168.1.100'::inet
      ),
      (
        'Sarah Njeri',
        'sarah.njeri@business.co.ke',
        '+254-733-444-555',
        'Office Renovation Project',
        'We need to renovate our office space in Westlands. The space is approximately 500 square meters and we need modern finishing, new partitions, and updated electrical systems.',
        'Renovation & Remodeling',
        'responded',
        '192.168.1.101'::inet
      ),
      (
        'Michael Ochieng',
        'michael.ochieng@example.com',
        '+254-744-777-888',
        'School Construction',
        'Our community is looking to build a primary school with 8 classrooms, office block, and sanitation facilities. Please send us information about your services.',
        'Commercial Buildings',
        'new',
        '192.168.1.102'::inet
      ),
      (
        'Rachel Wambui',
        'rachel.wambui@example.com',
        '+254-755-999-000',
        'Interior Design Services',
        'I just completed construction of my home and need professional interior design services. The house has 4 bedrooms, living areas, and a modern kitchen.',
        'Interior Design & Finishing',
        'responded',
        '192.168.1.103'::inet
      )
      RETURNING id, name, subject, status
    `;
    
    console.log(`✅ Created ${submissions.length} contact submissions`);

    // 5. SEED BLOG POSTS
    console.log('📝 Seeding blog posts...');
    const blogPosts = await client`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, featured_image, category, tags, status, 
        published_at, author_id, views_count, reading_time, meta_title, meta_description
      ) VALUES
      (
        'Sustainable Building Practices in Kenya',
        'sustainable-building-practices-kenya',
        'Exploring eco-friendly construction methods and materials that are transforming the Kenyan construction industry.',
        'The construction industry in Kenya is rapidly embracing sustainable building practices that not only reduce environmental impact but also provide long-term cost savings for property owners...\n\nKey sustainable practices include:\n\n1. **Solar Energy Integration** - Installing solar panels and solar water heating systems\n2. **Rainwater Harvesting** - Collecting and storing rainwater for non-potable uses\n3. **Local Materials** - Using locally sourced stones, timber, and earth blocks\n4. **Energy-Efficient Design** - Proper orientation, natural ventilation, and daylighting\n5. **Waste Management** - Recycling construction waste and using eco-friendly materials\n\nAt Akibeks Engineering Solutions, we incorporate these practices into every project, ensuring our buildings are not only beautiful but also environmentally responsible.',
        '/images/blog/sustainable-building.jpg',
        'Sustainability',
        '["sustainability", "green building", "eco-friendly", "construction", "kenya"]'::jsonb,
        'published',
        '2024-10-15 09:00:00',
        ${adminUser?.id},
        245,
        5,
        'Sustainable Building Practices in Kenya - Akibeks Construction',
        'Learn about eco-friendly construction methods and sustainable building practices that are transforming the Kenyan construction industry.'
      ),
      (
        'Modern Home Design Trends in Nairobi',
        'modern-home-design-trends-nairobi',
        'Discover the latest architectural and interior design trends shaping modern homes in Nairobi and surrounding areas.',
        'Nairobi homeowners are increasingly embracing modern design trends that blend international styles with local cultural elements...\n\n**Popular Design Trends:**\n\n1. **Open Floor Plans** - Creating seamless flow between living areas\n2. **Large Windows** - Maximizing natural light and garden views\n3. **Neutral Color Palettes** - Using whites, grays, and earth tones\n4. **Indoor-Outdoor Living** - Covered patios and garden integration\n5. **Smart Home Technology** - Automated lighting, security, and climate control\n6. **Local Art Integration** - Featuring Kenyan artists and craftspeople\n\nThese trends reflect a desire for homes that are both contemporary and rooted in Kenyan culture, creating spaces that are functional, beautiful, and uniquely African.',
        '/images/blog/modern-design-trends.jpg',
        'Design',
        '["design", "modern homes", "nairobi", "architecture", "trends"]'::jsonb,
        'published',
        '2024-11-02 14:30:00',
        ${managerUser?.id || adminUser?.id},
        189,
        7,
        'Modern Home Design Trends in Nairobi - Akibeks Construction',
        'Explore the latest architectural and interior design trends shaping modern homes in Nairobi and surrounding areas.'
      ),
      (
        'Construction Project Management Best Practices',
        'construction-project-management-best-practices',
        'Essential project management strategies that ensure successful construction project delivery on time and within budget.',
        'Effective project management is crucial for successful construction projects. Here are the best practices we follow at Akibeks Engineering Solutions...\n\n**Key Management Principles:**\n\n1. **Detailed Planning** - Comprehensive project scope and timeline development\n2. **Budget Control** - Regular cost monitoring and variance analysis\n3. **Quality Assurance** - Regular inspections and quality checkpoints\n4. **Communication** - Regular updates to all stakeholders\n5. **Risk Management** - Identifying and mitigating potential issues\n6. **Resource Optimization** - Efficient allocation of materials and labor\n\nBy following these practices, we consistently deliver projects that meet our clients expectations while maintaining the highest standards of quality and safety.',
        '/images/blog/project-management.jpg',
        'Construction',
        '["project management", "construction", "best practices", "quality", "delivery"]'::jsonb,
        'draft',
        NULL,
        ${engineerUser?.id || adminUser?.id},
        0,
        8,
        'Construction Project Management Best Practices - Akibeks',
        'Learn essential project management strategies that ensure successful construction project delivery on time and within budget.'
      )
      RETURNING id, title, status, views_count
    `;
    
    console.log(`✅ Created ${blogPosts.length} blog posts`);

    // 6. SEED SYSTEM LOGS
    console.log('📊 Seeding system logs...');
    const logs = await client`
      INSERT INTO system_logs (user_id, action, resource_type, resource_id, details, ip_address) VALUES
      (${adminUser?.id}, 'user_login', 'users', ${adminUser?.id.toString()}, '{"login_method": "email", "success": true}'::jsonb, '192.168.1.10'::inet),
      (${managerUser?.id || adminUser?.id}, 'project_created', 'projects', '1', '{"project_name": "Mwangi Family Residence", "estimated_cost": 4500000}'::jsonb, '192.168.1.11'::inet),
      (${adminUser?.id}, 'user_created', 'users', ${(managerUser?.id || adminUser?.id).toString()}, '{"new_user_role": "manager", "created_by": "admin"}'::jsonb, '192.168.1.10'::inet),
      (${managerUser?.id || adminUser?.id}, 'contact_responded', 'contact_submissions', '2', '{"response_method": "email", "response_time_hours": 4}'::jsonb, '192.168.1.11'::inet),
      (${adminUser?.id}, 'blog_published', 'blog_posts', '1', '{"title": "Sustainable Building Practices in Kenya", "category": "Sustainability"}'::jsonb, '192.168.1.10'::inet)
      RETURNING id, action, resource_type
    `;
    
    console.log(`✅ Created ${logs.length} system logs`);

    // 7. UPDATE SETTINGS
    console.log('⚙️ Updating application settings...');
    await client`
      INSERT INTO settings (key, value, type, description, is_public) VALUES
      ('featured_project_id', '1', 'integer', 'ID of the featured project on homepage', true),
      ('testimonials_enabled', 'true', 'boolean', 'Enable testimonials section', true),
      ('blog_posts_per_page', '6', 'integer', 'Number of blog posts per page', false),
      ('contact_auto_response', 'true', 'boolean', 'Send automatic response to contact submissions', false),
      ('google_analytics_id', '', 'string', 'Google Analytics tracking ID', false),
      ('facebook_page_url', 'https://facebook.com/akibeks', 'string', 'Facebook page URL', true),
      ('twitter_handle', '@akibeks_ke', 'string', 'Twitter handle', true),
      ('linkedin_company_url', 'https://linkedin.com/company/akibeks', 'string', 'LinkedIn company page', true)
      ON CONFLICT (key) DO UPDATE SET 
        value = EXCLUDED.value,
        updated_at = NOW()
    `;

    await client.end();
    
    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 SEED DATA SUMMARY:');
    console.log(`   👥 Users: ${users.length + 1} (including admin)`);
    console.log(`   🏗️ Services: ${services.length}`);
    console.log(`   📋 Projects: ${projects.length}`);
    console.log(`   📧 Contact Submissions: ${submissions.length}`);
    console.log(`   📝 Blog Posts: ${blogPosts.length}`);
    console.log(`   📊 System Logs: ${logs.length}`);
    console.log(`   ⚙️ Settings: Updated application configuration`);
    console.log('\n🎉 Your database is now populated with realistic test data!');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase().catch(console.error);