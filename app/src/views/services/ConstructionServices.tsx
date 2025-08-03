import React from 'react';
import { motion } from 'framer-motion';
import { HiOfficeBuilding, HiCog, HiLightningBolt, HiShieldCheck, HiUsers, HiChartBar } from 'react-icons/hi';
import SEO from '../../components/SEO';

const ConstructionServices: React.FC = () => {
  const services = [
    {
      title: "Commercial Construction",
      description: "Modern office buildings, retail spaces, and commercial complexes with sustainable design principles.",
      icon: HiOfficeBuilding,
      features: [
        "Office buildings and corporate headquarters",
        "Retail centers and shopping malls",
        "Hotels and hospitality facilities",
        "Mixed-use developments",
        "Sustainable and green building practices"
      ]
    },
    {
      title: "Industrial Construction",
      description: "Heavy industrial facilities, warehouses, and manufacturing plants with advanced engineering.",
      icon: HiCog,
      features: [
        "Manufacturing plants and factories",
        "Warehouses and distribution centers",
        "Processing facilities",
        "Industrial parks and zones",
        "Specialized industrial equipment installation"
      ]
    },
    {
      title: "Residential Construction",
      description: "Luxury homes, apartments, and residential complexes with modern amenities.",
      icon: HiUsers,
      features: [
        "Luxury residential homes",
        "Multi-family apartment complexes",
        "Gated communities",
        "Custom home design and build",
        "Residential renovations and extensions"
      ]
    },
    {
      title: "Infrastructure Development",
      description: "Roads, bridges, utilities, and public infrastructure projects.",
      icon: HiLightningBolt,
      features: [
        "Road and highway construction",
        "Bridge and tunnel projects",
        "Water and sewage systems",
        "Electrical infrastructure",
        "Public works and utilities"
      ]
    },
    {
      title: "Project Management",
      description: "Comprehensive project management services from planning to completion.",
      icon: HiChartBar,
      features: [
        "Project planning and scheduling",
        "Cost estimation and budgeting",
        "Quality control and assurance",
        "Risk management",
        "Stakeholder coordination"
      ]
    },
    {
      title: "Safety & Compliance",
      description: "Ensuring all projects meet the highest safety standards and regulatory requirements.",
      icon: HiShieldCheck,
      features: [
        "Safety planning and implementation",
        "Regulatory compliance",
        "Environmental impact assessment",
        "Quality assurance programs",
        "Health and safety training"
      ]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "100%", label: "Safety Record" },
    { number: "50+", label: "Team Members" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Construction Services - Akibeks Engineering Solutions"
        description="Comprehensive construction services including commercial, industrial, residential, and infrastructure development. Expert project management and safety compliance."
        keywords="construction services, commercial construction, industrial construction, residential construction, infrastructure development, project management, Kenya"
        canonical="/services/construction"
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Construction Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Building Kenya's future with excellence, innovation, and unwavering commitment to quality
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Construction Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we deliver exceptional construction services across all sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Construction Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach ensuring quality, efficiency, and client satisfaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Planning & Design",
                description: "Comprehensive project planning, architectural design, and engineering specifications"
              },
              {
                step: "02",
                title: "Permits & Approvals",
                description: "Obtaining all necessary permits, approvals, and regulatory compliance"
              },
              {
                step: "03",
                title: "Construction",
                description: "Expert construction execution with quality control and safety management"
              },
              {
                step: "04",
                title: "Completion & Handover",
                description: "Final inspections, testing, and smooth project handover to clients"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Construction Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your construction needs and create something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => window.location.href = '/contact'}
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                onClick={() => window.location.href = '/quote-request'}
              >
                Request Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConstructionServices;