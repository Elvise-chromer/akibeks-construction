import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiShieldCheck, 
  HiExclamationCircle,
  HiClipboardCheck,
  HiAcademicCap,
  HiEye,
  HiHeart,
  HiCog,
  HiDocumentText,
  HiUserGroup,
  HiLightBulb,
  HiPhone,
  HiStar
} from 'react-icons/hi';

const Safety: React.FC = () => {
  const safetyPillars = [
    {
      icon: HiShieldCheck,
      title: "Zero Harm Policy",
      description: "Our commitment to ensuring no one gets hurt on our job sites",
      color: "from-green-500 to-green-600"
    },
    {
      icon: HiUserGroup,
      title: "Safety Culture",
      description: "Building a culture where safety is everyone's responsibility",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: HiAcademicCap,
      title: "Training & Education",
      description: "Continuous safety training and skill development programs",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HiClipboardCheck,
      title: "Compliance & Standards",
      description: "Adherence to all local and international safety regulations",
      color: "from-red-500 to-red-600"
    }
  ];

  const safetyProtocols = [
    {
      category: "Personal Protective Equipment (PPE)",
      icon: HiShieldCheck,
      requirements: [
        "Hard hats must be worn at all times on construction sites",
        "Safety glasses or goggles required when working with tools or chemicals",
        "Steel-toed boots mandatory in all construction areas",
        "High-visibility vests required for all personnel",
        "Hearing protection in noise-intensive areas (>85dB)",
        "Respiratory protection when working with dust or chemicals"
      ]
    },
    {
      category: "Site Access & Security",
      icon: HiEye,
      requirements: [
        "All visitors must check in at site office and receive safety briefing",
        "Authorized personnel only beyond construction barriers",
        "Valid safety certification required for all contractors",
        "24/7 security monitoring at active construction sites",
        "Emergency evacuation routes clearly marked and maintained",
        "Regular site safety inspections by certified safety officers"
      ]
    },
    {
      category: "Equipment & Machinery",
      icon: HiCog,
      requirements: [
        "Daily equipment inspections before operation",
        "Only certified operators allowed to use heavy machinery",
        "Lockout/Tagout procedures for equipment maintenance",
        "Regular calibration and maintenance of all safety equipment",
        "Proper storage and handling of hazardous materials",
        "Emergency stop procedures clearly posted near all machinery"
      ]
    },
    {
             category: "Emergency Procedures",
       icon: HiExclamationCircle,
      requirements: [
        "Emergency response plans posted in multiple languages",
        "First aid stations within 100 meters of all work areas",
        "Trained first aid responders on every shift",
        "Direct communication lines to emergency services",
        "Regular emergency drills and evacuation exercises",
        "Incident reporting system available 24/7"
      ]
    }
  ];

  const safetyStats = [
    { number: "0", label: "Fatalities in 2023", icon: HiHeart },
    { number: "2.1", label: "Injury Rate (per 100 workers)", icon: HiShieldCheck },
    { number: "98%", label: "Safety Training Compliance", icon: HiAcademicCap },
    { number: "24/7", label: "Safety Monitoring", icon: HiEye }
  ];

  const certifications = [
    {
      name: "ISO 45001:2018",
      description: "Occupational Health & Safety Management System",
      issuer: "International Organization for Standardization",
      year: "2023"
    },
    {
      name: "OHSAS 18001",
      description: "Occupational Health & Safety Assessment Series",
      issuer: "British Standards Institution",
      year: "2022"
    },
    {
      name: "NEBOSH Certificate",
      description: "National Examination Board in Occupational Safety and Health",
      issuer: "NEBOSH",
      year: "2023"
    },
    {
      name: "NEMA Compliance",
      description: "National Environment Management Authority Certification",
      issuer: "NEMA Kenya",
      year: "2023"
    }
  ];

  const safetyResources = [
    {
      title: "Safety Training Materials",
      description: "Comprehensive training resources for workers and supervisors",
      icon: HiAcademicCap,
      items: ["Safety Induction Videos", "PPE Guidelines", "Equipment Training Modules", "Emergency Procedures"]
    },
    {
      title: "Safety Documentation",
      description: "Essential safety forms and documentation templates",
      icon: HiDocumentText,
      items: ["Risk Assessment Forms", "Incident Report Templates", "Safety Inspection Checklists", "Method Statements"]
    },
    {
      title: "Emergency Contacts",
      description: "24/7 emergency contact information and procedures",
      icon: HiPhone,
      items: ["Emergency Services: 911", "Site Safety Officer", "Medical Emergency Line", "Environmental Emergency"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced Size */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white hero-height-small">
        <div className="container-custom h-full flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-xl mb-6"
            >
              Safety Guidelines
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-red-100 max-w-2xl mx-auto"
            >
              Comprehensive safety protocols and guidelines ensuring the highest standards of workplace safety for all our construction projects
            </motion.p>
          </div>
        </div>
      </section>

      {/* Safety Statistics */}
      <section className="section-padding-small bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Pillars */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Our Safety Foundation
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Our safety program is built on four fundamental pillars that guide every aspect of our operations and ensure the well-being of all personnel.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${pillar.color} flex items-center justify-center mx-auto mb-4`}>
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-sm text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-body-sm text-gray-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Protocols */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Safety Protocols & Requirements
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Detailed safety protocols covering all aspects of construction site safety, from personal protective equipment to emergency procedures.
            </motion.p>
          </div>

          <div className="space-y-8">
            {safetyProtocols.map((protocol, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-red-600 p-6 text-white">
                  <div className="flex items-center">
                    <protocol.icon className="w-8 h-8 mr-4" />
                    <h3 className="heading-md">{protocol.category}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {protocol.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-start">
                        <HiShieldCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-body-sm text-gray-600">{requirement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Safety Certifications
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Our commitment to safety excellence is demonstrated through internationally recognized certifications and compliance standards.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <HiStar className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="heading-sm text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-red-600 font-semibold">{cert.year}</p>
                  </div>
                </div>
                <p className="text-body-sm text-gray-600 mb-3">{cert.description}</p>
                <p className="text-xs text-gray-500">Issued by: {cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Resources */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Safety Resources
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Access essential safety resources, training materials, and emergency contact information for all our project sites.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-body-sm text-gray-600">{resource.description}</p>
                </div>

                <div className="space-y-2">
                  {resource.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <HiClipboardCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section-padding bg-red-900 text-white">
        <div className="container-custom">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HiExclamationCircle className="w-16 h-16 mx-auto mb-6" />
              <h2 className="heading-lg mb-4">Emergency Contacts</h2>
              <p className="text-body text-red-100 mb-8 max-w-3xl mx-auto">
                In case of any safety emergency or incident, immediately contact our emergency response team or local emergency services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-800 rounded-lg p-6">
                  <HiPhone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Emergency Services</h3>
                  <p className="text-2xl font-bold">911</p>
                </div>
                <div className="bg-red-800 rounded-lg p-6">
                  <HiPhone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Safety Hotline</h3>
                  <p className="text-2xl font-bold">+254 700 SAFETY</p>
                </div>
                <div className="bg-red-800 rounded-lg p-6">
                  <HiPhone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Medical Emergency</h3>
                  <p className="text-2xl font-bold">+254 700 MED-AID</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Download Safety Manual
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                  Report Safety Concern
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;