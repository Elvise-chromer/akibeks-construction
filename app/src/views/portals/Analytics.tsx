import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiUsers, FiDollarSign, FiCalendar, FiBarChart3, FiPieChart, FiActivity, FiTarget, FiAward, FiRefreshCw, FiDownload, FiFilter, FiEye, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  color: string;
}

interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onTimeDelivery: number;
  customerSatisfaction: number;
  averageProjectValue: number;
}

interface FinancialMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  profitMargin: number;
  outstandingInvoices: number;
  revenueGrowth: number;
}

interface ChartData {
  month: string;
  revenue: number;
  projects: number;
  clients: number;
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([]);
  const [projectMetrics, setProjectMetrics] = useState<ProjectMetrics | null>(null);
  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    setKpiMetrics([
      {
        id: '1',
        title: 'Total Revenue',
        value: 'KES 15.2M',
        change: 12.5,
        changeType: 'increase',
        icon: FiDollarSign,
        color: 'text-green-600'
      },
      {
        id: '2',
        title: 'Active Projects',
        value: '24',
        change: 8.2,
        changeType: 'increase',
        icon: FiActivity,
        color: 'text-blue-600'
      },
      {
        id: '3',
        title: 'New Clients',
        value: '18',
        change: -3.1,
        changeType: 'decrease',
        icon: FiUsers,
        color: 'text-purple-600'
      },
      {
        id: '4',
        title: 'Completion Rate',
        value: '94%',
        change: 5.7,
        changeType: 'increase',
        icon: FiTarget,
        color: 'text-orange-600'
      }
    ]);

    setProjectMetrics({
      totalProjects: 147,
      activeProjects: 24,
      completedProjects: 123,
      onTimeDelivery: 89,
      customerSatisfaction: 92,
      averageProjectValue: 850000
    });

    setFinancialMetrics({
      totalRevenue: 15200000,
      monthlyRevenue: 1350000,
      profitMargin: 18.5,
      outstandingInvoices: 2400000,
      revenueGrowth: 23.8
    });

    setChartData([
      { month: 'Jan', revenue: 950000, projects: 8, clients: 12 },
      { month: 'Feb', revenue: 1100000, projects: 10, clients: 15 },
      { month: 'Mar', revenue: 1250000, projects: 12, clients: 18 },
      { month: 'Apr', revenue: 1180000, projects: 11, clients: 16 },
      { month: 'May', revenue: 1350000, projects: 14, clients: 22 },
      { month: 'Jun', revenue: 1420000, projects: 15, clients: 25 },
      { month: 'Jul', revenue: 1380000, projects: 13, clients: 24 },
      { month: 'Aug', revenue: 1500000, projects: 16, clients: 28 },
      { month: 'Sep', revenue: 1450000, projects: 15, clients: 26 },
      { month: 'Oct', revenue: 1620000, projects: 18, clients: 30 },
      { month: 'Nov', revenue: 1580000, projects: 17, clients: 29 },
      { month: 'Dec', revenue: 1680000, projects: 19, clients: 32 }
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getMaxValue = (data: ChartData[], key: keyof ChartData) => {
    return Math.max(...data.map(item => item[key] as number));
  };

  const renderKPICards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiMetrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center mt-2">
                {metric.changeType === 'increase' ? (
                  <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <FiArrowDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-full bg-gray-50 ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderChart = () => {
    const maxRevenue = getMaxValue(chartData, 'revenue');
    const maxProjects = getMaxValue(chartData, 'projects');
    const maxClients = getMaxValue(chartData, 'clients');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="revenue">Revenue</option>
              <option value="projects">Projects</option>
              <option value="clients">Clients</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="12months">Last 12 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="3months">Last 3 Months</option>
            </select>
            <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
              <FiDownload className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-80 flex items-end space-x-2">
          {chartData.map((data, index) => {
            let value, maxValue, color;
            switch (selectedMetric) {
              case 'revenue':
                value = data.revenue;
                maxValue = maxRevenue;
                color = 'bg-blue-500';
                break;
              case 'projects':
                value = data.projects;
                maxValue = maxProjects;
                color = 'bg-green-500';
                break;
              case 'clients':
                value = data.clients;
                maxValue = maxClients;
                color = 'bg-purple-500';
                break;
              default:
                value = data.revenue;
                maxValue = maxRevenue;
                color = 'bg-blue-500';
            }

            const height = (value / maxValue) * 280;

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full ${color} rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer`}
                  style={{ height: `${height}px` }}
                  title={`${data.month}: ${selectedMetric === 'revenue' ? formatCurrency(value) : value}`}
                />
                <p className="text-xs text-gray-600 mt-2">{data.month}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderProjectMetrics = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Analytics</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{projectMetrics?.totalProjects}</p>
            <p className="text-sm text-gray-600">Total Projects</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{projectMetrics?.activeProjects}</p>
            <p className="text-sm text-gray-600">Active Projects</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">On-Time Delivery</span>
            <span className="text-sm text-gray-600">{projectMetrics?.onTimeDelivery}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${projectMetrics?.onTimeDelivery}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
            <span className="text-sm text-gray-600">{projectMetrics?.customerSatisfaction}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${projectMetrics?.customerSatisfaction}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Average Project Value</span>
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(projectMetrics?.averageProjectValue || 0)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderFinancialMetrics = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Overview</h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(financialMetrics?.totalRevenue || 0)}
          </p>
          <div className="flex items-center mt-1">
            <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">{financialMetrics?.revenueGrowth}% growth</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(financialMetrics?.monthlyRevenue || 0)}
            </p>
            <p className="text-xs text-gray-600">Monthly Revenue</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">
              {formatPercentage(financialMetrics?.profitMargin || 0)}
            </p>
            <p className="text-xs text-gray-600">Profit Margin</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Outstanding Invoices</span>
            <span className="text-lg font-semibold text-orange-600">
              {formatCurrency(financialMetrics?.outstandingInvoices || 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ 
                width: `${((financialMetrics?.outstandingInvoices || 0) / (financialMetrics?.totalRevenue || 1)) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderRecentActivity = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {[
          { action: 'New project started', project: 'Modern Villa Construction', time: '2 hours ago', type: 'success' },
          { action: 'Invoice generated', project: 'Office Renovation', time: '4 hours ago', type: 'info' },
          { action: 'Project milestone completed', project: 'Shopping Complex', time: '6 hours ago', type: 'success' },
          { action: 'Payment received', project: 'Residential Building', time: '1 day ago', type: 'success' },
          { action: 'Contract signed', project: 'Industrial Warehouse', time: '2 days ago', type: 'info' },
        ].map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full ${
              activity.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {activity.type === 'success' ? (
                <FiAward className="w-4 h-4" />
              ) : (
                <FiActivity className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-600">{activity.project}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        View All Activity
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Business insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiRefreshCw className="w-4 h-4" />
                <span>Refresh Data</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <FiDownload className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        {renderKPICards()}

        {/* Chart */}
        {renderChart()}

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {renderProjectMetrics()}
          {renderFinancialMetrics()}
          {renderRecentActivity()}
        </div>
      </main>
    </div>
  );
};

export default Analytics;