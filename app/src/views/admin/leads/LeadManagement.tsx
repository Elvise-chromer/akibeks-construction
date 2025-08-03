import React, { useState, useEffect } from 'react';
import { 
  HiUsers, 
  HiPhone, 
  HiMail, 
  HiCurrencyDollar,
  HiTrendingUp,
  HiChartBar,
  HiFilter,
  HiSearch,
  HiPlus,
  HiPencil,
  HiTrash,
  HiEye,
  HiDownload,
  HiCalendar,
  HiLocationMarker,
  HiOfficeBuilding,
  HiStar,
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiExclamation,
  HiX
} from 'react-icons/hi';
import { motion } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: 'website' | 'referral' | 'social' | 'cold_call' | 'advertisement';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedValue: number;
  projectType: string;
  location: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
  assignedTo?: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    company: 'ABC Corporation',
    source: 'website',
    status: 'new',
    priority: 'high',
    estimatedValue: 150000,
    projectType: 'Commercial Construction',
    location: 'New York, NY',
    createdAt: '2024-01-15T10:30:00Z',
    notes: 'Interested in office renovation project. Timeline: Q2 2024',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.davis@residentialcorp.com',
    phone: '+1 (555) 987-6543',
    company: 'Residential Corp',
    source: 'referral',
    status: 'qualified',
    priority: 'medium',
    estimatedValue: 75000,
    projectType: 'Residential Renovation',
    location: 'Los Angeles, CA',
    createdAt: '2024-01-12T14:20:00Z',
    lastContact: '2024-01-18T09:15:00Z',
    notes: 'Kitchen and bathroom renovation. Budget confirmed.',
    assignedTo: 'Mike Wilson'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'r.johnson@industrialtech.com',
    phone: '+1 (555) 456-7890',
    company: 'Industrial Tech Solutions',
    source: 'social',
    status: 'proposal',
    priority: 'urgent',
    estimatedValue: 300000,
    projectType: 'Industrial Construction',
    location: 'Chicago, IL',
    createdAt: '2024-01-10T16:45:00Z',
    lastContact: '2024-01-19T11:30:00Z',
    notes: 'Warehouse expansion project. Proposal submitted, awaiting response.',
    assignedTo: 'Sarah Johnson'
  }
];

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);

  // Filter leads based on search and filters
  useEffect(() => {
    let filtered = leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.projectType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    });
    
    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, priorityFilter, sourceFilter]);

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'won': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: Lead['priority']) => {
    switch (priority) {
      case 'low': return <HiCheckCircle className="h-4 w-4" />;
      case 'medium': return <HiClock className="h-4 w-4" />;
             case 'high': return <HiExclamation className="h-4 w-4" />;
      case 'urgent': return <HiXCircle className="h-4 w-4" />;
      default: return <HiClock className="h-4 w-4" />;
    }
  };

  const getSourceIcon = (source: Lead['source']) => {
    switch (source) {
      case 'website': return '🌐';
      case 'referral': return '👥';
      case 'social': return '📱';
      case 'cold_call': return '📞';
      case 'advertisement': return '📢';
      default: return '❓';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate analytics
  const analytics = {
    total: leads.length,
    new: leads.filter(lead => lead.status === 'new').length,
    qualified: leads.filter(lead => lead.status === 'qualified').length,
    proposals: leads.filter(lead => lead.status === 'proposal').length,
    won: leads.filter(lead => lead.status === 'won').length,
    totalValue: leads.reduce((sum, lead) => sum + lead.estimatedValue, 0),
    conversionRate: leads.length > 0 ? (leads.filter(lead => lead.status === 'won').length / leads.length * 100) : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your sales leads</p>
        </div>
        <button
          onClick={() => setShowNewLeadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <HiPlus className="h-5 w-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HiTrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HiChartBar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Proposals</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.proposals}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <HiCurrencyDollar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalValue)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="social">Social</option>
              <option value="cold_call">Cold Call</option>
              <option value="advertisement">Advertisement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <span className="mr-1">{getSourceIcon(lead.source)}</span>
                          {lead.source.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.projectType}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <HiLocationMarker className="h-3 w-3 mr-1" />
                      {lead.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${getPriorityColor(lead.priority)}`}>
                      {getPriorityIcon(lead.priority)}
                      <span className="ml-1 text-sm font-medium capitalize">{lead.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(lead.estimatedValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowLeadDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <HiEye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <HiPencil className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
                <button
                  onClick={() => setShowLeadDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-900">{selectedLead.name}</p>
                      <p className="text-gray-600 flex items-center">
                        <HiMail className="h-4 w-4 mr-2" />
                        {selectedLead.email}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <HiPhone className="h-4 w-4 mr-2" />
                        {selectedLead.phone}
                      </p>
                      {selectedLead.company && (
                        <p className="text-gray-600 flex items-center">
                          <HiOfficeBuilding className="h-4 w-4 mr-2" />
                          {selectedLead.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Project Details</h4>
                    <div className="space-y-2">
                      <p className="text-gray-900">{selectedLead.projectType}</p>
                      <p className="text-gray-600 flex items-center">
                        <HiLocationMarker className="h-4 w-4 mr-2" />
                        {selectedLead.location}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {formatCurrency(selectedLead.estimatedValue)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Priority</h4>
                    <div className={`flex items-center ${getPriorityColor(selectedLead.priority)}`}>
                      {getPriorityIcon(selectedLead.priority)}
                      <span className="ml-1 font-medium capitalize">{selectedLead.priority}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Source</h4>
                    <div className="flex items-center">
                      <span className="mr-2">{getSourceIcon(selectedLead.source)}</span>
                      <span className="capitalize">{selectedLead.source.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                {selectedLead.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.notes}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Created</h4>
                    <p className="text-gray-900 flex items-center">
                      <HiCalendar className="h-4 w-4 mr-2" />
                      {formatDate(selectedLead.createdAt)}
                    </p>
                  </div>

                  {selectedLead.lastContact && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Last Contact</h4>
                      <p className="text-gray-900 flex items-center">
                        <HiCalendar className="h-4 w-4 mr-2" />
                        {formatDate(selectedLead.lastContact)}
                      </p>
                    </div>
                  )}
                </div>

                {selectedLead.assignedTo && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Assigned To</h4>
                    <p className="text-gray-900">{selectedLead.assignedTo}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowLeadDetails(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Lead
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;