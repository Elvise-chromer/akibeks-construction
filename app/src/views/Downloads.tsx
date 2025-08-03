import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiDownload, 
  HiDocumentText, 
  HiCollection, 
  HiBookOpen,
  HiSearch,
  HiFilter,
  HiEye,
  HiCalendar,
  HiPhone,
  HiMail,
  HiCheckCircle
} from 'react-icons/hi';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  downloadCount: number;
  publishedDate: string;
  thumbnail: string;
  downloadUrl: string;
  featured: boolean;
}

const Downloads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Downloads', count: 24 },
    { id: 'brochures', name: 'Company Brochures', count: 8 },
    { id: 'catalogs', name: 'Service Catalogs', count: 6 },
    { id: 'technical', name: 'Technical Documents', count: 5 },
    { id: 'case-studies', name: 'Case Studies', count: 3 },
    { id: 'certificates', name: 'Certificates', count: 2 }
  ];

  const downloads: DownloadItem[] = [
    {
      id: '1',
      title: 'Akibeks Construction Company Profile',
      description: 'Comprehensive overview of our company, services, and portfolio of completed projects.',
      category: 'brochures',
      fileType: 'PDF',
      fileSize: '8.5 MB',
      downloadCount: 2847,
      publishedDate: '2024-01-15',
      thumbnail: '/images/downloads/company-profile.jpg',
      downloadUrl: '/downloads/akibeks-company-profile.pdf',
      featured: true
    },
    {
      id: '2',
      title: 'Residential Construction Services Catalog',
      description: 'Detailed information about our residential construction services, pricing, and process.',
      category: 'catalogs',
      fileType: 'PDF',
      fileSize: '12.2 MB',
      downloadCount: 1956,
      publishedDate: '2024-01-10',
      thumbnail: '/images/downloads/residential-catalog.jpg',
      downloadUrl: '/downloads/residential-services-catalog.pdf',
      featured: true
    },
    {
      id: '3',
      title: 'Commercial Construction Portfolio',
      description: 'Showcase of our commercial construction projects including office buildings and retail spaces.',
      category: 'brochures',
      fileType: 'PDF',
      fileSize: '15.8 MB',
      downloadCount: 1432,
      publishedDate: '2024-01-08',
      thumbnail: '/images/downloads/commercial-portfolio.jpg',
      downloadUrl: '/downloads/commercial-portfolio.pdf',
      featured: false
    },
    {
      id: '4',
      title: 'Sustainable Construction Guide',
      description: 'Technical guide on sustainable construction practices and green building materials.',
      category: 'technical',
      fileType: 'PDF',
      fileSize: '6.4 MB',
      downloadCount: 987,
      publishedDate: '2024-01-05',
      thumbnail: '/images/downloads/sustainable-guide.jpg',
      downloadUrl: '/downloads/sustainable-construction-guide.pdf',
      featured: false
    },
    {
      id: '5',
      title: 'ISO 9001:2015 Certificate',
      description: 'Quality Management System certification demonstrating our commitment to quality.',
      category: 'certificates',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      downloadCount: 756,
      publishedDate: '2023-12-20',
      thumbnail: '/images/downloads/iso-certificate.jpg',
      downloadUrl: '/downloads/iso-9001-certificate.pdf',
      featured: false
    },
    {
      id: '6',
      title: 'Westlands Office Complex Case Study',
      description: 'Detailed case study of our award-winning Westlands office complex project.',
      category: 'case-studies',
      fileType: 'PDF',
      fileSize: '9.7 MB',
      downloadCount: 645,
      publishedDate: '2023-12-15',
      thumbnail: '/images/downloads/westlands-case-study.jpg',
      downloadUrl: '/downloads/westlands-case-study.pdf',
      featured: true
    }
  ];

  const filteredDownloads = downloads.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredDownloads = downloads.filter(item => item.featured);

  const handleDownload = (item: DownloadItem) => {
    // In a real app, this would track the download and serve the file
    console.log(`Downloading: ${item.title}`);
    window.open(item.downloadUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
              Downloads Center
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Access comprehensive brochures, technical documents, case studies, and company information
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
              <a
                href="tel:+254700123456"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search downloads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Downloads */}
      {featuredDownloads.length > 0 && (
        <section className="section-padding-small">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Downloads</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Most popular and essential documents for understanding our services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDownloads.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {item.fileType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{item.fileSize}</span>
                        <span>{item.downloadCount} downloads</span>
                      </div>
                      <span>{formatDate(item.publishedDate)}</span>
                    </div>
                    
                    <button
                      onClick={() => handleDownload(item)}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <HiDownload className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Downloads */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Downloads</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete library of documents and resources
            </p>
          </div>

          {filteredDownloads.length === 0 ? (
            <div className="text-center py-12">
              <HiDocumentText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No downloads found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all categories</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDownloads.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-48 flex-shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-32 lg:h-24 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                            {item.featured && (
                              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-semibold">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <HiDocumentText className="w-4 h-4" />
                              <span>{item.fileType} • {item.fileSize}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HiEye className="w-4 h-4" />
                              <span>{item.downloadCount} downloads</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HiCalendar className="w-4 h-4" />
                              <span>{formatDate(item.publishedDate)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleDownload(item)}
                            className="bg-primary-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                          >
                            <HiDownload className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Download Our Resources?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive documents provide valuable insights for your construction projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HiBookOpen,
                title: 'Detailed Information',
                description: 'Comprehensive guides covering all aspects of our services and processes'
              },
              {
                icon: HiCollection,
                title: 'Project Portfolios',
                description: 'Visual showcases of our completed projects with specifications and outcomes'
              },
              {
                icon: HiCheckCircle,
                title: 'Quality Assurance',
                description: 'Certificates and documentation proving our commitment to quality standards'
              },
              {
                icon: HiDocumentText,
                title: 'Technical Specs',
                description: 'Detailed technical documentation for informed decision making'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need More Information?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Can't find what you're looking for? Contact us for personalized consultation and additional resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-secondary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link
                to="/quote"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-secondary-600 transition-colors duration-200"
              >
                Request Quote
              </Link>
            </div>
            
            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8 pt-8 border-t border-white/20">
              <a
                href="tel:+254700123456"
                className="flex items-center space-x-3 text-white hover:text-gray-200 transition-colors duration-200"
              >
                <HiPhone className="w-5 h-5" />
                <span>+254 700 123 456</span>
              </a>
              <a
                href="mailto:info@akibeks.com"
                className="flex items-center space-x-3 text-white hover:text-gray-200 transition-colors duration-200"
              >
                <HiMail className="w-5 h-5" />
                <span>info@akibeks.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;