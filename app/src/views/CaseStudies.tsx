import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiClock, 
  HiCurrencyDollar,
  HiTrendingUp,
  HiCheckCircle,
  HiChevronRight,
  HiLocationMarker,
  HiCalendar,
  HiUsers,
  HiLightBulb,
  HiDocumentText,
  HiPhotograph,
  HiCog,
  HiStar
} from 'react-icons/hi';

const CaseStudies: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<number>(0);

  const caseStudies = [
    {
      id: 1,
      title: "Nairobi Tech Hub Complex",
      category: "Commercial Development",
      location: "Nairobi, Kenya",
      duration: "18 months",
      budget: "KES 2.8B",
      completionDate: "March 2023",
      client: "TechVenture Holdings",
      heroImage: "/images/case-studies/tech-hub-hero.jpg",
      beforeImage: "/images/case-studies/tech-hub-before.jpg",
      afterImage: "/images/case-studies/tech-hub-after.jpg",
      overview: "A state-of-the-art technology campus featuring modern office spaces, conference facilities, and innovation labs designed to foster collaboration and creativity in Kenya's growing tech sector.",
      challenges: [
        "Complex underground utility integration in urban setting",
        "Sustainable design requirements for LEED Gold certification",
        "Coordination with multiple technology infrastructure providers",
        "Working within tight city center space constraints"
      ],
      solutions: [
        "Advanced 3D modeling and BIM implementation for utility coordination",
        "Green building technologies including solar panels and rainwater harvesting",
        "Phased construction approach to minimize disruption",
        "Innovative vertical construction techniques to maximize space utilization"
      ],
      results: [
        "LEED Gold certification achieved",
        "30% reduction in energy consumption compared to traditional buildings",
        "Project completed 2 weeks ahead of schedule",
        "Zero safety incidents during construction",
        "Houses 50+ technology companies and 2,000+ professionals"
      ],
      keyFeatures: [
        "Smart building automation systems",
        "High-speed fiber optic infrastructure",
        "Collaborative workspaces and innovation labs",
        "Conference facilities for 500+ attendees",
        "Green rooftop gardens and recreational areas"
      ],
      awards: [
        "Kenya Construction Excellence Award 2023",
        "Green Building Council Recognition",
        "Smart City Innovation Award"
      ]
    },
    {
      id: 2,
      title: "Mombasa Port Expansion",
      category: "Infrastructure",
      location: "Mombasa, Kenya",
      duration: "24 months",
      budget: "KES 5.2B",
      completionDate: "September 2023",
      client: "Kenya Ports Authority",
      heroImage: "/images/case-studies/port-hero.jpg",
      beforeImage: "/images/case-studies/port-before.jpg",
      afterImage: "/images/case-studies/port-after.jpg",
      overview: "Major port infrastructure expansion project including new container terminals, cargo handling equipment, and supporting infrastructure to increase port capacity by 40%.",
      challenges: [
        "Working in active port environment with minimal disruption",
        "Marine construction in challenging tidal conditions",
        "Coordination with international shipping schedules",
        "Environmental protection in sensitive marine ecosystem"
      ],
      solutions: [
        "24/7 construction scheduling to work around port operations",
        "Specialized marine construction equipment and techniques",
        "Advanced project management software for real-time coordination",
        "Comprehensive environmental monitoring and protection measures"
      ],
      results: [
        "Port capacity increased by 40%",
        "Container handling efficiency improved by 25%",
        "Created 500+ direct employment opportunities",
        "Enhanced regional trade connectivity",
        "Minimal environmental impact achieved"
      ],
      keyFeatures: [
        "3 new container berths with modern gantry cranes",
        "Automated cargo handling systems",
        "Rail connectivity to inland container depot",
        "Advanced port management information systems",
        "Energy-efficient LED lighting throughout facility"
      ],
      awards: [
        "Infrastructure Excellence Award 2023",
        "Environmental Stewardship Recognition",
        "Maritime Industry Achievement Award"
      ]
    },
    {
      id: 3,
      title: "Eldoret Residential Estate",
      category: "Residential Development",
      location: "Eldoret, Kenya",
      duration: "15 months",
      budget: "KES 1.8B",
      completionDate: "June 2023",
      client: "Sunrise Properties Ltd",
      heroImage: "/images/case-studies/residential-hero.jpg",
      beforeImage: "/images/case-studies/residential-before.jpg",
      afterImage: "/images/case-studies/residential-after.jpg",
      overview: "Affordable housing development featuring 500 modern homes with community facilities, designed to provide quality housing solutions for middle-income families.",
      challenges: [
        "Balancing quality with affordability constraints",
        "Undulating terrain requiring extensive site preparation",
        "Utility infrastructure development from scratch",
        "Weather-related construction delays during rainy season"
      ],
      solutions: [
        "Innovative construction methods to optimize costs",
        "Advanced earthworks and drainage systems",
        "Comprehensive utility master planning and phased implementation",
        "Weather-resistant construction materials and techniques"
      ],
      results: [
        "500 quality homes delivered on budget",
        "30% below market price while maintaining quality standards",
        "Created a self-sustaining community with amenities",
        "100% occupancy rate within 6 months",
        "Won National Affordable Housing Award"
      ],
      keyFeatures: [
        "2, 3, and 4-bedroom home options",
        "Community center with recreational facilities",
        "Modern shopping complex and health clinic",
        "Children's playground and sports facilities",
        "Comprehensive security and waste management systems"
      ],
      awards: [
        "National Affordable Housing Award 2023",
        "Community Development Excellence",
        "Sustainable Planning Recognition"
      ]
    }
  ];

  const currentStudy = caseStudies[selectedStudy];

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
              Case Studies
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-primary-100 max-w-2xl mx-auto"
            >
              Detailed analysis of our successful construction projects, showcasing innovative solutions and exceptional results
            </motion.p>
          </div>
        </div>
      </section>

      {/* Case Study Navigation */}
      <section className="section-padding-small bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setSelectedStudy(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedStudy === index
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                {study.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Case Study Detail */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            key={selectedStudy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Project Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {currentStudy.category}
                  </span>
                  <h2 className="heading-lg text-gray-900 mb-4">{currentStudy.title}</h2>
                  <p className="text-body text-gray-600 leading-relaxed">{currentStudy.overview}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="heading-sm text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <HiLocationMarker className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-sm text-gray-600">{currentStudy.location}</span>
                  </div>
                  <div className="flex items-center">
                    <HiCalendar className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-sm text-gray-600">{currentStudy.completionDate}</span>
                  </div>
                  <div className="flex items-center">
                    <HiClock className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-sm text-gray-600">{currentStudy.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <HiCurrencyDollar className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-sm text-gray-600">{currentStudy.budget}</span>
                  </div>
                  <div className="flex items-center">
                    <HiUsers className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-sm text-gray-600">{currentStudy.client}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-12">
              <img
                src={currentStudy.heroImage}
                alt={currentStudy.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Before & After Comparison */}
            <div className="mb-12">
              <h3 className="heading-md text-gray-900 mb-8 text-center">Before & After Transformation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h4 className="heading-sm text-gray-900 mb-4">Before</h4>
                  <img
                    src={currentStudy.beforeImage}
                    alt="Before construction"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="text-center">
                  <h4 className="heading-sm text-gray-900 mb-4">After</h4>
                  <img
                    src={currentStudy.afterImage}
                    alt="After construction"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Challenges, Solutions, Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <HiLightBulb className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="heading-sm text-gray-900">Challenges</h3>
                </div>
                <ul className="space-y-3">
                  {currentStudy.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-body-sm text-gray-600">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <HiCog className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="heading-sm text-gray-900">Solutions</h3>
                </div>
                <ul className="space-y-3">
                  {currentStudy.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-body-sm text-gray-600">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <HiCheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="heading-sm text-gray-900">Results</h3>
                </div>
                <ul className="space-y-3">
                  {currentStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <HiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-body-sm text-gray-600">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h3 className="heading-md text-gray-900 mb-6">Key Features & Innovations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStudy.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <HiChevronRight className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-body text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="text-center">
              <h3 className="heading-md text-gray-900 mb-8">Awards & Recognition</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {currentStudy.awards.map((award, index) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-4 text-center">
                    <HiStar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-gray-800">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Impact Statistics */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Project Impact Summary</h2>
            <p className="text-body text-primary-100 max-w-3xl mx-auto">
              Our case studies demonstrate measurable impact across various project types and scales, 
              showcasing our commitment to delivering exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "KES 9.8B", label: "Total Project Value", icon: HiCurrencyDollar },
              { number: "57 months", label: "Combined Duration", icon: HiClock },
              { number: "2,500+", label: "Jobs Created", icon: HiUsers },
              { number: "9", label: "Awards Won", icon: HiStar }
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
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HiDocumentText className="w-16 h-16 mx-auto mb-6" />
              <h2 className="heading-lg mb-4">Start Your Success Story</h2>
              <p className="text-body text-primary-100 mb-8 max-w-3xl mx-auto">
                Ready to create your own construction success story? Let us bring our proven expertise 
                and innovative solutions to your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Your Project
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  Download Case Studies
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;