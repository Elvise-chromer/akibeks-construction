import express from 'express';
import { body, validationResult } from 'express-validator';
import { eq, desc, and, like, sql } from 'drizzle-orm';
import rateLimit from 'express-rate-limit';
import { db } from '../../db/connection';
import { teamMembers } from '../../db/schema';
import { authenticateToken, requireRole, AuthRequest } from '../../middleware/auth';

// Log activity function (simplified for CRUD operations)
const logActivity = async (params: { userId: number; action: string; resource: string; details: string; ipAddress?: string; userAgent?: string }) => {
  // This would integrate with the audit system
  console.log('Activity logged:', params);
};

const router = express.Router();

// Rate limiting
const teamLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const createMemberValidation = [
  body('firstName').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('position').trim().isLength({ min: 1, max: 150 }).withMessage('Position is required and must be less than 150 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be less than 20 characters'),
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio must be less than 1000 characters'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('department').optional().trim().isLength({ max: 100 }).withMessage('Department must be less than 100 characters'),
  body('joinedDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('specializations').optional().isArray().withMessage('Skills must be an array'),
  body('skills.*').optional().trim().isLength({ min: 1 }).withMessage('Each skill must not be empty'),
  body('linkedin').optional().isObject().withMessage('Social links must be an object'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const updateMemberValidation = [
  body('firstName').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be less than 100 characters'),
  body('position').optional().trim().isLength({ min: 1, max: 150 }).withMessage('Position must be less than 150 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be less than 20 characters'),
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio must be less than 1000 characters'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('department').optional().trim().isLength({ max: 100 }).withMessage('Department must be less than 100 characters'),
  body('joinedDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('specializations').optional().isArray().withMessage('Skills must be an array'),
  body('skills.*').optional().trim().isLength({ min: 1 }).withMessage('Each skill must not be empty'),
  body('linkedin').optional().isObject().withMessage('Social links must be an object'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

// GET /api/admin/team - Get all team members with pagination and filtering
router.get('/', teamLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, search, department, isActive, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereConditions = [];
    if (search) {
      whereConditions.push(
        like(teamMembers.firstName, `%${search}%`),
        like(teamMembers.position, `%${search}%`),
        like(teamMembers.email, `%${search}%`)
      );
    }
    if (department) {
      whereConditions.push(eq(teamMembers.department, department as string));
    }
    if (isActive !== undefined) {
      whereConditions.push(eq(teamMembers.isActive, isActive === 'true'));
    }

    let orderByColumn = teamMembers.createdAt;
    if (sortBy && teamMembers[sortBy as keyof typeof teamMembers]) {
      orderByColumn = teamMembers[sortBy as keyof typeof teamMembers] as any;
    }
    
    const orderBy = sortOrder === 'desc' ? desc(orderByColumn) : orderByColumn;

    const membersQuery = await db
      .select({
        id: teamMembers.id,
        name: teamMembers.firstName,
        position: teamMembers.position,
        email: teamMembers.email,
        phone: teamMembers.phone,
        bio: teamMembers.bio,
        image: teamMembers.image,
        department: teamMembers.department,
        startDate: teamMembers.joinedDate,
        skills: teamMembers.specializations,
        socialLinks: teamMembers.linkedin,
        isActive: teamMembers.isActive,
        createdAt: teamMembers.createdAt,
        updatedAt: teamMembers.updatedAt,
        userId: teamMembers.userId,
      })
      .from(teamMembers)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(Number(limit))
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(teamMembers)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalCount = Number(totalCountResult[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / Number(limit));

    await logActivity({
      userId: req.user!.id,
      action: 'read',
      resource: 'team_members',
      details: `Viewed team members list (page ${page})`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: membersQuery,
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
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
    });
  }
});

// GET /api/admin/team/:id - Get single team member
router.get('/:id', teamLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const member = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, Number(id)))
      .limit(1);

    if (!member.length) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'read',
      resource: 'team_members',
      details: `Viewed team member: ${member[0].firstName} ${member[0].lastName}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: member[0],
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
    });
  }
});

// POST /api/admin/team - Create new team member
router.post('/', teamLimit, authenticateToken, requireRole('admin'), createMemberValidation, async (req: AuthRequest, res) => {
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
      firstName,
      lastName,
      position,
      email,
      phone,
      bio,
      image,
      department,
      joinedDate,
      specializations,
      linkedin,
      skills,
      socialLinks,
      isActive = true,
      userId,
    } = req.body;

    // Check if email already exists
    const existingMember = await db
      .select({ id: teamMembers.id })
      .from(teamMembers)
      .where(eq(teamMembers.email, email))
      .limit(1);

    if (existingMember.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A team member with this email already exists',
      });
    }

    const newMember = await db
      .insert(teamMembers)
      .values({
        firstName,
        lastName,
        position,
        email,
        phone,
        bio,
        image,
        department,
        joinedDate: joinedDate ? new Date(joinedDate) : new Date(),
        specializations: specializations ? JSON.stringify(specializations) : null,
        linkedin,
        isActive,
        userId: userId || null,
      })
      .returning();

    await logActivity({
      userId: req.user!.id,
      action: 'CREATE',
      resource: 'team_members',
      details: `Created team member: ${firstName} ${lastName}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: newMember[0],
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating team member',
    });
  }
});

// PUT /api/admin/team/:id - Update team member
router.put('/:id', teamLimit, authenticateToken, requireRole('admin'), updateMemberValidation, async (req: AuthRequest, res) => {
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

    // Check if email is being changed and if it conflicts with existing member
    if (updateData.email) {
      const existingMember = await db
        .select({ id: teamMembers.id })
        .from(teamMembers)
        .where(and(eq(teamMembers.email, updateData.email), sql`${teamMembers.id} != ${id}`))
        .limit(1);

      if (existingMember.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A team member with this email already exists',
        });
      }
    }

    // Convert dates if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }

    // Stringify arrays/objects if provided
    if (updateData.skills) {
      updateData.skills = JSON.stringify(updateData.skills);
    }
    if (updateData.socialLinks) {
      updateData.socialLinks = JSON.stringify(updateData.socialLinks);
    }

    updateData.updatedAt = new Date();

    const updatedMember = await db
      .update(teamMembers)
      .set(updateData)
      .where(eq(teamMembers.id, Number(id)))
      .returning();

    if (!updatedMember.length) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'team_members',
      details: `Updated team member: ${updatedMember[0].firstName} ${updatedMember[0].lastName}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedMember[0],
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team member',
    });
  }
});

// DELETE /api/admin/team/:id - Delete team member
router.delete('/:id', teamLimit, authenticateToken, requireRole('admin'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Get member info before deletion for logging
    const member = await db
      .select({ name: teamMembers.firstName })
      .from(teamMembers)
      .where(eq(teamMembers.id, Number(id)))
      .limit(1);

    if (!member.length) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    // Delete the member
    await db.delete(teamMembers).where(eq(teamMembers.id, Number(id)));

    await logActivity({
      userId: req.user!.id,
      action: 'DELETE',
      resource: 'team_members',
      details: `Deleted team member: ${member[0].name}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
    });
  }
});

// GET /api/admin/team/stats - Get team statistics
router.get('/stats/overview', teamLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const departmentStats = await db
      .select({
        department: teamMembers.department,
        count: sql`count(*)`,
      })
      .from(teamMembers)
      .groupBy(teamMembers.department);

    const activeCount = await db
      .select({ count: sql`count(*)` })
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true));

    const totalMembers = departmentStats.reduce((acc, stat) => acc + Number(stat.count), 0);

    await logActivity({
      userId: req.user!.id,
      action: 'read',
      resource: 'team_members',
      details: 'Viewed team statistics',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: {
        totalMembers,
        activeMembers: Number(activeCount[0]?.count || 0),
        departmentBreakdown: departmentStats,
      },
    });
  } catch (error) {
    console.error('Error fetching team stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team statistics',
    });
  }
});

// GET /api/admin/team/departments - Get all unique departments
router.get('/departments/list', teamLimit, authenticateToken, async (req: AuthRequest, res) => {
  try {
    const departments = await db
      .selectDistinct({ department: teamMembers.department })
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true));

    res.json({
      success: true,
      data: departments.map(d => d.department).filter(Boolean),
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
    });
  }
});

export default router;