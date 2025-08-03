import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiTool, FiEdit, FiLayers, FiCheckCircle, FiArrowRight, FiStar, FiClock } from 'react-icons/fi';

const RenovationServices: React.FC = () => {
  const services = [
    {
      icon: FiHome,
      title: "Kitchen Renovations",
      description: "Transform your kitchen into a modern, functional space that enhances your daily life",
      features: ["Custom cabinetry design", "Modern appliance integration", "Countertop selection & installation", "Lighting & electrical updates"]
    },
    {
      icon: FiTool,
      title: "Bathroom Remodeling",
      description: "Create luxurious, spa-like bathrooms with contemporary fixtures and finishes",
      features: ["Tile & flooring installation", "Fixture upgrades", "Vanity & storage solutions", "Accessibility improvements"]
    },
    {
      icon: FiEdit,
      title: "Interior Makeovers",
      description: "Refresh your living spaces with new layouts, finishes, and design elements",
      features: ["Wall modifications", "Flooring replacement", "Paint & finishes", "Built-in storage solutions"]
    },
    {
      icon: FiLayers,
      title: "Exterior Renovations",
      description: "Enhance curb appeal and structural integrity with exterior improvements",
      features: ["Roof replacement & repair", "Siding & exterior finishes", "Window & door upgrades", "Landscaping integration"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Design Consultation",
      description: "Meet with our design team to discuss your vision, needs, and budget"
    },
    {
      step: "02", 
      title: "Planning & Design",
      description: "Create detailed plans, 3D renderings, and material selections"
    },
    {
      step: "03",
      title: "Permits & Preparation",
      description: "Handle all necessary permits and prepare the space for renovation"
    },
    {
      step: "04",
      title: "Renovation Execution",
      description: "Execute the renovation with minimal disruption to your daily routine"
    }
  ];

  const renovationTypes = [
    {
      title: "Residential Renovations",
      items: ["Single-family homes", "Condominiums", "Townhouses", "Historic home restoration"]
    },
    {
      title: "Commercial Renovations", 
      items: ["Office space updates", "Retail store makeovers", "Restaurant renovations", "Medical office improvements"]
    },
    {
      title: "Specialty Projects",
      items: ["Accessibility modifications", "Energy efficiency upgrades", "Smart home integration", "Sustainable renovations"]
    }
  ];

  const benefits = [
    {
      icon: FiStar,
      title: "Increased Property Value",
      description: "Professional renovations can significantly increase your property's market value"
    },
    {
      icon: FiClock,
      title: "Faster Than New Construction",
      description: "Renovations typically take less time than building new, getting you results faster"
    },
    {
      icon: FiHome,
      title: "Improved Functionality",
      description: "Update your space to better meet your current lifestyle and needs"
    },
    {
      icon: FiLayers,
      title: "Energy Efficiency",
      description: "Incorporate modern, energy-efficient systems and materials"
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
              Renovation & Remodeling Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Transform your space with our expert renovation and remodeling services
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
                Get Renovation Quote
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                View Renovation Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Renovation Specializations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From kitchen makeovers to complete home transformations, we bring your renovation dreams to life with quality craftsmanship and attention to detail.
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
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <service.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Renovation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined approach that minimizes disruption while maximizing results for your renovation project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl font-bold text-primary-600 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FiArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Renovation Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Renovations We Handle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether residential or commercial, small updates or major transformations, we have the expertise to handle your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {renovationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{type.title}</h3>
                <ul className="space-y-3">
                  {type.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <FiCheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Renovation Over New Construction?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Renovation offers numerous advantages that make it an attractive option for many property owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Expert Craftsmanship Meets Modern Design
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our renovation team combines traditional building skills with contemporary design sensibilities to create spaces that are both beautiful and functional.
              </p>
              <div className="space-y-4">
                {[
                  "Licensed and insured professionals",
                  "Quality materials and finishes",
                  "Detailed project management",
                  "Clean, organized work sites",
                  "Transparent communication throughout",
                  "Warranty on all workmanship"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Renovation Ideas</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Open Floor Plans</h4>
                  <p className="text-gray-600">Remove walls to create spacious, connected living areas</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Home Integration</h4>
                  <p className="text-gray-600">Add automation, security, and energy management systems</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Sustainable Upgrades</h4>
                  <p className="text-gray-600">Eco-friendly materials and energy-efficient improvements</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Outdoor Living Spaces</h4>
                  <p className="text-gray-600">Extend your living area with patios, decks, and outdoor kitchens</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Let's discuss your renovation ideas and create a plan that brings your vision to life within your budget and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Request Free Consultation
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RenovationServices;