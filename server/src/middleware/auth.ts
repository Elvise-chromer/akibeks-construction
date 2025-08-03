import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';
import { sql } from 'drizzle-orm';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    permissions: string[];
  };
}

export interface User {
  id: number;
  email: string;
  role: string;
  permissions: string[];
}

// Authentication middleware
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    const userResult = await db.execute(`
      SELECT u.id, u.email, u.role, GROUP_CONCAT(DISTINCT p.permission_name) as permissions
      FROM users u
      LEFT JOIN user_permissions up ON u.id = up.user_id
      LEFT JOIN permissions p ON up.permission_id = p.id
      WHERE u.email = ?
      GROUP BY u.id
    `, [decoded.email]);

    // Handle different result structures for PostgreSQL
    const rows = (userResult as any).rows || userResult;
    const user = Array.isArray(rows) ? rows[0] : rows;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
      return;
    }

    req.user = {
      id: user.id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions || []
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
    return;
  }
};

// Role-based authorization middleware
export const requireRole = (requiredRole: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (req.user.role !== requiredRole && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

// Permission-based authorization middleware
export const requirePermission = (requiredPermission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!req.user.permissions.includes(requiredPermission) && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

// Alias for backward compatibility
export const requireAuth = authenticateToken;