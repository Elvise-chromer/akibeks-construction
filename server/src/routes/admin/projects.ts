import express from 'express';
import { body, validationResult } from 'express-validator';
import { eq, desc, and, like, sql } from 'drizzle-orm';
import rateLimit from 'express-rate-limit';
import { db } from '../../db/connection';
import { projects, projectMilestones, services, users } from '../../db/schema';
import { authenticateAdmin, requireAdminRole, AdminAuthRequest } from '../../middleware/adminAuth';

// Log activity function (simplified for CRUD operations)
const logActivity = async (params: { userId: number; action: string; resource: string; details: string; ipAddress?: string; userAgent?: string }) => {
  // This would integrate with the audit system
  console.log('Activity logged:', params);
};

const router = express.Router();

// Rate limiting
const projectsLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const createProjectValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('client').trim().isLength({ min: 1, max: 100 }).withMessage('Client name is required'),
  body('location').trim().isLength({ min: 1, max: 200 }).withMessage('Location is required'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('status').isIn(['planning', 'ongoing', 'completed', 'on-hold']).withMessage('Invalid status'),
  body('category').isIn(['residential', 'commercial', 'industrial']).withMessage('Invalid category'),
  body('serviceIds').isArray().withMessage('Service IDs must be an array'),
  body('serviceIds.*').isInt().withMessage('Each service ID must be an integer'),
];

const updateProjectValidation = [
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be less than 200 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('client').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Client name is required'),
  body('location').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Location is required'),
  body('budget').optional().isNumeric().withMessage('Budget must be a number'),
  body('startDate').optional().isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date is required'),
  body('status').optional().isIn(['planning', 'ongoing', 'completed', 'on-hold']).withMessage('Invalid status'),
  body('category').optional().isIn(['residential', 'commercial', 'industrial']).withMessage('Invalid category'),
  body('featuredImage').optional().isURL().withMessage('Featured image must be a valid URL'),
];

// GET /api/admin/projects - Get all projects with pagination and filtering
router.get('/', projectsLimit, authenticateAdmin, async (req: AdminAuthRequest, res) => {
  try {
    const { page = 1, limit = 10, search, status, priority, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereConditions = [];
    if (search) {
      whereConditions.push(
        like(projects.title, `%${search}%`),
        like(projects.client, `%${search}%`),
        like(projects.location, `%${search}%`)
      );
    }
    if (status) {
      whereConditions.push(eq(projects.status, status as string));
    }

    let orderByColumn = projects.createdAt;
    if (sortBy && projects[sortBy as keyof typeof projects]) {
      orderByColumn = projects[sortBy as keyof typeof projects] as any;
    }
    
    const orderBy = sortOrder === 'desc' ? desc(orderByColumn) : orderByColumn;

    const projectsQuery = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        client: projects.client,
        location: projects.location,
        budget: projects.budget,
        startDate: projects.startDate,
        endDate: projects.endDate,
        status: projects.status,
        category: projects.category,
        featuredImage: projects.featuredImage,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        createdBy: projects.createdBy,
      })
      .from(projects)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(Number(limit))
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(projects)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalCount = Number(totalCountResult[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / Number(limit));

    await logActivity({
      userId: req.user!.id,
      action: 'READ',
      resource: 'projects',
      details: `Viewed projects list (page ${page})`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: projectsQuery,
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
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
    });
  }
});

// GET /api/admin/projects/:id - Get single project
router.get('/:id', projectsLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);

    if (!project.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Get project milestones
    const milestones = await db
      .select()
      .from(projectMilestones)
      .where(eq(projectMilestones.projectId, Number(id)))
      .orderBy(projectMilestones.targetDate);

    await logActivity({
      userId: req.user!.id,
      action: 'READ',
      resource: 'projects',
      details: `Viewed project: ${project[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: {
        ...project[0],
        milestones,
      },
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
    });
  }
});

// POST /api/admin/projects - Create new project
router.post('/', projectsLimit, authenticateToken, requireRole('admin'), createProjectValidation, async (req: AuthRequest, res) => {
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
      client,
      location,
      budget,
      startDate,
      endDate,
      status,
      category,
      featuredImage,
    } = req.body;

    const newProject = await db
      .insert(projects)
      .values({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description,
        client,
        location,
        budget: budget.toString(),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status || 'planning',
        category: category || 'residential',
        featuredImage,
        createdBy: req.user!.id,
      });

    await logActivity({
      userId: req.user!.id,
      action: 'CREATE',
      resource: 'projects',
      details: `Created project: ${title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject[0],
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
    });
  }
});

// PUT /api/admin/projects/:id - Update project
router.put('/:id', projectsLimit, authenticateToken, requireRole('admin'), updateProjectValidation, async (req: AuthRequest, res) => {
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

    // Convert dates if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }
    if (updateData.budget) {
      updateData.budget = Number(updateData.budget);
    }

    updateData.updatedAt = new Date();

    const updatedProject = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, Number(id)));

    // Get the updated project since MySQL doesn't support returning
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'projects',
      details: `Updated project: ${result[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: result[0],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project',
    });
  }
});

// DELETE /api/admin/projects/:id - Delete project
router.delete('/:id', projectsLimit, authenticateToken, requireRole('admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Get project info before deletion for logging
    const project = await db
      .select({ title: projects.title })
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);

    if (!project.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Delete associated milestones first
    await db.delete(projectMilestones).where(eq(projectMilestones.projectId, Number(id)));

    // Delete the project
    await db.delete(projects).where(eq(projects.id, Number(id)));

    await logActivity({
      userId: req.user!.id,
      action: 'DELETE',
      resource: 'projects',
      details: `Deleted project: ${project[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
    });
  }
});

// GET /api/admin/projects/stats - Get project statistics
router.get('/stats/overview', projectsLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const stats = await db
      .select({
        status: projects.status,
        count: sql`count(*)`,
        totalBudget: sql`sum(${projects.budget})`,
      })
      .from(projects)
      .groupBy(projects.status);

    const totalProjects = stats.reduce((acc, stat) => acc + Number(stat.count), 0);
    const totalBudget = stats.reduce((acc, stat) => acc + Number(stat.totalBudget || 0), 0);

    await logActivity({
      userId: req.user!.id,
      action: 'READ',
      resource: 'projects',
      details: 'Viewed project statistics',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: {
        totalProjects,
        totalBudget,
        statusBreakdown: stats,
      },
    });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project statistics',
    });
  }
});

export default router;