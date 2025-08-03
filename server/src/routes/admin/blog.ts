import express from 'express';
import { body, validationResult } from 'express-validator';
import { eq, desc, and, like, sql } from 'drizzle-orm';
import rateLimit from 'express-rate-limit';
import { db } from '../../db/connection';
import { blogPosts } from '../../db/schema';
import { bypassAuth, bypassAdminRole, TestAuthRequest } from '../../middleware/testAuth';

// Log activity function (simplified for CRUD operations)
const logActivity = async (params: { userId: number; action: string; resource: string; details: string; ipAddress?: string; userAgent?: string }) => {
  // This would integrate with the audit system
  console.log('Activity logged:', params);
};

const router = express.Router();

// Rate limiting
const blogLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation schemas
const createBlogValidation = [
  body('title').trim().isLength({ min: 1, max: 300 }).withMessage('Title is required and must be less than 300 characters'),
  body('content').trim().isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  body('excerpt').trim().isLength({ min: 10, max: 500 }).withMessage('Excerpt must be between 10 and 500 characters'),
  body('featuredImage').optional().isURL().withMessage('Featured image must be a valid URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ min: 1 }).withMessage('Each tag must not be empty'),
  body('category').optional().trim().isLength({ max: 100 }).withMessage('Category must be less than 100 characters'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('seoTitle').optional().trim().isLength({ max: 60 }).withMessage('SEO title must be less than 60 characters'),
  body('seoDescription').optional().trim().isLength({ max: 160 }).withMessage('SEO description must be less than 160 characters'),
];

const updateBlogValidation = [
  body('title').optional().trim().isLength({ min: 1, max: 300 }).withMessage('Title must be less than 300 characters'),
  body('content').optional().trim().isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  body('excerpt').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Excerpt must be between 10 and 500 characters'),
  body('featuredImage').optional().isURL().withMessage('Featured image must be a valid URL'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ min: 1 }).withMessage('Each tag must not be empty'),
  body('category').optional().trim().isLength({ max: 100 }).withMessage('Category must be less than 100 characters'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('seoTitle').optional().trim().isLength({ max: 60 }).withMessage('SEO title must be less than 60 characters'),
  body('seoDescription').optional().trim().isLength({ max: 160 }).withMessage('SEO description must be less than 160 characters'),
];

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// GET /api/admin/blog - Get all blog posts with pagination and filtering
router.get('/', blogLimit, bypassAuth, async (req: TestAuthRequest, res) => {
  try {
    const { page = 1, limit = 10, search, category, published, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereConditions = [];
    if (search) {
      whereConditions.push(
        like(blogPosts.title, `%${search}%`),
        like(blogPosts.content, `%${search}%`),
        like(blogPosts.excerpt, `%${search}%`)
      );
    }
    if (category) {
      whereConditions.push(eq(blogPosts.category, category as string));
    }
    if (published !== undefined) {
      whereConditions.push(eq(blogPosts.status, published === 'true' ? 'published' : 'draft'));
    }

    let orderByColumn = blogPosts.createdAt;
    if (sortBy && blogPosts[sortBy as keyof typeof blogPosts]) {
      orderByColumn = blogPosts[sortBy as keyof typeof blogPosts] as any;
    }
    
    const orderBy = sortOrder === 'desc' ? desc(orderByColumn) : orderByColumn;

    const postsQuery = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        category: blogPosts.category,
        tags: blogPosts.tags,
        status: blogPosts.status,
        publishedAt: blogPosts.publishedAt,
        views: blogPosts.views,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        authorId: blogPosts.authorId,
      })
      .from(blogPosts)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(orderBy)
      .limit(Number(limit))
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(blogPosts)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalCount = Number(totalCountResult[0]?.count || 0);
    const totalPages = Math.ceil(totalCount / Number(limit));

    await logActivity({
      userId: req.user!.id,
      action: 'READ',
      resource: 'blog_posts',
      details: `Viewed blog posts list (page ${page})`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: postsQuery,
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
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
    });
  }
});

// GET /api/admin/blog/:id - Get single blog post
router.get('/:id', blogLimit, bypassAuth, async (req: TestAuthRequest, res) => {
  try {
    const { id } = req.params;

    const post = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, Number(id)))
      .limit(1);

    if (!post.length) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'read',
      resource: 'blog_posts',
      details: `Viewed blog post: ${post[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: post[0],
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
    });
  }
});

// POST /api/admin/blog - Create new blog post
router.post('/', blogLimit, bypassAuth, bypassAdminRole, createBlogValidation, async (req: TestAuthRequest, res) => {
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
      content,
      excerpt,
      featuredImage,
      tags,
      category,
      status = "draft",
      seoTitle,
      seoDescription,
    } = req.body;

    // Generate slug from title
    const slug = generateSlug(title);

    // Check if slug already exists
    const existingPost = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this title already exists',
      });
    }

    const newPost = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        category,
        tags: tags ? JSON.stringify(tags) : null,
        status,
        publishedAt: status === "published" ? new Date() : null,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
        authorId: req.user!.id,
        views: 0,
      });

    await logActivity({
      userId: req.user!.id,
      action: 'CREATE',
      resource: 'blog_posts',
      details: `Created blog post: ${title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost[0],
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
    });
  }
});

// PUT /api/admin/blog/:id - Update blog post
router.put('/:id', blogLimit, bypassAuth, bypassAdminRole, updateBlogValidation, async (req: TestAuthRequest, res) => {
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

    // Update slug if title is being changed
    if (updateData.title) {
      const newSlug = generateSlug(updateData.title);
      
      // Check if new slug already exists (excluding current post)
      const existingPost = await db
        .select({ id: blogPosts.id })
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, newSlug), sql`${blogPosts.id} != ${id}`))
        .limit(1);

      if (existingPost.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A blog post with this title already exists',
        });
      }

      updateData.slug = newSlug;
    }

    // Stringify tags if provided
    if (updateData.tags) {
      updateData.tags = JSON.stringify(updateData.tags);
    }

    // Handle publishing
    if (updateData.status === "published" && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (updateData.status === "draft") {
      updateData.publishedAt = null;
    }

    updateData.updatedAt = new Date();

    const updatedPost = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, Number(id)));

    // Get the updated post since MySQL doesn't support returning
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, Number(id)))
      .limit(1);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'blog_posts',
      details: `Updated blog post: ${result[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: result[0],
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
    });
  }
});

// DELETE /api/admin/blog/:id - Delete blog post
router.delete('/:id', blogLimit, bypassAuth, bypassAdminRole, async (req: TestAuthRequest, res) => {
  try {
    const { id } = req.params;

    // Get post info before deletion for logging
    const post = await db
      .select({ title: blogPosts.title })
      .from(blogPosts)
      .where(eq(blogPosts.id, Number(id)))
      .limit(1);

    if (!post.length) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Delete the post
    await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)));

    await logActivity({
      userId: req.user!.id,
      action: 'DELETE',
      resource: 'blog_posts',
      details: `Deleted blog post: ${post[0].title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
    });
  }
});

// GET /api/admin/blog/stats - Get blog statistics
router.get('/stats/overview', blogLimit, bypassAuth, async (req: TestAuthRequest, res) => {
  try {
    const publishedCount = await db
      .select({ count: sql`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'));

    const draftCount = await db
      .select({ count: sql`count(*)` })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'draft'));

    const totalViews = await db
      .select({ total: sql`sum(${blogPosts.views})` })
      .from(blogPosts);

    const categoryStats = await db
      .select({
        category: blogPosts.category,
        count: sql`count(*)`,
      })
      .from(blogPosts)
      .groupBy(blogPosts.category);

    await logActivity({
      userId: req.user!.id,
      action: 'read',
      resource: 'blog_posts',
      details: 'Viewed blog statistics',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    res.json({
      success: true,
      data: {
        published: Number(publishedCount[0]?.count || 0),
        drafts: Number(draftCount[0]?.count || 0),
        totalViews: Number(totalViews[0]?.total || 0),
        categoryBreakdown: categoryStats,
      },
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog statistics',
    });
  }
});

export default router;