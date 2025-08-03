import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

async function completeSeed() {
  let connection;
  
  try {
    console.log('🌱 Starting complete database seeding...');
    
    connection = await mysql.createConnection(dbConfig);
    
    // 1. Create Admin User
    console.log('\n1️⃣ Creating admin user...');
    
    // Check if admin user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@akibeks.co.ke']
    );

    let adminId;
    if (Array.isArray(existingUsers) && existingUsers.length === 0) {
      const adminUuid = uuidv4();
      const hashedPassword = await bcrypt.hash('Admin123!', 12);
      
      const [result] = await connection.execute(
        `INSERT INTO users (
          uuid, email, password_hash, first_name, last_name, 
          role, status, email_verified, two_fa_enabled, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          adminUuid,
          'admin@akibeks.co.ke',
          hashedPassword,
          'Admin',
          'User',
          'admin',
          'active',
          true,
          false
        ]
      );

      adminId = (result as any).insertId;
      console.log('✅ Admin user created');
    } else {
      adminId = existingUsers[0].id;
      console.log('⚠️  Admin user already exists');
    }

    // 2. Create Permissions
    console.log('\n2️⃣ Creating permissions...');
    
    const permissions = [
      { name: 'admin_access', description: 'Full administrative access', category: 'admin' },
      { name: 'project_manage', description: 'Manage projects', category: 'project' },
      { name: 'project_view', description: 'View projects', category: 'project' },
      { name: 'invoice_manage', description: 'Manage invoices', category: 'financial' },
      { name: 'invoice_view', description: 'View invoices', category: 'financial' },
      { name: 'quotation_manage', description: 'Manage quotations', category: 'financial' },
      { name: 'quotation_view', description: 'View quotations', category: 'financial' },
      { name: 'user_manage', description: 'Manage users', category: 'admin' },
      { name: 'user_view', description: 'View users', category: 'admin' },
      { name: 'content_manage', description: 'Manage content', category: 'content' },
      { name: 'content_view', description: 'View content', category: 'content' },
      { name: 'analytics_view', description: 'View analytics', category: 'analytics' },
      { name: 'settings_manage', description: 'Manage settings', category: 'admin' },
      { name: 'settings_view', description: 'View settings', category: 'admin' },
      { name: 'lead_manage', description: 'Manage leads', category: 'sales' },
      { name: 'lead_view', description: 'View leads', category: 'sales' },
      { name: 'document_manage', description: 'Manage documents', category: 'content' },
      { name: 'document_view', description: 'View documents', category: 'content' },
      { name: 'calendar_manage', description: 'Manage calendar', category: 'scheduling' },
      { name: 'calendar_view', description: 'View calendar', category: 'scheduling' },
      { name: 'audit_view', description: 'View audit logs', category: 'security' },
      { name: 'security_manage', description: 'Manage security settings', category: 'security' }
    ];

    const permissionIds = {};
    
    for (const permission of permissions) {
      // Check if permission exists
      const [existingPerm] = await connection.execute(
        'SELECT id FROM permissions WHERE name = ?',
        [permission.name]
      );

      if (Array.isArray(existingPerm) && existingPerm.length === 0) {
        // Create permission
        const [permResult] = await connection.execute(
          `INSERT INTO permissions (name, description, category, created_at) 
           VALUES (?, ?, ?, NOW())`,
          [permission.name, permission.description, permission.category]
        );
        permissionIds[permission.name] = (permResult as any).insertId;
        console.log(`✅ Created permission: ${permission.name}`);
      } else {
        permissionIds[permission.name] = existingPerm[0].id;
        console.log(`⚠️  Permission already exists: ${permission.name}`);
      }
    }

    // 3. Grant all permissions to admin user
    console.log('\n3️⃣ Granting permissions to admin user...');
    
    for (const permission of permissions) {
      const permissionId = permissionIds[permission.name];

      // Check if user already has this permission
      const [existingUserPerm] = await connection.execute(
        'SELECT id FROM user_permissions WHERE user_id = ? AND permission_id = ?',
        [adminId, permissionId]
      );

      if (Array.isArray(existingUserPerm) && existingUserPerm.length === 0) {
        // Grant permission
        await connection.execute(
          `INSERT INTO user_permissions (user_id, permission_id, granted_by, granted_at) 
           VALUES (?, ?, ?, NOW())`,
          [adminId, permissionId, adminId]
        );
        console.log(`✅ Granted permission: ${permission.name}`);
      }
    }

    // 4. Create Services
    console.log('\n4️⃣ Creating services...');
    
    const services = [
      {
        title: 'Commercial Construction',
        slug: 'commercial-construction',
        description: 'Modern office buildings, retail spaces, and commercial complexes with sustainable design principles.',
        shortDescription: 'Professional commercial construction services for businesses and organizations.',
        icon: 'HiOfficeBuilding',
        features: JSON.stringify([
          'Office buildings and corporate headquarters',
          'Retail centers and shopping malls',
          'Hotels and hospitality facilities',
          'Mixed-use developments',
          'Sustainable and green building practices'
        ]),
        startingPrice: 5000000,
        currency: 'KSH',
        sortOrder: 1,
        seoTitle: 'Commercial Construction Services - Akibeks Engineering',
        seoDescription: 'Professional commercial construction services in Kenya. Office buildings, retail spaces, and commercial complexes.',
        seoKeywords: 'commercial construction, office buildings, retail construction, Kenya'
      },
      {
        title: 'Residential Construction',
        slug: 'residential-construction',
        description: 'Luxury homes, apartments, and residential complexes with modern amenities.',
        shortDescription: 'Custom residential construction for homes and apartments.',
        icon: 'HiHome',
        features: JSON.stringify([
          'Luxury residential homes',
          'Multi-family apartment complexes',
          'Gated communities',
          'Custom home design and build',
          'Residential renovations and extensions'
        ]),
        startingPrice: 2000000,
        currency: 'KSH',
        sortOrder: 2,
        seoTitle: 'Residential Construction Services - Akibeks Engineering',
        seoDescription: 'Custom residential construction services in Kenya. Luxury homes, apartments, and residential complexes.',
        seoKeywords: 'residential construction, luxury homes, apartments, Kenya'
      },
      {
        title: 'Industrial Construction',
        slug: 'industrial-construction',
        description: 'Heavy industrial facilities, warehouses, and manufacturing plants with advanced engineering.',
        shortDescription: 'Specialized industrial construction and facility development.',
        icon: 'HiCog',
        features: JSON.stringify([
          'Manufacturing plants and factories',
          'Warehouses and distribution centers',
          'Processing facilities',
          'Industrial parks and zones',
          'Specialized industrial equipment installation'
        ]),
        startingPrice: 10000000,
        currency: 'KSH',
        sortOrder: 3,
        seoTitle: 'Industrial Construction Services - Akibeks Engineering',
        seoDescription: 'Industrial construction services in Kenya. Manufacturing plants, warehouses, and industrial facilities.',
        seoKeywords: 'industrial construction, manufacturing plants, warehouses, Kenya'
      },
      {
        title: 'Infrastructure Development',
        slug: 'infrastructure-development',
        description: 'Roads, bridges, utilities, and public infrastructure projects.',
        shortDescription: 'Comprehensive infrastructure development and public works.',
        icon: 'HiLightningBolt',
        features: JSON.stringify([
          'Road and highway construction',
          'Bridge and tunnel projects',
          'Water and sewage systems',
          'Electrical infrastructure',
          'Public works and utilities'
        ]),
        startingPrice: 15000000,
        currency: 'KSH',
        sortOrder: 4,
        seoTitle: 'Infrastructure Development Services - Akibeks Engineering',
        seoDescription: 'Infrastructure development services in Kenya. Roads, bridges, utilities, and public works.',
        seoKeywords: 'infrastructure development, roads, bridges, utilities, Kenya'
      },
      {
        title: 'Renovation Services',
        slug: 'renovation-services',
        description: 'Comprehensive renovation and remodeling services for existing structures.',
        shortDescription: 'Professional renovation and remodeling services.',
        icon: 'HiWrench',
        features: JSON.stringify([
          'Building renovations and upgrades',
          'Interior and exterior remodeling',
          'Structural repairs and reinforcement',
          'Modernization and retrofitting',
          'Historical building restoration'
        ]),
        startingPrice: 1000000,
        currency: 'KSH',
        sortOrder: 5,
        seoTitle: 'Renovation Services - Akibeks Engineering',
        seoDescription: 'Professional renovation and remodeling services in Kenya. Building upgrades and structural repairs.',
        seoKeywords: 'renovation services, remodeling, building upgrades, Kenya'
      },
      {
        title: 'Project Management',
        slug: 'project-management',
        description: 'Comprehensive project management services from planning to completion.',
        shortDescription: 'Expert project management and coordination services.',
        icon: 'HiChartBar',
        features: JSON.stringify([
          'Project planning and scheduling',
          'Cost estimation and budgeting',
          'Quality control and assurance',
          'Risk management',
          'Stakeholder coordination'
        ]),
        startingPrice: 500000,
        currency: 'KSH',
        sortOrder: 6,
        seoTitle: 'Project Management Services - Akibeks Engineering',
        seoDescription: 'Professional project management services in Kenya. Planning, coordination, and execution.',
        seoKeywords: 'project management, construction management, coordination, Kenya'
      }
    ];

    // Check if services already exist
    const [existingServices] = await connection.execute(
      'SELECT COUNT(*) as count FROM services'
    );
    
    const serviceCount = Array.isArray(existingServices) ? existingServices[0]?.count : 0;
    
    if (serviceCount === 0) {
      for (const service of services) {
        const serviceUuid = uuidv4();
        
        await connection.execute(
          `INSERT INTO services (
            uuid, title, slug, description, short_description,
            icon, features, starting_price, currency, sort_order,
            seo_title, seo_description, seo_keywords,
            is_active, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            serviceUuid,
            service.title,
            service.slug,
            service.description,
            service.shortDescription,
            service.icon,
            service.features,
            service.startingPrice,
            service.currency,
            service.sortOrder,
            service.seoTitle,
            service.seoDescription,
            service.seoKeywords,
            true
          ]
        );
        
        console.log(`✅ Added service: ${service.title}`);
      }
    } else {
      console.log(`⚠️  Services already exist (${serviceCount} found)`);
    }

    // 5. Create Sample Projects
    console.log('\n5️⃣ Creating sample projects...');
    
    const sampleProjects = [
      {
        title: 'Nairobi Office Complex',
        description: 'Modern 10-story office complex in Westlands, Nairobi. Features sustainable design, smart building technology, and premium amenities.',
        client: 'Nairobi Business Park Ltd',
        location: 'Westlands, Nairobi',
        budget: 250000000,
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        status: 'ongoing',
        category: 'commercial',
        featuredImage: '/images/projects/nairobi-office-complex.jpg'
      },
      {
        title: 'Luxury Residential Villa',
        description: 'Custom luxury villa in Karen, Nairobi. 5-bedroom design with modern amenities, swimming pool, and landscaped gardens.',
        client: 'Private Client',
        location: 'Karen, Nairobi',
        budget: 45000000,
        startDate: '2024-03-01',
        endDate: '2024-08-31',
        status: 'planning',
        category: 'residential',
        featuredImage: '/images/projects/luxury-villa.jpg'
      },
      {
        title: 'Industrial Warehouse Facility',
        description: 'Large-scale warehouse and distribution center in Mombasa. Includes loading docks, office space, and security systems.',
        client: 'Mombasa Logistics Ltd',
        location: 'Mombasa, Kenya',
        budget: 120000000,
        startDate: '2024-02-01',
        endDate: '2024-07-31',
        status: 'ongoing',
        category: 'industrial',
        featuredImage: '/images/projects/warehouse-facility.jpg'
      }
    ];

    // Check if projects already exist
    const [existingProjects] = await connection.execute(
      'SELECT COUNT(*) as count FROM projects'
    );
    
    const projectCount = Array.isArray(existingProjects) ? existingProjects[0]?.count : 0;
    
    if (projectCount === 0) {
      for (const project of sampleProjects) {
        const projectUuid = uuidv4();
        
        await connection.execute(
          `INSERT INTO projects (
            uuid, title, description, client, location, budget,
            start_date, end_date, status, category, featured_image,
            created_by, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            projectUuid,
            project.title,
            project.description,
            project.client,
            project.location,
            project.budget,
            project.startDate,
            project.endDate,
            project.status,
            project.category,
            project.featuredImage,
            adminId
          ]
        );
        
        console.log(`✅ Added project: ${project.title}`);
      }
    } else {
      console.log(`⚠️  Projects already exist (${projectCount} found)`);
    }

    console.log('\n🎉 Complete database seeding finished successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Admin user: admin@akibeks.co.ke / Admin123!');
    console.log('   ✅ Role: admin');
    console.log('   ✅ Permissions: All admin permissions granted');
    console.log('   ✅ Services: 6 services created');
    console.log('   ✅ Projects: 3 sample projects created');
    console.log('\n🚀 Next steps:');
    console.log('   1. Start the server: npm run dev');
    console.log('   2. Access admin panel: http://localhost:5000/admin');
    console.log('   3. Login with admin credentials');
    console.log('   4. Change the default password');

  } catch (error: any) {
    console.error('❌ Complete seeding failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the complete seed
completeSeed().catch(console.error);