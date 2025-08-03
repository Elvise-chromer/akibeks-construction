import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiPlus, HiSearch, HiFilter, HiEye, HiPencil, HiTrash, HiSave,
  HiCog, HiGlobe, HiDocument, HiFolder, HiCode,
  HiTemplate, HiCollection, HiDownload, HiUpload, HiRefresh,
  HiDuplicate, HiArchive, HiLockClosed, HiCheck, HiX,
  HiExclamation, HiInformationCircle, HiStar, HiBell,
  HiClipboard, HiLink, HiTag, HiCalendar, HiUser
} from 'react-icons/hi';

interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'published' | 'draft' | 'archived';
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  template: string;
  created_at: string;
  updated_at: string;
  author: string;
  page_type: 'static' | 'dynamic' | 'landing';
  seo_score: number;
  views: number;
}

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_type: string;
  file_size: number;
  download_count: number;
  is_featured: boolean;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface SEOSettings {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  canonical_url?: string;
  robots: string;
  schema_markup?: string;
}

const WebsiteContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'downloads' | 'seo' | 'media'>('pages');
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<'page' | 'download' | 'seo' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'pages':
          await fetchPages();
          break;
        case 'downloads':
          await fetchDownloads();
          break;
        case 'seo':
          await fetchSEOSettings();
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPages = async () => {
    // Mock data - replace with API call
    const mockPages: WebsitePage[] = [
      {
        id: '1',
        title: 'Home Page',
        slug: '/',
        content: '<h1>Welcome to Akibeks Construction</h1><p>Professional construction services...</p>',
        excerpt: 'Professional construction services in Kenya',
        status: 'published',
        meta_title: 'Akibeks Construction - Professional Building Services in Kenya',
        meta_description: 'Leading construction company in Kenya providing residential, commercial, and industrial building services.',
        featured_image: '/images/hero/home.jpg',
        template: 'home',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        author: 'Admin',
        page_type: 'static',
        seo_score: 85,
        views: 15420
      },
      {
        id: '2',
        title: 'About Us',
        slug: '/about',
        content: '<h1>About Akibeks Construction</h1><p>Founded in 2010...</p>',
        excerpt: 'Learn about our company history and mission',
        status: 'published',
        meta_title: 'About Akibeks Construction - Our Story & Mission',
        meta_description: 'Discover the history, mission, and values of Akibeks Construction. Over 15 years of excellence in building.',
        featured_image: '/images/about/company.jpg',
        template: 'about',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-10T14:20:00Z',
        author: 'Admin',
        page_type: 'static',
        seo_score: 78,
        views: 8950
      },
      {
        id: '3',
        title: 'Services',
        slug: '/services',
        content: '<h1>Our Construction Services</h1><p>We offer comprehensive construction services...</p>',
        excerpt: 'Comprehensive construction services for all project types',
        status: 'published',
        meta_title: 'Construction Services - Residential, Commercial & Industrial',
        meta_description: 'Professional construction services including residential homes, commercial buildings, and industrial facilities.',
        featured_image: '/images/services/overview.jpg',
        template: 'services',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-12T09:15:00Z',
        author: 'Admin',
        page_type: 'static',
        seo_score: 82,
        views: 12300
      }
    ];
    setPages(mockPages);
  };

  const fetchDownloads = async () => {
    // Mock data - replace with API call
    const mockDownloads: DownloadItem[] = [
      {
        id: '1',
        title: 'Company Profile 2024',
        description: 'Comprehensive company profile with services and portfolio',
        category: 'brochures',
        file_url: '/downloads/company-profile-2024.pdf',
        file_type: 'PDF',
        file_size: 8500000,
        download_count: 2847,
        is_featured: true,
        status: 'active',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        title: 'Residential Services Catalog',
        description: 'Detailed catalog of residential construction services',
        category: 'catalogs',
        file_url: '/downloads/residential-catalog-2024.pdf',
        file_type: 'PDF',
        file_size: 12200000,
        download_count: 1956,
        is_featured: true,
        status: 'active',
        created_at: '2024-01-10T00:00:00Z',
        updated_at: '2024-01-10T00:00:00Z'
      }
    ];
    setDownloads(mockDownloads);
  };

  const fetchSEOSettings = async () => {
    // Mock data - replace with API call
    const mockSEO: SEOSettings[] = [
      {
        id: '1',
        page_path: '/',
        title: 'Akibeks Construction - Professional Building Services in Kenya',
        description: 'Leading construction company in Kenya providing residential, commercial, and industrial building services with over 15 years of experience.',
        keywords: ['construction Kenya', 'building services', 'residential construction', 'commercial buildings'],
        og_title: 'Akibeks Construction - Kenya\'s Premier Construction Company',
        og_description: 'Professional construction services in Kenya. Residential, commercial, and industrial buildings.',
        og_image: '/images/og/home.jpg',
        twitter_title: 'Akibeks Construction - Building Excellence in Kenya',
        twitter_description: 'Professional construction services in Kenya. Quality buildings, on-time delivery.',
        canonical_url: 'https://akibeks.com/',
        robots: 'index, follow',
        schema_markup: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Akibeks Construction",
          "url": "https://akibeks.com"
        })
      }
    ];
    setSeoSettings(mockSEO);
  };

  const handleSave = async (item: any) => {
    try {
      if (activeTab === 'pages') {
        // Save page logic
        console.log('Saving page:', item);
      } else if (activeTab === 'downloads') {
        // Save download logic
        console.log('Saving download:', item);
      } else if (activeTab === 'seo') {
        // Save SEO settings logic
        console.log('Saving SEO settings:', item);
      }
      setShowModal(null);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      // Delete logic based on activeTab
      console.log('Deleting item:', id);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = () => {
    let data: any[] = [];
    switch (activeTab) {
      case 'pages':
        data = pages;
        break;
      case 'downloads':
        data = downloads;
        break;
      case 'seo':
        data = seoSettings;
        break;
    }
    
    if (!searchTerm) return data;
    
    return data.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Website Content Management</h1>
              <p className="text-gray-600 mt-2">Manage your website pages, downloads, and SEO settings</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(activeTab as any)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <HiPlus className="w-4 h-4" />
                <span>Add {activeTab.slice(0, -1)}</span>
              </button>
              <button
                onClick={fetchData}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <HiRefresh className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { key: 'pages', label: 'Website Pages', icon: HiDocument },
                { key: 'downloads', label: 'Downloads', icon: HiDownload },
                { key: 'seo', label: 'SEO Settings', icon: HiGlobe },
                { key: 'media', label: 'Media Library', icon: HiFolder }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                    activeTab === key
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <HiFilter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <HiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {/* Pages Tab */}
              {activeTab === 'pages' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SEO Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData().map((page: WebsitePage) => (
                        <tr key={page.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {page.featured_image ? (
                                  <img src={page.featured_image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                                ) : (
                                  <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <HiDocument className="h-5 w-5 text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{page.title}</div>
                                <div className="text-sm text-gray-500">{page.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${getSEOScoreColor(page.seo_score)}`}>
                                {page.seo_score}%
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                                <div 
                                  className={`h-2 rounded-full ${page.seo_score >= 80 ? 'bg-green-500' : page.seo_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${page.seo_score}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {page.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(page.updated_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => window.open(page.slug, '_blank')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <HiEye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingItem(page);
                                  setShowModal('page');
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <HiPencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(page.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <HiTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Downloads Tab */}
              {activeTab === 'downloads' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Downloads
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData().map((download: DownloadItem) => (
                        <tr key={download.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                  <HiDocument className="h-5 w-5 text-primary-600" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                  {download.title}
                                  {download.is_featured && (
                                    <HiStar className="w-4 h-4 text-yellow-500 ml-2" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{download.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              {download.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatFileSize(download.file_size)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {download.download_count.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(download.status)}`}>
                              {download.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => window.open(download.file_url, '_blank')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <HiDownload className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingItem(download);
                                  setShowModal('download');
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <HiPencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(download.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <HiTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keywords
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData().map((seo: SEOSettings) => (
                        <tr key={seo.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{seo.page_path}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{seo.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">{seo.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {seo.keywords.slice(0, 3).map((keyword, index) => (
                                <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  {keyword}
                                </span>
                              ))}
                              {seo.keywords.length > 3 && (
                                <span className="text-xs text-gray-500">+{seo.keywords.length - 3} more</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingItem(seo);
                                  setShowModal('seo');
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <HiPencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(seo.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <HiTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="p-6">
                  <div className="text-center py-12">
                    <HiFolder className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Media Library</h3>
                    <p className="mt-1 text-sm text-gray-500">Upload and manage images, videos, and other media files.</p>
                    <div className="mt-6">
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                        <HiUpload className="w-4 h-4" />
                        <span>Upload Media</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modals would go here */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingItem ? 'Edit' : 'Add'} {showModal}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(null);
                      setEditingItem(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Modal content based on type */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter title..."
                    />
                  </div>
                  
                  {showModal === 'page' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="/page-url"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Page content..."
                        />
                      </div>
                    </>
                  )}
                  
                  {showModal === 'download' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="File description..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="brochures">Brochures</option>
                          <option value="catalogs">Catalogs</option>
                          <option value="technical">Technical Documents</option>
                          <option value="certificates">Certificates</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {showModal === 'seo' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="SEO meta description..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleSave(editingItem)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <HiSave className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(null);
                      setEditingItem(null);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteContentManagement;