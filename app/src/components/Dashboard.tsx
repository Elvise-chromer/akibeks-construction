import React from 'react';
import { 
  HiUsers, 
  HiCog, 
  HiChartBar,
  HiCalendar
} from 'react-icons/hi';
import { formatCurrency } from '../lib/utils';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

const Dashboard: React.FC = () => {
  // Mock data - replace with real API calls later
  const stats: StatCard[] = [
    {
      title: 'Total Projects',
      value: 24,
      change: '+12%',
      changeType: 'positive',
      icon: HiCog,
    },
    {
      title: 'Active Projects',
      value: 8,
      change: '+3%',
      changeType: 'positive', 
      icon: HiChartBar,
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(2450000),
      change: '+18%',
      changeType: 'positive',
      icon: HiUsers,
    },
    {
      title: 'This Month',
      value: formatCurrency(450000),
      change: '+8%',
      changeType: 'positive',
      icon: HiCalendar,
    },
  ];

  const recentProjects = [
    { id: 1, name: 'Modern Villa Construction', status: 'In Progress', progress: 65 },
    { id: 2, name: 'Office Complex Renovation', status: 'Planning', progress: 25 },
    { id: 3, name: 'Shopping Mall Development', status: 'Completed', progress: 100 },
    { id: 4, name: 'Residential Apartment', status: 'In Progress', progress: 80 },
  ];

  const getChangeColor = (type: StatCard['changeType']) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          New Project
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${getChangeColor(stat.changeType)}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              Add New Project
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              Generate Report
            </button>
            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              View All Projects
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Project completed: Modern Villa</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">New lead received</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Payment pending approval</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Status</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-gray-600">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;