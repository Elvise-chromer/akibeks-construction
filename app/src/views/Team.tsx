import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiMail, 
  HiPhone,
  HiAcademicCap,
  HiBadgeCheck,
  HiStar,
  HiUsers,
  HiLightBulb,
  HiHeart,
  HiTrendingUp,
  HiShieldCheck
} from 'react-icons/hi';

const Team: React.FC = () => {
  const leadership = [
    {
      name: "James Akibeks",
      position: "Chief Executive Officer & Founder",
      department: "Executive Leadership",
      experience: "20+ years",
      image: "/images/team/james-akibeks.jpg",
      bio: "James founded Akibeks Construction with a vision to transform Kenya's construction landscape. With over 20 years of experience in civil engineering and project management, he has led numerous landmark projects across East Africa.",
      qualifications: ["M.Eng Civil Engineering", "Project Management Professional (PMP)", "Chartered Engineer"],
      email: "james.akibeks@akibeks.co.ke",
      phone: "+254 700 123 456",
      specialties: ["Strategic Planning", "Project Management", "Infrastructure Development"]
    },
    {
      name: "Sarah Wanjiku",
      position: "Chief Operations Officer",
      department: "Operations",
      experience: "15+ years",
      image: "/images/team/sarah-wanjiku.jpg",
      bio: "Sarah oversees all operational aspects of our construction projects. Her expertise in operational efficiency and quality management has been instrumental in our consistent project delivery success.",
      qualifications: ["MBA Operations Management", "Six Sigma Black Belt", "ISO 9001 Lead Auditor"],
      email: "sarah.wanjiku@akibeks.co.ke", 
      phone: "+254 700 123 457",
      specialties: ["Operations Management", "Quality Control", "Process Improvement"]
    },
    {
      name: "David Mwangi",
      position: "Chief Technology Officer",
      department: "Technology & Innovation",
      experience: "12+ years",
      image: "/images/team/david-mwangi.jpg",
      bio: "David leads our technology initiatives and digital transformation efforts. He brings cutting-edge construction technologies and innovative solutions to our projects.",
      qualifications: ["M.Sc Construction Technology", "Digital Construction Specialist", "BIM Expert"],
      email: "david.mwangi@akibeks.co.ke",
      phone: "+254 700 123 458",
      specialties: ["Construction Technology", "BIM Implementation", "Digital Innovation"]
    }
  ];

  const departmentHeads = [
    {
      name: "Michael Ochieng",
      position: "Head of Civil Engineering",
      department: "Engineering",
      experience: "18+ years",
      image: "/images/team/michael-ochieng.jpg",
      specialties: ["Structural Design", "Infrastructure Projects", "Bridge Construction"],
      qualifications: ["M.Eng Structural Engineering", "Professional Engineer (PE)"]
    },
    {
      name: "Grace Akinyi",
      position: "Head of Project Management",
      department: "Project Management",
      experience: "14+ years",
      image: "/images/team/grace-akinyi.jpg",
      specialties: ["Project Planning", "Risk Management", "Stakeholder Coordination"],
      qualifications: ["PMP Certified", "PRINCE2 Practitioner", "MBA Project Management"]
    },
    {
      name: "Peter Kimani",
      position: "Head of Quality Assurance",
      department: "Quality Control",
      experience: "16+ years",
      image: "/images/team/peter-kimani.jpg",
      specialties: ["Quality Systems", "Compliance Management", "Testing & Inspection"],
      qualifications: ["Quality Management Professional", "ISO 9001 Lead Auditor"]
    },
    {
      name: "Rose Njeri",
      position: "Head of Safety & Environment",
      department: "HSE",
      experience: "13+ years",
      image: "/images/team/rose-njeri.jpg",
      specialties: ["Safety Management", "Environmental Compliance", "Risk Assessment"],
      qualifications: ["NEBOSH International Diploma", "Environmental Management Systems"]
    },
    {
      name: "John Otieno",
      position: "Head of Finance",
      department: "Finance",
      experience: "15+ years",
      image: "/images/team/john-otieno.jpg",
      specialties: ["Financial Management", "Cost Control", "Project Budgeting"],
      qualifications: ["CPA (Kenya)", "MBA Finance", "Certified Management Accountant"]
    },
    {
      name: "Mary Wangari",
      position: "Head of Human Resources",
      department: "Human Resources",
      experience: "12+ years",
      image: "/images/team/mary-wangari.jpg",
      specialties: ["Talent Management", "Organizational Development", "Training & Development"],
      qualifications: ["MBA Human Resources", "SHRM Certified Professional"]
    }
  ];

  const companyValues = [
    {
      icon: HiShieldCheck,
      title: "Integrity",
      description: "We conduct business with the highest ethical standards and transparency",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: HiStar,
      title: "Excellence",
      description: "We strive for excellence in every project and continuously improve our standards",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: HiUsers,
      title: "Teamwork",
      description: "We believe in collaborative work and the power of diverse, skilled teams",
      color: "from-green-500 to-green-600"
    },
    {
      icon: HiLightBulb,
      title: "Innovation",
      description: "We embrace new technologies and creative solutions to construction challenges",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HiHeart,
      title: "Community",
      description: "We are committed to giving back and making positive impacts in our communities",
      color: "from-red-500 to-red-600"
    },
    {
      icon: HiTrendingUp,
      title: "Growth",
      description: "We invest in our people's development and support their career advancement",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const stats = [
    { number: "150+", label: "Team Members", icon: HiUsers },
    { number: "25+", label: "Senior Engineers", icon: HiAcademicCap },
    { number: "15+", label: "Years Average Experience", icon: HiBadgeCheck },
    { number: "98%", label: "Employee Satisfaction", icon: HiStar }
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
              Our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-primary-100 max-w-2xl mx-auto"
            >
              Meet the talented professionals who bring expertise, innovation, and passion to every project we undertake
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Statistics */}
      <section className="section-padding-small bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Leadership Team
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Our executive leadership brings decades of combined experience in construction, engineering, and business management.
            </motion.p>
          </div>

          <div className="space-y-12">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-48 h-48 mx-auto rounded-full object-cover mb-6"
                      />
                      <h3 className="heading-md text-gray-900 mb-2">{leader.name}</h3>
                      <p className="text-primary-600 font-semibold mb-1">{leader.position}</p>
                      <p className="text-gray-500 mb-4">{leader.experience} Experience</p>
                      
                      <div className="flex justify-center space-x-4 mb-6">
                        <a href={`mailto:${leader.email}`} className="text-primary-600 hover:text-primary-700">
                          <HiMail className="w-5 h-5" />
                        </a>
                        <a href={`tel:${leader.phone}`} className="text-primary-600 hover:text-primary-700">
                          <HiPhone className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="heading-sm text-gray-900 mb-3">About</h4>
                        <p className="text-body text-gray-600 leading-relaxed">{leader.bio}</p>
                      </div>

                      <div>
                        <h4 className="heading-sm text-gray-900 mb-3">Qualifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.qualifications.map((qual, qualIndex) => (
                            <span
                              key={qualIndex}
                              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                            >
                              {qual}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="heading-sm text-gray-900 mb-3">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.specialties.map((specialty, specIndex) => (
                            <span
                              key={specIndex}
                              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Heads */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Department Heads
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              Our department heads lead specialized teams and bring deep expertise in their respective fields.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departmentHeads.map((head, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={head.image}
                      alt={head.name}
                      className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                    />
                    <h3 className="heading-sm text-gray-900 mb-1">{head.name}</h3>
                    <p className="text-primary-600 font-semibold text-sm mb-1">{head.position}</p>
                    <p className="text-gray-500 text-sm">{head.experience} Experience</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {head.specialties.map((specialty, specIndex) => (
                          <span
                            key={specIndex}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Qualifications</h4>
                      <div className="space-y-1">
                        {head.qualifications.map((qual, qualIndex) => (
                          <p key={qualIndex} className="text-xs text-gray-600">{qual}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg text-gray-900 mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-body text-gray-600 max-w-3xl mx-auto"
            >
              These core values guide everything we do and shape our company culture, driving us to deliver exceptional results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-sm text-gray-900 mb-3">{value.title}</h3>
                <p className="text-body-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HiUsers className="w-16 h-16 mx-auto mb-6" />
              <h2 className="heading-lg mb-4">Join Our Team</h2>
              <p className="text-body text-primary-100 mb-8 max-w-3xl mx-auto">
                We're always looking for talented individuals who share our passion for excellence in construction. 
                Join us and be part of Kenya's leading construction company.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  View Open Positions
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  Learn About Careers
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;