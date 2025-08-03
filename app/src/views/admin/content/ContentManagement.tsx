import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Save,
  Settings,
  Image,
  Type,
  Layout,
  Globe,
  Code,
  Palette,
  Zap,
  Download,
  Upload,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  Clock,
  User,
  Tag,
  Folder,
  FileText,
  Grid3x3,
  List,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  Layers,
  Move
} from 'lucide-react';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content_type: 'page' | 'post' | 'service' | 'project_showcase' | 'testimonial' | 'team_member' | 'faq' | 'news' | 'portfolio' | 'landing' | 'form';
  status: 'draft' | 'published' | 'archived' | 'scheduled' | 'private';
  excerpt: string;
  content: any;
  featured_image: string;
  gallery: string[];
  template: string;
  layout_config: any;
  parent_id?: string;
  menu_order: number;
  show_in_menu: boolean;
  show_in_sitemap: boolean;
  require_auth: boolean;
  custom_css: string;
  custom_js: string;
  published_at?: string;
  expires_at?: string;
  view_count: number;
  tags: string[];
  categories: string[];
  author_id: string;
  seo_settings_id?: string;
  performance_score: number;
  is_amp_enabled: boolean;
  is_pwa_enabled: boolean;
  cache_duration: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

interface PageBlock {
  id: string;
  page_id: string;
  block_type: string;
  block_data: any;
  block_order: number;
  is_active: boolean;
  css_classes: string;
  custom_attributes: any;
  responsive_settings: any;
  animation_settings: any;
  conditional_display: any;
  created_at: string;
  updated_at: string;
}

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  template_type: string;
  template_data: any;
  preview_image: string;
  is_active: boolean;
  category: string;
  tags: string[];
  usage_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

const ContentManagement: React.FC = () => {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view' | 'builder'>('create');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    fetchPages();
    fetchTemplates();
  }, []);

  const fetchPages = async () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setPages([
        {
          id: '1',
          title: 'Home Page',
          slug: 'home',
          content_type: 'page',
          status: 'published',
          excerpt: 'Welcome to our construction company website',
          content: {
            blocks: [
              { type: 'hero', data: { title: 'Professional Construction Services', subtitle: 'Building your dreams with quality and excellence' } },
              { type: 'services', data: { title: 'Our Services', items: ['Residential Construction', 'Commercial Building', 'Renovations'] } },
              { type: 'testimonials', data: { title: 'What Our Clients Say', items: [] } }
            ]
          },
          featured_image: '/images/construction-hero.jpg',
          gallery: [],
          template: 'default',
          layout_config: { header: true, footer: true, sidebar: false },
          menu_order: 1,
          show_in_menu: true,
          show_in_sitemap: true,
          require_auth: false,
          custom_css: '',
          custom_js: '',
          published_at: '2024-01-01T00:00:00Z',
          view_count: 1250,
          tags: ['home', 'main'],
          categories: ['pages'],
          author_id: 'admin',
          performance_score: 92,
          is_amp_enabled: false,
          is_pwa_enabled: true,
          cache_duration: 3600,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-03-15T10:00:00Z',
          created_by: 'admin',
          updated_by: 'admin'
        },
        {
          id: '2',
          title: 'About Us',
          slug: 'about',
          content_type: 'page',
          status: 'published',
          excerpt: 'Learn about our company history and team',
          content: {
            blocks: [
              { type: 'text', data: { content: 'Our company has been serving clients for over 10 years...' } },
              { type: 'team', data: { title: 'Meet Our Team', members: [] } }
            ]
          },
          featured_image: '/images/about-hero.jpg',
          gallery: ['/images/team1.jpg', '/images/office.jpg'],
          template: 'default',
          layout_config: { header: true, footer: true, sidebar: false },
          menu_order: 2,
          show_in_menu: true,
          show_in_sitemap: true,
          require_auth: false,
          custom_css: '',
          custom_js: '',
          published_at: '2024-01-02T00:00:00Z',
          view_count: 890,
          tags: ['about', 'company'],
          categories: ['pages'],
          author_id: 'admin',
          performance_score: 88,
          is_amp_enabled: false,
          is_pwa_enabled: false,
          cache_duration: 7200,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-03-10T14:30:00Z',
          created_by: 'admin',
          updated_by: 'admin'
        },
        {
          id: '3',
          title: 'Construction Services',
          slug: 'services',
          content_type: 'service',
          status: 'published',
          excerpt: 'Complete range of construction and building services',
          content: {
            blocks: [
              { type: 'services_grid', data: { services: ['Residential', 'Commercial', 'Industrial'] } },
              { type: 'cta', data: { title: 'Get a Quote', button: 'Contact Us' } }
            ]
          },
          featured_image: '/images/services-hero.jpg',
          gallery: [],
          template: 'services',
          layout_config: { header: true, footer: true, sidebar: true },
          menu_order: 3,
          show_in_menu: true,
          show_in_sitemap: true,
          require_auth: false,
          custom_css: '.services-grid { gap: 2rem; }',
          custom_js: '',
          published_at: '2024-01-03T00:00:00Z',
          view_count: 1120,
          tags: ['services', 'construction'],
          categories: ['services'],
          author_id: 'admin',
          performance_score: 85,
          is_amp_enabled: true,
          is_pwa_enabled: false,
          cache_duration: 1800,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-03-12T09:45:00Z',
          created_by: 'admin',
          updated_by: 'admin'
        },
        {
          id: '4',
          title: 'Latest News',
          slug: 'news',
          content_type: 'news',
          status: 'draft',
          excerpt: 'Stay updated with our latest projects and news',
          content: {
            blocks: [
              { type: 'news_list', data: { count: 5, layout: 'grid' } }
            ]
          },
          featured_image: '/images/news-hero.jpg',
          gallery: [],
          template: 'blog',
          layout_config: { header: true, footer: true, sidebar: true },
          menu_order: 4,
          show_in_menu: true,
          show_in_sitemap: true,
          require_auth: false,
          custom_css: '',
          custom_js: '',
          view_count: 0,
          tags: ['news', 'updates'],
          categories: ['news'],
          author_id: 'admin',
          performance_score: 0,
          is_amp_enabled: false,
          is_pwa_enabled: false,
          cache_duration: 900,
          created_at: '2024-03-15T00:00:00Z',
          updated_at: '2024-03-15T00:00:00Z',
          created_by: 'admin',
          updated_by: 'admin'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const fetchTemplates = async () => {
    // Mock API call
    setTimeout(() => {
      setTemplates([
        {
          id: '1',
          name: 'Default Template',
          description: 'Standard layout with header and footer',
          template_type: 'page',
          template_data: { layout: 'default', sections: ['header', 'main', 'footer'] },
          preview_image: '/images/template-default.jpg',
          is_active: true,
          category: 'basic',
          tags: ['default', 'standard'],
          usage_count: 15,
          rating: 4.5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Landing Page',
          description: 'Conversion-focused landing page template',
          template_type: 'landing',
          template_data: { layout: 'landing', sections: ['hero', 'features', 'cta', 'footer'] },
          preview_image: '/images/template-landing.jpg',
          is_active: true,
          category: 'marketing',
          tags: ['landing', 'conversion', 'marketing'],
          usage_count: 8,
          rating: 4.8,
          created_at: '2024-01-05T00:00:00Z',
          updated_at: '2024-01-05T00:00:00Z'
        },
        {
          id: '3',
          name: 'Services Template',
          description: 'Dedicated template for service pages',
          template_type: 'service',
          template_data: { layout: 'services', sections: ['header', 'hero', 'services_grid', 'testimonials', 'footer'] },
          preview_image: '/images/template-services.jpg',
          is_active: true,
          category: 'business',
          tags: ['services', 'business'],
          usage_count: 5,
          rating: 4.3,
          created_at: '2024-01-10T00:00:00Z',
          updated_at: '2024-01-10T00:00:00Z'
        }
      ]);
    }, 800);
  };

  const handleCreate = () => {
    setSelectedPage(null);
    setModalType('create');
    setShowModal(true);
  };

  const handleEdit = (page: ContentPage) => {
    setSelectedPage(page);
    setModalType('edit');
    setShowModal(true);
  };

  const handleView = (page: ContentPage) => {
    setSelectedPage(page);
    setModalType('view');
    setShowModal(true);
  };

  const handleBuilder = (page: ContentPage) => {
    setSelectedPage(page);
    setModalType('builder');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      // Mock delete operation
      console.log('Deleting page:', id);
      setPages(pages.filter(p => p.id !== id));
    }
  };

  const handleSave = async (data: any) => {
    // Mock save operation
    console.log('Saving page:', data);
    setShowModal(false);
    fetchPages();
  };

  const exportPages = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Slug,Type,Status,Views,Performance Score,Last Updated\n" +
      pages.map(page => 
        `"${page.title}","${page.slug}","${page.content_type}","${page.status}","${page.view_count}","${page.performance_score}","${page.updated_at}"`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `content_pages_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: JSX.Element } = {
      page: <FileText className="w-4 h-4" />,
      post: <Type className="w-4 h-4" />,
      service: <Settings className="w-4 h-4" />,
      project_showcase: <Grid3x3 className="w-4 h-4" />,
      testimonial: <User className="w-4 h-4" />,
      team_member: <User className="w-4 h-4" />,
      faq: <FileText className="w-4 h-4" />,
      news: <FileText className="w-4 h-4" />,
      portfolio: <Image className="w-4 h-4" />,
      landing: <Zap className="w-4 h-4" />,
      form: <Layout className="w-4 h-4" />
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || page.content_type === typeFilter;
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  const pageStats = {
    total: pages.length,
    published: pages.filter(p => p.status === 'published').length,
    draft: pages.filter(p => p.status === 'draft').length,
    avgPerformance: Math.round(pages.reduce((sum, p) => sum + p.performance_score, 0) / pages.length),
    totalViews: pages.reduce((sum, p) => sum + p.view_count, 0)
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Create and manage website pages with visual page builder</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportPages}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Page
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-xl font-bold text-gray-900">{pageStats.total}</p>
              </div>
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-xl font-bold text-green-600">{pageStats.published}</p>
              </div>
              <Globe className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-xl font-bold text-yellow-600">{pageStats.draft}</p>
              </div>
              <Edit2 className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className={`text-xl font-bold ${getPerformanceColor(pageStats.avgPerformance)}`}>
                  {pageStats.avgPerformance}
                </p>
              </div>
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-xl font-bold text-orange-600">{pageStats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="page">Pages</option>
            <option value="post">Posts</option>
            <option value="service">Services</option>
            <option value="news">News</option>
            <option value="landing">Landing Pages</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
            <option value="scheduled">Scheduled</option>
            <option value="private">Private</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>

          {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {viewMode === 'list' && (
            <PagesTable 
              pages={filteredPages}
              onEdit={handleEdit}
              onView={handleView}
              onBuilder={handleBuilder}
              onDelete={handleDelete}
              isLoading={isLoading}
              getStatusColor={getStatusColor}
              getTypeIcon={getTypeIcon}
              getPerformanceColor={getPerformanceColor}
            />
          )}
          {viewMode === 'grid' && (
            <PagesGrid 
              pages={filteredPages}
              onEdit={handleEdit}
              onView={handleView}
              onBuilder={handleBuilder}
              onDelete={handleDelete}
              isLoading={isLoading}
              getStatusColor={getStatusColor}
              getTypeIcon={getTypeIcon}
              getPerformanceColor={getPerformanceColor}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <ContentModal
            type={modalType}
            page={selectedPage}
            templates={templates}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
            getTypeIcon={getTypeIcon}
            getStatusColor={getStatusColor}
            activeDevice={activeDevice}
            setActiveDevice={setActiveDevice}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Pages Table Component
const PagesTable: React.FC<{
  pages: ContentPage[];
  onEdit: (page: ContentPage) => void;
  onView: (page: ContentPage) => void;
  onBuilder: (page: ContentPage) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  getStatusColor: (status: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  getPerformanceColor: (score: number) => string;
}> = ({ pages, onEdit, onView, onBuilder, onDelete, isLoading, getStatusColor, getTypeIcon, getPerformanceColor }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {page.featured_image && (
                      <img 
                        src={page.featured_image} 
                        alt={page.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                      <div className="text-xs text-gray-400 max-w-xs truncate">{page.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getTypeIcon(page.content_type)}
                    <span className="ml-2 text-sm text-gray-900 capitalize">{page.content_type.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                    {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">{page.view_count.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BarChart3 className={`w-4 h-4 mr-1 ${getPerformanceColor(page.performance_score)}`} />
                    <span className={`text-sm font-medium ${getPerformanceColor(page.performance_score)}`}>
                      {page.performance_score}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">
                      {new Date(page.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onBuilder(page)}
                      className="text-purple-600 hover:text-purple-900 p-1"
                      title="Page Builder"
                    >
                      <Layout className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onView(page)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(page)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(page.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Pages Grid Component
const PagesGrid: React.FC<{
  pages: ContentPage[];
  onEdit: (page: ContentPage) => void;
  onView: (page: ContentPage) => void;
  onBuilder: (page: ContentPage) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  getStatusColor: (status: string) => string;
  getTypeIcon: (type: string) => JSX.Element;
  getPerformanceColor: (score: number) => string;
}> = ({ pages, onEdit, onView, onBuilder, onDelete, isLoading, getStatusColor, getTypeIcon, getPerformanceColor }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pages.map((page) => (
        <motion.div
          key={page.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Image */}
          <div className="relative h-40 bg-gray-100">
            {page.featured_image ? (
              <img 
                src={page.featured_image} 
                alt={page.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Image className="w-12 h-12" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                {page.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {getTypeIcon(page.content_type)}
                <span className="ml-1 text-xs text-gray-500 capitalize">{page.content_type.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center">
                <BarChart3 className={`w-3 h-3 mr-1 ${getPerformanceColor(page.performance_score)}`} />
                <span className={`text-xs font-medium ${getPerformanceColor(page.performance_score)}`}>
                  {page.performance_score}
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{page.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{page.excerpt}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {page.view_count.toLocaleString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(page.updated_at).toLocaleDateString()}
              </div>
            </div>

            {/* Tags */}
            {page.tags && page.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {page.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                {page.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{page.tags.length - 3}</span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => onBuilder(page)}
                className="flex items-center gap-1 px-2 py-1 text-purple-600 hover:text-purple-900 text-xs"
              >
                <Layout className="w-3 h-3" />
                Builder
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onView(page)}
                  className="p-1 text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(page)}
                  className="p-1 text-indigo-600 hover:text-indigo-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(page.id)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Content Modal Component
const ContentModal: React.FC<{
  type: 'create' | 'edit' | 'view' | 'builder';
  page: ContentPage | null;
  templates: ContentTemplate[];
  onSave: (data: any) => void;
  onClose: () => void;
  getTypeIcon: (type: string) => JSX.Element;
  getStatusColor: (status: string) => string;
  activeDevice: 'desktop' | 'tablet' | 'mobile';
  setActiveDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
}> = ({ type, page, templates, onSave, onClose, getTypeIcon, getStatusColor, activeDevice, setActiveDevice }) => {
  const [formData, setFormData] = useState(page || {
    title: '',
    slug: '',
    content_type: 'page',
    status: 'draft',
    excerpt: '',
    content: { blocks: [] },
    featured_image: '',
    gallery: [],
    template: 'default',
    layout_config: { header: true, footer: true, sidebar: false },
    menu_order: 0,
    show_in_menu: true,
    show_in_sitemap: true,
    require_auth: false,
    custom_css: '',
    custom_js: '',
    tags: [],
    categories: [],
    is_amp_enabled: false,
    is_pwa_enabled: false,
    cache_duration: 3600
  });

  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'seo' | 'performance'>('content');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addBlock = (blockType: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type: blockType,
      data: getDefaultBlockData(blockType),
      order: formData.content.blocks.length
    };
    
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        blocks: [...formData.content.blocks, newBlock]
      }
    });
  };

  const updateBlock = (blockId: string, data: any) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        blocks: formData.content.blocks.map((block: any) => 
          block.id === blockId ? { ...block, data } : block
        )
      }
    });
  };

  const removeBlock = (blockId: string) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        blocks: formData.content.blocks.filter((block: any) => block.id !== blockId)
      }
    });
  };

  const getDefaultBlockData = (blockType: string) => {
    const defaults: { [key: string]: any } = {
      hero: { title: 'Hero Title', subtitle: 'Hero subtitle', button: 'Call to Action' },
      text: { content: 'Your text content here...' },
      image: { src: '', alt: '', caption: '' },
      gallery: { images: [] },
      services: { title: 'Our Services', items: [] },
      testimonials: { title: 'Testimonials', items: [] },
      cta: { title: 'Get Started Today', button: 'Contact Us' },
      form: { title: 'Contact Form', fields: [] }
    };
    return defaults[blockType] || {};
  };

  const blockTypes = [
    { type: 'hero', name: 'Hero Section', icon: <Zap className="w-4 h-4" /> },
    { type: 'text', name: 'Text Block', icon: <Type className="w-4 h-4" /> },
    { type: 'image', name: 'Image', icon: <Image className="w-4 h-4" /> },
    { type: 'gallery', name: 'Gallery', icon: <Grid3x3 className="w-4 h-4" /> },
    { type: 'services', name: 'Services', icon: <Settings className="w-4 h-4" /> },
    { type: 'testimonials', name: 'Testimonials', icon: <User className="w-4 h-4" /> },
    { type: 'cta', name: 'Call to Action', icon: <Zap className="w-4 h-4" /> },
    { type: 'form', name: 'Form', icon: <Layout className="w-4 h-4" /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {formData.content_type && getTypeIcon(formData.content_type)}
            <h3 className="text-lg font-medium text-gray-900">
              {type === 'create' ? 'Create Page' : 
               type === 'edit' ? 'Edit Page' : 
               type === 'builder' ? 'Page Builder' : 'Page Details'}
              {formData.title && ` - ${formData.title}`}
            </h3>
          </div>
          
          {type === 'builder' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDevice('desktop')}
                className={`p-2 rounded ${activeDevice === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveDevice('tablet')}
                className={`p-2 rounded ${activeDevice === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveDevice('mobile')}
                className={`p-2 rounded ${activeDevice === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {type === 'builder' ? (
          /* Page Builder Interface */
          <div className="flex flex-1 overflow-hidden">
            {/* Block Palette */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <h4 className="font-semibold text-gray-900 mb-4">Add Blocks</h4>
              <div className="space-y-2">
                {blockTypes.map(blockType => (
                  <button
                    key={blockType.type}
                    onClick={() => addBlock(blockType.type)}
                    className="w-full flex items-center gap-3 p-3 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {blockType.icon}
                    {blockType.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
              <div className={`mx-auto bg-white shadow-lg ${
                activeDevice === 'desktop' ? 'max-w-6xl' :
                activeDevice === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
              }`}>
                {formData.content.blocks.length === 0 ? (
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Layout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Start building your page by adding blocks from the sidebar</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-4">
                    {formData.content.blocks.map((block: any, index: number) => (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative group border border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => removeBlock(block.id)}
                              className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <BlockEditor 
                          block={block} 
                          onUpdate={(data) => updateBlock(block.id, data)}
                          isEditing={type !== 'view'}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Regular Form Interface */
          <div className="flex-1 overflow-y-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {['content', 'settings', 'seo', 'performance'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                      <select
                        value={formData.content_type || 'page'}
                        onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                      >
                        <option value="page">Page</option>
                        <option value="post">Post</option>
                        <option value="service">Service</option>
                        <option value="news">News</option>
                        <option value="landing">Landing Page</option>
                        <option value="form">Form</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={formData.status || 'draft'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                      <select
                        value={formData.template || 'default'}
                        onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                      >
                        {templates.map(template => (
                          <option key={template.id} value={template.name.toLowerCase()}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                    <input
                      type="url"
                      value={formData.featured_image || ''}
                      onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags ? formData.tags.join(', ') : ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={type === 'view'}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Menu Order</label>
                      <input
                        type="number"
                        value={formData.menu_order || 0}
                        onChange={(e) => setFormData({ ...formData, menu_order: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cache Duration (seconds)</label>
                      <input
                        type="number"
                        value={formData.cache_duration || 3600}
                        onChange={(e) => setFormData({ ...formData, cache_duration: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.show_in_menu || false}
                        onChange={(e) => setFormData({ ...formData, show_in_menu: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                      <span className="text-sm text-gray-700">Show in Navigation Menu</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.show_in_sitemap || false}
                        onChange={(e) => setFormData({ ...formData, show_in_sitemap: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                      <span className="text-sm text-gray-700">Include in Sitemap</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.require_auth || false}
                        onChange={(e) => setFormData({ ...formData, require_auth: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                      <span className="text-sm text-gray-700">Require Authentication</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.is_amp_enabled || false}
                        onChange={(e) => setFormData({ ...formData, is_amp_enabled: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                      <span className="text-sm text-gray-700">Enable AMP</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.is_pwa_enabled || false}
                        onChange={(e) => setFormData({ ...formData, is_pwa_enabled: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={type === 'view'}
                      />
                      <span className="text-sm text-gray-700">PWA Enabled</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom CSS</label>
                    <textarea
                      value={formData.custom_css || ''}
                      onChange={(e) => setFormData({ ...formData, custom_css: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      disabled={type === 'view'}
                      placeholder="/* Custom CSS styles */"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom JavaScript</label>
                    <textarea
                      value={formData.custom_js || ''}
                      onChange={(e) => setFormData({ ...formData, custom_js: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      disabled={type === 'view'}
                      placeholder="// Custom JavaScript code"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">SEO Settings</h4>
                    <p className="text-sm text-blue-700">
                      SEO settings are managed in the separate SEO Management section. 
                      Link this page to existing SEO settings or create new ones.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title Preview</label>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <div className="text-blue-600 text-lg">{formData.title || 'Page Title'}</div>
                      <div className="text-green-600 text-sm">yoursite.com/{formData.slug || 'page-url'}</div>
                      <div className="text-gray-600 text-sm">{formData.excerpt || 'Page description will appear here...'}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Performance Score</h4>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {page?.performance_score || 0}
                      </div>
                      <p className="text-sm text-gray-600">Overall performance rating</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Page Views</h4>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {page?.view_count?.toLocaleString() || 0}
                      </div>
                      <p className="text-sm text-gray-600">Total page views</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">Optimization Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Optimize images for faster loading</li>
                      <li>• Minimize custom CSS and JavaScript</li>
                      <li>• Use appropriate cache duration</li>
                      <li>• Enable AMP for mobile performance</li>
                      <li>• Consider PWA features for engagement</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {type === 'view' ? 'Close' : 'Cancel'}
                </button>
                {type !== 'view' && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Page
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Block Editor Component
const BlockEditor: React.FC<{
  block: any;
  onUpdate: (data: any) => void;
  isEditing: boolean;
}> = ({ block, onUpdate, isEditing }) => {
  const { type, data } = block;

  const renderEditor = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => onUpdate({ ...data, title: e.target.value })}
                  className="w-full px-3 py-2 text-2xl font-bold bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none"
                  placeholder="Hero Title"
                />
                <input
                  type="text"
                  value={data.subtitle || ''}
                  onChange={(e) => onUpdate({ ...data, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none"
                  placeholder="Subtitle"
                />
                <input
                  type="text"
                  value={data.button || ''}
                  onChange={(e) => onUpdate({ ...data, button: e.target.value })}
                  className="w-full px-3 py-2 bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none"
                  placeholder="Button Text"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                <p className="text-xl mb-6">{data.subtitle}</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                  {data.button}
                </button>
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="prose max-w-none">
            {isEditing ? (
              <textarea
                value={data.content || ''}
                onChange={(e) => onUpdate({ ...data, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your text content here..."
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            )}
          </div>
        );

      case 'image':
        return (
          <div className="text-center">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="url"
                  value={data.src || ''}
                  onChange={(e) => onUpdate({ ...data, src: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={data.alt || ''}
                  onChange={(e) => onUpdate({ ...data, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Alt Text"
                />
                <input
                  type="text"
                  value={data.caption || ''}
                  onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Caption (optional)"
                />
              </div>
            ) : (
              <div>
                {data.src ? (
                  <img src={data.src} alt={data.alt} className="max-w-full h-auto rounded-lg mx-auto" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {data.caption && <p className="mt-2 text-sm text-gray-600">{data.caption}</p>}
              </div>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="bg-blue-600 text-white text-center py-8 rounded-lg">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => onUpdate({ ...data, title: e.target.value })}
                  className="w-full px-3 py-2 text-xl font-bold bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none"
                  placeholder="CTA Title"
                />
                <input
                  type="text"
                  value={data.button || ''}
                  onChange={(e) => onUpdate({ ...data, button: e.target.value })}
                  className="w-full px-3 py-2 bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none"
                  placeholder="Button Text"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-4">{data.title}</h3>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                  {data.button}
                </button>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <Type className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Block type: {type}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 capitalize">{type} Block</span>
        {isEditing && (
          <div className="flex items-center gap-1">
            <Move className="w-4 h-4 text-gray-400 cursor-move" />
          </div>
        )}
      </div>
      {renderEditor()}
    </div>
  );
};

export default ContentManagement;