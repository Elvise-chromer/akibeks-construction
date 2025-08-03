import express from 'express';
import { body, validationResult } from 'express-validator';
import { eq, desc, and, like, sql } from 'drizzle-orm';
import rateLimit from 'express-rate-limit';
import { db } from '../../db/connection';
import { services } from '../../db/schema';
import { authenticateToken, requireRole, AuthRequest } from '../../middleware/auth';

// Log activity function (simplified for CRUD operations)
const logActivity = async (params: { userId: number; action: string; resource: string; details: string; ipAddress?: string; userAgent?: string }) => {
  // This would integrate with the audit system
  console.log('Activity logged:', params);
};

const router = express.Router();

// Rate limiting
const servicesLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const createServiceValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('category').trim().isLength({ min: 1, max: 100 }).withMessage('Category is required'),
  body('startingPrice').isNumeric().withMessage('Starting price must be a number'),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('features.*').optional().trim().isLength({ min: 1 }).withMessage('Each feature must not be empty'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const updateServiceValidation = [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be less than 200 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('startingPrice').optional().isNumeric().withMessage('Starting price must be a number'),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('features.*').optional().trim().isLength({ min: 1 }).withMessage('Each feature must not be empty'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

// GET /api/admin/services - Get all services with pagination and filtering
router.get('/', servicesLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, search, category, isActive, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereConditions = [];
    if (search) {
      whereConditions.push(
        like(services.title, `%${search}%`),
        like(services.description, `%${search}%`)
      );
    }
    if (isActive !== undefined) {
      whereConditions.push(eq(services.isActive, isActive === 'true'));
    }

    let orderByColumn = services.createdAt;
    if (sortBy && services[sortBy as keyof typeof services]) {
      orderByColumn = services[sortBy as keyof typeof services] as any;
    }
    
    const orderBy = sortOrder === 'desc' ? desc(orderByColumn) : orderByColumn;

    const servicesQuery = await db
      .select({
        id: services.id,
        title: services.title,
        slug: services.slug,
        description: services.description,
        shortDescription: services.shortDescription,
        startingPrice: services.startingPrice,
        features: services.features,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt,
      })
      .from(services)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(Number(limit))
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(services)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalCount = Number(totalCountResult[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / Number(limit));

    await logActivity({
      userId: req.user!.id,
      action: 'READ',
      resource: 'services',
      details: `Viewed services list (page ${page})`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: servicesQuery,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages,
        totalCount,
        hasNext: Number(page) < totalPages,
        hasPrev: Number(page) > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
    });
  }
});

// GET /api/admin/services/:id - Get single service
router.get('/:id', servicesLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const service = await db
      .select()
      .from(services)
      .where(eq(services.id, Number(id)))
      .limit(1);

    if (!service.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'read',
      resource: 'services',
      details: `Viewed service: ${service[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: service[0],
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
    });
  }
});

// POST /api/admin/services - Create new service
router.post('/', servicesLimit, authenticateToken, requireRole('admin'), createServiceValidation, async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      startingPrice,
      features,
      isActive = true,
    } = req.body;

    const newService = await db
      .insert(services)
      .values({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description,
        startingPrice: startingPrice.toString(),
        features: features ? JSON.stringify(features) : null,
        isActive,
      });

    await logActivity({
      userId: req.user!.id,
      action: 'CREATE',
      resource: 'services',
      details: `Created service: ${title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService[0],
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating service',
    });
  }
});

// PUT /api/admin/services/:id - Update service
router.put('/:id', servicesLimit, authenticateToken, requireRole('admin'), updateServiceValidation, async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const updateData = { ...req.body };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    // Convert pricing if provided
    if (updateData.pricing) {
      updateData.pricing = Number(updateData.pricing);
    }

    // Stringify features if provided
    if (updateData.features) {
      updateData.features = JSON.stringify(updateData.features);
    }

    updateData.updatedAt = new Date();

    const updatedService = await db
      .update(services)
      .set(updateData)
      .where(eq(services.id, Number(id)));

    // Get the updated service since MySQL doesn't support returning
    const result = await db
      .select()
      .from(services)
      .where(eq(services.id, Number(id)))
      .limit(1);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'services',
      details: `Updated service: ${result[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: result[0],
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service',
    });
  }
});

// DELETE /api/admin/services/:id - Delete service
router.delete('/:id', servicesLimit, authenticateToken, requireRole('admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Get service info before deletion for logging
    const service = await db
      .select({ name: services.title })
      .from(services)
      .where(eq(services.id, Number(id)))
      .limit(1);

    if (!service.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Delete the service
    await db.delete(services).where(eq(services.id, Number(id)));

    await logActivity({
      userId: req.user!.id,
      action: 'DELETE',
      resource: 'services',
      details: `Deleted service: ${service[0].name}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
    });
  }
});

// GET /api/admin/services/stats - Get service statistics
router.get('/stats/overview', servicesLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const stats = await db
      .select({
        category: services.title,
        count: sql`count(*)`,
        averagePricing: sql`avg(${services.startingPrice})`,
      })
      .from(services)
      .groupBy(services.title);

    const activeServicesCount = await db
      .select({ count: sql`count(*)` })
      .from(services)
      .where(eq(services.isActive, true));

    const totalServices = stats.reduce((acc, stat) => acc + Number(stat.count), 0);

    await logActivity({
      userId: req.user!.id,
      action: 'READ',
      resource: 'services',
      details: 'Viewed service statistics',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: {
        totalServices,
        activeServices: Number(activeServicesCount[0]?.count || 0),
        categoryBreakdown: stats,
      },
    });
  } catch (error) {
    console.error('Error fetching service stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service statistics',
    });
  }
});

// GET /api/admin/services/categories - Get all unique categories
router.get('/categories/list', servicesLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const categories = await db
      .selectDistinct({ category: services.title })
      .from(services)
      .where(eq(services.isActive, true));

    res.json({
      success: true,
      data: categories.map(c => c.category),
    });
  } catch (error) {
    console.error('Error fetching service categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service categories',
    });
  }
});

export default router;