// Page Completion Checker Utility
// Analyzes website pages to identify incomplete or placeholder content

export interface PageAnalysis {
  path: string;
  name: string;
  completionScore: number; // 0-100
  issues: string[];
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated?: string;
  estimatedWorkHours?: number;
}

export interface CompletionCriteria {
  hasRealContent: boolean;
  hasProperSEO: boolean;
  hasCallToAction: boolean;
  hasMobileOptimization: boolean;
  hasAccessibility: boolean;
  hasErrorHandling: boolean;
  hasLoadingStates: boolean;
  hasInteractiveElements: boolean;
  hasProperNavigation: boolean;
  hasFooterIntegration: boolean;
}

// Known pages in the application
export const KNOWN_PAGES = [
  // Public Pages
  { path: '/', name: 'Home', category: 'public' },
  { path: '/about', name: 'About Us', category: 'public' },
  { path: '/services', name: 'Services', category: 'public' },
  { path: '/projects', name: 'Projects/Portfolio', category: 'public' },
  { path: '/portfolio', name: 'Portfolio', category: 'public' },
  { path: '/gallery', name: 'Gallery', category: 'public' },
  { path: '/team', name: 'Our Team', category: 'public' },
  { path: '/testimonials', name: 'Testimonials', category: 'public' },
  { path: '/blog', name: 'Blog', category: 'public' },
  { path: '/blog/:id', name: 'Blog Post Detail', category: 'public' },
  { path: '/contact', name: 'Contact Us', category: 'public' },
  { path: '/quote', name: 'Get Quote', category: 'public' },
  { path: '/quote-request', name: 'Quote Request Form', category: 'public' },
  { path: '/emergency', name: 'Emergency Services', category: 'public' },
  { path: '/maintenance', name: 'Maintenance Services', category: 'public' },
  { path: '/safety', name: 'Safety Information', category: 'public' },
  { path: '/careers', name: 'Careers', category: 'public' },
  { path: '/downloads', name: 'Downloads', category: 'public' },
  { path: '/csr', name: 'Corporate Social Responsibility', category: 'public' },
  { path: '/case-studies', name: 'Case Studies', category: 'public' },
  { path: '/faq', name: 'FAQ', category: 'public' },
  
  // Service Detail Pages
  { path: '/services/residential', name: 'Residential Construction', category: 'services' },
  { path: '/services/commercial', name: 'Commercial Construction', category: 'services' },
  { path: '/services/industrial', name: 'Industrial Construction', category: 'services' },
  { path: '/services/renovation', name: 'Renovation Services', category: 'services' },
  { path: '/services/maintenance', name: 'Maintenance Services', category: 'services' },
  { path: '/services/emergency', name: 'Emergency Services', category: 'services' },
  
  // Legal Pages
  { path: '/privacy-policy', name: 'Privacy Policy', category: 'legal' },
  { path: '/terms-of-service', name: 'Terms of Service', category: 'legal' },
  { path: '/cookie-policy', name: 'Cookie Policy', category: 'legal' },
  { path: '/legal/disclaimer', name: 'Legal Disclaimer', category: 'legal' },
  
  // Client Portal
  { path: '/client/login', name: 'Client Login', category: 'client' },
  { path: '/client/dashboard', name: 'Client Dashboard', category: 'client' },
  { path: '/client/projects', name: 'Client Projects', category: 'client' },
  { path: '/client/invoices', name: 'Client Invoices', category: 'client' },
  { path: '/client/documents', name: 'Client Documents', category: 'client' },
  { path: '/client/support', name: 'Client Support', category: 'client' },
  { path: '/client/profile', name: 'Client Profile', category: 'client' },
  
  // Admin Panel
  { path: '/admin', name: 'Admin Dashboard', category: 'admin' },
  { path: '/admin/login', name: 'Admin Login', category: 'admin' },
  { path: '/admin/users', name: 'User Management', category: 'admin' },
  { path: '/admin/projects', name: 'Project Management', category: 'admin' },
  { path: '/admin/invoices', name: 'Invoice Management', category: 'admin' },
  { path: '/admin/quotations', name: 'Quotation Management', category: 'admin' },
  { path: '/admin/content', name: 'Content Management', category: 'admin' },
  { path: '/admin/analytics', name: 'Analytics Dashboard', category: 'admin' },
  { path: '/admin/settings', name: 'System Settings', category: 'admin' },
  { path: '/admin/security', name: 'Security Dashboard', category: 'admin' },
  { path: '/admin/audit', name: 'Audit Logs', category: 'admin' },
  { path: '/admin/reports', name: 'Reports', category: 'admin' },
  { path: '/admin/calendar', name: 'Calendar Management', category: 'admin' },
  { path: '/admin/documents', name: 'Document Management', category: 'admin' },
  { path: '/admin/templates', name: 'Template Management', category: 'admin' },
  { path: '/admin/leads', name: 'Lead Management', category: 'admin' },
  { path: '/admin/seo', name: 'SEO Management', category: 'admin' },
  
  // Error Pages
  { path: '/404', name: 'Page Not Found', category: 'error' },
  { path: '/500', name: 'Server Error', category: 'error' },
  { path: '/403', name: 'Forbidden', category: 'error' },
  { path: '/401', name: 'Unauthorized', category: 'error' },
  
  // Utility Pages
  { path: '/loading', name: 'Loading Page', category: 'utility' },
  { path: '/offline', name: 'Offline Page', category: 'utility' },
  { path: '/maintenance-mode', name: 'Maintenance Mode', category: 'utility' },
];

// Content analysis functions
export const analyzePageContent = (content: string): Partial<CompletionCriteria> => {
  const analysis: Partial<CompletionCriteria> = {};
  
  // Check for real content vs placeholder text
  const placeholderPatterns = [
    /lorem ipsum/i,
    /placeholder/i,
    /todo/i,
    /coming soon/i,
    /under construction/i,
    /work in progress/i,
    /example/i,
    /sample/i,
    /dummy/i,
    /test/i,
  ];
  
  analysis.hasRealContent = !placeholderPatterns.some(pattern => pattern.test(content));
  
  // Check for Call-to-Action elements
  const ctaPatterns = [
    /get quote/i,
    /contact us/i,
    /learn more/i,
    /book now/i,
    /start project/i,
    /request/i,
    /schedule/i,
    /call today/i,
    /get started/i,
  ];
  
  analysis.hasCallToAction = ctaPatterns.some(pattern => pattern.test(content));
  
  return analysis;
};

// SEO analysis
export const analyzeSEO = (document: Document): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;
  
  // Check title tag
  const title = document.querySelector('title')?.textContent;
  if (!title || title.length < 30 || title.length > 60) {
    issues.push('Title tag is missing or not optimized (30-60 characters)');
    score -= 15;
  }
  
  // Check meta description
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (!metaDescription || metaDescription.length < 120 || metaDescription.length > 160) {
    issues.push('Meta description is missing or not optimized (120-160 characters)');
    score -= 15;
  }
  
  // Check headings structure
  const h1Elements = document.querySelectorAll('h1');
  if (h1Elements.length === 0) {
    issues.push('Missing H1 heading');
    score -= 10;
  } else if (h1Elements.length > 1) {
    issues.push('Multiple H1 headings found');
    score -= 5;
  }
  
  // Check alt attributes on images
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
  if (imagesWithoutAlt.length > 0) {
    issues.push(`${imagesWithoutAlt.length} images missing alt attributes`);
    score -= Math.min(20, imagesWithoutAlt.length * 2);
  }
  
  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('Missing canonical URL');
    score -= 10;
  }
  
  // Check for Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (!ogTitle || !ogDescription || !ogImage) {
    issues.push('Missing Open Graph tags for social sharing');
    score -= 10;
  }
  
  return { score: Math.max(0, score), issues };
};

// Mobile optimization check
export const checkMobileOptimization = (): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;
  
  // Check viewport meta tag
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    issues.push('Missing viewport meta tag for mobile optimization');
    score -= 30;
  }
  
  // Check for responsive design indicators
  const hasResponsiveClasses = document.body.className.includes('responsive') || 
    document.querySelector('[class*="sm:"]') || 
    document.querySelector('[class*="md:"]') || 
    document.querySelector('[class*="lg:"]');
  
  if (!hasResponsiveClasses) {
    issues.push('No responsive design classes found');
    score -= 20;
  }
  
  // Check for touch-friendly elements
  const buttons = document.querySelectorAll('button, a, input[type="button"]');
  const smallButtons = Array.from(buttons).filter(btn => {
    const rect = btn.getBoundingClientRect();
    return rect.width < 44 || rect.height < 44;
  });
  
  if (smallButtons.length > 0) {
    issues.push(`${smallButtons.length} buttons are too small for touch (minimum 44px)`);
    score -= Math.min(20, smallButtons.length * 2);
  }
  
  return { score: Math.max(0, score), issues };
};

// Accessibility check
export const checkAccessibility = (): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;
  
  // Check for skip links
  const skipLink = document.querySelector('a[href="#main"]') || 
    document.querySelector('[aria-label*="skip"]');
  if (!skipLink) {
    issues.push('Missing skip to main content link');
    score -= 10;
  }
  
  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  Array.from(headings).forEach(heading => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    if (currentLevel > previousLevel + 1) {
      issues.push('Improper heading hierarchy detected');
      score -= 10;
      return;
    }
    previousLevel = currentLevel;
  });
  
  // Check for aria-labels on interactive elements without text
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  const elementsWithoutLabels = Array.from(interactiveElements).filter(element => {
    const hasText = element.textContent?.trim();
    const hasAriaLabel = element.getAttribute('aria-label');
    const hasAriaLabelledBy = element.getAttribute('aria-labelledby');
    const hasTitle = element.getAttribute('title');
    
    return !hasText && !hasAriaLabel && !hasAriaLabelledBy && !hasTitle;
  });
  
  if (elementsWithoutLabels.length > 0) {
    issues.push(`${elementsWithoutLabels.length} interactive elements missing accessible labels`);
    score -= Math.min(30, elementsWithoutLabels.length * 3);
  }
  
  // Check color contrast (simplified check)
  const bodyStyles = window.getComputedStyle(document.body);
  const bodyColor = bodyStyles.color;
  const backgroundColor = bodyStyles.backgroundColor;
  
  if (bodyColor === backgroundColor) {
    issues.push('Poor color contrast detected');
    score -= 15;
  }
  
  return { score: Math.max(0, score), issues };
};

// Performance check
export const checkPerformance = (): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;
  
  // Check page load time (if Performance API is available)
  if (performance && performance.timing) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    if (loadTime > 3000) {
      issues.push(`Page load time is ${(loadTime / 1000).toFixed(1)}s (target: <3s)`);
      score -= 20;
    }
  }
  
  // Check for large images
  const images = document.querySelectorAll('img');
  Array.from(images).forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.width > 1200 || rect.height > 800) {
      issues.push('Large images detected that may impact performance');
      score -= 5;
    }
  });
  
  // Check for external scripts
  const externalScripts = document.querySelectorAll('script[src]');
  if (externalScripts.length > 5) {
    issues.push(`${externalScripts.length} external scripts loaded (consider bundling)`);
    score -= 10;
  }
  
  // Check for render-blocking resources
  const renderBlockingCSS = document.querySelectorAll('link[rel="stylesheet"]:not([media])');
  if (renderBlockingCSS.length > 2) {
    issues.push('Multiple render-blocking CSS files detected');
    score -= 10;
  }
  
  return { score: Math.max(0, score), issues };
};

// Main page analysis function
export const analyzePageCompletion = (pagePath: string): PageAnalysis => {
  const pageInfo = KNOWN_PAGES.find(page => page.path === pagePath);
  const pageName = pageInfo?.name || 'Unknown Page';
  
  // Get page content
  const pageContent = document.body.textContent || '';
  
  // Run all analysis functions
  const contentAnalysis = analyzePageContent(pageContent);
  const seoAnalysis = analyzeSEO(document);
  const mobileAnalysis = checkMobileOptimization();
  const accessibilityAnalysis = checkAccessibility();
  const performanceAnalysis = checkPerformance();
  
  // Calculate overall completion score
  const scores = [
    seoAnalysis.score,
    mobileAnalysis.score,
    accessibilityAnalysis.score,
    performanceAnalysis.score,
  ];
  
  const completionScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  
  // Collect all issues
  const allIssues = [
    ...seoAnalysis.issues,
    ...mobileAnalysis.issues,
    ...accessibilityAnalysis.issues,
    ...performanceAnalysis.issues,
  ];
  
  // Add content-specific issues
  if (!contentAnalysis.hasRealContent) {
    allIssues.push('Page contains placeholder or dummy content');
  }
  
  if (!contentAnalysis.hasCallToAction) {
    allIssues.push('Page is missing clear call-to-action elements');
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (completionScore < 50) {
    recommendations.push('Complete basic page content and structure');
    recommendations.push('Implement responsive design');
    recommendations.push('Add proper SEO meta tags');
  } else if (completionScore < 75) {
    recommendations.push('Improve accessibility features');
    recommendations.push('Optimize performance');
    recommendations.push('Enhance mobile experience');
  } else {
    recommendations.push('Fine-tune SEO optimization');
    recommendations.push('Add advanced interactive features');
    recommendations.push('Implement analytics tracking');
  }
  
  // Determine priority
  let priority: PageAnalysis['priority'] = 'low';
  if (pageInfo?.category === 'public' && completionScore < 60) {
    priority = 'high';
  } else if (pageInfo?.category === 'admin' && completionScore < 40) {
    priority = 'critical';
  } else if (completionScore < 50) {
    priority = 'medium';
  }
  
  // Estimate work hours based on issues and priority
  const estimatedWorkHours = Math.max(2, Math.ceil(allIssues.length * 0.5 + (100 - completionScore) * 0.1));
  
  return {
    path: pagePath,
    name: pageName,
    completionScore,
    issues: allIssues,
    recommendations,
    priority,
    estimatedWorkHours,
    lastUpdated: new Date().toISOString(),
  };
};

// Generate report for all pages
export const generateCompletionReport = (): PageAnalysis[] => {
  return KNOWN_PAGES.map(page => {
    // For this static analysis, we'll simulate the results
    // In a real implementation, you'd navigate to each page and run the analysis
    return {
      path: page.path,
      name: page.name,
      completionScore: Math.floor(Math.random() * 100), // Simulate for now
      issues: ['Needs real implementation analysis'],
      recommendations: ['Implement actual page analysis'],
      priority: 'medium' as const,
      estimatedWorkHours: 4,
      lastUpdated: new Date().toISOString(),
    };
  });
};

// Export page categories for filtering
export const PAGE_CATEGORIES = ['public', 'services', 'legal', 'client', 'admin', 'error', 'utility'] as const;
export type PageCategory = typeof PAGE_CATEGORIES[number];

// Helper function to get pages by category
export const getPagesByCategory = (category: PageCategory) => {
  return KNOWN_PAGES.filter(page => page.category === category);
};

// Helper function to get incomplete pages
export const getIncompletePages = (threshold: number = 70): PageAnalysis[] => {
  const report = generateCompletionReport();
  return report.filter(page => page.completionScore < threshold);
};

// Helper function to get high priority pages
export const getHighPriorityPages = (): PageAnalysis[] => {
  const report = generateCompletionReport();
  return report.filter(page => page.priority === 'high' || page.priority === 'critical');
};