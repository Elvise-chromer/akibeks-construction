import express from 'express';
import { requireAuth } from '../../middleware/auth';

const router = express.Router();

// Get audit logs with pagination, search, and filtering
router.get('/logs', requireAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      search = '', 
      action,
      resource_type,
      user_id,
      severity,
      start_date,
      end_date,
      sort_by = 'created_at', 
      sort_order = 'DESC' 
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    
    let whereClause = '1=1';
    const queryParams: any[] = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (al.resource_name ILIKE $${paramCount} OR al.details::text ILIKE $${paramCount} OR u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (action) {
      paramCount++;
      whereClause += ` AND al.action = $${paramCount}`;
      queryParams.push(action);
    }

    if (resource_type) {
      paramCount++;
      whereClause += ` AND al.resource_type = $${paramCount}`;
      queryParams.push(resource_type);
    }

    if (user_id) {
      paramCount++;
      whereClause += ` AND al.user_id = $${paramCount}`;
      queryParams.push(user_id);
    }

    if (severity) {
      paramCount++;
      whereClause += ` AND al.severity = $${paramCount}`;
      queryParams.push(severity);
    }

    if (start_date) {
      paramCount++;
      whereClause += ` AND al.created_at >= $${paramCount}`;
      queryParams.push(start_date);
    }

    if (end_date) {
      paramCount++;
      whereClause += ` AND al.created_at <= $${paramCount}`;
      queryParams.push(end_date);
    }

    const query = `
      SELECT 
        al.*,
        u.first_name || ' ' || u.last_name as user_name,
        u.email as user_email,
        u.role as user_role,
        COUNT(*) OVER() as total_count
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE ${whereClause}
      ORDER BY al.${sort_by} ${sort_order}
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;

    queryParams.push(Number(limit), offset);

    const result = await (req as any).db.query(query, queryParams);
    const totalCount = result.rows.length > 0 ? result.rows[0].total_count : 0;

    res.json({
      logs: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(totalCount),
        pages: Math.ceil(Number(totalCount) / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get audit log details by ID
router.get('/logs/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        al.*,
        u.first_name || ' ' || u.last_name as user_name,
        u.email as user_email,
        u.role as user_role,
        u.avatar_url as user_avatar
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE al.id = $1
    `;

    const result = await (req as any).db.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Audit log not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching audit log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get audit statistics
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    switch (period) {
      case 'day':
        dateFilter = "AND created_at >= date_trunc('day', CURRENT_DATE)";
        break;
      case 'week':
        dateFilter = "AND created_at >= date_trunc('week', CURRENT_DATE)";
        break;
      case 'month':
        dateFilter = "AND created_at >= date_trunc('month', CURRENT_DATE)";
        break;
      case 'quarter':
        dateFilter = "AND created_at >= date_trunc('quarter', CURRENT_DATE)";
        break;
      case 'year':
        dateFilter = "AND created_at >= date_trunc('year', CURRENT_DATE)";
        break;
      default:
        dateFilter = "AND created_at >= date_trunc('month', CURRENT_DATE)";
    }

    const statsQuery = `
      WITH audit_stats AS (
        SELECT 
          COUNT(*) as total_activities,
          COUNT(DISTINCT user_id) as active_users,
          COUNT(*) FILTER (WHERE action = 'create') as create_actions,
          COUNT(*) FILTER (WHERE action = 'update') as update_actions,
          COUNT(*) FILTER (WHERE action = 'delete') as delete_actions,
          COUNT(*) FILTER (WHERE action = 'login') as login_actions,
          COUNT(*) FILTER (WHERE action = 'logout') as logout_actions,
          COUNT(*) FILTER (WHERE severity = 'critical') as critical_events,
          COUNT(*) FILTER (WHERE severity = 'warning') as warning_events,
          COUNT(*) FILTER (WHERE severity = 'info') as info_events
        FROM audit_logs 
        WHERE 1=1 ${dateFilter}
      ),
      resource_stats AS (
        SELECT 
          resource_type,
          COUNT(*) as activity_count,
          COUNT(*) FILTER (WHERE action = 'create') as creates,
          COUNT(*) FILTER (WHERE action = 'update') as updates,
          COUNT(*) FILTER (WHERE action = 'delete') as deletes
        FROM audit_logs 
        WHERE 1=1 ${dateFilter}
        GROUP BY resource_type
        ORDER BY activity_count DESC
        LIMIT 10
      ),
      user_activity AS (
        SELECT 
          u.first_name || ' ' || u.last_name as user_name,
          u.role,
          COUNT(*) as activity_count,
          MAX(al.created_at) as last_activity
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        WHERE 1=1 ${dateFilter}
        GROUP BY u.id, u.first_name, u.last_name, u.role
        ORDER BY activity_count DESC
        LIMIT 10
      )
      SELECT 
        (SELECT row_to_json(audit_stats) FROM audit_stats) as overall_stats,
        (SELECT json_agg(resource_stats) FROM resource_stats) as resource_stats,
        (SELECT json_agg(user_activity) FROM user_activity) as user_activity
    `;

    const result = await (req as any).db.query(statsQuery);
    
    res.json({
      overall: result.rows[0].overall_stats,
      by_resource: result.rows[0].resource_stats || [],
      by_user: result.rows[0].user_activity || []
    });
  } catch (error) {
    console.error('Error fetching audit statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get audit timeline data for charts
router.get('/timeline', requireAuth, async (req, res) => {
  try {
    const { 
      period = 'day', 
      duration = 30,
      action,
      resource_type 
    } = req.query;

    let dateGrouping = '';
    let dateFilter = '';
    
    switch (period) {
      case 'hour':
        dateGrouping = "date_trunc('hour', created_at)";
        dateFilter = `created_at >= CURRENT_TIMESTAMP - INTERVAL '${duration} hours'`;
        break;
      case 'day':
        dateGrouping = "date_trunc('day', created_at)";
        dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${duration} days'`;
        break;
      case 'week':
        dateGrouping = "date_trunc('week', created_at)";
        dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${duration} weeks'`;
        break;
      case 'month':
        dateGrouping = "date_trunc('month', created_at)";
        dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${duration} months'`;
        break;
      default:
        dateGrouping = "date_trunc('day', created_at)";
        dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${duration} days'`;
    }

    let additionalFilters = '';
    const queryParams: any[] = [];
    let paramCount = 0;

    if (action) {
      paramCount++;
      additionalFilters += ` AND action = $${paramCount}`;
      queryParams.push(action);
    }

    if (resource_type) {
      paramCount++;
      additionalFilters += ` AND resource_type = $${paramCount}`;
      queryParams.push(resource_type);
    }

    const timelineQuery = `
      SELECT 
        ${dateGrouping} as period,
        COUNT(*) as total_activities,
        COUNT(*) FILTER (WHERE action = 'create') as creates,
        COUNT(*) FILTER (WHERE action = 'update') as updates,
        COUNT(*) FILTER (WHERE action = 'delete') as deletes,
        COUNT(*) FILTER (WHERE action = 'login') as logins,
        COUNT(*) FILTER (WHERE action = 'logout') as logouts,
        COUNT(*) FILTER (WHERE severity = 'critical') as critical_events,
        COUNT(*) FILTER (WHERE severity = 'warning') as warning_events,
        COUNT(DISTINCT user_id) as active_users
      FROM audit_logs 
      WHERE ${dateFilter} ${additionalFilters}
      GROUP BY ${dateGrouping}
      ORDER BY period
    `;

    const result = await (req as any).db.query(timelineQuery, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching audit timeline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get security events (failed logins, suspicious activities)
router.get('/security', requireAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20,
      start_date,
      end_date 
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    
    let dateFilter = '';
    const queryParams: any[] = [];
    let paramCount = 0;

    if (start_date) {
      paramCount++;
      dateFilter += ` AND al.created_at >= $${paramCount}`;
      queryParams.push(start_date);
    }

    if (end_date) {
      paramCount++;
      dateFilter += ` AND al.created_at <= $${paramCount}`;
      queryParams.push(end_date);
    }

    const securityQuery = `
      SELECT 
        al.*,
        u.first_name || ' ' || u.last_name as user_name,
        u.email as user_email,
        u.role as user_role,
        COUNT(*) OVER() as total_count
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE (
        (al.action = 'login' AND al.details::text LIKE '%failed%') OR
        (al.severity IN ('warning', 'critical')) OR
        (al.action = 'delete' AND al.resource_type IN ('user', 'project', 'invoice')) OR
        (al.details::text LIKE '%unauthorized%') OR
        (al.details::text LIKE '%suspicious%')
      ) ${dateFilter}
      ORDER BY al.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;

    queryParams.push(Number(limit), offset);

    const result = await (req as any).db.query(securityQuery, queryParams);
    const totalCount = result.rows.length > 0 ? result.rows[0].total_count : 0;

    res.json({
      security_events: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(totalCount),
        pages: Math.ceil(Number(totalCount) / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching security events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export audit logs
router.post('/export', requireAuth, async (req, res) => {
  try {
    const {
      format = 'csv',
      filters = {},
      start_date,
      end_date
    } = req.body;

    let whereClause = '1=1';
    const queryParams: any[] = [];
    let paramCount = 0;

    // Apply filters
    if (filters.action) {
      paramCount++;
      whereClause += ` AND al.action = $${paramCount}`;
      queryParams.push(filters.action);
    }

    if (filters.resource_type) {
      paramCount++;
      whereClause += ` AND al.resource_type = $${paramCount}`;
      queryParams.push(filters.resource_type);
    }

    if (filters.user_id) {
      paramCount++;
      whereClause += ` AND al.user_id = $${paramCount}`;
      queryParams.push(filters.user_id);
    }

    if (filters.severity) {
      paramCount++;
      whereClause += ` AND al.severity = $${paramCount}`;
      queryParams.push(filters.severity);
    }

    if (start_date) {
      paramCount++;
      whereClause += ` AND al.created_at >= $${paramCount}`;
      queryParams.push(start_date);
    }

    if (end_date) {
      paramCount++;
      whereClause += ` AND al.created_at <= $${paramCount}`;
      queryParams.push(end_date);
    }

    const exportQuery = `
      SELECT 
        al.id,
        al.action,
        al.resource_type,
        al.resource_id,
        al.resource_name,
        u.first_name || ' ' || u.last_name as user_name,
        u.email as user_email,
        u.role as user_role,
        al.old_values,
        al.new_values,
        al.details,
        al.ip_address,
        al.user_agent,
        al.severity,
        al.created_at
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      WHERE ${whereClause}
      ORDER BY al.created_at DESC
      LIMIT 10000
    `;

    const result = await (req as any).db.query(exportQuery, queryParams);

    // Log the export action
    await (req as any).db.query(`
      INSERT INTO audit_logs (
        user_id, action, resource_type, resource_name,
        details, created_at
      ) VALUES ($1, 'export', 'audit_logs', 'audit_export', $2, NOW())
    `, [
      (req.user as any).id,
      JSON.stringify({ 
        format, 
        filters, 
        record_count: result.rows.length,
        exported_at: new Date().toISOString()
      })
    ]);

    if (format === 'json') {
      res.json({
        success: true,
        data: result.rows,
        metadata: {
          exported_at: new Date().toISOString(),
          record_count: result.rows.length,
          filters: filters
        }
      });
    } else {
      // For CSV format, you would typically generate CSV content here
      // For now, we'll return JSON with a note about CSV conversion
      res.json({
        success: true,
        message: 'CSV export would be generated here',
        data: result.rows,
        format: 'csv'
      });
    }
  } catch (error) {
    console.error('Error exporting audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create audit log entry (for system events)
router.post('/log', requireAuth, async (req, res) => {
  try {
    const {
      action,
      resource_type,
      resource_id,
      resource_name,
      old_values,
      new_values,
      details,
      severity = 'info'
    } = req.body;

    const insertQuery = `
      INSERT INTO audit_logs (
        user_id, action, resource_type, resource_id, resource_name,
        old_values, new_values, details, ip_address, user_agent,
        severity, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      RETURNING *
    `;

    const result = await (req as any).db.query(insertQuery, [
      (req.user as any).id,
      action,
      resource_type,
      resource_id,
      resource_name,
      JSON.stringify(old_values || {}),
      JSON.stringify(new_values || {}),
      JSON.stringify(details || {}),
      req.ip,
      req.headers['user-agent'],
      severity
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating audit log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get distinct values for filters
router.get('/filters', requireAuth, async (req, res) => {
  try {
    const filtersQuery = `
      SELECT 
        'actions' as filter_type,
        json_agg(DISTINCT action) as values
      FROM audit_logs
      WHERE created_at >= CURRENT_DATE - INTERVAL '1 year'
      
      UNION ALL
      
      SELECT 
        'resource_types' as filter_type,
        json_agg(DISTINCT resource_type) as values
      FROM audit_logs
      WHERE created_at >= CURRENT_DATE - INTERVAL '1 year'
      
      UNION ALL
      
      SELECT 
        'severities' as filter_type,
        json_agg(DISTINCT severity) as values
      FROM audit_logs
      WHERE created_at >= CURRENT_DATE - INTERVAL '1 year'
      
      UNION ALL
      
      SELECT 
        'users' as filter_type,
        json_agg(json_build_object(
          'id', u.id,
          'name', u.first_name || ' ' || u.last_name,
          'email', u.email,
          'role', u.role
        )) as values
      FROM (
        SELECT DISTINCT user_id 
        FROM audit_logs 
        WHERE user_id IS NOT NULL AND created_at >= CURRENT_DATE - INTERVAL '1 year'
        LIMIT 100
      ) al
      JOIN users u ON al.user_id = u.id
    `;

    const result = await (req as any).db.query(filtersQuery);
    
    const filters = {};
    result.rows.forEach(row => {
      filters[row.filter_type] = row.values;
    });

    res.json(filters);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;