import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiHeart, 
  HiAcademicCap, 
  HiSparkles, 
  HiGlobeAlt,
  HiUserGroup,
  HiTrendingUp,
  HiCash,
  HiLightBulb,
  HiShieldCheck,
  HiStar
} from 'react-icons/hi';

const CSR: React.FC = () => {
  const initiatives = [
    {
      icon: HiAcademicCap,
      title: "Education Support",
      description: "Scholarships and educational infrastructure development in local communities",
      impact: "500+ students supported",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: HiHeart,
      title: "Healthcare Access",
      description: "Free medical camps and healthcare facility construction",
      impact: "10,000+ people served",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: HiGlobeAlt,
      title: "Environmental Conservation",
      description: "Tree planting drives and sustainable construction practices",
      impact: "5,000+ trees planted",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: HiUserGroup,
      title: "Community Development",
      description: "Infrastructure projects and skill development programs",
      impact: "50+ communities benefited",
      color: "from-purple-500 to-violet-600"
    }
  ];

  const environmentalCommitments = [
    {
      title: "Carbon Footprint Reduction",
      description: "Implementing energy-efficient technologies and sustainable materials",
      percentage: "30% reduction by 2025"
    },
    {
      title: "Waste Management",
      description: "Comprehensive recycling and waste reduction programs",
      percentage: "80% waste diverted from landfills"
    },
    {
      title: "Water Conservation",
      description: "Rainwater harvesting and efficient water usage systems",
      percentage: "40% water savings"
    },
    {
      title: "Green Building",
      description: "LEED certified construction and eco-friendly materials",
      percentage: "100% of new projects"
    }
  ];

  const communityProjects = [
    {
      title: "Rural School Construction",
      location: "Kisumu County",
      description: "Built 3 primary schools serving over 1,200 children",
      year: "2023",
      image: "/images/csr/school-project.jpg"
    },
    {
      title: "Water Well Installation",
      location: "Turkana County",
      description: "Installed 15 boreholes providing clean water access",
      year: "2023",
      image: "/images/csr/water-project.jpg"
    },
    {
      title: "Medical Center",
      location: "Garissa County",
      description: "Constructed modern healthcare facility with equipment",
      year: "2022",
      image: "/images/csr/medical-center.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced Size */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white hero-height-small">
        <div className="container-custom h-full flex items-center">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-xl mb-6"
            >
              Corporate Social Responsibility
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-primary-100 max-w-2xl mx-auto"
            >
              Building communities, protecting the environment, and creating lasting positive impact through responsible business practices
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Our Commitment to Society
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              At Akibeks Construction, we believe in building more than structures. We build communities, 
              support education, protect the environment, and create opportunities for sustainable development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${initiative.color} flex items-center justify-center mb-4`}>
                  <initiative.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-sm text-gray-900 mb-3">{initiative.title}</h3>
                <p className="text-body-sm text-gray-600 mb-4">{initiative.description}</p>
                <div className="flex items-center text-sm font-semibold text-primary-600">
                  <HiTrendingUp className="w-4 h-4 mr-2" />
                  {initiative.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Sustainability */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg text-gray-900 mb-6">
                Environmental Sustainability
              </h2>
              <p className="text-body text-gray-600 mb-8">
                We are committed to environmental stewardship through sustainable construction practices, 
                renewable energy adoption, and comprehensive conservation programs that protect our planet for future generations.
              </p>

              <div className="space-y-6">
                {environmentalCommitments.map((commitment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-green-500 pl-6"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="heading-sm text-gray-900">{commitment.title}</h3>
                      <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        {commitment.percentage}
                      </span>
                    </div>
                    <p className="text-body-sm text-gray-600">{commitment.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/csr/environmental-sustainability.jpg"
                alt="Environmental Sustainability"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Projects */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Recent Community Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Discover how we're making a difference in communities across Kenya through our CSR initiatives and social impact projects.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.year}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="heading-sm text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-primary-600 mb-3 flex items-center">
                    <HiGlobeAlt className="w-4 h-4 mr-1" />
                    {project.location}
                  </p>
                  <p className="text-body-sm text-gray-600">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-4"
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-primary-100 max-w-3xl mx-auto"
            >
              Measuring our commitment to social responsibility through tangible community impact and sustainable development initiatives.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Communities Served", icon: HiUserGroup },
              { number: "500+", label: "Students Supported", icon: HiAcademicCap },
              { number: "5,000+", label: "Trees Planted", icon: HiSparkles },
              { number: "10,000+", label: "Lives Impacted", icon: HiHeart }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HiStar className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="heading-lg mb-4">Join Our CSR Mission</h2>
              <p className="text-body text-primary-100 mb-8 max-w-3xl mx-auto">
                Partner with us to create lasting positive impact in communities across Kenya. 
                Together, we can build a better future through sustainable development and social responsibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Partner With Us
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CSR;