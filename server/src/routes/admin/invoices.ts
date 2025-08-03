import express, { Request, Response, NextFunction } from 'express';
import { eq, desc, sql, and } from 'drizzle-orm';
import { authenticateAdmin } from '../../middleware/adminAuth';
import { db } from '../../db/connection';
import { invoices, users, projects, activityLogs } from '../../db/schema';
import type { InferModel } from 'drizzle-orm';

const router = express.Router();

type Invoice = InferModel<typeof invoices>;
type User = InferModel<typeof users>;

import { AdminAuthRequest } from '../../middleware/adminAuth';

// Get all invoices with pagination, search, and filtering
router.get('/', authenticateAdmin, async (req: AdminAuthRequest, res: Response, next: NextFunction) => {
  try {
    const { 
      page = '1', 
      limit = '20', 
      search = '', 
      status, 
      client_id, 
      overdue_only,
      sort_by = 'createdAt', 
      sort_order = 'desc' 
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    
    const baseQuery = db.select({
      id: invoices.id,
      invoiceNumber: invoices.invoiceNumber, 
      projectId: invoices.projectId,
      status: invoices.status,
      dueDate: invoices.dueDate,
      clientName: invoices.clientName,
      clientEmail: invoices.clientEmail,
      projectName: projects.title,
      total: invoices.total,
      amountPaid: invoices.amountPaid,
      balance: invoices.balance,
      isOverdue: sql<boolean>`
        CASE WHEN ${invoices.dueDate} < NOW() 
        AND ${invoices.status} NOT IN ('paid', 'cancelled')
        THEN true ELSE false END
      `
    })
    .from(invoices)
    .leftJoin(users, eq(invoices.createdBy, users.id))
    .leftJoin(projects, eq(invoices.projectId, projects.id));

    let conditions = [];

    if (search) {
      conditions.push(sql`(
        ${invoices.invoiceNumber} ILIKE ${`%${search}%`} OR 
        ${users.firstName} ILIKE ${`%${search}%`} OR 
        ${users.lastName} ILIKE ${`%${search}%`}
      )`);
    }

    if (status) {
      conditions.push(eq(invoices.status, status as string));
    }

    if (client_id) {
      conditions.push(sql`${invoices.clientEmail} = ${client_id}`);
    }

    if (overdue_only === 'true') {
      conditions.push(and(
        sql`${invoices.dueDate} < NOW()`,
        sql`${invoices.status} NOT IN ('paid', 'cancelled')`
      ));
    }

    const query = conditions.length > 0
      ? baseQuery.where(and(...conditions))
      : baseQuery;

    // Get total count
    const [{ count }] = await db.select({
      count: sql<number>`count(*)`
    }).from(query.as('count_query'));
    
    // Add ordering and pagination
    const results = await query
      .orderBy(desc(sort_by === 'createdAt' ? invoices.createdAt : invoices.id))
      .limit(Number(limit))
      .offset(offset);

    res.json({
      invoices: results.map(invoice => ({
        ...invoice,
        isOverdue: invoice.isOverdue || false
      })),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(count),
        pages: Math.ceil(count / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get invoice by ID with sections and items
router.get('/:id', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Get invoice details with Drizzle ORM
    const invoiceResult = await db
      .select({
        id: invoices.id,
        uuid: invoices.uuid,
        invoiceNumber: invoices.invoiceNumber,
        quotationId: invoices.quotationId,
        projectId: invoices.projectId,
        clientName: invoices.clientName,
        clientEmail: invoices.clientEmail,
        clientPhone: invoices.clientPhone,
        clientAddress: invoices.clientAddress,
        items: invoices.items,
        subtotal: invoices.subtotal,
        taxRate: invoices.taxRate,
        taxAmount: invoices.taxAmount,
        discount: invoices.discount,
        total: invoices.total,
        amountPaid: invoices.amountPaid,
        balance: invoices.balance,
        currency: invoices.currency,
        dueDate: invoices.dueDate,
        status: invoices.status,
        paymentMethod: invoices.paymentMethod,
        paymentReference: invoices.paymentReference,
        terms: invoices.terms,
        notes: invoices.notes,
        createdBy: invoices.createdBy,
        sentAt: invoices.sentAt,
        paidAt: invoices.paidAt,
        createdAt: invoices.createdAt,
        updatedAt: invoices.updatedAt,
        projectName: projects.title,
        isOverdue: sql<boolean>`
          CASE WHEN ${invoices.dueDate} < NOW() 
          AND ${invoices.status} NOT IN ('paid', 'cancelled')
          THEN true ELSE false END
        `
      })
      .from(invoices)
      .leftJoin(projects, eq(invoices.projectId, projects.id))
      .where(eq(invoices.id, Number(id)))
      .limit(1);
    
    if (invoiceResult.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const invoice = invoiceResult[0];

    // Get invoice sections
    const sectionsQuery = `
      SELECT * FROM invoice_sections 
      WHERE invoice_id = ? 
      ORDER BY section_order
    `;
    const sectionsResult = await (req as any).db.query(sectionsQuery, [id]);

    // Get invoice items for each section
    const sections = await Promise.all(
      sectionsResult.map(async (section) => {
        const itemsQuery = `
          SELECT * FROM invoice_items 
          WHERE section_id = ? 
          ORDER BY display_order
        `;
        const itemsResult = await (req as any).db.query(itemsQuery, [section.id]);
        return {
          ...section,
          items: itemsResult.rows
        };
      })
    );

    // Get items without sections (legacy support)
    const unassignedItemsQuery = `
      SELECT * FROM invoice_items 
      WHERE invoice_id = ? AND section_id IS NULL 
      ORDER BY display_order
    `;
    const unassignedItemsResult = await (req as any).db.query(unassignedItemsQuery, [id]);

    res.json({
      ...invoice,
      sections,
      unassigned_items: unassignedItemsResult.rows
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new invoice
router.post('/', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  const client = await (req as any).db.connect();
  
  try {
    await client.query('BEGIN');

    const {
      client_id,
      project_id,
      quote_id,
      issue_date,
      due_date,
      labour_rate = 36.00,
      terms_conditions,
      notes,
      sections = [],
      letterhead_config = {},
      footer_config = {}
    } = req.body;

    // Generate invoice number
    const invoiceNumberQuery = `SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number, 2) AS UNSIGNED)), 0) + 1 as next_number FROM invoices`;
    const numberResult = await client.query(invoiceNumberQuery);
    const invoiceNumber = `INV${String(numberResult.rows[0].next_number).padStart(6, '0')}`;

    // Create invoice
    const invoiceQuery = `
      INSERT INTO invoices (
        invoice_number, client_id, project_id, quote_id, 
        issue_date, due_date, labour_rate, terms_conditions, 
        notes, letterhead_config, footer_config, created_by,
        subtotal, total_amount, balance_due
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0)
      ON DUPLICATE KEY UPDATE
        invoice_number = VALUES(invoice_number),
        client_id = VALUES(client_id),
        project_id = VALUES(project_id),
        quote_id = VALUES(quote_id),
        issue_date = VALUES(issue_date),
        due_date = VALUES(due_date),
        labour_rate = VALUES(labour_rate),
        terms_conditions = VALUES(terms_conditions),
        notes = VALUES(notes),
        letterhead_config = VALUES(letterhead_config),
        footer_config = VALUES(footer_config),
        created_by = VALUES(created_by),
        subtotal = VALUES(subtotal),
        total_amount = VALUES(total_amount),
        balance_due = VALUES(balance_due);
      RETURNING *
    `;

    const invoiceResult = await client.query(invoiceQuery, [
      invoiceNumber, client_id, project_id, quote_id,
      issue_date, due_date, labour_rate, terms_conditions,
      notes, JSON.stringify(letterhead_config), 
      JSON.stringify(footer_config), (req.user as any).id
    ]);

    const invoice = invoiceResult.rows[0];

    // Create sections and items
    let totalMaterialCost = 0;
    let totalLabourCost = 0;

    for (const [index, section] of sections.entries()) {
      const sectionQuery = `
        INSERT INTO invoice_sections (invoice_id, name, description, section_order)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          section_order = VALUES(section_order);
        RETURNING *
      `;
      
      const sectionResult = await client.query(sectionQuery, [
        invoice.id, section.name, section.description || '', index
      ]);

      const createdSection = sectionResult.rows[0];
      let sectionMaterialCost = 0;
      let sectionLabourCost = 0;

      // Create items for this section
      for (const [itemIndex, item] of (section.items || []).entries()) {
        const itemQuery = `
          INSERT INTO invoice_items (
            invoice_id, section_id, description, quantity, unit, 
            unit_price, display_order, notes, category, 
            product_code, specifications, is_material
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            description = VALUES(description),
            quantity = VALUES(quantity),
            unit = VALUES(unit),
            unit_price = VALUES(unit_price),
            display_order = VALUES(display_order),
            notes = VALUES(notes),
            category = VALUES(category),
            product_code = VALUES(product_code),
            specifications = VALUES(specifications),
            is_material = VALUES(is_material);
          RETURNING *
        `;

        const itemResult = await client.query(itemQuery, [
          invoice.id, createdSection.id, item.description, item.quantity,
          item.unit, item.unit_price, itemIndex, item.notes,
          item.category, item.product_code, JSON.stringify(item.specifications || {}),
          item.is_material
        ]);

        const createdItem = itemResult.rows[0];
        if (createdItem.is_material) {
          sectionMaterialCost += Number(createdItem.total_price);
        }
      }

      // Calculate labour cost for this section
      sectionLabourCost = sectionMaterialCost * (labour_rate / 100);

      // Update section totals
      await client.query(
        'UPDATE invoice_sections SET material_cost = ?, labour_cost = ? WHERE id = ?',
        [sectionMaterialCost, sectionLabourCost, createdSection.id]
      );

      totalMaterialCost += sectionMaterialCost;
      totalLabourCost += sectionLabourCost;
    }

    // Update invoice totals
    const subtotal = totalMaterialCost + totalLabourCost;
    const taxAmount = subtotal * (16.00 / 100); // Default tax rate
    const totalAmount = subtotal + taxAmount;

    await client.query(`
      UPDATE invoices 
      SET total_material_cost = ?, total_labour_cost = ?, 
          subtotal = ?, tax_amount = ?, total_amount = ?, balance_due = ?
      WHERE id = ?
    `, [totalMaterialCost, totalLabourCost, subtotal, taxAmount, totalAmount, invoice.id]);

    await client.query('COMMIT');

    res.status(201).json({ id: invoice.id, invoice_number: invoiceNumber });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Update invoice payment
router.post('/:id/payment', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { amount, payment_date = new Date(), notes } = req.body;

    const client = await (req as any).db.connect();
    
    try {
      await client.query('BEGIN');

      // Get current invoice details
      const invoiceResult = await client.query(
        'SELECT amount_paid, total_amount FROM invoices WHERE id = ?',
        [id]
      );

      if (invoiceResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Invoice not found' });
      }

      const invoice = invoiceResult.rows[0];
      const newAmountPaid = Number(invoice.amount_paid) + Number(amount);
      const newBalanceDue = Number(invoice.total_amount) - newAmountPaid;
      
      let newStatus = 'sent';
      if (newBalanceDue <= 0) {
        newStatus = 'paid';
      } else if (newAmountPaid > 0) {
        newStatus = 'partially_paid';
      }

      // Update invoice
      await client.query(`
        UPDATE invoices 
        SET amount_paid = ?, balance_due = ?, status = ?,
            paid_date = CASE WHEN ? = 'paid' THEN ? ELSE paid_date END,
            updated_at = NOW()
        WHERE id = ?
      `, [newAmountPaid, newBalanceDue, newStatus, payment_date, payment_date, id]);

      // Create payment record (you may want to create a payments table)
      await client.query(`
        INSERT INTO audit_logs (
          user_id, action, resource_type, resource_id, 
          new_values, details, created_at
        ) VALUES (?, 'update', 'invoice', ?, ?, ?, NOW())
      `, [
        (req.user as any).id, 
        id, 
        JSON.stringify({ payment_amount: amount, new_status: newStatus }),
        JSON.stringify({ payment_notes: notes, payment_date })
      ]);

      await client.query('COMMIT');

      res.json({ 
        success: true, 
        new_amount_paid: newAmountPaid, 
        new_balance_due: newBalanceDue,
        new_status: newStatus
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update invoice status
router.put('/:id/status', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await (req as any).db.query(
      'UPDATE invoices SET status = ?, updated_at = NOW(), updated_by = ? WHERE id = ? RETURNING *',
      [status, (req.user as any).id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Log the status change
    await (req as any).db.query(`
      INSERT INTO audit_logs (
        user_id, action, resource_type, resource_id, 
        new_values, details, created_at
      ) VALUES (?, 'update', 'invoice', ?, ?, ?, NOW())
    `, [
      (req.user as any).id, 
      id, 
      JSON.stringify({ status }),
      JSON.stringify({ notes, previous_status: result.rows[0].status })
    ]);

    res.json({ success: true, invoice: result.rows[0] });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete invoice
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const result = await (req as any).db.query(
      'DELETE FROM invoices WHERE id = ? RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get invoice metrics
router.get('/metrics/summary', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const metricsQuery = `
      SELECT 
        COUNT(*) as total_invoices,
        COUNT(*) FILTER (WHERE status = 'sent') as sent_invoices,
        COUNT(*) FILTER (WHERE status = 'paid') as paid_invoices,
        COUNT(*) FILTER (WHERE status = 'overdue' OR (due_date < CURRENT_DATE AND status NOT IN ('paid', 'cancelled'))) as overdue_invoices,
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COALESCE(SUM(amount_paid), 0) as collected_revenue,
        COALESCE(SUM(balance_due), 0) as outstanding_amount,
        COALESCE(SUM(total_amount) FILTER (WHERE status = 'overdue' OR (due_date < CURRENT_DATE AND status NOT IN ('paid', 'cancelled'))), 0) as overdue_amount,
        ROUND(
          CASE 
            WHEN COUNT(*) FILTER (WHERE status IN ('sent', 'paid', 'overdue')) > 0 
            THEN (COUNT(*) FILTER (WHERE status = 'paid')::float / COUNT(*) FILTER (WHERE status IN ('sent', 'paid', 'overdue'))) * 100
            ELSE 0 
          END, 2
        ) as payment_rate,
        ROUND(
          CASE 
            WHEN SUM(total_amount) > 0 
            THEN (SUM(amount_paid)::float / SUM(total_amount)) * 100
            ELSE 0 
          END, 2
        ) as collection_rate
      FROM invoices
      WHERE DATE_FORMAT(created_at, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')
    `;

    const result = await (req as any).db.query(metricsQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching invoice metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk operations
router.post('/bulk/:action', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { action } = req.params;
    const { invoice_ids } = req.body;

    if (!Array.isArray(invoice_ids) || invoice_ids.length === 0) {
      return res.status(400).json({ error: 'Invalid invoice IDs provided' });
    }

    const placeholders = invoice_ids.map((_, index) => `?`).join(',');

    switch (action) {
      case 'send':
        await (req as any).db.query(
          `UPDATE invoices SET status = 'sent', updated_at = NOW() WHERE id IN (${placeholders})`,
          invoice_ids
        );
        break;
      
      case 'mark_paid':
        await (req as any).db.query(
          `UPDATE invoices SET status = 'paid', paid_date = CURRENT_DATE, amount_paid = total_amount, balance_due = 0 WHERE id IN (${placeholders})`,
          invoice_ids
        );
        break;
      
      case 'mark_overdue':
        await (req as any).db.query(
          `UPDATE invoices SET status = 'overdue' WHERE id IN (${placeholders})`,
          invoice_ids
        );
        break;
      
      case 'delete':
        await (req as any).db.query(
          `DELETE FROM invoices WHERE id IN (${placeholders})`,
          invoice_ids
        );
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({ success: true, affected_count: invoice_ids.length });
  } catch (error) {
    console.error('Error performing bulk operation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate invoice from quote
router.post('/from-quote/:quote_id', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  const client = await (req as any).db.connect();
  
  try {
    await client.query('BEGIN');

    const { quote_id } = req.params;
    const { issue_date, due_date } = req.body;

    // Get quote details
    const quoteResult = await client.query(
      'SELECT * FROM quotes WHERE id = ?',
      [quote_id]
    );

    if (quoteResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Quote not found' });
    }

    const quote = quoteResult.rows[0];

    // Generate invoice number
    const invoiceNumberQuery = `SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number, 2) AS UNSIGNED)), 0) + 1 as next_number FROM invoices`;
    const numberResult = await client.query(invoiceNumberQuery);
    const invoiceNumber = `INV${String(numberResult.rows[0].next_number).padStart(6, '0')}`;

    // Create invoice from quote
    const invoiceQuery = `
      INSERT INTO invoices (
        invoice_number, client_id, project_id, quote_id, 
        issue_date, due_date, subtotal, tax_rate, tax_amount,
        total_amount, total_material_cost, total_labour_cost,
        labour_rate, terms_conditions, notes, letterhead_config,
        footer_config, balance_due, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        invoice_number = VALUES(invoice_number),
        client_id = VALUES(client_id),
        project_id = VALUES(project_id),
        quote_id = VALUES(quote_id),
        issue_date = VALUES(issue_date),
        due_date = VALUES(due_date),
        subtotal = VALUES(subtotal),
        tax_rate = VALUES(tax_rate),
        tax_amount = VALUES(tax_amount),
        total_amount = VALUES(total_amount),
        total_material_cost = VALUES(total_material_cost),
        total_labour_cost = VALUES(total_labour_cost),
        labour_rate = VALUES(labour_rate),
        terms_conditions = VALUES(terms_conditions),
        notes = VALUES(notes),
        letterhead_config = VALUES(letterhead_config),
        footer_config = VALUES(footer_config),
        balance_due = VALUES(balance_due),
        created_by = VALUES(created_by);
      RETURNING *
    `;

    const invoiceResult = await client.query(invoiceQuery, [
      invoiceNumber, quote.client_id, quote.project_id, quote_id,
      issue_date, due_date, quote.subtotal, quote.tax_rate,
      quote.tax_amount, quote.total_amount, quote.total_material_cost,
      quote.total_labour_cost, quote.labour_rate, quote.terms_conditions,
      quote.notes, quote.letterhead_config, quote.footer_config, (req.user as any).id
    ]);

    const invoice = invoiceResult.rows[0];

    // Copy sections
    const sectionsResult = await client.query(
      'SELECT * FROM quote_sections WHERE quote_id = ? ORDER BY section_order',
      [quote_id]
    );

    for (const section of sectionsResult.rows) {
      const sectionResult = await client.query(`
        INSERT INTO invoice_sections (invoice_id, name, description, section_order, material_cost, labour_cost)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          section_order = VALUES(section_order),
          material_cost = VALUES(material_cost),
          labour_cost = VALUES(labour_cost);
        RETURNING *
      `, [invoice.id, section.name, section.description, section.section_order, section.material_cost, section.labour_cost]);

      const newSection = sectionResult.rows[0];

      // Copy items
      const itemsResult = await client.query(
        'SELECT * FROM quote_items WHERE section_id = ? ORDER BY item_order',
        [section.id]
      );

      for (const item of itemsResult.rows) {
        await client.query(`
          INSERT INTO invoice_items (
            invoice_id, section_id, description, quantity, unit,
            unit_price, display_order, notes, category, 
            product_code, specifications, is_material
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            description = VALUES(description),
            quantity = VALUES(quantity),
            unit = VALUES(unit),
            unit_price = VALUES(unit_price),
            display_order = VALUES(display_order),
            notes = VALUES(notes),
            category = VALUES(category),
            product_code = VALUES(product_code),
            specifications = VALUES(specifications),
            is_material = VALUES(is_material);
        `, [
          invoice.id, newSection.id, item.description, item.quantity,
          item.unit, item.unit_price, item.item_order, item.notes,
          item.category, item.product_code, item.specifications, item.is_material
        ]);
      }
    }

    await client.query('COMMIT');

    res.status(201).json({ id: invoice.id, invoice_number: invoiceNumber });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating invoice from quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

export default router;