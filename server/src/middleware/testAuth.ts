import { Request, Response, NextFunction } from 'express';

export interface TestAuthRequest extends Request {
  user?: {
    id: number;
    uuid: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    permissions: string[];
  };
}

// Temporary authentication bypass for testing
export const bypassAuth = async (req: TestAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  // Create a mock admin user for testing
  req.user = {
    id: 1,
    uuid: 'test-uuid-123',
    email: 'admin@akibeks.co.ke',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    permissions: [
      'admin_access', 'project_manage', 'project_view', 'invoice_manage', 
      'invoice_view', 'quotation_manage', 'quotation_view', 'user_manage', 
      'user_view', 'content_manage', 'content_view', 'analytics_view', 
      'settings_manage', 'settings_view', 'lead_manage', 'lead_view', 
      'document_manage', 'document_view', 'calendar_manage', 'calendar_view', 
      'audit_view', 'security_manage'
    ]
  };
  
  console.log('🔓 AUTHENTICATION BYPASSED FOR TESTING');
  console.log('   User:', req.user.email);
  console.log('   Role:', req.user.role);
  console.log('   Permissions:', req.user.permissions.length);
  
  next();
};

// Temporary admin role check that always passes
export const bypassAdminRole = (req: TestAuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    req.user = {
      id: 1,
      uuid: 'test-uuid-123',
      email: 'admin@akibeks.co.ke',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      permissions: ['admin_access']
    };
  }
  
  console.log('🔓 ADMIN ROLE BYPASSED FOR TESTING');
  next();
};

// Temporary permission check that always passes
export const bypassPermission = (requiredPermission: string) => {
  return (req: TestAuthRequest, res: Response, next: NextFunction): void => {
    console.log(`🔓 PERMISSION '${requiredPermission}' BYPASSED FOR TESTING`);
    next();
  };
};