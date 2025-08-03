import { mysqlTable, int, varchar, text, datetime, boolean, decimal, json, timestamp } from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';

// Users table for authentication and admin management
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  // Security fields
  twoFAEnabled: boolean('two_fa_enabled').notNull().default(false),
  twoFASecret: varchar('two_fa_secret', { length: 32 }),
  backupCodes: json('backup_codes').default('[]'),
  passwordResetToken: varchar('password_reset_token', { length: 255 }),
  passwordResetExpires: datetime('password_reset_expires'),
  emailVerificationToken: varchar('email_verification_token', { length: 255 }),
  emailVerified: boolean('email_verified').notNull().default(false),
  failedLoginAttempts: int('failed_login_attempts').notNull().default(0),
  lockedUntil: datetime('locked_until'),
  // Profile fields
  avatar: varchar('avatar', { length: 255 }),
  timezone: varchar('timezone', { length: 50 }).notNull().default('Africa/Nairobi'),
  language: varchar('language', { length: 10 }).notNull().default('en'),
  preferences: json('preferences').default('{}'),
  // Timestamps
  lastLogin: datetime('last_login'),
  lastPasswordChange: datetime('last_password_change'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});



// User sessions for managing login sessions
export const userSessions = mysqlTable('user_sessions', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  refreshToken: varchar('refresh_token', { length: 512 }).notNull().unique(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  isActive: boolean('is_active').default(true),
  expiresAt: datetime('expires_at').notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Activity logs for security auditing
export const activityLogs = mysqlTable('activity_logs', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  userId: varchar('user_id', { length: 50 }), // Can be null for anonymous actions
  action: varchar('action', { length: 100 }).notNull(), // LOGIN, LOGOUT, PASSWORD_CHANGE, etc.
  details: text('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  resource: varchar('resource', { length: 100 }), // Resource accessed
  resourceId: varchar('resource_id', { length: 50 }), // ID of resource
  success: boolean('success').default(true),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Permissions system
export const permissions = mysqlTable('permissions', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('permission_name', { length: 100 }).notNull().unique(),
  description: text('description'),
  category: varchar('category', { length: 50 }).notNull(), // admin, user, project, etc.
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// User permissions junction table
export const userPermissions = mysqlTable('user_permissions', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  permissionId: int('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
  grantedBy: int('granted_by').references(() => users.id),
  grantedAt: datetime('granted_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Services offered by the company
export const services = mysqlTable('services', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 500 }),
  icon: varchar('icon', { length: 100 }),
  image: varchar('image', { length: 255 }),
  features: json('features'), // Array of service features
  startingPrice: decimal('starting_price', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 10 }).default('KSH'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  seoTitle: varchar('seo_title', { length: 200 }),
  seoDescription: varchar('seo_description', { length: 500 }),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Projects portfolio
export const projects = mysqlTable('projects', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 500 }),
  client: varchar('client', { length: 200 }),
  location: varchar('location', { length: 200 }),
  category: varchar('category', { length: 100 }).notNull(), // residential, commercial, industrial
  status: varchar('status', { length: 50 }).notNull().default('planning'), // planning, ongoing, completed, on-hold
  startDate: datetime('start_date'),
  endDate: datetime('end_date'),
  completionDate: datetime('completion_date'),
  budget: decimal('budget', { precision: 12, scale: 2 }),
  finalCost: decimal('final_cost', { precision: 12, scale: 2 }),
  currency: varchar('currency', { length: 10 }).default('KSH'),
  featuredImage: varchar('featured_image', { length: 255 }),
  gallery: json('gallery'), // Array of image URLs
  features: json('features'), // Project features/specifications
  challenges: text('challenges'),
  solutions: text('solutions'),
  teamMembers: json('team_members'), // Array of team member IDs
  isPublic: boolean('is_public').default(true),
  isFeatured: boolean('is_featured').default(false),
  sortOrder: int('sort_order').default(0),
  seoTitle: varchar('seo_title', { length: 200 }),
  seoDescription: varchar('seo_description', { length: 500 }),
  createdBy: int('created_by').references(() => users.id),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Project milestones and timeline
export const projectMilestones = mysqlTable('project_milestones', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  projectId: int('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  targetDate: datetime('target_date'),
  completedDate: datetime('completed_date'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, in-progress, completed, delayed
  progress: int('progress').default(0), // 0-100
  notes: text('notes'),
  attachments: json('attachments'), // Array of file URLs
  createdBy: int('created_by').references(() => users.id),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Team members
export const teamMembers = mysqlTable('team_members', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  userId: int('user_id').references(() => users.id), // Link to user account if they have one
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  position: varchar('position', { length: 100 }).notNull(),
  department: varchar('department', { length: 100 }),
  bio: text('bio'),
  image: varchar('image', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  linkedin: varchar('linkedin', { length: 255 }),
  experience: int('experience'), // years of experience
  specializations: json('specializations'), // Array of specializations
  isActive: boolean('is_active').default(true),
  isPublic: boolean('is_public').default(true),
  sortOrder: int('sort_order').default(0),
  joinedDate: datetime('joined_date'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Client testimonials
export const testimonials = mysqlTable('testimonials', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  clientName: varchar('client_name', { length: 200 }).notNull(),
  clientPosition: varchar('client_position', { length: 200 }),
  clientCompany: varchar('client_company', { length: 200 }),
  clientImage: varchar('client_image', { length: 255 }),
  projectId: int('project_id').references(() => projects.id),
  rating: int('rating').notNull(), // 1-5 stars
  title: varchar('title', { length: 200 }),
  testimonial: text('testimonial').notNull(),
  isPublic: boolean('is_public').default(true),
  isFeatured: boolean('is_featured').default(false),
  sortOrder: int('sort_order').default(0),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Blog posts
export const blogPosts = mysqlTable('blog_posts', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: varchar('excerpt', { length: 500 }),
  featuredImage: varchar('featured_image', { length: 255 }),
  category: varchar('category', { length: 100 }),
  tags: json('tags'), // Array of tags
  authorId: int('author_id').references(() => users.id),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, published, archived
  isPublic: boolean('is_public').default(false),
  isFeatured: boolean('is_featured').default(false),
  publishedAt: datetime('published_at'),
  seoTitle: varchar('seo_title', { length: 200 }),
  seoDescription: varchar('seo_description', { length: 500 }),
  readTime: int('read_time'), // estimated read time in minutes
  views: int('views').default(0),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Contact inquiries
export const inquiries = mysqlTable('inquiries', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  company: varchar('company', { length: 200 }),
  subject: varchar('subject', { length: 200 }).notNull(),
  message: text('message').notNull(),
  serviceType: varchar('service_type', { length: 100 }),
  projectBudget: varchar('project_budget', { length: 50 }),
  timeline: varchar('timeline', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, contacted, in-progress, converted, closed
  priority: varchar('priority', { length: 20 }).default('medium'), // low, medium, high, urgent
  assignedTo: int('assigned_to').references(() => users.id),
  notes: text('notes'),
  followUpDate: datetime('follow_up_date'),
  source: varchar('source', { length: 100 }).default('website'), // website, referral, social, etc.
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Quotations
export const quotations = mysqlTable('quotations', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  quotationNumber: varchar('quotation_number', { length: 50 }).notNull().unique(),
  clientName: varchar('client_name', { length: 200 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }),
  clientAddress: text('client_address'),
  projectTitle: varchar('project_title', { length: 200 }).notNull(),
  projectDescription: text('project_description'),
  items: json('items').notNull(), // Array of quotation items
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).default('16.00'), // VAT rate
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }),
  discount: decimal('discount', { precision: 12, scale: 2 }).default('0.00'),
  total: decimal('total', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('KSH'),
  validUntil: datetime('valid_until').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent, accepted, rejected, expired
  terms: text('terms'),
  notes: text('notes'),
  createdBy: int('created_by').references(() => users.id),
  sentAt: datetime('sent_at'),
  acceptedAt: datetime('accepted_at'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Invoices
export const invoices = mysqlTable('invoices', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  quotationId: int('quotation_id').references(() => quotations.id),
  projectId: int('project_id').references(() => projects.id),
  clientName: varchar('client_name', { length: 200 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }),
  clientAddress: text('client_address'),
  items: json('items').notNull(), // Array of invoice items
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
  taxRate: decimal('tax_rate', { precision: 5, scale: 2 }).default('16.00'),
  taxAmount: decimal('tax_amount', { precision: 12, scale: 2 }),
  discount: decimal('discount', { precision: 12, scale: 2 }).default('0.00'),
  total: decimal('total', { precision: 12, scale: 2 }).notNull(),
  amountPaid: decimal('amount_paid', { precision: 12, scale: 2 }).default('0.00'),
  balance: decimal('balance', { precision: 12, scale: 2 }),
  currency: varchar('currency', { length: 10 }).default('KSH'),
  dueDate: datetime('due_date').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent, paid, overdue, cancelled
  paymentMethod: varchar('payment_method', { length: 100 }),
  paymentReference: varchar('payment_reference', { length: 200 }),
  terms: text('terms'),
  notes: text('notes'),
  createdBy: int('created_by').references(() => users.id),
  sentAt: datetime('sent_at'),
  paidAt: datetime('paid_at'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// File manager for document storage
export const files = mysqlTable('files', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: int('size').notNull(), // file size in bytes
  path: varchar('path', { length: 500 }).notNull(),
  url: varchar('url', { length: 500 }),
  category: varchar('category', { length: 100 }), // project, profile, blog, etc.
  entityType: varchar('entity_type', { length: 100 }), // project, user, blog_post, etc.
  entityId: int('entity_id'),
  tags: json('tags'), // Array of tags for organization
  description: text('description'),
  isPublic: boolean('is_public').default(false),
  uploadedBy: int('uploaded_by').references(() => users.id),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Company settings and configuration
export const settings = mysqlTable('settings', {
  id: int('id').primaryKey().autoincrement(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: json('value'),
  description: text('description'),
  category: varchar('category', { length: 50 }).default('general'),
  isPublic: boolean('is_public').default(false),
  updatedBy: int('updated_by').references(() => users.id),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Calendar events for project management
export const calendarEvents = mysqlTable('calendar_events', {
  id: int('id').primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).default(sql`(UUID())`).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  startDate: datetime('start_date').notNull(),
  endDate: datetime('end_date'),
  allDay: boolean('all_day').default(false),
  eventType: varchar('event_type', { length: 50 }).notNull(), // meeting, deadline, site-visit, etc.
  projectId: int('project_id').references(() => projects.id),
  attendees: json('attendees'), // Array of user IDs
  location: varchar('location', { length: 255 }),
  reminderMinutes: int('reminder_minutes').default(30),
  status: varchar('status', { length: 50 }).default('scheduled'), // scheduled, completed, cancelled
  createdBy: int('created_by').references(() => users.id),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions),
  permissions: many(userPermissions),
  createdProjects: many(projects),
  blogPosts: many(blogPosts),
  quotations: many(quotations),
  invoices: many(invoices),
  uploadedFiles: many(files),
  settingsUpdates: many(settings),
  calendarEvents: many(calendarEvents),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const userPermissionsRelations = relations(userPermissions, ({ one }) => ({
  user: one(users, {
    fields: [userPermissions.userId],
    references: [users.id],
  }),
  permission: one(permissions, {
    fields: [userPermissions.permissionId],
    references: [permissions.id],
  }),
  grantedByUser: one(users, {
    fields: [userPermissions.grantedBy],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ many, one }) => ({
  milestones: many(projectMilestones),
  testimonials: many(testimonials),
  invoices: many(invoices),
  events: many(calendarEvents),
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),
}));

export const projectMilestonesRelations = relations(projectMilestones, ({ one }) => ({
  project: one(projects, {
    fields: [projectMilestones.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [projectMilestones.createdBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  project: one(projects, {
    fields: [testimonials.projectId],
    references: [projects.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  assignedUser: one(users, {
    fields: [inquiries.assignedTo],
    references: [users.id],
  }),
}));

export const quotationsRelations = relations(quotations, ({ one, many }) => ({
  creator: one(users, {
    fields: [quotations.createdBy],
    references: [users.id],
  }),
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  quotation: one(quotations, {
    fields: [invoices.quotationId],
    references: [quotations.id],
  }),
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [invoices.createdBy],
    references: [users.id],
  }),
}));

export const filesRelations = relations(files, ({ one }) => ({
  uploader: one(users, {
    fields: [files.uploadedBy],
    references: [users.id],
  }),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [settings.updatedBy],
    references: [users.id],
  }),
}));

export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
  project: one(projects, {
    fields: [calendarEvents.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [calendarEvents.createdBy],
    references: [users.id],
  }),
}));