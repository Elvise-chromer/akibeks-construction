import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { motion } from 'framer-motion';
import {
  HiPlus, HiSearch, HiFilter, HiDownload, HiEye, HiPencil, HiTrash,
  HiDocumentText, HiMail, HiClock, HiCheck, HiX, HiExclamation,
  HiCurrencyDollar, HiTrendingUp, HiTrendingDown, HiRefresh,
  HiCalendar, HiUser, HiOfficeBuilding, HiChartBar, HiCollection,
  HiBell, HiSortAscending, HiDuplicate, HiArchive, HiPrinter,
  HiClipboard, HiCog, HiShieldCheck, HiLockClosed, HiStar
} from 'react-icons/hi';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  is_material: boolean;
  notes?: string;
  category?: string;
}

interface QuotationSection {
  id: string;
  name: string;
  description?: string;
  section_order: number;
  items: QuotationItem[];
  material_cost: number;
  labour_cost: number;
}

interface Quotation {
  id: string;
  quote_number: string;
  client_name: string;
  client_email: string;
  project_name?: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'revised';
  quote_date: string;
  valid_until: string;
  sections: QuotationSection[];
  subtotal: number;
  total_material_cost: number;
  total_labour_cost: number;
  labour_rate: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
  sent_at?: string;
  viewed_at?: string;
  accepted_at?: string;
  rejected_at?: string;
  notes?: string;
  rejection_reason?: string;
  converted_to_project?: boolean;
}

interface QuotationMetrics {
  total_quotations: number;
  total_quote_value: number;
  pending_quotes: number;
  accepted_quotes: number;
  rejected_quotes: number;
  expired_quotes: number;
  acceptance_rate: number;
  average_quote_value: number;
  conversion_rate: number;
  monthly_quotes: number;
  quote_growth: number;
}

const QuotationManagement: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [metrics, setMetrics] = useState<QuotationMetrics>({
    total_quotations: 0,
    total_quote_value: 0,
    pending_quotes: 0,
    accepted_quotes: 0,
    rejected_quotes: 0,
    expired_quotes: 0,
    acceptance_rate: 0,
    average_quote_value: 0,
    conversion_rate: 0,
    monthly_quotes: 0,
    quote_growth: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'analytics'>('list');
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch data when filters change
  useEffect(() => {
    fetchQuotations();
  }, [searchQuery, statusFilter, sortBy, sortOrder]);

  // Fetch metrics on mount
  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sort_by: sortBy,
        sort_order: sortOrder.toUpperCase() as 'ASC' | 'DESC'
      };
      
      const response = await api.getQuotes(params) as any;
      setQuotations(response.quotes || []);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      // Fallback to empty array on error
      setQuotations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await api.getQuoteMetrics() as any;
      setMetrics(response);
    } catch (error) {
      console.error('Error fetching quote metrics:', error);
      // Keep default metrics on error
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      case 'revised': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return HiDocumentText;
      case 'sent': return HiMail;
      case 'viewed': return HiEye;
      case 'accepted': return HiCheck;
      case 'rejected': return HiX;
      case 'expired': return HiClock;
      case 'revised': return HiPencil;
      default: return HiDocumentText;
    }
  };

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quotation.quote_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (quotation.project_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const quoteDate = new Date(quotation.quote_date);
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          matchesDate = quoteDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = quoteDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = quoteDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleCreateQuotation = () => {
    setSelectedQuotation(null);
    setIsEditing(true);
    setShowQuotationModal(true);
  };

  const handleEditQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsEditing(true);
    setShowQuotationModal(true);
  };

  const handleViewQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsEditing(false);
    setShowQuotationModal(true);
  };

  const handleDeleteQuotations = async () => {
    if (selectedQuotations.length > 0) {
      try {
        setLoading(true);
        await api.bulkQuoteAction('delete', selectedQuotations);
        
        // Refresh data after successful deletion
        await fetchQuotations();
        await fetchMetrics();
        
        // Clear selection
        setSelectedQuotations([]);
        
        console.log('Quotations deleted successfully');
      } catch (error) {
        console.error('Error deleting quotations:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedQuotations.length === 0) return;
    
    try {
      setLoading(true);
      await api.bulkQuoteAction(action, selectedQuotations);
      
      // Refresh data after successful action
      await fetchQuotations();
      await fetchMetrics();
      
      // Clear selection
      setSelectedQuotations([]);
      
      console.log(`Bulk ${action} completed successfully`);
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const MetricsCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <HiTrendingUp className="h-4 w-4 mr-1" /> : <HiTrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotation Management</h1>
          <p className="text-gray-600 mt-1">Manage your quotations with sections and labour calculations</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <HiCollection className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <HiDocumentText className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`p-2 rounded-lg ${viewMode === 'analytics' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <HiChartBar className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={handleCreateQuotation}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <HiPlus className="h-5 w-5" />
            <span>Create Quote</span>
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Quote Value"
          value={formatCurrency(metrics.total_quote_value)}
          icon={HiCurrencyDollar}
          color="bg-blue-500"
          trend={metrics.quote_growth}
        />
        <MetricsCard
          title="Acceptance Rate"
          value={`${metrics.acceptance_rate}%`}
          icon={HiCheck}
          color="bg-green-500"
        />
        <MetricsCard
          title="Pending Quotes"
          value={metrics.pending_quotes}
          icon={HiClock}
          color="bg-yellow-500"
        />
        <MetricsCard
          title="Conversion Rate"
          value={`${metrics.conversion_rate}%`}
          icon={HiStar}
          color="bg-purple-500"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search quotations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="viewed">Viewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
              <option value="revised">Revised</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
            
            <button
              onClick={() => fetchQuotations()}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <HiRefresh className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedQuotations.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedQuotations.length} quotation(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('send')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Send
                </button>
                <button
                  onClick={() => handleBulkAction('accept')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleBulkAction('convert')}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  Convert to Project
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  Export
                </button>
                <button
                  onClick={handleDeleteQuotations}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quotation List */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={selectedQuotations.length === filteredQuotations.length && filteredQuotations.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedQuotations(filteredQuotations.map(q => q.id));
                        } else {
                          setSelectedQuotations([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quote
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        <span className="ml-3 text-gray-600">Loading quotations...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredQuotations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <HiDocumentText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No quotations found</p>
                    </td>
                  </tr>
                ) : (
                  filteredQuotations.map((quotation) => {
                    const StatusIcon = getStatusIcon(quotation.status);
                    const isExpiringSoon = new Date(quotation.valid_until) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                    
                    return (
                      <tr key={quotation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={selectedQuotations.includes(quotation.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedQuotations([...selectedQuotations, quotation.id]);
                              } else {
                                setSelectedQuotations(selectedQuotations.filter(id => id !== quotation.id));
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{quotation.quote_number}</div>
                            {quotation.project_name && (
                              <div className="text-sm text-gray-500">{quotation.project_name}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{quotation.client_name}</div>
                            <div className="text-sm text-gray-500">{quotation.client_email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                          </span>
                          {quotation.converted_to_project && (
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                Converted
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(quotation.total_amount)}</div>
                            <div className="text-sm text-gray-500">
                              Material: {formatCurrency(quotation.total_material_cost)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Labour: {formatCurrency(quotation.total_labour_cost)} ({quotation.labour_rate}%)
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${isExpiringSoon ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                            {new Date(quotation.valid_until).toLocaleDateString()}
                            {isExpiringSoon && (
                              <div className="text-xs text-red-500">Expiring soon</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewQuotation(quotation)}
                              className="text-gray-400 hover:text-gray-600"
                              title="View"
                            >
                              <HiEye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditQuotation(quotation)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <HiPencil className="h-4 w-4" />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900"
                              title="Send"
                            >
                              <HiMail className="h-4 w-4" />
                            </button>
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              title="Print"
                            >
                              <HiPrinter className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics View */}
      {viewMode === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Status Distribution</h3>
            <div className="space-y-3">
              {[
                { status: 'accepted', count: metrics.accepted_quotes, color: 'bg-green-500' },
                { status: 'pending', count: metrics.pending_quotes, color: 'bg-yellow-500' },
                { status: 'rejected', count: metrics.rejected_quotes, color: 'bg-red-500' },
                { status: 'expired', count: metrics.expired_quotes, color: 'bg-orange-500' }
              ].map(({ status, count, color }) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
                  </div>
                  <span className="text-sm text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Quote Value</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(metrics.average_quote_value)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Quotes</span>
                <span className="text-sm font-medium text-gray-900">{metrics.monthly_quotes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quote Growth</span>
                <span className="text-sm font-medium text-green-600">+{metrics.quote_growth}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Win Rate</span>
                <span className="text-sm font-medium text-gray-900">{metrics.acceptance_rate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Features */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <HiShieldCheck className="h-5 w-5 mr-2 text-green-600" />
          Security & Workflow Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <HiLockClosed className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Access Control</p>
              <p className="text-xs text-green-700">Role-based quote management</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <HiClipboard className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Automated Workflow</p>
              <p className="text-xs text-blue-700">Quote to project conversion</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <HiBell className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Smart Alerts</p>
              <p className="text-xs text-yellow-700">Expiry and follow-up reminders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationManagement;