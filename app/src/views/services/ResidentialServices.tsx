import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiHome, 
  HiShieldCheck, 
  HiClock, 
  HiStar,
  HiCheckCircle,
  HiColorSwatch,
  HiCube,
  HiLightBulb
} from 'react-icons/hi';

const ResidentialServices: React.FC = () => {
  const services = [
    {
      icon: <HiHome className="w-8 h-8" />,
      title: "New Home Construction",
      description: "Complete home building services from foundation to finish, tailored to your vision and lifestyle.",
      features: ["Custom Design", "Quality Materials", "Modern Techniques", "Energy Efficient"],
      price: "From KES 8M"
    },
    {
      icon: <HiColorSwatch className="w-8 h-8" />,
      title: "Home Renovations",
      description: "Transform your existing home with our comprehensive renovation and remodeling services.",
      features: ["Kitchen Remodeling", "Bathroom Upgrades", "Room Additions", "Structural Changes"],
      price: "From KES 2M"
    },
    {
      icon: <HiCube className="w-8 h-8" />,
      title: "Home Extensions",
      description: "Add space and value to your home with professionally designed and built extensions.",
      features: ["Second Stories", "Room Additions", "Garage Extensions", "Outdoor Spaces"],
      price: "From KES 3M"
    },
    {
      icon: <HiLightBulb className="w-8 h-8" />,
      title: "Smart Home Integration",
      description: "Modernize your home with smart technology and automation systems.",
      features: ["Home Automation", "Security Systems", "Energy Management", "Smart Lighting"],
      price: "From KES 500K"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "We meet with you to understand your vision, requirements, and budget constraints."
    },
    {
      step: "2",
      title: "Design & Planning",
      description: "Our architects create detailed plans and 3D visualizations for your approval."
    },
    {
      step: "3",
      title: "Permits & Approvals",
      description: "We handle all necessary permits and regulatory approvals for your project."
    },
    {
      step: "4",
      title: "Construction",
      description: "Our skilled craftsmen bring your vision to life with quality construction."
    },
    {
      step: "5",
      title: "Final Inspection",
      description: "Thorough quality checks and final walkthrough before project handover."
    }
  ];

  const benefits = [
    {
      icon: <HiShieldCheck className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "5-year structural warranty on all new constructions"
    },
    {
      icon: <HiClock className="w-6 h-6" />,
      title: "Timely Delivery",
      description: "95% of projects completed on or before scheduled time"
    },
    {
      icon: <HiStar className="w-6 h-6" />,
      title: "Expert Craftsmanship",
      description: "Certified professionals with decades of experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Residential Construction Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Creating dream homes that combine comfort, style, and functionality for modern Kenyan families
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Free Quote
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Residential Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive construction solutions for your home building and renovation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-primary-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <HiCheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600">{service.price}</span>
                  <Link
                    to="/quote"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-200"
                  >
                    Get Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Construction Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach ensuring quality delivery from concept to completion
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block"></div>
            <div className="space-y-12">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full border-4 border-white z-10 mx-4 md:mx-0">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <div className="w-full md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Residential Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your residential construction needs and turn your vision into reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentialServices;