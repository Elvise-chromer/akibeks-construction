import React from 'react';
import { motion } from 'framer-motion';
import { HiLightBulb, HiShieldCheck, HiChartBar, HiUsers, HiCog, HiLightningBolt } from 'react-icons/hi';
import SEO from '../../components/SEO';

const ConsultationServices: React.FC = () => {
  const services = [
    {
      title: "Strategic Consulting",
      description: "Expert strategic advice for construction and engineering projects.",
      icon: HiLightBulb,
      features: [
        "Project feasibility analysis",
        "Strategic planning and development",
        "Market research and analysis",
        "Investment planning and advice",
        "Growth strategy development"
      ]
    },
    {
      title: "Technical Consulting",
      description: "Specialized technical expertise for complex engineering challenges.",
      icon: HiCog,
      features: [
        "Technical problem solving",
        "Engineering design review",
        "Technology assessment",
        "Performance optimization",
        "Innovation and R&D"
      ]
    },
    {
      title: "Compliance Consulting",
      description: "Ensuring projects meet all regulatory and safety requirements.",
      icon: HiShieldCheck,
      features: [
        "Regulatory compliance review",
        "Safety standards implementation",
        "Environmental impact assessment",
        "Quality assurance programs",
        "Certification and licensing"
      ]
    },
    {
      title: "Financial Consulting",
      description: "Financial planning and analysis for construction projects.",
      icon: HiChartBar,
      features: [
        "Cost-benefit analysis",
        "Budget planning and control",
        "Financial risk assessment",
        "Investment optimization",
        "ROI analysis and reporting"
      ]
    },
    {
      title: "Management Consulting",
      description: "Organizational and operational improvement strategies.",
      icon: HiUsers,
      features: [
        "Process optimization",
        "Organizational restructuring",
        "Change management",
        "Performance improvement",
        "Leadership development"
      ]
    },
    {
      title: "Innovation Consulting",
      description: "Cutting-edge solutions and technology integration.",
      icon: HiLightningBolt,
      features: [
        "Technology integration",
        "Innovation strategy",
        "Digital transformation",
        "Smart building solutions",
        "Sustainability consulting"
      ]
    }
  ];

  const stats = [
    { number: "300+", label: "Consultations Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "95%", label: "Client Success Rate" },
    { number: "100%", label: "Confidentiality" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Consultation Services - Akibeks Engineering Solutions"
        description="Expert consultation services including strategic, technical, compliance, financial, and management consulting. Innovation and digital transformation solutions."
        keywords="consultation services, strategic consulting, technical consulting, compliance consulting, financial consulting, management consulting, innovation consulting, Kenya"
        canonical="/services/consultation"
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
              Consultation Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert advice and strategic solutions for your construction and engineering challenges
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
              Our Consultation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive consulting solutions tailored to your specific needs
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
              Our Consultation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to delivering expert advice and solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your needs and project requirements"
              },
              {
                step: "02",
                title: "Analysis",
                description: "Comprehensive analysis and research"
              },
              {
                step: "03",
                title: "Solution",
                description: "Developing tailored solutions and recommendations"
              },
              {
                step: "04",
                title: "Implementation",
                description: "Supporting implementation and follow-up"
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
              Ready for Expert Consultation?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your challenges and find the right solutions together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => window.location.href = '/contact'}
              >
                Get Expert Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                onClick={() => window.location.href = '/quote-request'}
              >
                Request Consultation Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationServices;