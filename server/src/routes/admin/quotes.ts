import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { db } from '../../db/connection';
import { quotations, users } from '../../db/schema';
import { eq, like, and, or, desc, asc, sql } from 'drizzle-orm';
import { bypassAuth, TestAuthRequest } from '../../middleware/testAuth';

const router = express.Router();

// Helper function for activity logging
const logActivity = async (params: { userId: number; action: string; resource: string; details: string; ipAddress?: string; userAgent?: string }) => {
  try {
    const { activityLogs } = await import('../../db/schema');
    await db.insert(activityLogs).values({
      uuid: crypto.randomUUID(),
      userId: params.userId.toString(),
      action: params.action,
      details: params.details,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      resource: params.resource,
      resourceId: '',
      success: true
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Get all quotes with pagination, search, and filtering
router.get('/', bypassAuth, async (req: TestAuthRequest, res: Response, next: NextFunction) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      status, 
      sort_by = 'created_at', 
      sort_order = 'DESC' 
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    
    let whereConditions = [];

    if (search) {
      whereConditions.push(
        or(
                   like(quotations.quotationNumber, `%${search}%`),
         like(quotations.projectTitle, `%${search}%`),
          like(quotations.clientName, `%${search}%`),
          like(quotations.clientEmail, `%${search}%`)
        )
      );
    }

    if (status) {
      whereConditions.push(eq(quotations.status, status as string));
    }

    const orderBy = sort_order === 'ASC' 
      ? asc(quotations[sort_by as keyof typeof quotations] || quotations.createdAt)
      : desc(quotations[sort_by as keyof typeof quotations] || quotations.createdAt);

    const quotesQuery = db
             .select({
         id: quotations.id,
         uuid: quotations.uuid,
         quotationNumber: quotations.quotationNumber,
         projectTitle: quotations.projectTitle,
        clientName: quotations.clientName,
        clientEmail: quotations.clientEmail,
        clientPhone: quotations.clientPhone,
        status: quotations.status,
        total: quotations.total,
        validUntil: quotations.validUntil,
        createdAt: quotations.createdAt,
        updatedAt: quotations.updatedAt
      })
      .from(quotations)
      .limit(Number(limit))
      .offset(offset)
      .orderBy(orderBy);

    if (whereConditions.length > 0) {
      quotesQuery.where(and(...whereConditions));
    }

    const quotes = await quotesQuery;

    // Get total count
    const totalCountQuery = db
      .select({ count: sql`COUNT(*) as count` })
      .from(quotations);
    
    if (whereConditions.length > 0) {
      totalCountQuery.where(and(...whereConditions));
    }

    const totalResult = await totalCountQuery;
    const total = Number(totalResult[0].count) || 0;

    res.json({
      success: true,
      data: quotes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quotes'
    });
  }
});

// Get single quote by ID
router.get('/:id', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const quote = await db
      .select()
      .from(quotations)
      .where(eq(quotations.id, Number(id)))
      .limit(1);

    if (quote.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.json({
      success: true,
      data: quote[0]
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quote'
    });
  }
});

// Create new quote
router.post('/', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      items,
      subtotal,
      taxRate,
      taxAmount,
      discount,
      total,
      validUntil,
      terms,
      notes
    } = req.body;

    // Generate quote number
    const quotationNumber = `QT-${Date.now()}`;

    await db.insert(quotations).values({
      uuid: crypto.randomUUID(),
      quotationNumber,
      projectTitle: title,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      items: JSON.stringify(items),
      subtotal: subtotal.toString(),
      taxRate: taxRate?.toString() || '16.00',
      taxAmount: taxAmount?.toString() || '0.00',
      discount: discount?.toString() || '0.00',
      total: total.toString(),
      validUntil: new Date(validUntil),
      terms,
      notes,
      status: 'draft',
      createdBy: req.user!.id
    });

    await logActivity({
      userId: req.user!.id,
      action: 'CREATE',
      resource: 'quotations',
      details: `Created quote: ${title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({
      success: true,
      message: 'Quote created successfully'
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating quote'
    });
  }
});

// Update quote
router.put('/:id', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.uuid;
         delete updateData.quotationNumber;
    delete updateData.createdAt;
    delete updateData.createdBy;
    
    updateData.updatedAt = new Date();

    await db
      .update(quotations)
      .set(updateData)
      .where(eq(quotations.id, Number(id)));

    // Get the updated quote
    const result = await db
      .select()
      .from(quotations)
      .where(eq(quotations.id, Number(id)))
      .limit(1);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'quotations',
             details: `Updated quote: ${result[0].projectTitle}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Quote updated successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating quote'
    });
  }
});

// Delete quote
router.delete('/:id', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Get quote details before deletion
    const quote = await db
      .select()
      .from(quotations)
      .where(eq(quotations.id, Number(id)))
      .limit(1);

    if (quote.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    await db
      .delete(quotations)
      .where(eq(quotations.id, Number(id)));

    await logActivity({
      userId: req.user!.id,
      action: 'DELETE',
      resource: 'quotations',
             details: `Deleted quote: ${quote[0].projectTitle}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Quote deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting quote'
    });
  }
});

// Update quote status
router.patch('/:id/status', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'sent', 'accepted', 'rejected', 'expired'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    await db
      .update(quotations)
      .set({ 
        status,
        updatedAt: new Date(),
        ...(status === 'sent' && { sentAt: new Date() }),
        ...(status === 'accepted' && { acceptedAt: new Date() })
      })
      .where(eq(quotations.id, Number(id)));

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE_STATUS',
      resource: 'quotations',
      details: `Updated quote status to: ${status}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Quote status updated successfully'
    });
  } catch (error) {
    console.error('Error updating quote status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating quote status'
    });
  }
});

export default router;