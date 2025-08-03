import React, { useState, useEffect } from 'react';
import {
  Home,
  FolderOpen,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Building
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  estimatedCost: number;
  actualCost?: number;
  location: string;
  description: string;
  projectManager: string;
  lastUpdate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  projectId: string;
  category: 'contract' | 'permit' | 'drawing' | 'invoice' | 'certificate' | 'report';
  url: string;
}

interface Message {
  id: string;
  subject: string;
  from: string;
  date: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  preview: string;
  projectId?: string;
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  projectId: string;
  description: string;
}

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Sample data - in real app, this would come from API
    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'Modern Family Home',
        status: 'in_progress',
        progress: 65,
        startDate: '2024-01-15',
        endDate: '2024-08-30',
        estimatedCost: 4500000,
        actualCost: 2925000,
        location: 'Kileleshwa, Nairobi',
        description: 'A modern 4-bedroom family home with contemporary design features',
        projectManager: 'John Manager',
        lastUpdate: '2024-01-12'
      },
      {
        id: '2',
        name: 'Office Renovation',
        status: 'completed',
        progress: 100,
        startDate: '2023-10-01',
        endDate: '2023-12-15',
        estimatedCost: 1200000,
        actualCost: 1150000,
        location: 'Westlands, Nairobi',
        description: 'Complete office space renovation with modern amenities',
        projectManager: 'Mary Engineer',
        lastUpdate: '2023-12-15'
      }
    ];

    const sampleDocuments: Document[] = [
      {
        id: '1',
        name: 'Building Contract Agreement',
        type: 'PDF',
        size: '2.4 MB',
        uploadDate: '2024-01-10',
        projectId: '1',
        category: 'contract',
        url: '/documents/contract-001.pdf'
      },
      {
        id: '2',
        name: 'Architectural Drawings v3',
        type: 'PDF',
        size: '15.8 MB',
        uploadDate: '2024-01-08',
        projectId: '1',
        category: 'drawing',
        url: '/documents/drawings-v3.pdf'
      },
      {
        id: '3',
        name: 'Building Permit',
        type: 'PDF',
        size: '1.2 MB',
        uploadDate: '2024-01-05',
        projectId: '1',
        category: 'permit',
        url: '/documents/permit-001.pdf'
      }
    ];

    const sampleMessages: Message[] = [
      {
        id: '1',
        subject: 'Foundation Inspection Scheduled',
        from: 'John Manager',
        date: '2024-01-12',
        read: false,
        priority: 'high',
        preview: 'Your foundation inspection has been scheduled for January 15th at 9:00 AM...',
        projectId: '1'
      },
      {
        id: '2',
        subject: 'Weekly Progress Update',
        from: 'Site Supervisor',
        date: '2024-01-10',
        read: true,
        priority: 'medium',
        preview: 'This week we completed the ground floor slab and started on the first floor...',
        projectId: '1'
      }
    ];

    const sampleInvoices: Invoice[] = [
      {
        id: '1',
        number: 'INV-2024-001',
        amount: 1500000,
        dueDate: '2024-01-20',
        status: 'pending',
        projectId: '1',
        description: 'Foundation and ground floor construction'
      },
      {
        id: '2',
        number: 'INV-2023-045',
        amount: 1150000,
        dueDate: '2023-12-30',
        status: 'paid',
        projectId: '2',
        description: 'Office renovation - Final payment'
      }
    ];

    setProjects(sampleProjects);
    setDocuments(sampleDocuments);
    setMessages(sampleMessages);
    setInvoices(sampleInvoices);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'planning': return 'text-yellow-600 bg-yellow-100';
      case 'on_hold': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'contract': return <FileText className="w-4 h-4" />;
      case 'permit': return <CheckCircle className="w-4 h-4" />;
      case 'drawing': return <Building className="w-4 h-4" />;
      case 'invoice': return <DollarSign className="w-4 h-4" />;
      case 'certificate': return <CheckCircle className="w-4 h-4" />;
      case 'report': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;
  const pendingInvoicesCount = invoices.filter(i => i.status === 'pending').length;
  const activeProjectsCount = projects.filter(p => p.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, James Mwangi</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <Bell className="w-5 h-5" />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadMessagesCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JM</span>
                </div>
                <span className="text-sm font-medium text-gray-900">James Mwangi</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Home },
              { id: 'projects', name: 'Projects', icon: Building },
              { id: 'documents', name: 'Documents', icon: FolderOpen },
              { id: 'invoices', name: 'Invoices', icon: DollarSign },
              { id: 'messages', name: 'Messages', icon: MessageSquare },
              { id: 'support', name: 'Support', icon: Phone }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                  {tab.id === 'messages' && unreadMessagesCount > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {unreadMessagesCount}
                    </span>
                  )}
                  {tab.id === 'invoices' && pendingInvoicesCount > 0 && (
                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                      {pendingInvoicesCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-blue-600">{activeProjectsCount}</p>
                  </div>
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingInvoicesCount}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                    <p className="text-2xl font-bold text-red-600">{unreadMessagesCount}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-red-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents</p>
                    <p className="text-2xl font-bold text-green-600">{documents.length}</p>
                  </div>
                  <FolderOpen className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Messages */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {messages.slice(0, 3).map((message) => (
                    <div key={message.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${message.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${message.read ? 'text-gray-600' : 'text-gray-900'}`}>
                            {message.subject}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(message.date)} • {message.from}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all messages →
                  </button>
                </div>
              </div>

              {/* Project Progress */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Project Progress</h3>
                </div>
                <div className="p-6 space-y-4">
                  {projects.filter(p => p.status === 'in_progress').map((project) => (
                    <div key={project.id}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                        <span className="text-sm text-gray-500">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Last updated: {formatDate(project.lastUpdate)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all projects →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Start Date</span>
                          <p className="font-medium">{formatDate(project.startDate)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">End Date</span>
                          <p className="font-medium">{formatDate(project.endDate)}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Estimated Cost</span>
                          <p className="font-medium">{formatCurrency(project.estimatedCost)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Actual Cost</span>
                          <p className="font-medium">
                            {project.actualCost ? formatCurrency(project.actualCost) : 'TBD'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>

                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>Project Manager: {project.projectManager}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="divide-y divide-gray-200">
                {documents
                  .filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((document) => (
                    <div key={document.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(document.category)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900">{document.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{document.type}</span>
                            <span>{document.size}</span>
                            <span>Uploaded {formatDate(document.uploadDate)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{invoice.number}</h4>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-500">Due: {formatDate(invoice.dueDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <div key={message.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${message.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${message.read ? 'text-gray-600' : 'text-gray-900'}`}>
                            {message.subject}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            message.priority === 'high' ? 'bg-red-100 text-red-800' :
                            message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {message.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{message.preview}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span>{formatDate(message.date)}</span>
                          <span>From: {message.from}</span>
                          {message.projectId && (
                            <span>Project: {projects.find(p => p.id === message.projectId)?.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Support & Contact</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">+254-XXX-XXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">support@akibeks.co.ke</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Office</p>
                      <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Support Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Send Message</p>
                        <p className="text-xs text-gray-500">Contact your project manager</p>
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Schedule Meeting</p>
                        <p className="text-xs text-gray-500">Book a consultation</p>
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Request Documents</p>
                        <p className="text-xs text-gray-500">Ask for specific documents</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;