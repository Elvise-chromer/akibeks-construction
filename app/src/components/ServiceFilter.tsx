import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiFilter, HiSearch, HiX } from 'react-icons/hi';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  features: string[];
  image: string;
  link: string;
}

interface ServiceFilterProps {
  services: Service[];
  onFilterChange: (filteredServices: Service[]) => void;
  categories?: string[];
  showSearch?: boolean;
  showPriceFilter?: boolean;
  showCategoryFilter?: boolean;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  services,
  onFilterChange,
  categories = [],
  showSearch = true,
  showPriceFilter = true,
  showCategoryFilter = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'low', label: 'Under KSh 1M' },
    { value: 'medium', label: 'KSh 1M - 5M' },
    { value: 'high', label: 'KSh 5M - 10M' },
    { value: 'premium', label: 'Over KSh 10M' }
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Search filter
      const matchesSearch = !searchTerm || 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        service.category === selectedCategory;

      // Price filter
      const matchesPrice = priceRange === 'all' || 
        (priceRange === 'low' && service.price.includes('Under')) ||
        (priceRange === 'medium' && (service.price.includes('1M - 5M') || service.price.includes('25,000'))) ||
        (priceRange === 'high' && (service.price.includes('5M - 10M') || service.price.includes('55,000'))) ||
        (priceRange === 'premium' && service.price.includes('Over'));

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [services, searchTerm, selectedCategory, priceRange]);

  // Update parent component when filters change
  React.useEffect(() => {
    onFilterChange(filteredServices);
  }, [filteredServices, onFilterChange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || priceRange !== 'all';

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Services</h3>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <HiFilter className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search Filter */}
              {showSearch && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Services
                  </label>
                  <div className="relative">
                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search services..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Category Filter */}
              {showCategoryFilter && categories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Filter */}
              {showPriceFilter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <HiX className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 hover:text-primary-600"
                      >
                        <HiX className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-2 hover:text-blue-600"
                      >
                        <HiX className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                  {priceRange !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      Price: {priceRanges.find(r => r.value === priceRange)?.label}
                      <button
                        onClick={() => setPriceRange('all')}
                        className="ml-2 hover:text-green-600"
                      >
                        <HiX className="h-4 w-4" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredServices.length} of {services.length} services
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-2 text-primary-600 hover:text-primary-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceFilter;