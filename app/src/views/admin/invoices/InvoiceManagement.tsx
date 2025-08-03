import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { motion } from 'framer-motion';
import {
  HiPlus, HiSearch, HiFilter, HiDownload, HiEye, HiPencil, HiTrash,
  HiDocumentText, HiMail, HiClock, HiCheck, HiX, HiExclamation,
  HiCurrencyDollar, HiTrendingUp, HiTrendingDown, HiRefresh,
  HiCalendar, HiUser, HiOfficeBuilding, HiChartBar, HiCollection,
  HiBell, HiSortAscending, HiDuplicate, HiArchive, HiPrinter,
  HiClipboard, HiCog, HiShieldCheck, HiLockClosed
} from 'react-icons/hi';

interface InvoiceItem {
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

interface InvoiceSection {
  id: string;
  name: string;
  description?: string;
  section_order: number;
  items: InvoiceItem[];
  material_cost: number;
  labour_cost: number;
}

interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  project_name?: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  sections: InvoiceSection[];
  subtotal: number;
  total_material_cost: number;
  total_labour_cost: number;
  labour_rate: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  created_at: string;
  updated_at: string;
  sent_at?: string;
  viewed_at?: string;
  paid_at?: string;
  payment_method?: string;
  notes?: string;
}

interface InvoiceMetrics {
  total_invoices: number;
  total_revenue: number;
  pending_amount: number;
  overdue_amount: number;
  paid_invoices: number;
  draft_invoices: number;
  average_invoice_value: number;
  payment_rate: number;
  overdue_rate: number;
  monthly_revenue: number;
  revenue_growth: number;
}

const InvoiceManagement: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [metrics, setMetrics] = useState<InvoiceMetrics>({
    total_invoices: 0,
    total_revenue: 0,
    pending_amount: 0,
    overdue_amount: 0,
    paid_invoices: 0,
    draft_invoices: 0,
    average_invoice_value: 0,
    payment_rate: 0,
    overdue_rate: 0,
    monthly_revenue: 0,
    revenue_growth: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'analytics'>('list');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data when filters change
  useEffect(() => {
    fetchInvoices();
  }, [searchQuery, statusFilter, sortBy, sortOrder]);

  // Fetch metrics on mount
  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sort_by: sortBy,
        sort_order: sortOrder.toUpperCase() as 'ASC' | 'DESC'
      };
      
      const response = await api.getInvoices(params) as any;
      setInvoices(response.invoices || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      // Fallback to empty array on error
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await api.getInvoiceMetrics() as any;
      setMetrics(response);
    } catch (error) {
      console.error('Error fetching invoice metrics:', error);
      // Keep default metrics on error
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return HiDocumentText;
      case 'sent': return HiMail;
      case 'viewed': return HiEye;
      case 'paid': return HiCheck;
      case 'overdue': return HiExclamation;
      case 'cancelled': return HiX;
      default: return HiDocumentText;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (invoice.project_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const invoiceDate = new Date(invoice.issue_date);
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          matchesDate = invoiceDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = invoiceDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = invoiceDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setIsEditing(true);
    setShowInvoiceModal(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditing(true);
    setShowInvoiceModal(true);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditing(false);
    setShowInvoiceModal(true);
  };

  const handleDeleteInvoices = async () => {
    if (selectedInvoices.length > 0) {
      try {
        setLoading(true);
        await api.bulkInvoiceAction('delete', selectedInvoices);
        
        // Refresh data after successful deletion
        await fetchInvoices();
        await fetchMetrics();
        
        // Clear selection
        setSelectedInvoices([]);
        
        console.log('Invoices deleted successfully');
      } catch (error) {
        console.error('Error deleting invoices:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedInvoices.length === 0) return;
    
    try {
      setLoading(true);
      await api.bulkInvoiceAction(action, selectedInvoices);
      
      // Refresh data after successful action
      await fetchInvoices();
      await fetchMetrics();
      
      // Clear selection
      setSelectedInvoices([]);
      
      // Show success message (you might want to add a toast notification here)
      console.log(`Bulk ${action} completed successfully`);
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
      // Show error message (you might want to add a toast notification here)
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
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600 mt-1">Manage your invoices with sections and advanced features</p>
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
            onClick={handleCreateInvoice}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <HiPlus className="h-5 w-5" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Revenue"
          value={formatCurrency(metrics.total_revenue)}
          icon={HiCurrencyDollar}
          color="bg-green-500"
          trend={metrics.revenue_growth}
        />
        <MetricsCard
          title="Pending Amount"
          value={formatCurrency(metrics.pending_amount)}
          icon={HiClock}
          color="bg-yellow-500"
        />
        <MetricsCard
          title="Overdue Amount"
          value={formatCurrency(metrics.overdue_amount)}
          icon={HiExclamation}
          color="bg-red-500"
        />
        <MetricsCard
          title="Payment Rate"
          value={`${metrics.payment_rate}%`}
          icon={HiCheck}
          color="bg-blue-500"
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
                placeholder="Search invoices..."
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
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
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
              onClick={() => fetchInvoices()}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <HiRefresh className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedInvoices.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedInvoices.length} invoice(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('send')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Send
                </button>
                <button
                  onClick={() => handleBulkAction('mark_paid')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Mark Paid
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  Export
                </button>
                <button
                  onClick={handleDeleteInvoices}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invoice List/Grid */}
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
                      checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoices(filteredInvoices.map(inv => inv.id));
                        } else {
                          setSelectedInvoices([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
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
                    Due Date
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
                        <span className="ml-3 text-gray-600">Loading invoices...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <HiDocumentText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No invoices found</p>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => {
                    const StatusIcon = getStatusIcon(invoice.status);
                    return (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedInvoices([...selectedInvoices, invoice.id]);
                              } else {
                                setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.invoice_number}</div>
                            {invoice.project_name && (
                              <div className="text-sm text-gray-500">{invoice.project_name}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.client_name}</div>
                            <div className="text-sm text-gray-500">{invoice.client_email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.total_amount)}</div>
                            {invoice.balance_due > 0 && (
                              <div className="text-sm text-red-600">Due: {formatCurrency(invoice.balance_due)}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(invoice.due_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewInvoice(invoice)}
                              className="text-gray-400 hover:text-gray-600"
                              title="View"
                            >
                              <HiEye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditInvoice(invoice)}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Status Distribution</h3>
            <div className="space-y-3">
              {[
                { status: 'paid', count: metrics.paid_invoices, color: 'bg-green-500' },
                { status: 'sent', count: 6, color: 'bg-blue-500' },
                { status: 'draft', count: metrics.draft_invoices, color: 'bg-gray-500' },
                { status: 'overdue', count: 3, color: 'bg-red-500' }
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Invoice Value</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(metrics.average_invoice_value)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(metrics.monthly_revenue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue Growth</span>
                <span className="text-sm font-medium text-green-600">+{metrics.revenue_growth}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Collection Rate</span>
                <span className="text-sm font-medium text-gray-900">{metrics.payment_rate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Features */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <HiShieldCheck className="h-5 w-5 mr-2 text-green-600" />
          Security & Audit Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <HiLockClosed className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Secure Access</p>
              <p className="text-xs text-green-700">Role-based permissions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <HiClipboard className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Audit Trail</p>
              <p className="text-xs text-blue-700">All actions logged</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <HiBell className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Alerts</p>
              <p className="text-xs text-yellow-700">Overdue notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagement;