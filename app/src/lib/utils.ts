import { type ClassValue, clsx } from 'clsx';

// ========================================
// CLASS NAME UTILITIES
// ========================================

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ========================================
// FORMATTING UTILITIES
// ========================================

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function formatPhoneNumber(phone: string): string {
  // Format Kenyan phone numbers
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('254')) {
    // International format
    const formatted = cleaned.replace(/^254(\d{3})(\d{3})(\d{3})$/, '+254 $1 $2 $3');
    return formatted || phone;
  } else if (cleaned.startsWith('0')) {
    // Local format
    const formatted = cleaned.replace(/^0(\d{3})(\d{3})(\d{3})$/, '0$1 $2 $3');
    return formatted || phone;
  }
  
  return phone;
}

// ========================================
// STRING UTILITIES
// ========================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// ========================================
// VALIDATION UTILITIES
// ========================================

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Kenyan phone number validation
  const phoneRegex = /^(?:\+254|254|0)([17]\d{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

// ========================================
// UI UTILITIES
// ========================================

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Project statuses
    'planning': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800',
    
    // Lead statuses
    'new': 'bg-blue-100 text-blue-800',
    'contacted': 'bg-indigo-100 text-indigo-800',
    'qualified': 'bg-purple-100 text-purple-800',
    'proposal': 'bg-orange-100 text-orange-800',
    'closed': 'bg-green-100 text-green-800',
    'lost': 'bg-red-100 text-red-800',
    
    // Priority levels
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800',
    
    // Default
    'default': 'bg-gray-100 text-gray-800'
  };
  
  return statusColors[status.toLowerCase()] || statusColors['default'];
}

export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-red-600',
    'urgent': 'text-red-700 font-bold'
  };
  
  return priorityColors[priority.toLowerCase()] || 'text-gray-600';
}

// ========================================
// DATE UTILITIES
// ========================================

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function isDateInRange(date: string | Date, startDate: string | Date, endDate: string | Date): boolean {
  const target = typeof date === 'string' ? new Date(date) : date;
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  return target >= start && target <= end;
}

// ========================================
// ARRAY UTILITIES
// ========================================

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// ========================================
// NUMBER UTILITIES
// ========================================

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatRelativeTime(date: string | Date): string {
  return getRelativeTime(date);
}

// ========================================
// OBJECT UTILITIES
// ========================================

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  if (typeof obj === 'string') return obj.trim().length === 0;
  return false;
}