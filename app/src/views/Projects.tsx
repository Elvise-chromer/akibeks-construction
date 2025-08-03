import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, IconButton } from '../components/icons/IconSystem';

// Types
interface Project {
  id: string;
  name: string;
  description: string;
  category: 'residential' | 'commercial' | 'industrial' | 'renovation';
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  images: string[];
  location: string;
  startDate: string;
  endDate?: string;
  budget: number;
  client: string;
  features: string[];
  completionPercentage: number;
}

// Sample project data (in real app, this would come from API)
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Modern Residential Villa',
    description: 'Luxury 5-bedroom villa with contemporary design featuring smart home technology, energy-efficient systems, and premium finishes.',
    category: 'residential',
    status: 'completed',
    images: ['/images/projects/villa-1.jpg', '/images/projects/villa-2.jpg', '/images/projects/villa-3.jpg'],
    location: 'Karen, Nairobi',
    startDate: '2023-03-15',
    endDate: '2023-11-30',
    budget: 25000000,
    client: 'Private Client',
    features: ['Smart Home System', 'Solar Panels', 'Swimming Pool', 'Home Theater', 'Wine Cellar'],
    completionPercentage: 100,
  },
  {
    id: '2',
    name: 'Corporate Office Complex',
    description: 'Modern 8-story office building with sustainable design, flexible workspace layouts, and advanced building management systems.',
    category: 'commercial',
    status: 'active',
    images: ['/images/projects/office-1.jpg', '/images/projects/office-2.jpg'],
    location: 'Westlands, Nairobi',
    startDate: '2024-01-10',
    budget: 150000000,
    client: 'TechCorp Kenya',
    features: ['LEED Certified', 'Flexible Workspaces', 'Rooftop Garden', 'EV Charging', 'Conference Centers'],
    completionPercentage: 65,
  },
  {
    id: '3',
    name: 'Manufacturing Plant',
    description: 'State-of-the-art manufacturing facility with automated systems, quality control labs, and worker amenities.',
    category: 'industrial',
    status: 'completed',
    images: ['/images/projects/industrial-1.jpg', '/images/projects/industrial-2.jpg'],
    location: 'Industrial Area, Nairobi',
    startDate: '2023-06-01',
    endDate: '2024-01-15',
    budget: 280000000,
    client: 'Manufacturing Solutions Ltd',
    features: ['Automated Systems', 'Quality Labs', 'Safety Systems', 'Waste Management', 'Staff Facilities'],
    completionPercentage: 100,
  },
  {
    id: '4',
    name: 'Hospital Renovation',
    description: 'Complete renovation of 200-bed hospital with modern medical facilities, patient comfort areas, and advanced medical equipment installations.',
    category: 'renovation',
    status: 'active',
    images: ['/images/projects/hospital-1.jpg'],
    location: 'Kiambu Road, Nairobi',
    startDate: '2024-02-01',
    budget: 95000000,
    client: 'Nairobi General Hospital',
    features: ['Modern OR Suites', 'ICU Upgrade', 'Digital Systems', 'Patient Comfort', 'Staff Areas'],
    completionPercentage: 30,
  },
  {
    id: '5',
    name: 'Luxury Apartments',
    description: '24-unit luxury apartment complex with premium amenities, parking, and recreational facilities.',
    category: 'residential',
    status: 'planning',
    images: ['/images/projects/apartments-1.jpg'],
    location: 'Kilimani, Nairobi',
    startDate: '2024-06-01',
    budget: 180000000,
    client: 'Residential Developers Ltd',
    features: ['Gym & Spa', 'Underground Parking', 'Rooftop Pool', 'Concierge Service', 'Security'],
    completionPercentage: 5,
  },
  {
    id: '6',
    name: 'Shopping Mall Expansion',
    description: 'Expansion of existing shopping mall with new retail spaces, food court, entertainment areas, and additional parking.',
    category: 'commercial',
    status: 'on_hold',
    images: ['/images/projects/mall-1.jpg'],
    location: 'Thika Road, Nairobi',
    startDate: '2024-03-15',
    budget: 120000000,
    client: 'Retail Properties Kenya',
    features: ['New Retail Spaces', 'Food Court', 'Cinema Complex', 'Kids Play Area', 'Parking'],
    completionPercentage: 15,
  },
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(sampleProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'budget'>('date');
  const [loading, setLoading] = useState(false);

  // Filter and search functionality
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'budget':
          return b.budget - a.budget;
        case 'date':
        default:
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
    });

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedStatus, searchTerm, sortBy]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get status configuration
  const getStatusConfig = (status: Project['status']) => {
    const configs = {
      planning: { color: 'info' as const, label: 'Planning' },
      active: { color: 'warning' as const, label: 'In Progress' },
      completed: { color: 'success' as const, label: 'Completed' },
      on_hold: { color: 'danger' as const, label: 'On Hold' },
    };
    return configs[status];
  };

  // Get category configuration
  const getCategoryConfig = (category: Project['category']) => {
    const configs = {
      residential: { icon: 'home' as const, label: 'Residential', color: 'bg-blue-100 text-blue-800' },
      commercial: { icon: 'office' as const, label: 'Commercial', color: 'bg-green-100 text-green-800' },
      industrial: { icon: 'building' as const, label: 'Industrial', color: 'bg-purple-100 text-purple-800' },
      renovation: { icon: 'tools' as const, label: 'Renovation', color: 'bg-orange-100 text-orange-800' },
    };
    return configs[category];
  };

  // Project Card Component
  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const statusConfig = getStatusConfig(project.status);
    const categoryConfig = getCategoryConfig(project.category);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryConfig.color}`}>
              <Icon name={categoryConfig.icon} size="sm" className="inline mr-1" />
              {categoryConfig.label}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 bg-white bg-opacity-90 rounded-full px-3 py-1">
              <Icon name="checkCircle" size="sm" className={statusConfig.color} />
              <span className="text-sm font-medium">{statusConfig.label}</span>
            </div>
          </div>
          {project.status === 'active' && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{project.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-300 bg-opacity-30 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 cursor-pointer">
              {project.name}
            </h3>
            <div className="text-right">
              <div className="text-lg font-bold text-primary-600">
                {formatCurrency(project.budget)}
              </div>
              <div className="text-sm text-gray-500">Budget</div>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Icon name="location" size="sm" className="mr-2" />
              {project.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Icon name="user" size="sm" className="mr-2" />
              {project.client}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Icon name="calendar" size="sm" className="mr-2" />
              {formatDate(project.startDate)}
              {project.endDate && ` - ${formatDate(project.endDate)}`}
            </div>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
              <div className="flex flex-wrap gap-1">
                {project.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {feature}
                  </span>
                ))}
                {project.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    +{project.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <IconButton
              name="view"
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => console.log('View project:', project.id)}
            >
              View Details
            </IconButton>
            <IconButton
              name="image"
              size="sm"
              variant="ghost"
              tooltip="View Gallery"
              onClick={() => console.log('View gallery:', project.id)}
            />
            <IconButton
              name="share"
              size="sm"
              variant="ghost"
              tooltip="Share Project"
              onClick={() => console.log('Share project:', project.id)}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Construction Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of completed and ongoing construction projects across residential, 
            commercial, and industrial sectors in Kenya.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Projects
              </label>
              <div className="relative">
                <Icon
                  name="search"
                  size="sm"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by name, location, or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="renovation">Renovation</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>

            {/* Sort and View Controls */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Controls
              </label>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'budget')}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="budget">Sort by Budget</option>
                </select>
                <div className="flex">
                  <IconButton
                    name="grid"
                    size="sm"
                    variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    tooltip="Grid View"
                  />
                  <IconButton
                    name="list"
                    size="sm"
                    variant={viewMode === 'list' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    tooltip="List View"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-medium">{filteredProjects.length}</span> of{' '}
              <span className="font-medium">{projects.length}</span> projects
            </p>
            {loading && (
              <div className="flex items-center space-x-2">
          <Icon name="refresh" size="md" className="animate-spin" />
          <span>Loading projects...</span>
        </div>
            )}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <Icon name="search" size="4xl" color="light" className="mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more projects.
              </p>
              <IconButton
                name="refresh"
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
              >
                Clear Filters
              </IconButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-primary-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-6 opacity-90">
            Let's discuss your construction needs and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <IconButton
              name="calculator"
              variant="solid"
              color="white"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Get a Quote
            </IconButton>
            <IconButton
              name="phone"
              variant="outline"
              color="white"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Us
            </IconButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;