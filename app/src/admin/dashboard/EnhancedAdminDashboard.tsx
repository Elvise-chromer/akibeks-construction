import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, IconButton } from '../../components/icons/IconSystem';
import { useCompanyInfo } from '../../hooks/useCompanyInfo';

interface DashboardMetrics {
  financial: {
    totalRevenue: number;
    monthlyRevenue: number;
    pendingInvoices: number;
    overdueInvoices: number;
    revenueGrowth: number;
  };
  projects: {
    activeProjects: number;
    completedThisMonth: number;
    totalProjects: number;
    projectsOnHold: number;
    avgCompletionTime: number;
  };
  team: {
    totalEmployees: number;
    activeEmployees: number;
    tasksCompleted: number;
    efficiency: number;
  };
  clients: {
    totalClients: number;
    newClientsThisMonth: number;
    satisfactionScore: number;
    retentionRate: number;
  };
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
  badge?: number;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'invoice' | 'user' | 'system';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
}

const EnhancedAdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [showNotifications, setShowNotifications] = useState(false);
  const { companyInfo } = useCompanyInfo();

  const quickActions: QuickAction[] = [
    {
      id: 'new-quote',
      title: 'Create Quote',
      description: 'Generate a new project quote',
      icon: 'documentAdd',
      color: 'bg-blue-500',
      action: () => console.log('Create quote'),
      badge: 3
    },
    {
      id: 'new-invoice',
      title: 'New Invoice',
      description: 'Issue invoice to client',
      icon: 'receipt',
      color: 'bg-green-500',
      action: () => console.log('Create invoice')
    },
    {
      id: 'add-project',
      title: 'Add Project',
      description: 'Start a new construction project',
      icon: 'building',
      color: 'bg-purple-500',
      action: () => console.log('Add project')
    },
    {
      id: 'manage-team',
      title: 'Team Management',
      description: 'Assign tasks and manage team',
      icon: 'users',
      color: 'bg-orange-500',
      action: () => console.log('Manage team'),
      badge: 5
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Detailed business analytics',
      icon: 'chartBar',
      color: 'bg-indigo-500',
      action: () => console.log('View analytics')
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: 'settings',
      color: 'bg-gray-500',
      action: () => console.log('Settings')
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'project',
      title: 'Project Milestone Completed',
      description: 'Karen Villa Phase 2 foundation completed',
      timestamp: '2 hours ago',
      icon: 'checkCircle',
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'invoice',
      title: 'Payment Received',
      description: 'Invoice #INV-2024-001 payment of KES 2.5M received',
      timestamp: '4 hours ago',
      icon: 'cash',
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'user',
      title: 'New Team Member',
      description: 'John Mwangi joined as Site Engineer',
      timestamp: '1 day ago',
      icon: 'userAdd',
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'system',
      title: 'System Backup',
      description: 'Daily backup completed successfully',
      timestamp: '2 days ago',
      icon: 'server',
      color: 'text-gray-600'
    }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics({
        financial: {
          totalRevenue: 25000000,
          monthlyRevenue: 3200000,
          pendingInvoices: 12,
          overdueInvoices: 3,
          revenueGrowth: 15.5
        },
        projects: {
          activeProjects: 8,
          completedThisMonth: 3,
          totalProjects: 47,
          projectsOnHold: 2,
          avgCompletionTime: 145
        },
        team: {
          totalEmployees: 24,
          activeEmployees: 22,
          tasksCompleted: 156,
          efficiency: 87.5
        },
        clients: {
          totalClients: 89,
          newClientsThisMonth: 7,
          satisfactionScore: 4.8,
          retentionRate: 94.2
        }
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Icon name="refresh" size="xl" color="primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Welcome Section */}
            <div className="flex items-center space-x-4">
              {companyInfo?.logo_url && (
                <img 
                  src={companyInfo.logo_url} 
                  alt="Company Logo" 
                  className="h-12 w-12 object-contain rounded-lg"
                />
              )}
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {getGreeting()}, Administrator!
                </motion.h1>
                <p className="text-sm text-gray-600">
                  {companyInfo?.name || 'Akibeks Construction'} - Dashboard Overview
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Period Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['today', 'week', 'month', 'year'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      selectedPeriod === period
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>

              {/* Notifications */}
              <div className="relative">
                <IconButton
                  name="bell"
                  variant="ghost"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>

              {/* Refresh */}
              <IconButton
                name="refresh"
                variant="ghost"
                onClick={fetchDashboardData}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Financial Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="cash" size="lg" color="success" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                +{metrics?.financial.revenueGrowth}%
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(metrics?.financial.totalRevenue || 0)}
              </p>
              <p className="text-sm text-gray-600">
                {formatCurrency(metrics?.financial.monthlyRevenue || 0)} this month
              </p>
            </div>
          </motion.div>

          {/* Projects Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="building" size="lg" color="info" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                {metrics?.projects.completedThisMonth} completed
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Projects</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {metrics?.projects.activeProjects}
              </p>
              <p className="text-sm text-gray-600">
                {metrics?.projects.totalProjects} total projects
              </p>
            </div>
          </motion.div>

          {/* Team Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="users" size="lg" color="secondary" />
              </div>
              <span className="text-sm font-medium text-purple-600">
                {metrics?.team.efficiency}% efficient
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Team</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {metrics?.team.activeEmployees}
              </p>
              <p className="text-sm text-gray-600">
                {metrics?.team.totalEmployees} total employees
              </p>
            </div>
          </motion.div>

          {/* Clients Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="heart" size="lg" color="warning" />
              </div>
              <span className="text-sm font-medium text-orange-600">
                {metrics?.clients.satisfactionScore}/5 rating
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Clients</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {metrics?.clients.totalClients}
              </p>
              <p className="text-sm text-gray-600">
                +{metrics?.clients.newClientsThisMonth} new this month
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="relative p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`${action.color} p-3 rounded-lg text-white group-hover:shadow-lg transition-shadow`}>
                        <Icon name={action.icon as any} size="md" color="white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    {action.badge && (
                      <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {action.badge}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <IconButton name="refresh" variant="ghost" size="sm" />
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <Icon name={activity.icon as any} size="md" className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all activities
              </button>
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Icon name="server" size="lg" color="success" />
              <div>
                <p className="font-medium text-gray-900">Database</p>
                <p className="text-sm text-green-600">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="cloud" size="lg" color="success" />
              <div>
                <p className="font-medium text-gray-900">Backups</p>
                <p className="text-sm text-green-600">Up to date</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="shield" size="lg" color="success" />
              <div>
                <p className="font-medium text-gray-900">Security</p>
                <p className="text-sm text-green-600">Protected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="lightning" size="lg" color="warning" />
              <div>
                <p className="font-medium text-gray-900">Performance</p>
                <p className="text-sm text-yellow-600">Good</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;