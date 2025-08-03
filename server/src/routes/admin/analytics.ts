import express from 'express';
import { requireAuth } from '../../middleware/auth';

const router = express.Router();

// Get comprehensive financial metrics
router.get('/financial', requireAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    switch (period) {
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

    const financialQuery = `
      WITH financial_metrics AS (
        SELECT 
          -- Revenue Metrics
          COALESCE(SUM(total_amount) FILTER (WHERE status = 'paid'), 0) as total_revenue,
          COALESCE(SUM(amount_paid), 0) as collected_revenue,
          COALESCE(SUM(balance_due) FILTER (WHERE status NOT IN ('paid', 'cancelled')), 0) as outstanding_revenue,
          COALESCE(SUM(total_amount) FILTER (WHERE status = 'overdue' OR (due_date < CURRENT_DATE AND status NOT IN ('paid', 'cancelled'))), 0) as overdue_amount,
          
          -- Invoice Metrics
          COUNT(*) FILTER (WHERE status = 'sent') as invoices_sent,
          COUNT(*) FILTER (WHERE status = 'paid') as invoices_paid,
          COUNT(*) FILTER (WHERE status = 'overdue' OR (due_date < CURRENT_DATE AND status NOT IN ('paid', 'cancelled'))) as invoices_overdue,
          
          -- Material vs Labour breakdown
          COALESCE(SUM(total_material_cost), 0) as total_material_cost,
          COALESCE(SUM(total_labour_cost), 0) as total_labour_cost,
          
          -- Average metrics
          COALESCE(AVG(total_amount) FILTER (WHERE status = 'paid'), 0) as avg_invoice_value,
          COALESCE(AVG(EXTRACT(days FROM (paid_date - issue_date))) FILTER (WHERE status = 'paid'), 0) as avg_payment_days
          
        FROM invoices 
        WHERE 1=1 ${dateFilter}
      ),
      quote_metrics AS (
        SELECT 
          COUNT(*) as total_quotes,
          COUNT(*) FILTER (WHERE status = 'accepted') as accepted_quotes,
          COALESCE(SUM(total_amount), 0) as total_quote_value,
          COALESCE(SUM(total_amount) FILTER (WHERE status = 'accepted'), 0) as accepted_quote_value,
          ROUND(
            CASE 
              WHEN COUNT(*) FILTER (WHERE status = 'sent') > 0 
              THEN (COUNT(*) FILTER (WHERE status = 'accepted')::float / COUNT(*) FILTER (WHERE status = 'sent')) * 100
              ELSE 0 
            END, 2
          ) as quote_acceptance_rate
        FROM quotes 
        WHERE 1=1 ${dateFilter}
      )
      SELECT 
        fm.*,
        qm.*,
        -- Calculated ratios
        ROUND(
          CASE 
            WHEN fm.total_revenue > 0 
            THEN (fm.collected_revenue / fm.total_revenue) * 100
            ELSE 0 
          END, 2
        ) as collection_rate,
        ROUND(
          CASE 
            WHEN fm.total_material_cost + fm.total_labour_cost > 0 
            THEN (fm.total_labour_cost / (fm.total_material_cost + fm.total_labour_cost)) * 100
            ELSE 0 
          END, 2
        ) as labour_percentage,
        ROUND(
          CASE 
            WHEN fm.invoices_sent > 0 
            THEN (fm.invoices_paid::float / fm.invoices_sent) * 100
            ELSE 0 
          END, 2
        ) as payment_rate
      FROM financial_metrics fm, quote_metrics qm
    `;

    const result = await (req as any).db.query(financialQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching financial metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get operational metrics
router.get('/operational', requireAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    switch (period) {
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

    const operationalQuery = `
      WITH project_metrics AS (
        SELECT 
          COUNT(*) as total_projects,
          COUNT(*) FILTER (WHERE status = 'active') as active_projects,
          COUNT(*) FILTER (WHERE status = 'completed') as completed_projects,
          COUNT(*) FILTER (WHERE status = 'on_hold') as on_hold_projects,
          COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_projects,
          COALESCE(AVG(EXTRACT(days FROM (COALESCE(end_date, CURRENT_DATE) - start_date))) FILTER (WHERE status = 'completed'), 0) as avg_project_duration,
          COUNT(*) FILTER (WHERE priority = 'urgent' OR priority = 'critical') as high_priority_projects
        FROM projects 
        WHERE 1=1 ${dateFilter}
      ),
      task_metrics AS (
        SELECT 
          COUNT(*) as total_tasks,
          COUNT(*) FILTER (WHERE status = 'completed') as completed_tasks,
          COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_tasks,
          COUNT(*) FILTER (WHERE due_date < CURRENT_DATE AND status != 'completed') as overdue_tasks,
          COALESCE(AVG(EXTRACT(days FROM (COALESCE(completed_at, CURRENT_DATE) - created_at))) FILTER (WHERE status = 'completed'), 0) as avg_task_completion_time
        FROM project_tasks 
        WHERE 1=1 ${dateFilter}
      ),
      document_metrics AS (
        SELECT 
          COUNT(*) as total_documents,
          COUNT(*) FILTER (WHERE document_type = 'contract') as contracts,
          COUNT(*) FILTER (WHERE document_type = 'permit') as permits,
          COUNT(*) FILTER (WHERE document_type = 'blueprint') as blueprints,
          COALESCE(SUM(file_size), 0) as total_storage_used
        FROM documents 
        WHERE 1=1 ${dateFilter}
      )
      SELECT 
        pm.*,
        tm.*,
        dm.*,
        -- Calculated efficiency metrics
        ROUND(
          CASE 
            WHEN pm.total_projects > 0 
            THEN (pm.completed_projects::float / pm.total_projects) * 100
            ELSE 0 
          END, 2
        ) as project_completion_rate,
        ROUND(
          CASE 
            WHEN tm.total_tasks > 0 
            THEN (tm.completed_tasks::float / tm.total_tasks) * 100
            ELSE 0 
          END, 2
        ) as task_completion_rate,
        ROUND(
          CASE 
            WHEN tm.total_tasks > 0 
            THEN (tm.overdue_tasks::float / tm.total_tasks) * 100
            ELSE 0 
          END, 2
        ) as task_overdue_rate
      FROM project_metrics pm, task_metrics tm, document_metrics dm
    `;

    const result = await (req as any).db.query(operationalQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching operational metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get customer metrics
router.get('/customer', requireAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    switch (period) {
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

    const customerQuery = `
      WITH client_metrics AS (
        SELECT 
          COUNT(DISTINCT u.id) as total_clients,
          COUNT(DISTINCT u.id) FILTER (WHERE u.created_at >= date_trunc('month', CURRENT_DATE)) as new_clients_this_month,
          COUNT(DISTINCT p.client_id) as active_clients,
          COALESCE(AVG(client_revenue.total_spent), 0) as avg_client_value,
          COUNT(DISTINCT repeat_clients.client_id) as repeat_clients
        FROM users u
        LEFT JOIN projects p ON u.id = p.client_id AND p.status = 'active'
        LEFT JOIN (
          SELECT client_id, SUM(total_amount) as total_spent
          FROM invoices 
          WHERE status = 'paid'
          GROUP BY client_id
        ) client_revenue ON u.id = client_revenue.client_id
        LEFT JOIN (
          SELECT client_id, COUNT(*) as project_count
          FROM projects 
          GROUP BY client_id
          HAVING COUNT(*) > 1
        ) repeat_clients ON u.id = repeat_clients.client_id
        WHERE u.role = 'client'
      ),
      lead_metrics AS (
        SELECT 
          COUNT(*) as total_leads,
          COUNT(*) FILTER (WHERE status = 'new') as new_leads,
          COUNT(*) FILTER (WHERE status = 'won') as won_leads,
          COUNT(*) FILTER (WHERE status = 'lost') as lost_leads,
          COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
          COALESCE(AVG(EXTRACT(days FROM (updated_at - created_at))) FILTER (WHERE status IN ('won', 'lost')), 0) as avg_lead_conversion_time
        FROM leads 
        WHERE 1=1 ${dateFilter}
      ),
      satisfaction_metrics AS (
        SELECT 
          COUNT(*) as total_reviews,
          COALESCE(AVG(rating), 0) as avg_rating,
          COUNT(*) FILTER (WHERE rating >= 4) as positive_reviews,
          COUNT(*) FILTER (WHERE rating <= 2) as negative_reviews
        FROM project_reviews 
        WHERE 1=1 ${dateFilter}
      )
      SELECT 
        cm.*,
        lm.*,
        sm.*,
        -- Calculated customer metrics
        ROUND(
          CASE 
            WHEN lm.total_leads > 0 
            THEN (lm.won_leads::float / lm.total_leads) * 100
            ELSE 0 
          END, 2
        ) as lead_conversion_rate,
        ROUND(
          CASE 
            WHEN cm.total_clients > 0 
            THEN (cm.repeat_clients::float / cm.total_clients) * 100
            ELSE 0 
          END, 2
        ) as client_retention_rate,
        ROUND(
          CASE 
            WHEN sm.total_reviews > 0 
            THEN (sm.positive_reviews::float / sm.total_reviews) * 100
            ELSE 0 
          END, 2
        ) as customer_satisfaction_rate
      FROM client_metrics cm, lead_metrics lm, satisfaction_metrics sm
    `;

    const result = await (req as any).db.query(customerQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching customer metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team performance metrics
router.get('/team', requireAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    switch (period) {
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

    const teamQuery = `
      WITH employee_metrics AS (
        SELECT 
          COUNT(*) as total_employees,
          COUNT(*) FILTER (WHERE status = 'active') as active_employees,
          COUNT(*) FILTER (WHERE role = 'project_manager') as project_managers,
          COUNT(*) FILTER (WHERE role = 'team_member') as team_members,
          COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE)) as new_hires_this_month
        FROM users 
        WHERE role NOT IN ('client', 'guest')
      ),
      productivity_metrics AS (
        SELECT 
          COUNT(DISTINCT assigned_to) as active_team_members,
          COALESCE(AVG(tasks_per_person.task_count), 0) as avg_tasks_per_person,
          COALESCE(AVG(EXTRACT(hours FROM total_time)), 0) as avg_hours_per_task,
          COUNT(*) FILTER (WHERE status = 'completed' AND completed_at <= due_date) as tasks_completed_on_time,
          COUNT(*) as total_assigned_tasks
        FROM project_tasks pt
        LEFT JOIN (
          SELECT assigned_to, COUNT(*) as task_count
          FROM project_tasks 
          WHERE 1=1 ${dateFilter}
          GROUP BY assigned_to
        ) tasks_per_person ON pt.assigned_to = tasks_per_person.assigned_to
        WHERE 1=1 ${dateFilter}
      ),
      attendance_metrics AS (
        SELECT 
          COUNT(DISTINCT user_id) as employees_with_time_entries,
          COALESCE(SUM(hours_worked), 0) as total_hours_logged,
          COALESCE(AVG(hours_worked), 0) as avg_hours_per_entry
        FROM time_entries 
        WHERE 1=1 ${dateFilter}
      )
      SELECT 
        em.*,
        pm.*,
        am.*,
        -- Calculated team metrics
        ROUND(
          CASE 
            WHEN pm.total_assigned_tasks > 0 
            THEN (pm.tasks_completed_on_time::float / pm.total_assigned_tasks) * 100
            ELSE 0 
          END, 2
        ) as on_time_completion_rate,
        ROUND(
          CASE 
            WHEN em.active_employees > 0 
            THEN am.total_hours_logged / em.active_employees
            ELSE 0 
          END, 2
        ) as avg_hours_per_employee,
        ROUND(
          CASE 
            WHEN em.total_employees > 0 
            THEN (am.employees_with_time_entries::float / em.total_employees) * 100
            ELSE 0 
          END, 2
        ) as time_tracking_adoption_rate
      FROM employee_metrics em, productivity_metrics pm, attendance_metrics am
    `;

    const result = await (req as any).db.query(teamQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching team metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get efficiency metrics
router.get('/efficiency', requireAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = '';
    switch (period) {
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

    const efficiencyQuery = `
      WITH cost_efficiency AS (
        SELECT 
          COALESCE(SUM(budget), 0) as total_budget,
          COALESCE(SUM(actual_cost), 0) as total_actual_cost,
          COUNT(*) FILTER (WHERE actual_cost <= budget) as projects_under_budget,
          COUNT(*) as total_projects_with_budget,
          COALESCE(AVG((budget - actual_cost) / NULLIF(budget, 0) * 100), 0) as avg_budget_variance
        FROM projects 
        WHERE budget IS NOT NULL ${dateFilter}
      ),
      time_efficiency AS (
        SELECT 
          COUNT(*) FILTER (WHERE end_date <= estimated_end_date) as projects_on_time,
          COUNT(*) FILTER (WHERE end_date IS NOT NULL) as completed_projects,
          COALESCE(AVG(EXTRACT(days FROM (end_date - start_date))), 0) as avg_actual_duration,
          COALESCE(AVG(EXTRACT(days FROM (estimated_end_date - start_date))), 0) as avg_estimated_duration
        FROM projects 
        WHERE status = 'completed' ${dateFilter}
      ),
      resource_utilization AS (
        SELECT 
          COUNT(DISTINCT pt.assigned_to) as utilized_team_members,
          (SELECT COUNT(*) FROM users WHERE role IN ('project_manager', 'team_member') AND status = 'active') as total_team_members,
          COALESCE(AVG(te.hours_worked), 0) as avg_daily_hours,
          COUNT(*) FILTER (WHERE pt.status = 'completed') as completed_tasks,
          COUNT(*) as total_tasks
        FROM project_tasks pt
        LEFT JOIN time_entries te ON pt.assigned_to = te.user_id
        WHERE 1=1 ${dateFilter}
      )
      SELECT 
        ce.*,
        te.*,
        ru.*,
        -- Calculated efficiency metrics
        ROUND(
          CASE 
            WHEN ce.total_projects_with_budget > 0 
            THEN (ce.projects_under_budget::float / ce.total_projects_with_budget) * 100
            ELSE 0 
          END, 2
        ) as budget_efficiency_rate,
        ROUND(
          CASE 
            WHEN te.completed_projects > 0 
            THEN (te.projects_on_time::float / te.completed_projects) * 100
            ELSE 0 
          END, 2
        ) as schedule_efficiency_rate,
        ROUND(
          CASE 
            WHEN ru.total_team_members > 0 
            THEN (ru.utilized_team_members::float / ru.total_team_members) * 100
            ELSE 0 
          END, 2
        ) as resource_utilization_rate,
        ROUND(
          CASE 
            WHEN ru.total_tasks > 0 
            THEN (ru.completed_tasks::float / ru.total_tasks) * 100
            ELSE 0 
          END, 2
        ) as task_efficiency_rate,
        ROUND(
          CASE 
            WHEN te.avg_estimated_duration > 0 
            THEN (te.avg_actual_duration / te.avg_estimated_duration) * 100
            ELSE 0 
          END, 2
        ) as time_estimation_accuracy
      FROM cost_efficiency ce, time_efficiency te, resource_utilization ru
    `;

    const result = await (req as any).db.query(efficiencyQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching efficiency metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get trend data for charts
router.get('/trends/:metric', requireAuth, async (req, res) => {
  try {
    const { metric } = req.params;
    const { period = 'month', duration = 12 } = req.query;

    let dateGrouping = '';
    let dateFilter = '';
    
    switch (period) {
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
      case 'quarter':
        dateGrouping = "date_trunc('quarter', created_at)";
        dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${Number(duration) * 3} months'`;
        break;
      default:
        dateGrouping = "date_trunc('month', created_at)";
        dateFilter = `created_at >= CURRENT_DATE - INTERVAL '${duration} months'`;
    }

    let trendQuery = '';
    
    switch (metric) {
      case 'revenue':
        trendQuery = `
          SELECT 
            ${dateGrouping} as period,
            COALESCE(SUM(total_amount) FILTER (WHERE status = 'paid'), 0) as value
          FROM invoices 
          WHERE ${dateFilter}
          GROUP BY ${dateGrouping}
          ORDER BY period
        `;
        break;
      
      case 'projects':
        trendQuery = `
          SELECT 
            ${dateGrouping} as period,
            COUNT(*) as value
          FROM projects 
          WHERE ${dateFilter}
          GROUP BY ${dateGrouping}
          ORDER BY period
        `;
        break;
      
      case 'clients':
        trendQuery = `
          SELECT 
            ${dateGrouping} as period,
            COUNT(*) as value
          FROM users 
          WHERE role = 'client' AND ${dateFilter}
          GROUP BY ${dateGrouping}
          ORDER BY period
        `;
        break;
      
      case 'tasks_completed':
        trendQuery = `
          SELECT 
            ${dateGrouping} as period,
            COUNT(*) FILTER (WHERE status = 'completed') as value
          FROM project_tasks 
          WHERE ${dateFilter}
          GROUP BY ${dateGrouping}
          ORDER BY period
        `;
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid metric type' });
    }

    const result = await (req as any).db.query(trendQuery);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching trend data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get alerts based on KPI thresholds
router.get('/alerts', requireAuth, async (req, res) => {
  try {
    const alertsQuery = `
      WITH alert_data AS (
        SELECT 
          'overdue_invoices' as alert_type,
          'warning' as severity,
          COUNT(*) as count,
          'Overdue invoices requiring attention' as message
        FROM invoices 
        WHERE due_date < CURRENT_DATE AND status NOT IN ('paid', 'cancelled')
        HAVING COUNT(*) > 5
        
        UNION ALL
        
        SELECT 
          'low_cash_flow' as alert_type,
          'critical' as severity,
          COALESCE(SUM(balance_due), 0) as count,
          'Outstanding payments affecting cash flow' as message
        FROM invoices 
        WHERE status NOT IN ('paid', 'cancelled')
        HAVING COALESCE(SUM(balance_due), 0) > 100000
        
        UNION ALL
        
        SELECT 
          'project_delays' as alert_type,
          'warning' as severity,
          COUNT(*) as count,
          'Projects behind schedule' as message
        FROM projects 
        WHERE status = 'active' AND estimated_end_date < CURRENT_DATE
        HAVING COUNT(*) > 3
        
        UNION ALL
        
        SELECT 
          'task_overdue' as alert_type,
          'info' as severity,
          COUNT(*) as count,
          'Tasks past due date' as message
        FROM project_tasks 
        WHERE due_date < CURRENT_DATE AND status != 'completed'
        HAVING COUNT(*) > 10
      )
      SELECT * FROM alert_data
      ORDER BY 
        CASE severity 
          WHEN 'critical' THEN 1 
          WHEN 'warning' THEN 2 
          WHEN 'info' THEN 3 
        END
    `;

    const result = await (req as any).db.query(alertsQuery);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;