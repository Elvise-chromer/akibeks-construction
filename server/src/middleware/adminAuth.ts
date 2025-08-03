import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';
import { sql } from 'drizzle-orm';

export interface AdminAuthRequest extends Request {
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

// Admin authentication middleware
export const authenticateAdmin = async (req: AdminAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token required'
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Verify user exists and get permissions
    const userResult = await db.execute(sql`
      SELECT u.id, u.uuid, u.email, u.role, u.first_name, u.last_name, GROUP_CONCAT(DISTINCT p.name) as permissions
      FROM users u
      LEFT JOIN user_permissions up ON u.id = up.user_id
      LEFT JOIN permissions p ON up.permission_id = p.id
      WHERE u.email = ${decoded.email} AND u.status = 'active'
      GROUP BY u.id, u.uuid, u.email, u.role, u.first_name, u.last_name
    `);

    // Handle different result structures for MySQL
    const rows = (userResult as any).rows || userResult;
    const user = Array.isArray(rows) ? rows[0] : rows;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
      return;
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
      return;
    }

    req.user = {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
      role: user.role,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      permissions: user.permissions ? user.permissions.split(',') : []
    };

    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
    return;
  }
};

// Admin role check middleware
export const requireAdminRole = (req: AdminAuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Admin role required'
    });
    return;
  }

  next();
};

// Admin permission check middleware
export const requireAdminPermission = (requiredPermission: string) => {
  return (req: AdminAuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Admin role required'
      });
      return;
    }

    if (!req.user.permissions.includes(requiredPermission)) {
      res.status(403).json({
        success: false,
        message: `Permission '${requiredPermission}' required`
      });
      return;
    }

    next();
  };
};