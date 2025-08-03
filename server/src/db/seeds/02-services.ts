import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

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
    sortOrder: 1
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
    sortOrder: 2
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
    sortOrder: 3
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
    sortOrder: 4
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
    sortOrder: 5
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
    sortOrder: 6
  }
];

async function seedServices() {
  let connection;
  
  try {
    console.log('🌱 Seeding services...');
    
    connection = await mysql.createConnection(dbConfig);
    
    // Check if services already exist
    const [existingServices] = await connection.execute(
      'SELECT COUNT(*) as count FROM services'
    );
    
    const count = Array.isArray(existingServices) ? existingServices[0]?.count : 0;
    
    if (count > 0) {
      console.log(`⚠️  Services already exist (${count} found)`);
      return;
    }

    // Insert services
    for (const service of services) {
      const serviceUuid = uuidv4();
      
      await connection.execute(
        `INSERT INTO services (
          uuid, title, slug, description, short_description,
          icon, features, starting_price, currency, sort_order,
          is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
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
          true
        ]
      );
      
      console.log(`✅ Added service: ${service.title}`);
    }

    console.log('🎉 Services seeded successfully!');

  } catch (error: any) {
    console.error('❌ Failed to seed services:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the seed
seedServices().catch(console.error);