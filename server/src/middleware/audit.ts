import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { db } from '../db/connection';
import { activityLogs } from '../db/schema';
import { sql } from 'drizzle-orm';

const router = Router();

export const auditLog = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Store the original end function
  const originalEnd = res.end;

  // Override the end function
  res.end = function (this: Response, ...args) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const logEntry = {
      userId: req.user?.id || null,
      action: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip,
      timestamp: new Date(),
      requestId: (req as any).requestId || null,
      requestBody: req.method !== 'GET' ? JSON.stringify(req.body) : null,
      queryParams: Object.keys(req.query).length > 0 ? JSON.stringify(req.query) : null,
    };

    // Don't block the response
          db.insert(activityLogs)
      .values(logEntry)
      .execute()
      .catch(error => {
        console.error('Failed to log audit entry:', error);
      });

    // Call the original end function
    return originalEnd.apply(this, args);
  };

  next();
};

// GET /api/admin/audit - Get audit logs with pagination and filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const logs = await db.select()
      .from(activityLogs)
      .limit(limit)
      .offset(offset)
      .orderBy(activityLogs.createdAt);

    const total = await db.select({ count: sql`COUNT(*) as count` })
      .from(activityLogs)
      .then(result => Number(result[0].count) || 0);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audit logs',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
