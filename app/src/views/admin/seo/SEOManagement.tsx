import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Settings,
  Globe,
  TrendingUp,
  Link,
  FileText,
  BarChart3,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Save,
  RefreshCw,
  Download,
  Upload,
  Eye,
  AlertCircle,
  CheckCircle,
  Target,
  Zap,
  Share2,
  Hash,
  Image,
  Calendar,
  Clock
} from 'lucide-react';

interface SEOSettings {
  id: string;
  page_slug: string;
  page_title: string;
  meta_description: string;
  meta_keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  canonical_url: string;
  robots_meta: string;
  schema_markup: any;
  custom_head_tags: string;
  priority: number;
  changefreq: string;
  last_modified: string;
  is_indexed: boolean;
  created_at: string;
  updated_at: string;
}

interface SEORedirect {
  id: string;
  source_url: string;
  destination_url: string;
  redirect_type: number;
  is_active: boolean;
  hit_count: number;
  created_at: string;
  updated_at: string;
}

interface SitemapEntry {
  id: string;
  url: string;
  priority: number;
  changefreq: string;
  last_modified: string;
  is_active: boolean;
  auto_generated: boolean;
  created_at: string;
}

interface SEOAnalytics {
  page_slug: string;
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_time_on_page: number;
  search_keywords: string[];
  core_web_vitals_score: number;
  lighthouse_score: any;
}

const SEOManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'redirects' | 'sitemap' | 'analytics'>('settings');
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [redirects, setRedirects] = useState<SEORedirect[]>([]);
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([]);
  const [analytics, setAnalytics] = useState<SEOAnalytics[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SEOSettings | SEORedirect | SitemapEntry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'view'>('create');

  // Mock data - replace with actual API calls
  useEffect(() => {
    fetchSEOData();
  }, [activeTab]);

  const fetchSEOData = async () => {
    setIsLoading(true);
    // Mock API calls
    setTimeout(() => {
      if (activeTab === 'settings') {
        setSeoSettings([
          {
            id: '1',
            page_slug: 'home',
            page_title: 'Professional Construction Services | BuildCorp',
            meta_description: 'Leading construction company providing quality residential and commercial building services with over 10 years of experience.',
            meta_keywords: ['construction', 'building', 'residential', 'commercial'],
            og_title: 'Professional Construction Services',
            og_description: 'Quality construction services you can trust',
            og_image: '/images/og-home.jpg',
            og_type: 'website',
            twitter_card: 'summary_large_image',
            twitter_title: 'BuildCorp - Construction Excellence',
            twitter_description: 'Professional construction services',
            twitter_image: '/images/twitter-home.jpg',
            canonical_url: 'https://buildcorp.com/',
            robots_meta: 'index,follow',
            schema_markup: { "@type": "Organization", "name": "BuildCorp" },
            custom_head_tags: '',
            priority: 1.0,
            changefreq: 'weekly',
            last_modified: '2024-01-15T10:30:00Z',
            is_indexed: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            page_slug: 'services',
            page_title: 'Construction Services | Residential & Commercial | BuildCorp',
            meta_description: 'Comprehensive construction services including residential building, commercial construction, renovations, and project management.',
            meta_keywords: ['services', 'residential construction', 'commercial building'],
            og_title: 'Our Construction Services',
            og_description: 'Full range of construction and building services',
            og_image: '/images/og-services.jpg',
            og_type: 'website',
            twitter_card: 'summary_large_image',
            twitter_title: 'BuildCorp Services',
            twitter_description: 'Construction and building services',
            twitter_image: '/images/twitter-services.jpg',
            canonical_url: 'https://buildcorp.com/services',
            robots_meta: 'index,follow',
            schema_markup: { "@type": "Service" },
            custom_head_tags: '',
            priority: 0.8,
            changefreq: 'monthly',
            last_modified: '2024-01-10T09:15:00Z',
            is_indexed: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-10T09:15:00Z'
          }
        ]);
      } else if (activeTab === 'redirects') {
        setRedirects([
          {
            id: '1',
            source_url: '/old-services',
            destination_url: '/services',
            redirect_type: 301,
            is_active: true,
            hit_count: 45,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          },
          {
            id: '2',
            source_url: '/contact-us',
            destination_url: '/contact',
            redirect_type: 301,
            is_active: true,
            hit_count: 23,
            created_at: '2024-01-05T00:00:00Z',
            updated_at: '2024-01-05T00:00:00Z'
          }
        ]);
      } else if (activeTab === 'sitemap') {
        setSitemapEntries([
          {
            id: '1',
            url: 'https://buildcorp.com/',
            priority: 1.0,
            changefreq: 'weekly',
            last_modified: '2024-01-15T10:30:00Z',
            is_active: true,
            auto_generated: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: '2',
            url: 'https://buildcorp.com/services',
            priority: 0.8,
            changefreq: 'monthly',
            last_modified: '2024-01-10T09:15:00Z',
            is_active: true,
            auto_generated: true,
            created_at: '2024-01-01T00:00:00Z'
          }
        ]);
      } else if (activeTab === 'analytics') {
        setAnalytics([
          {
            page_slug: 'home',
            page_views: 1250,
            unique_visitors: 890,
            bounce_rate: 35.2,
            avg_time_on_page: 145,
            search_keywords: ['construction company', 'building services', 'contractors'],
            core_web_vitals_score: 85,
            lighthouse_score: { performance: 92, accessibility: 89, seo: 95 }
          },
          {
            page_slug: 'services',
            page_views: 890,
            unique_visitors: 670,
            bounce_rate: 28.5,
            avg_time_on_page: 195,
            search_keywords: ['construction services', 'residential building', 'commercial construction'],
            core_web_vitals_score: 78,
            lighthouse_score: { performance: 88, accessibility: 92, seo: 93 }
          }
        ]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setModalType('create');
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setModalType('edit');
    setShowModal(true);
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setModalType('view');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Mock delete operation
      console.log('Deleting item:', id);
    }
  };

  const handleSave = async (data: any) => {
    // Mock save operation
    console.log('Saving data:', data);
    setShowModal(false);
    fetchSEOData();
  };

  const generateSitemap = async () => {
    setIsLoading(true);
    // Mock sitemap generation
    setTimeout(() => {
      console.log('Sitemap generated');
      setIsLoading(false);
    }, 2000);
  };

  const exportData = () => {
    const dataToExport = activeTab === 'settings' ? seoSettings : 
                        activeTab === 'redirects' ? redirects : 
                        activeTab === 'sitemap' ? sitemapEntries : analytics;
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(dataToExport[0] || {}).join(',') + '\n' +
      dataToExport.map(row => Object.values(row).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `seo_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = () => {
    const data = activeTab === 'settings' ? seoSettings : 
                 activeTab === 'redirects' ? redirects : 
                 activeTab === 'sitemap' ? sitemapEntries : analytics;
    
    return data.filter((item: any) => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const tabs = [
    { id: 'settings', label: 'SEO Settings', icon: Settings, count: seoSettings.length },
    { id: 'redirects', label: 'Redirects', icon: Link, count: redirects.length },
    { id: 'sitemap', label: 'Sitemap', icon: Globe, count: sitemapEntries.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: analytics.length }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Management</h1>
            <p className="text-gray-600">Optimize your website's search engine performance</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            {activeTab === 'sitemap' && (
              <button
                onClick={generateSitemap}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Generate Sitemap
              </button>
            )}
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search SEO data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'settings' && (
            <SEOSettingsTable 
              data={filteredData()} 
              onEdit={handleEdit} 
              onView={handleView} 
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}
          {activeTab === 'redirects' && (
            <RedirectsTable 
              data={filteredData()} 
              onEdit={handleEdit} 
              onView={handleView} 
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}
          {activeTab === 'sitemap' && (
            <SitemapTable 
              data={filteredData()} 
              onEdit={handleEdit} 
              onView={handleView} 
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsView 
              data={filteredData()} 
              isLoading={isLoading}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <SEOModal
            type={modalType}
            activeTab={activeTab}
            item={selectedItem}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// SEO Settings Table Component
const SEOSettingsTable: React.FC<{
  data: SEOSettings[];
  onEdit: (item: SEOSettings) => void;
  onView: (item: SEOSettings) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}> = ({ data, onEdit, onView, onDelete, isLoading }) => {
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">/{item.page_slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{item.page_title}</div>
                  <div className="text-xs text-gray-500 max-w-xs truncate">{item.meta_description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Target className={`w-4 h-4 mr-1 ${item.priority >= 0.8 ? 'text-green-500' : item.priority >= 0.5 ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-900">{item.priority}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.is_indexed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.is_indexed ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Indexed
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Not Indexed
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(item.last_modified).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(item)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900 p-1"
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

// Redirects Table Component
const RedirectsTable: React.FC<{
  data: SEORedirect[];
  onEdit: (item: SEORedirect) => void;
  onView: (item: SEORedirect) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}> = ({ data, onEdit, onView, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.source_url}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ExternalLink className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{item.destination_url}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.redirect_type === 301 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.redirect_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">{item.hit_count}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(item)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900 p-1"
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

// Sitemap Table Component
const SitemapTable: React.FC<{
  data: SitemapEntry[];
  onEdit: (item: SitemapEntry) => void;
  onView: (item: SitemapEntry) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}> = ({ data, onEdit, onView, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Freq</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 max-w-xs truncate">{item.url}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Target className={`w-4 h-4 mr-1 ${item.priority >= 0.8 ? 'text-green-500' : item.priority >= 0.5 ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-900">{item.priority}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 capitalize">{item.changefreq}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(item.last_modified).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.auto_generated ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.auto_generated ? 'Auto' : 'Manual'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(item)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900 p-1"
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

// Analytics View Component
const AnalyticsView: React.FC<{
  data: SEOAnalytics[];
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Page Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.reduce((sum, item) => sum + item.page_views, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.reduce((sum, item) => sum + item.unique_visitors, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {(data.reduce((sum, item) => sum + item.bounce_rate, 0) / data.length).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Core Web Vitals</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(data.reduce((sum, item) => sum + item.core_web_vitals_score, 0) / data.length)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Page Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Core Web Vitals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keywords</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">/{item.page_slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.page_views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.unique_visitors.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      item.bounce_rate < 30 ? 'text-green-600' : 
                      item.bounce_rate < 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.bounce_rate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.floor(item.avg_time_on_page / 60)}m {item.avg_time_on_page % 60}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        item.core_web_vitals_score >= 80 ? 'bg-green-500' : 
                        item.core_web_vitals_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-gray-900">{item.core_web_vitals_score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.search_keywords.slice(0, 3).map((keyword, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {keyword}
                        </span>
                      ))}
                      {item.search_keywords.length > 3 && (
                        <span className="text-xs text-gray-500">+{item.search_keywords.length - 3} more</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// SEO Modal Component
const SEOModal: React.FC<{
  type: 'create' | 'edit' | 'view';
  activeTab: string;
  item: any;
  onSave: (data: any) => void;
  onClose: () => void;
}> = ({ type, activeTab, item, onSave, onClose }) => {
  const [formData, setFormData] = useState(item || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

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
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {type === 'create' ? 'Create' : type === 'edit' ? 'Edit' : 'View'} {activeTab}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeTab === 'settings' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Slug</label>
                <input
                  type="text"
                  value={formData.page_slug || ''}
                  onChange={(e) => setFormData({ ...formData, page_slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={formData.page_title || ''}
                  onChange={(e) => setFormData({ ...formData, page_title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={formData.meta_description || ''}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.priority || 0.5}
                    onChange={(e) => setFormData({ ...formData, priority: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Change Frequency</label>
                  <select
                    value={formData.changefreq || 'monthly'}
                    onChange={(e) => setFormData({ ...formData, changefreq: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'redirects' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source URL</label>
                <input
                  type="text"
                  value={formData.source_url || ''}
                  onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination URL</label>
                <input
                  type="text"
                  value={formData.destination_url || ''}
                  onChange={(e) => setFormData({ ...formData, destination_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Redirect Type</label>
                  <select
                    value={formData.redirect_type || 301}
                    onChange={(e) => setFormData({ ...formData, redirect_type: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value={301}>301 (Permanent)</option>
                    <option value={302}>302 (Temporary)</option>
                    <option value={307}>307 (Temporary)</option>
                    <option value={308}>308 (Permanent)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.is_active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'sitemap' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={type === 'view'}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.priority || 0.5}
                    onChange={(e) => setFormData({ ...formData, priority: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Change Frequency</label>
                  <select
                    value={formData.changefreq || 'monthly'}
                    onChange={(e) => setFormData({ ...formData, changefreq: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="never">Never</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.is_active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={type === 'view'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
                Save
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SEOManagement;