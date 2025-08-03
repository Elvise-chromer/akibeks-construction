// ========================================
// COLOR SYSTEM FOR AKIBEKS CONSTRUCTION
// ========================================

// Status Colors
export const statusColors = {
  // Project Status
  planning: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    hover: 'hover:bg-blue-100',
    dark: {
      bg: 'bg-blue-900',
      text: 'text-blue-100',
      border: 'border-blue-700'
    }
  },
  in_progress: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    ring: 'ring-yellow-500',
    hover: 'hover:bg-yellow-100',
    dark: {
      bg: 'bg-yellow-900',
      text: 'text-yellow-100',
      border: 'border-yellow-700'
    }
  },
  completed: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    hover: 'hover:bg-green-100',
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-100',
      border: 'border-green-700'
    }
  },
  on_hold: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    ring: 'ring-orange-500',
    hover: 'hover:bg-orange-100',
    dark: {
      bg: 'bg-orange-900',
      text: 'text-orange-100',
      border: 'border-orange-700'
    }
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    hover: 'hover:bg-red-100',
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-100',
      border: 'border-red-700'
    }
  },

  // Invoice Status
  draft: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    ring: 'ring-gray-500',
    hover: 'hover:bg-gray-100',
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      border: 'border-gray-700'
    }
  },
  sent: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    hover: 'hover:bg-blue-100',
    dark: {
      bg: 'bg-blue-900',
      text: 'text-blue-100',
      border: 'border-blue-700'
    }
  },
  viewed: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    ring: 'ring-yellow-500',
    hover: 'hover:bg-yellow-100',
    dark: {
      bg: 'bg-yellow-900',
      text: 'text-yellow-100',
      border: 'border-yellow-700'
    }
  },
  paid: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    hover: 'hover:bg-green-100',
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-100',
      border: 'border-green-700'
    }
  },
  overdue: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    hover: 'hover:bg-red-100',
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-100',
      border: 'border-red-700'
    }
  },

  // Quotation Status
  accepted: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-500',
    hover: 'hover:bg-green-100',
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-100',
      border: 'border-green-700'
    }
  },
  rejected: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500',
    hover: 'hover:bg-red-100',
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-100',
      border: 'border-red-700'
    }
  },
  expired: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    ring: 'ring-orange-500',
    hover: 'hover:bg-orange-100',
    dark: {
      bg: 'bg-orange-900',
      text: 'text-orange-100',
      border: 'border-orange-700'
    }
  },
  revised: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    ring: 'ring-purple-500',
    hover: 'hover:bg-purple-100',
    dark: {
      bg: 'bg-purple-900',
      text: 'text-purple-100',
      border: 'border-purple-700'
    }
  }
};

// Priority Colors
export const priorityColors = {
  low: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200',
    icon: 'text-gray-400',
    dark: {
      bg: 'bg-gray-800',
      text: 'text-gray-300',
      border: 'border-gray-600'
    }
  },
  medium: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: 'text-yellow-500',
    dark: {
      bg: 'bg-yellow-900',
      text: 'text-yellow-100',
      border: 'border-yellow-700'
    }
  },
  high: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: 'text-orange-500',
    dark: {
      bg: 'bg-orange-900',
      text: 'text-orange-100',
      border: 'border-orange-700'
    }
  },
  urgent: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: 'text-red-500',
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-100',
      border: 'border-red-700'
    }
  }
};

// Category Colors
export const categoryColors = {
  residential: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    dark: {
      bg: 'bg-blue-900',
      text: 'text-blue-100',
      border: 'border-blue-700'
    }
  },
  commercial: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: 'text-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    dark: {
      bg: 'bg-purple-900',
      text: 'text-purple-100',
      border: 'border-purple-700'
    }
  },
  industrial: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: 'text-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    dark: {
      bg: 'bg-orange-900',
      text: 'text-orange-100',
      border: 'border-orange-700'
    }
  },
  renovation: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: 'text-green-500',
    gradient: 'from-green-500 to-green-600',
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-100',
      border: 'border-green-700'
    }
  },
  maintenance: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    icon: 'text-teal-500',
    gradient: 'from-teal-500 to-teal-600',
    dark: {
      bg: 'bg-teal-900',
      text: 'text-teal-100',
      border: 'border-teal-700'
    }
  },
  infrastructure: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    icon: 'text-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
    dark: {
      bg: 'bg-indigo-900',
      text: 'text-indigo-100',
      border: 'border-indigo-700'
    }
  }
};

// Progress Colors
export const progressColors = {
  0: { bg: 'bg-gray-200', text: 'text-gray-500' },
  10: { bg: 'bg-red-200', text: 'text-red-600' },
  20: { bg: 'bg-orange-200', text: 'text-orange-600' },
  30: { bg: 'bg-yellow-200', text: 'text-yellow-600' },
  40: { bg: 'bg-yellow-300', text: 'text-yellow-700' },
  50: { bg: 'bg-blue-200', text: 'text-blue-600' },
  60: { bg: 'bg-blue-300', text: 'text-blue-700' },
  70: { bg: 'bg-indigo-200', text: 'text-indigo-600' },
  80: { bg: 'bg-indigo-300', text: 'text-indigo-700' },
  90: { bg: 'bg-green-200', text: 'text-green-600' },
  100: { bg: 'bg-green-300', text: 'text-green-700' }
};

// Financial Colors
export const financialColors = {
  income: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: 'text-green-500',
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-100',
      border: 'border-green-700'
    }
  },
  expense: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: 'text-red-500',
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-100',
      border: 'border-red-700'
    }
  },
  profit: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: 'text-emerald-500',
    dark: {
      bg: 'bg-emerald-900',
      text: 'text-emerald-100',
      border: 'border-emerald-700'
    }
  },
  loss: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    icon: 'text-rose-500',
    dark: {
      bg: 'bg-rose-900',
      text: 'text-rose-100',
      border: 'border-rose-700'
    }
  }
};

// Calendar Event Colors
export const calendarColors = {
  meeting: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    hover: 'hover:bg-blue-200',
    dark: {
      bg: 'bg-blue-900',
      text: 'text-blue-100',
      border: 'border-blue-700'
    }
  },
  deadline: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    hover: 'hover:bg-red-200',
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-100',
      border: 'border-red-700'
    }
  },
  milestone: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    hover: 'hover:bg-green-200',
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-100',
      border: 'border-green-700'
    }
  },
  inspection: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    hover: 'hover:bg-yellow-200',
    dark: {
      bg: 'bg-yellow-900',
      text: 'text-yellow-100',
      border: 'border-yellow-700'
    }
  },
  delivery: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    hover: 'hover:bg-purple-200',
    dark: {
      bg: 'bg-purple-900',
      text: 'text-purple-100',
      border: 'border-purple-700'
    }
  },
  maintenance: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    hover: 'hover:bg-orange-200',
    dark: {
      bg: 'bg-orange-900',
      text: 'text-orange-100',
      border: 'border-orange-700'
    }
  }
};

// Utility Functions
export const getStatusColor = (status: string) => {
  const statusKey = status.toLowerCase().replace(/\s+/g, '_');
  return statusColors[statusKey as keyof typeof statusColors] || statusColors.draft;
};

export const getPriorityColor = (priority: string) => {
  const priorityKey = priority.toLowerCase();
  return priorityColors[priorityKey as keyof typeof priorityColors] || priorityColors.medium;
};

export const getCategoryColor = (category: string) => {
  const categoryKey = category.toLowerCase();
  return categoryColors[categoryKey as keyof typeof categoryColors] || categoryColors.residential;
};

export const getProgressColor = (percentage: number) => {
  const roundedPercentage = Math.floor(percentage / 10) * 10;
  return progressColors[roundedPercentage as keyof typeof progressColors] || progressColors[0];
};

export const getFinancialColor = (type: string) => {
  const typeKey = type.toLowerCase();
  return financialColors[typeKey as keyof typeof financialColors] || financialColors.income;
};

export const getCalendarColor = (eventType: string) => {
  const eventKey = eventType.toLowerCase();
  return calendarColors[eventKey as keyof typeof calendarColors] || calendarColors.meeting;
};

// Color Palette for Charts and Visualizations
export const chartColors = {
  primary: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'],
  secondary: ['#10B981', '#059669', '#047857', '#065F46'],
  accent: ['#F59E0B', '#D97706', '#B45309', '#92400E'],
  neutral: ['#6B7280', '#4B5563', '#374151', '#1F2937'],
  success: ['#10B981', '#059669', '#047857', '#065F46'],
  warning: ['#F59E0B', '#D97706', '#B45309', '#92400E'],
  error: ['#EF4444', '#DC2626', '#B91C1C', '#991B1B'],
  info: ['#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF']
};

// Gradient Classes
export const gradients = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
  secondary: 'bg-gradient-to-r from-green-500 to-green-600',
  accent: 'bg-gradient-to-r from-orange-500 to-orange-600',
  success: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
  warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
  error: 'bg-gradient-to-r from-red-500 to-red-600',
  info: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
  purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
  teal: 'bg-gradient-to-r from-teal-500 to-teal-600'
};