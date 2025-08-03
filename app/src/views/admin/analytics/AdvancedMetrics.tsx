import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { motion } from 'framer-motion';
import {
  HiTrendingUp, HiTrendingDown, HiChartBar, HiChartPie, HiCurrencyDollar,
  HiClock, HiUsers, HiOfficeBuilding, HiCalendar, HiGlobe, HiSearch,
  HiFilter, HiDownload, HiRefresh, HiEye, HiMail, HiPhone, HiStar,
  HiLightningBolt, HiCollection, HiClipboard, HiCog, HiDatabase,
  HiServer, HiDeviceMobile, HiDesktopComputer, HiLocationMarker,
  HiColorSwatch, HiSparkles, HiAnnotation, HiBeaker, HiAdjustments,
  HiHeart
} from 'react-icons/hi';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  period: string;
  icon: any;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

interface PerformanceMetric {
  name: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}

interface BusinessMetrics {
  revenue: {
    total: number;
    monthly: number;
    quarterly: number;
    annual: number;
    growth: number;
  };
  projects: {
    total: number;
    active: number;
    completed: number;
    completion_rate: number;
    avg_duration: number;
  };
  clients: {
    total: number;
    active: number;
    new_this_month: number;
    retention_rate: number;
    satisfaction_score: number;
  };
  quotes: {
    total: number;
    acceptance_rate: number;
    avg_value: number;
    conversion_time: number;
    win_rate: number;
  };
  team: {
    total_employees: number;
    productivity_score: number;
    utilization_rate: number;
    overtime_hours: number;
    training_hours: number;
  };
}

interface WebsiteMetrics {
  traffic: {
    unique_visitors: number;
    page_views: number;
    bounce_rate: number;
    avg_session_duration: number;
    conversion_rate: number;
  };
  performance: {
    page_load_time: number;
    core_web_vitals: number;
    uptime: number;
    mobile_score: number;
    seo_score: number;
  };
  engagement: {
    contact_form_submissions: number;
    quote_requests: number;
    newsletter_signups: number;
    social_shares: number;
    return_visitors: number;
  };
}

const AdvancedMetrics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'24h' | '7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'overview' | 'business' | 'website' | 'performance'>('overview');
  const [loading, setLoading] = useState(true);
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics>({
    revenue: {
      total: 15750000,
      monthly: 1200000,
      quarterly: 3600000,
      annual: 14400000,
      growth: 18.5
    },
    projects: {
      total: 127,
      active: 23,
      completed: 104,
      completion_rate: 94.2,
      avg_duration: 45
    },
    clients: {
      total: 89,
      active: 34,
      new_this_month: 8,
      retention_rate: 87.6,
      satisfaction_score: 4.7
    },
    quotes: {
      total: 156,
      acceptance_rate: 68.3,
      avg_value: 285000,
      conversion_time: 12,
      win_rate: 73.1
    },
    team: {
      total_employees: 45,
      productivity_score: 86.2,
      utilization_rate: 82.5,
      overtime_hours: 156,
      training_hours: 240
    }
  });

  const [websiteMetrics, setWebsiteMetrics] = useState<WebsiteMetrics>({
    traffic: {
      unique_visitors: 12450,
      page_views: 34890,
      bounce_rate: 34.2,
      avg_session_duration: 245,
      conversion_rate: 4.8
    },
    performance: {
      page_load_time: 1.2,
      core_web_vitals: 92,
      uptime: 99.8,
      mobile_score: 89,
      seo_score: 94
    },
    engagement: {
      contact_form_submissions: 67,
      quote_requests: 43,
      newsletter_signups: 89,
      social_shares: 234,
      return_visitors: 156
    }
  });

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      name: 'Project Delivery Time',
      current: 42,
      previous: 45,
      target: 40,
      unit: 'days',
      status: 'good'
    },
    {
      name: 'Cost Overrun Rate',
      current: 8.5,
      previous: 12.3,
      target: 5.0,
      unit: '%',
      status: 'warning'
    },
    {
      name: 'Customer Satisfaction',
      current: 4.7,
      previous: 4.5,
      target: 4.8,
      unit: '/5',
      status: 'good'
    },
    {
      name: 'Quote Response Time',
      current: 24,
      previous: 36,
      target: 12,
      unit: 'hours',
      status: 'warning'
    },
    {
      name: 'Employee Productivity',
      current: 86.2,
      previous: 84.1,
      target: 90.0,
      unit: '%',
      status: 'good'
    }
  ]);

  useEffect(() => {
    fetchMetrics();
  }, [selectedPeriod]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const period = selectedPeriod === '24h' ? 'day' : 
                    selectedPeriod === '7d' ? 'week' : 
                    selectedPeriod === '30d' ? 'month' :
                    selectedPeriod === '90d' ? 'quarter' : 'year';

      const [
        financialData,
        operationalData,
        customerData,
        teamData,
        efficiencyData,
        alerts
      ] = await Promise.all([
        api.getFinancialMetrics(period),
        api.getOperationalMetrics(period),
        api.getCustomerMetrics(period),
        api.getTeamMetrics(period),
        api.getEfficiencyMetrics(period),
        api.getAlerts()
      ]);

      // Update business metrics with real data
      setBusinessMetrics({
        revenue: {
          total: financialData.total_revenue || 0,
          monthly: financialData.collected_revenue || 0,
          quarterly: financialData.total_revenue || 0,
          annual: financialData.total_revenue || 0,
          growth: financialData.collection_rate || 0
        },
        projects: {
          total: operationalData.total_projects || 0,
          active: operationalData.active_projects || 0,
          completed: operationalData.completed_projects || 0,
          completion_rate: operationalData.project_completion_rate || 0,
          avg_duration: operationalData.avg_project_duration || 0
        },
        clients: {
          total: customerData.total_clients || 0,
          active: customerData.active_clients || 0,
          new_this_month: customerData.new_clients_this_month || 0,
          retention_rate: customerData.client_retention_rate || 0,
          satisfaction_score: customerData.customer_satisfaction_rate || 0
        },
        quotes: {
          total: financialData.total_quotes || 0,
          acceptance_rate: financialData.quote_acceptance_rate || 0,
          avg_value: financialData.avg_invoice_value || 0,
          conversion_time: customerData.avg_lead_conversion_time || 0,
          win_rate: customerData.lead_conversion_rate || 0
        },
        team: {
          total_employees: teamData.total_employees || 0,
          productivity_score: teamData.on_time_completion_rate || 0,
          utilization_rate: teamData.resource_utilization_rate || 0,
          overtime_hours: teamData.total_hours_logged || 0,
          training_hours: teamData.avg_hours_per_employee || 0
        }
      });

      // You can also update websiteMetrics if you have that data
      // For now, keeping the mock data for website metrics
      
    } catch (error) {
      console.error('Error fetching metrics:', error);
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-KE').format(num);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m ${seconds % 60}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const MetricCard: React.FC<{ metric: MetricCard }> = ({ metric }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
          <div className={`flex items-center mt-2 text-sm ${
            metric.trend === 'up' ? 'text-green-600' : 
            metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {metric.trend === 'up' ? (
              <HiTrendingUp className="h-4 w-4 mr-1" />
            ) : metric.trend === 'down' ? (
              <HiTrendingDown className="h-4 w-4 mr-1" />
            ) : null}
            {metric.change > 0 ? '+' : ''}{metric.change}% {metric.period}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${metric.color}`}>
          <metric.icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const overviewMetrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: formatCurrency(businessMetrics.revenue.total),
      change: businessMetrics.revenue.growth,
      period: 'vs last period',
      icon: HiCurrencyDollar,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Active Projects',
      value: businessMetrics.projects.active,
      change: 12.5,
      period: 'vs last month',
      icon: HiOfficeBuilding,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'New Clients',
      value: businessMetrics.clients.new_this_month,
      change: -5.2,
      period: 'vs last month',
      icon: HiUsers,
      color: 'bg-purple-500',
      trend: 'down'
    },
    {
      title: 'Quote Win Rate',
      value: `${businessMetrics.quotes.win_rate}%`,
      change: 8.3,
      period: 'vs last quarter',
      icon: HiStar,
      color: 'bg-yellow-500',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business metrics and performance insights</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={fetchMetrics}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <HiRefresh className="h-5 w-5" />
            <span>Refresh</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <HiDownload className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: HiChartBar },
              { id: 'business', name: 'Business Metrics', icon: HiCurrencyDollar },
              { id: 'website', name: 'Website Analytics', icon: HiGlobe },
              { id: 'performance', name: 'Performance KPIs', icon: HiLightningBolt }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    selectedCategory === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedCategory === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewMetrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} />
                ))}
              </div>

              {/* Real-time Performance */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <HiLightningBolt className="h-5 w-5 mr-2" />
                  Real-time Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">24</p>
                      </div>
                      <HiUsers className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">System Load</p>
                        <p className="text-2xl font-bold text-gray-900">68%</p>
                      </div>
                      <HiServer className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Response Time</p>
                        <p className="text-2xl font-bold text-gray-900">245ms</p>
                      </div>
                      <HiClock className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Services</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Residential Construction', revenue: 4200000, growth: 15.2 },
                      { name: 'Commercial Projects', revenue: 3800000, growth: 22.8 },
                      { name: 'Renovation Services', revenue: 2100000, growth: -5.4 },
                      { name: 'Interior Design', revenue: 1650000, growth: 8.9 }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(service.revenue)}</p>
                        </div>
                        <div className={`flex items-center text-sm ${service.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {service.growth > 0 ? <HiTrendingUp className="h-4 w-4 mr-1" /> : <HiTrendingDown className="h-4 w-4 mr-1" />}
                          {Math.abs(service.growth)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'project', message: 'Villa Construction project completed', time: '2h ago', icon: HiOfficeBuilding },
                      { type: 'quote', message: 'New quote request received', time: '4h ago', icon: HiClipboard },
                      { type: 'payment', message: 'Payment received for INV-2024-0045', time: '6h ago', icon: HiCurrencyDollar },
                      { type: 'client', message: 'New client registration', time: '8h ago', icon: HiUsers }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <activity.icon className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Metrics Tab */}
          {selectedCategory === 'business' && (
            <div className="space-y-6">
              {/* Revenue Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Revenue Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Monthly</span>
                      <span className="font-medium text-green-900">{formatCurrency(businessMetrics.revenue.monthly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Quarterly</span>
                      <span className="font-medium text-green-900">{formatCurrency(businessMetrics.revenue.quarterly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Annual</span>
                      <span className="font-medium text-green-900">{formatCurrency(businessMetrics.revenue.annual)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-200">
                      <span className="text-sm text-green-700">Growth Rate</span>
                      <span className="font-medium text-green-900">+{businessMetrics.revenue.growth}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Project Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Total Projects</span>
                      <span className="font-medium text-blue-900">{businessMetrics.projects.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Active</span>
                      <span className="font-medium text-blue-900">{businessMetrics.projects.active}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Completed</span>
                      <span className="font-medium text-blue-900">{businessMetrics.projects.completed}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span className="text-sm text-blue-700">Completion Rate</span>
                      <span className="font-medium text-blue-900">{businessMetrics.projects.completion_rate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Client Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Total Clients</span>
                      <span className="font-medium text-purple-900">{businessMetrics.clients.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Active</span>
                      <span className="font-medium text-purple-900">{businessMetrics.clients.active}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">New This Month</span>
                      <span className="font-medium text-purple-900">{businessMetrics.clients.new_this_month}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-purple-200">
                      <span className="text-sm text-purple-700">Retention Rate</span>
                      <span className="font-medium text-purple-900">{businessMetrics.clients.retention_rate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">Team Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-700">Total Employees</span>
                      <span className="font-medium text-yellow-900">{businessMetrics.team.total_employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-700">Productivity Score</span>
                      <span className="font-medium text-yellow-900">{businessMetrics.team.productivity_score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-yellow-700">Utilization Rate</span>
                      <span className="font-medium text-yellow-900">{businessMetrics.team.utilization_rate}%</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-yellow-200">
                      <span className="text-sm text-yellow-700">Training Hours</span>
                      <span className="font-medium text-yellow-900">{businessMetrics.team.training_hours}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Website Analytics Tab */}
          {selectedCategory === 'website' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
                    <HiGlobe className="h-5 w-5 mr-2" />
                    Traffic Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-indigo-700">Unique Visitors</span>
                      <span className="font-medium text-indigo-900">{formatNumber(websiteMetrics.traffic.unique_visitors)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-indigo-700">Page Views</span>
                      <span className="font-medium text-indigo-900">{formatNumber(websiteMetrics.traffic.page_views)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-indigo-700">Bounce Rate</span>
                      <span className="font-medium text-indigo-900">{websiteMetrics.traffic.bounce_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-indigo-700">Avg. Session</span>
                      <span className="font-medium text-indigo-900">{formatDuration(websiteMetrics.traffic.avg_session_duration)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-indigo-200">
                      <span className="text-sm text-indigo-700">Conversion Rate</span>
                      <span className="font-medium text-indigo-900">{websiteMetrics.traffic.conversion_rate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-teal-900 mb-4 flex items-center">
                    <HiLightningBolt className="h-5 w-5 mr-2" />
                    Performance Score
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-teal-700">Page Load Time</span>
                      <span className="font-medium text-teal-900">{websiteMetrics.performance.page_load_time}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-teal-700">Core Web Vitals</span>
                      <span className="font-medium text-teal-900">{websiteMetrics.performance.core_web_vitals}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-teal-700">Uptime</span>
                      <span className="font-medium text-teal-900">{websiteMetrics.performance.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-teal-700">Mobile Score</span>
                      <span className="font-medium text-teal-900">{websiteMetrics.performance.mobile_score}/100</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-teal-200">
                      <span className="text-sm text-teal-700">SEO Score</span>
                      <span className="font-medium text-teal-900">{websiteMetrics.performance.seo_score}/100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center">
                    <HiHeart className="h-5 w-5 mr-2" />
                    Engagement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-700">Contact Forms</span>
                      <span className="font-medium text-pink-900">{websiteMetrics.engagement.contact_form_submissions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-700">Quote Requests</span>
                      <span className="font-medium text-pink-900">{websiteMetrics.engagement.quote_requests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-700">Newsletter Signups</span>
                      <span className="font-medium text-pink-900">{websiteMetrics.engagement.newsletter_signups}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-pink-700">Social Shares</span>
                      <span className="font-medium text-pink-900">{websiteMetrics.engagement.social_shares}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-pink-200">
                      <span className="text-sm text-pink-700">Return Visitors</span>
                      <span className="font-medium text-pink-900">{websiteMetrics.engagement.return_visitors}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance KPIs Tab */}
          {selectedCategory === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                        <div className="flex items-center space-x-6 mt-2">
                          <div>
                            <p className="text-sm text-gray-600">Current</p>
                            <p className="text-xl font-bold text-gray-900">{metric.current}{metric.unit}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Previous</p>
                            <p className="text-lg text-gray-700">{metric.previous}{metric.unit}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Target</p>
                            <p className="text-lg text-gray-700">{metric.target}{metric.unit}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Change</p>
                            <p className={`text-lg font-medium ${
                              metric.current < metric.previous ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {metric.current < metric.previous ? '↓' : '↑'} 
                              {Math.abs(((metric.current - metric.previous) / metric.previous) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'good' ? 'bg-green-500' :
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min((metric.current / metric.target) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetrics;