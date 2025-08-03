import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiOfficeBuilding as HiBuildingOffice2, 
  HiCog, 
  HiBadgeCheck as HiColorSwatch,
  HiCog as HiWrenchScrewdriver,
  HiShieldCheck,
  HiClock,
  HiCheckCircle,
  HiArrowRight
} from 'react-icons/hi';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: HiHome,
      title: 'Residential Construction',
      description: 'Custom homes, apartments, and residential complexes built to your exact specifications.',
      features: ['Custom Home Design', 'Apartment Complexes', 'Townhouses', 'Luxury Villas'],
      price: 'From KSh 45,000/m²',
      image: '/images/services/residential.jpg',
      link: '/services/residential'
    },
    {
      icon: HiBuildingOffice2,
      title: 'Commercial Buildings',
      description: 'Modern office buildings, retail spaces, and commercial complexes for businesses.',
      features: ['Office Buildings', 'Retail Centers', 'Warehouses', 'Shopping Malls'],
      price: 'From KSh 55,000/m²',
      image: '/images/services/commercial.jpg',
      link: '/services/commercial'
    },
    {
      icon: HiCog,
      title: 'Industrial Construction',
      description: 'Specialized industrial facilities including factories, processing plants, and storage facilities.',
      features: ['Manufacturing Plants', 'Storage Facilities', 'Processing Centers', 'Logistics Hubs'],
      price: 'Quote on Request',
      image: '/images/services/industrial.jpg',
      link: '/services/industrial'
    },
    {
      icon: HiColorSwatch,
      title: 'Interior Design',
      description: 'Complete interior design and fit-out services for residential and commercial spaces.',
      features: ['Space Planning', 'Furniture Selection', 'Lighting Design', 'Complete Fit-out'],
      price: 'From KSh 15,000/m²',
      image: '/images/services/interior.jpg',
      link: '/quote-request'
    },
    {
      icon: HiWrenchScrewdriver,
      title: 'Renovations & Extensions',
      description: 'Transform your existing space with professional renovation and extension services.',
      features: ['Home Extensions', 'Kitchen Renovations', 'Bathroom Upgrades', 'Complete Remodeling'],
      price: 'From KSh 25,000/m²',
      image: '/images/services/renovation.jpg',
      link: '/services/renovation'
    },
    {
      icon: HiShieldCheck,
      title: 'Project Management',
      description: 'End-to-end project management ensuring your construction project is delivered on time and budget.',
      features: ['Planning & Design', 'Permit Processing', 'Quality Control', 'Timeline Management'],
      price: '5-10% of Project Value',
      image: '/images/services/management.jpg',
      link: '/quote-request'
    }
  ];

  const specializedServices = [
    {
      title: 'Commercial Construction',
      description: 'Office buildings, retail spaces, and commercial developments',
      icon: HiBuildingOffice2,
      link: '/services/commercial'
    },
    {
      title: 'Industrial Construction', 
      description: 'Manufacturing facilities, warehouses, and processing plants',
      icon: HiCog,
      link: '/services/industrial'
    },
    {
      title: 'Renovation Services',
      description: 'Complete renovation and remodeling solutions',
      icon: HiWrenchScrewdriver,
      link: '/services/renovation'
    },
    {
      title: 'Residential Services',
      description: 'Custom homes and residential developments',
      icon: HiHome,
      link: '/services/residential'
    }
  ];

  const additionalServices = [
    'Architectural Design',
    'Structural Engineering',
    'MEP Systems Installation',
    'Landscaping & Outdoor Spaces',
    'Building Permits & Approvals',
    'Construction Supervision',
    'Material Sourcing',
    'Post-Construction Maintenance'
  ];

  const whyChooseUs = [
    {
      icon: HiCheckCircle,
      title: 'Licensed & Certified',
      description: 'Fully licensed by NCA with all necessary certifications and insurance coverage.'
    },
    {
      icon: HiClock,
      title: 'On-Time Delivery',
      description: '95% of our projects are completed on or ahead of schedule with no compromise on quality.'
    },
    {
      icon: HiShieldCheck,
      title: 'Quality Guarantee',
      description: '2-year comprehensive warranty on all construction work and materials used.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Construction Services
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              From concept to completion, we deliver comprehensive construction solutions 
              tailored to your needs. Experience excellence in every project with Kenya's 
              trusted construction partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote-request"
                className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Get Free Quote
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services Quick Access */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary-800 mb-4">
              Specialized Construction Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our specialized construction expertise across different sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedServices.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group bg-gray-50 hover:bg-primary-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="bg-primary-100 group-hover:bg-primary-200 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                    Learn More
                    <HiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-secondary-800 mb-6">
              Comprehensive Construction Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a full range of construction services, from residential homes to 
              large-scale commercial and industrial projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-secondary-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <service.icon className="h-16 w-16 text-white" />
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <service.icon className="h-12 w-12 text-primary-600 group-hover:opacity-0 transition-opacity duration-300" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-secondary-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-800 mb-3">What's Included:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <HiCheckCircle className="h-4 w-4 text-accent-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Starting from</div>
                      <div className="text-xl font-bold text-primary-600">{service.price}</div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={service.link}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        Learn More
                      </Link>
                      <Link
                        to="/quote-request"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary-800 mb-6">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete construction solutions under one roof
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: HiShieldCheck, title: 'Quality Assurance', desc: 'Rigorous quality control throughout your project' },
              { icon: HiClock, title: 'Project Management', desc: 'Expert coordination from start to finish' },
              { icon: HiCheckCircle, title: 'Maintenance Services', desc: 'Ongoing support for your completed projects' }
            ].map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <service.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-secondary-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-secondary-800 mb-6">
              Why Choose Akibeks Construction?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of working with Kenya's most trusted construction company
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-full mb-6 mx-auto">
                  <reason.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-secondary-800 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-secondary-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6">
              Our Construction Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A systematic approach ensuring quality, efficiency, and client satisfaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Initial meeting to understand your needs and vision' },
              { step: '02', title: 'Design & Planning', description: 'Detailed plans, permits, and project timeline' },
              { step: '03', title: 'Construction', description: 'Expert execution with regular progress updates' },
              { step: '04', title: 'Handover', description: 'Final inspection, completion, and warranty provision' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                <p className="text-gray-300">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Contact us today for a free consultation and quote. Let's bring your vision to life 
            with our expert construction services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote-request"
              className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Free Quote
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;