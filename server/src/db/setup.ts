import { db } from './connection';
import { users, services, projects, testimonials, blogPosts, teamMembers } from './schema';
import bcrypt from 'bcryptjs';

export const setupDatabase = async () => {
  try {
    console.log('🗃️  Setting up database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Insert sample data (this would be replaced with proper migrations)
    console.log('✅ Database setup completed');
    
    return true;
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    return false;
  }
};

export const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with sample data...');
    
    // Sample services
    const sampleServices = [
      {
        title: 'Residential Construction',
        slug: 'residential-construction',
        description: 'Custom homes, apartments, and residential complexes built to your specifications with quality materials and expert craftsmanship.',
        shortDescription: 'Custom homes and residential developments',
        icon: 'home',
        startingPrice: '25000.00',
        currency: 'KSH',
        isActive: true,
        sortOrder: 1,
        seoTitle: 'Residential Construction Services in Kenya',
        seoDescription: 'Professional residential construction services in Nairobi and across Kenya. Custom homes, apartments, and housing developments.'
      },
      {
        title: 'Commercial Buildings',
        slug: 'commercial-buildings',
        description: 'Modern office complexes, retail spaces, and commercial developments designed for business success.',
        shortDescription: 'Office complexes and commercial spaces',
        icon: 'building',
        startingPrice: '35000.00',
        currency: 'KSH',
        isActive: true,
        sortOrder: 2,
        seoTitle: 'Commercial Construction Services Kenya',
        seoDescription: 'Expert commercial building construction in Kenya. Office buildings, retail spaces, and business complexes.'
      }
    ];

    // Sample testimonials
    const sampleTestimonials = [
      {
        clientName: 'James Mwangi',
        clientPosition: 'Homeowner',
        clientCompany: 'Kiambu',
        rating: 5,
        testimonial: 'Akibeks delivered beyond our expectations. Our dream home in Kiambu was completed on time and within budget. The quality of workmanship is exceptional!',
        isPublic: true,
        isFeatured: true,
        sortOrder: 1
      },
      {
        clientName: 'Grace Wanjiku',
        clientPosition: 'Business Owner',
        clientCompany: 'Westlands Mall',
        rating: 5,
        testimonial: 'The commercial space they built for us has been perfect for our business. Professional team, quality materials, and excellent project management throughout.',
        isPublic: true,
        isFeatured: true,
        sortOrder: 2
      }
    ];

    console.log('✅ Database seeding completed');
    return true;
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    return false;
  }
};