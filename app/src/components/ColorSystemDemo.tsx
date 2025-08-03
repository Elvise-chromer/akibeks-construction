import React from 'react';
import { motion } from 'framer-motion';
import {
  HiCheckCircle, HiExclamationCircle, HiInformationCircle,
  HiClock, HiCalendar, HiUser, HiBuilding, HiCog,
  HiCurrencyDollar, HiChartBar, HiDocumentText, HiClipboard
} from 'react-icons/hi';
import {
  getStatusColor,
  getPriorityColor,
  getCategoryColor,
  getProgressColor,
  getFinancialColor,
  getCalendarColor,
  statusColors,
  priorityColors,
  categoryColors,
  progressColors,
  financialColors,
  calendarColors
} from '../lib/colors';

const ColorSystemDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Akibeks Construction Color System
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive color coding for better visual hierarchy and user experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HiCheckCircle className="w-6 h-6 mr-2 text-green-500" />
              Status Colors
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(statusColors).slice(0, 5).map(([status, colors]) => (
                    <div key={status} className={`p-3 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                      <div className="font-medium capitalize">{status.replace('_', ' ')}</div>
                      <div className="text-sm opacity-75">Project Status</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoice Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(statusColors).slice(5, 10).map(([status, colors]) => (
                    <div key={status} className={`p-3 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                      <div className="font-medium capitalize">{status}</div>
                      <div className="text-sm opacity-75">Invoice Status</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quotation Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(statusColors).slice(10).map(([status, colors]) => (
                    <div key={status} className={`p-3 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                      <div className="font-medium capitalize">{status}</div>
                      <div className="text-sm opacity-75">Quotation Status</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Priority Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HiExclamationCircle className="w-6 h-6 mr-2 text-orange-500" />
              Priority Colors
            </h2>
            <div className="space-y-4">
              {Object.entries(priorityColors).map(([priority, colors]) => (
                <div key={priority} className={`p-4 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize text-lg">{priority}</div>
                      <div className="text-sm opacity-75">Priority Level</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${colors.icon} flex items-center justify-center`}>
                      {priority === 'urgent' && <HiExclamationCircle className="w-5 h-5" />}
                      {priority === 'high' && <HiInformationCircle className="w-5 h-5" />}
                      {priority === 'medium' && <HiClock className="w-5 h-5" />}
                      {priority === 'low' && <HiCheckCircle className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HiBuilding className="w-6 h-6 mr-2 text-blue-500" />
              Category Colors
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(categoryColors).map(([category, colors]) => (
                <div key={category} className={`p-4 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize">{category}</div>
                      <div className="text-sm opacity-75">Project Type</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${colors.icon} flex items-center justify-center`}>
                      <HiBuilding className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HiChartBar className="w-6 h-6 mr-2 text-purple-500" />
              Progress Colors
            </h2>
            <div className="space-y-4">
              {Object.entries(progressColors).map(([percentage, colors]) => (
                <div key={percentage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{percentage}% Complete</span>
                    <span className={`text-sm font-medium ${colors.text}`}>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${colors.bg}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Financial Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HiCurrencyDollar className="w-6 h-6 mr-2 text-green-500" />
              Financial Colors
            </h2>
            <div className="space-y-4">
              {Object.entries(financialColors).map(([type, colors]) => (
                <div key={type} className={`p-4 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize text-lg">{type}</div>
                      <div className="text-sm opacity-75">Financial Type</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${colors.icon} flex items-center justify-center`}>
                      <HiCurrencyDollar className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calendar Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HiCalendar className="w-6 h-6 mr-2 text-blue-500" />
              Calendar Event Colors
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(calendarColors).map(([eventType, colors]) => (
                <div key={eventType} className={`p-3 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium capitalize">{eventType}</div>
                      <div className="text-sm opacity-75">Event Type</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full ${colors.border} flex items-center justify-center`}>
                      <HiCalendar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HiDocumentText className="w-6 h-6 mr-2 text-indigo-500" />
            Usage Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card Example */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Project Card</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Downtown Office Complex</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor('in_progress').bg} ${getStatusColor('in_progress').text} border ${getStatusColor('in_progress').border}`}>
                    In Progress
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor('high').bg} ${getPriorityColor('high').text} border ${getPriorityColor('high').border}`}>
                    High
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getProgressColor(75).bg}`} style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Card Example */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Invoice Card</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">INV-2024-001</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor('paid').bg} ${getStatusColor('paid').text} border ${getStatusColor('paid').border}`}>
                    Paid
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Amount</span>
                  <span className={`text-sm font-medium ${getFinancialColor('income').text}`}>
                    KES 2,500,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Client</span>
                  <span className="text-sm font-medium">MetroCorp Ltd</span>
                </div>
              </div>
            </div>

            {/* Calendar Event Example */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Calendar Event</h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${getCalendarColor('meeting').bg} ${getCalendarColor('meeting').text} border ${getCalendarColor('meeting').border}`}>
                  <div className="font-medium">Client Meeting</div>
                  <div className="text-sm opacity-75">10:00 AM - 11:00 AM</div>
                  <div className="text-sm opacity-75">Conference Room A</div>
                </div>
                <div className={`p-3 rounded-lg ${getCalendarColor('deadline').bg} ${getCalendarColor('deadline').text} border ${getCalendarColor('deadline').border}`}>
                  <div className="font-medium">Project Deadline</div>
                  <div className="text-sm opacity-75">Due Today</div>
                  <div className="text-sm opacity-75">Downtown Office Complex</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Import the Color System</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`import { 
  getStatusColor, 
  getPriorityColor, 
  getCategoryColor,
  getProgressColor,
  getFinancialColor,
  getCalendarColor 
} from '../lib/colors';`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Usage Example</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`// Status badge
<span className={\`px-2 py-1 text-xs font-medium rounded-full \${getStatusColor(status).bg} \${getStatusColor(status).text} border \${getStatusColor(status).border}\`}>
  {status}
</span>

// Progress bar
<div className={\`h-2 rounded-full \${getProgressColor(percentage).bg}\`} 
     style={{ width: \`\${percentage}%\` }}></div>`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorSystemDemo;