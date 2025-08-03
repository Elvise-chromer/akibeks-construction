import React, { useState, useMemo } from 'react';
import { 
  FaCalendar, 
  FaUser, 
  FaSearch, 
  FaTags, 
  FaArrowRight,
  FaClock,
  FaShare,
  FaBookmark,
  FaFilter
} from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  views: number;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Sustainable Construction Practices for Modern Kenya',
      excerpt: 'Explore how sustainable building practices are transforming the construction industry in Kenya and contributing to environmental conservation.',
      content: 'Full article content here...',
      author: 'John Akibeks',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Sustainability',
      tags: ['Green Building', 'Environment', 'Innovation'],
      featured: true,
      image: '/blog/sustainable-construction.jpg',
      views: 1250
    },
    {
      id: '2',
      title: 'The Future of Smart Buildings in East Africa',
      excerpt: 'Discover how smart building technologies are revolutionizing commercial construction and improving energy efficiency.',
      content: 'Full article content here...',
      author: 'Sarah Wanjiku',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Technology',
      tags: ['Smart Buildings', 'IoT', 'Energy Efficiency'],
      featured: false,
      image: '/blog/smart-buildings.jpg',
      views: 980
    },
    {
      id: '3',
      title: 'Cost-Effective Building Materials in Kenya',
      excerpt: 'A comprehensive guide to choosing the right materials that balance quality, durability, and affordability.',
      content: 'Full article content here...',
      author: 'Michael Otieno',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Materials',
      tags: ['Building Materials', 'Cost Management', 'Quality'],
      featured: false,
      image: '/blog/building-materials.jpg',
      views: 756
    },
    {
      id: '4',
      title: 'Understanding Building Permits and Regulations in Nairobi',
      excerpt: 'Navigate the complex world of building permits, regulations, and approval processes in Nairobi County.',
      content: 'Full article content here...',
      author: 'Grace Muthoni',
      date: '2024-01-08',
      readTime: '12 min read',
      category: 'Regulations',
      tags: ['Permits', 'Legal', 'Compliance'],
      featured: true,
      image: '/blog/building-permits.jpg',
      views: 1100
    },
    {
      id: '5',
      title: 'Modern Kitchen Design Trends for Kenyan Homes',
      excerpt: 'Explore the latest kitchen design trends that combine functionality with aesthetic appeal for modern Kenyan households.',
      content: 'Full article content here...',
      author: 'Sarah Wanjiku',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Design',
      tags: ['Interior Design', 'Kitchen', 'Trends'],
      featured: false,
      image: '/blog/kitchen-design.jpg',
      views: 892
    },
    {
      id: '6',
      title: 'Safety First: Construction Site Safety Protocols',
      excerpt: 'Learn about essential safety protocols and measures that ensure worker protection on construction sites.',
      content: 'Full article content here...',
      author: 'John Akibeks',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Safety',
      tags: ['Safety', 'Protocols', 'Workers'],
      featured: false,
      image: '/blog/construction-safety.jpg',
      views: 654
    }
  ];

  const categories = [
    'all',
    'Sustainability',
    'Technology',
    'Materials',
    'Regulations',
    'Design',
    'Safety'
  ];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [blogPosts, searchTerm, selectedCategory, selectedTag]);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({ post, featured = false }) => (
    <article className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${featured ? 'h-64 lg:h-80' : 'h-48'}`}
          onError={(e) => {
            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">
                  ${post.title.substring(0, 20)}...
                </text>
              </svg>
            `)}`
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200">
            <FaBookmark className="w-4 h-4" />
          </button>
          <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200">
            <FaShare className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center space-x-1">
            <FaUser className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCalendar className="w-4 h-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaClock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
          {post.title}
        </h2>
        
        <p className={`text-gray-600 mb-4 ${featured ? 'text-lg' : ''}`}>
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors duration-200"
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <button className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-2 transition-colors duration-200">
            <span>Read More</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500">{post.views} views</span>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Construction Insights & News</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              Stay informed with the latest trends, tips, and insights from the construction industry
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="flex items-center space-x-2">
              <FaTags className="text-gray-500 w-5 h-5" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'all' || selectedTag) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchTerm && selectedCategory === 'all' && !selectedTag && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't miss our top picks for construction insights and industry trends
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {searchTerm || selectedCategory !== 'all' || selectedTag ? 'Search Results' : 'Latest Articles'}
            </h2>
            <span className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Articles Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('');
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest construction insights and company updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-300 focus:outline-none"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-primary-200 mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;