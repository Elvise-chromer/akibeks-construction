import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiHome,
  HiOfficeBuilding,
  HiUsers,
  HiCog,
  HiChartBar,
  HiDocumentText,
  HiDownload,
  HiBriefcase,
  HiCurrencyDollar,
  HiTrendingUp,
  HiClock,
  HiExclamationCircle,
  HiCheckCircle,
  HiEye,
  HiPlus,
  HiRefresh,
  HiArrowRight
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../lib/AuthContext';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  pendingQuotes: number;
  totalEmployees: number;
  openPositions: number;
  documentsCount: number;
  recentDownloads: number;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'quote' | 'document' | 'user' | 'invoice' | 'security';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    totalRevenue: 0,
    pendingQuotes: 0,
    totalEmployees: 0,
    openPositions: 0,
    documentsCount: 0,
    recentDownloads: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalProjects: 156,
        activeProjects: 23,
        totalRevenue: 850000000, // 850M KES
        pendingQuotes: 12,
        totalEmployees: 45,
        openPositions: 3,
        documentsCount: 1247,
        recentDownloads: 89
      });

      setRecentActivities([
        {
          id: '1',
          type: 'project',
          title: 'New Project Created',
          description: 'Nairobi Tech Hub Phase 2 has been added to the system',
          timestamp: '2 minutes ago',
          user: 'John Akibeks',
          status: 'success'
        },
        {
          id: '2',
          type: 'quote',
          title: 'Quote Approved',
          description: 'Quote QTE-2024-0034 approved for Mombasa Residential Complex',
          timestamp: '15 minutes ago',
          user: 'Sarah Wanjiku',
          status: 'success'
        },
        {
          id: '3',
          type: 'document',
          title: 'Contract Uploaded',
          description: 'Signed contract for Eldoret Shopping Mall uploaded',
          timestamp: '1 hour ago',
          user: 'David Mwangi',
          status: 'info'
        },
        {
          id: '4',
          type: 'invoice',
          title: 'Invoice Generated',
          description: 'Invoice INV-2024-0012 generated for Kisumu Bridge Project',
          timestamp: '2 hours ago',
          user: 'Grace Akinyi',
          status: 'success'
        },
        {
          id: '5',
          type: 'security',
          title: 'Security Alert',
          description: 'Multiple failed login attempts detected',
          timestamp: '3 hours ago',
          user: 'System',
          status: 'warning'
        }
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Create New Project',
      description: 'Start a new construction project',
      icon: HiOfficeBuilding,
      link: '/admin/projects',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Generate Invoice',
      description: 'Create a new invoice',
      icon: HiDocumentText,
      link: '/admin/invoices/new',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Upload Document',
      description: 'Add new project document',
      icon: HiDownload,
      link: '/admin/documents',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Manage Users',
      description: 'Add or manage team members',
      icon: HiUsers,
      link: '/admin/settings',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const managementModules = [
    {
      title: 'Project Management',
      description: 'Manage all construction projects, timelines, and teams',
      icon: HiOfficeBuilding,
      link: '/admin/projects',
      stats: `${stats.activeProjects} Active`,
      color: 'bg-blue-500'
    },
    {
      title: 'Financial Management',
      description: 'Handle invoices, quotations, and financial tracking',
      icon: HiCurrencyDollar,
      link: '/admin/invoices',
      stats: `${stats.pendingQuotes} Pending`,
      color: 'bg-green-500'
    },
    {
      title: 'Document Management',
      description: 'Store, organize, and manage all project documents',
      icon: HiDocumentText,
      link: '/admin/documents',
      stats: `${stats.documentsCount} Documents`,
      color: 'bg-purple-500'
    },
    {
      title: 'Calendar & Scheduling',
      description: 'Manage project timelines and team schedules',
      icon: HiClock,
      link: '/admin/calendar',
      stats: 'Events & Milestones',
      color: 'bg-indigo-500'
    },
    {
      title: 'Team Management',
      description: 'Manage team members, roles, and permissions',
      icon: HiUsers,
      link: '/admin/settings',
      stats: `${stats.totalEmployees} Members`,
      color: 'bg-red-500'
    },
    {
      title: 'Analytics & Reports',
      description: 'View insights, reports, and business analytics',
      icon: HiChartBar,
      link: '/admin/analytics',
      stats: 'Performance Data',
      color: 'bg-teal-500'
    },
    {
      title: 'Content Management',
      description: 'Manage website content, blog posts, and SEO',
      icon: HiDocumentText,
      link: '/admin/content',
      stats: 'Website Content',
      color: 'bg-yellow-500'
    },
    {
      title: 'Security & Audit',
      description: 'Monitor security and view system logs',
      icon: HiExclamationCircle,
      link: '/admin/security',
      stats: 'System Security',
      color: 'bg-gray-500'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return HiOfficeBuilding;
      case 'quote': return HiDocumentText;
      case 'document': return HiDownload;
      case 'user': return HiUsers;
      case 'invoice': return HiCurrencyDollar;
      case 'security': return HiExclamationCircle;
      default: return HiCheckCircle;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <HiExclamationCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Dashboard</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={fetchDashboardData}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <HiRefresh className="-ml-1 mr-2 h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'Admin'}!
              </h1>
              <p className="text-gray-600">Here's your system overview for today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchDashboardData}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <HiRefresh className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <Link
                to="/admin/projects"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                New Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <HiTrendingUp className="w-4 h-4 mr-1" />
                  {stats.activeProjects} active
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <HiOfficeBuilding className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  KES {(stats.totalRevenue / 1000000).toFixed(0)}M
                </p>
                <p className="text-sm text-green-600 flex items-center">
                  <HiTrendingUp className="w-4 h-4 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <HiCurrencyDollar className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEmployees}</p>
                <p className="text-sm text-orange-600 flex items-center">
                  <HiBriefcase className="w-4 h-4 mr-1" />
                  {stats.openPositions} open positions
                </p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <HiUsers className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingQuotes}</p>
                <p className="text-sm text-purple-600 flex items-center">
                  <HiClock className="w-4 h-4 mr-1" />
                  Requires attention
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <HiDocumentText className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={action.link}
                  className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 group border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${action.color} rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <div className="flex items-center text-orange-600 text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Get started</span>
                    <HiArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Management Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Management Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {managementModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={module.link}
                    className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 group border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${module.color} rounded-lg p-3 group-hover:scale-110 transition-transform`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">{module.stats}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <Link
                to="/admin/audit"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="space-y-4">
                <AnimatePresence>
                  {recentActivities.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`rounded-full p-2 ${getActivityColor(activity.status)}`}>
                          <ActivityIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500">by {activity.user}</p>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-600">
                <HiCheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">All systems operational</span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/security"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                System Health
              </Link>
              <Link
                to="/admin/audit"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Logs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;