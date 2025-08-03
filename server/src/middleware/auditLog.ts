import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { Request, Response, NextFunction, Router } from 'express';
import { db } from '../db/connection';
import { activityLogs } from '../db/schema';
import { desc, sql } from 'drizzle-orm';

const router = Router();

// Extend the Express Request type declaration
declare module 'express-serve-static-core' {
  interface User {
    id: number;
    role?: string;
    uuid?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }
}

interface CustomRequest extends Request {
  user?: Express.User;
}

export const auditLog = (req: CustomRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user && user.role === 'admin' && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const oldSend = res.send;
    res.send = function (body) {
      try {
        void db.insert(activityLogs).values({
          uuid: uuidv4(),
          userId: user.id.toString(),
          action: `${req.method} ${req.originalUrl}`,
          details: JSON.stringify({
            before: req.body.before || {},
            after: req.body.after || body,
            query: req.query
          }),
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
          resource: req.baseUrl,
          resourceId: req.params.id || '',
          success: true
        });
      } catch (e) {
        // Fallback: log to file
        const logPath = path.join(process.cwd(), 'audit-fallback.log');
        const logEntry = JSON.stringify({
          error: e instanceof Error ? e.message : 'Unknown error',
          userId: user.id,
          action: `${req.method} ${req.originalUrl}`,
          timestamp: new Date().toISOString(),
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          body: req.body
        }) + '\n';
        fs.appendFileSync(logPath, logEntry);
      }
      return oldSend.apply(this, arguments);
    };
  }
  next();
}

// Get audit logs with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const logs = await db.select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit)
      .offset(offset);

    const total = await db.select({ count: sql<number>`count(*)` })
      .from(activityLogs);

    res.json({
      logs,
      pagination: {
        page,
        limit,
        total: total[0].count,
        pages: Math.ceil(total[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ message: 'Error fetching audit logs' });
  }
});

export const auditLogRouter = router;