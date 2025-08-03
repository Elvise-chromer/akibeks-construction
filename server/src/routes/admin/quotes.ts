import express from 'express';
import { Pool } from 'pg';
import { requireAuth } from '../../middleware/auth';

const router = express.Router();

// Get all quotes with pagination, search, and filtering
router.get('/', requireAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      status, 
      client_id, 
      sort_by = 'created_at', 
      sort_order = 'DESC' 
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    
    let whereClause = '1=1';
    const queryParams: any[] = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      whereClause += ` AND (q.quote_number ILIKE ? OR q.title ILIKE ? OR u.first_name ILIKE ? OR u.last_name ILIKE ?)`;
      queryParams.push(`%${search}%`);
      queryParams.push(`%${search}%`);
      queryParams.push(`%${search}%`);
      queryParams.push(`%${search}%`);
    }

    if (status) {
      paramCount++;
      whereClause += ` AND q.status = ?`;
      queryParams.push(status);
    }

    if (client_id) {
      paramCount++;
      whereClause += ` AND q.client_id = ?`;
      queryParams.push(client_id);
    }

    const query = `
      SELECT 
        q.*,
        u.first_name || ' ' || u.last_name as client_name,
        u.email as client_email,
        p.name as project_name,
        COUNT(*) OVER() as total_count
      FROM quotes q
      LEFT JOIN users u ON q.client_id = u.id
      LEFT JOIN projects p ON q.project_id = p.id
      WHERE ${whereClause}
      ORDER BY q.${sort_by} ${sort_order}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(Number(limit), offset);

    const result = await (req as any).db.query(query, queryParams);
    const totalCount = result.rows.length > 0 ? result.rows[0].total_count : 0;

    res.json({
      quotes: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(totalCount),
        pages: Math.ceil(Number(totalCount) / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quote by ID with sections and items
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Get quote details
    const quoteQuery = `
      SELECT 
        q.*,
        u.first_name || ' ' || u.last_name as client_name,
        u.email as client_email,
        u.phone as client_phone,
        u.address as client_address,
        p.name as project_name,
        creator.first_name || ' ' || creator.last_name as created_by_name
      FROM quotes q
      LEFT JOIN users u ON q.client_id = u.id
      LEFT JOIN projects p ON q.project_id = p.id
      LEFT JOIN users creator ON q.created_by = creator.id
      WHERE q.id = ?
    `;

    const quoteResult = await (req as any).db.query(quoteQuery, [id]);
    
    if (quoteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    const quote = quoteResult.rows[0];

    // Get quote sections
    const sectionsQuery = `
      SELECT * FROM quote_sections 
      WHERE quote_id = ? 
      ORDER BY section_order
    `;
    const sectionsResult = await (req as any).db.query(sectionsQuery, [id]);

    // Get quote items for each section
    const sections = await Promise.all(
      sectionsResult.rows.map(async (section) => {
        const itemsQuery = `
          SELECT * FROM quote_items 
          WHERE section_id = ? 
          ORDER BY item_order
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
      SELECT * FROM quote_items 
      WHERE quote_id = ? AND section_id IS NULL 
      ORDER BY item_order
    `;
    const unassignedItemsResult = await (req as any).db.query(unassignedItemsQuery, [id]);

    res.json({
      ...quote,
      sections,
      unassigned_items: unassignedItemsResult.rows
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new quote
router.post('/', requireAuth, async (req, res) => {
  const client = await (req as any).db.connect();
  
  try {
    await client.query('BEGIN');

    const {
      title,
      description,
      client_id,
      project_id,
      valid_until,
      labour_rate = 36.00,
      payment_terms,
      delivery_terms,
      notes,
      terms_conditions,
      sections = [],
      letterhead_config = {},
      footer_config = {}
    } = req.body;

    // Generate quote number
    const quoteNumberQuery = `SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number, 2) AS UNSIGNED)), 0) + 1 as next_number FROM quotes`;
    const numberResult = await client.query(quoteNumberQuery);
    const quoteNumber = `QT${String(numberResult.rows[0].next_number).padStart(6, '0')}`;

    // Create quote
    const quoteQuery = `
      INSERT INTO quotes (
        quote_number, title, description, client_id, project_id, 
        valid_until, labour_rate, payment_terms, delivery_terms, 
        notes, terms_conditions, letterhead_config, footer_config, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description),
        client_id = VALUES(client_id),
        project_id = VALUES(project_id),
        valid_until = VALUES(valid_until),
        labour_rate = VALUES(labour_rate),
        payment_terms = VALUES(payment_terms),
        delivery_terms = VALUES(delivery_terms),
        notes = VALUES(notes),
        terms_conditions = VALUES(terms_conditions),
        letterhead_config = VALUES(letterhead_config),
        footer_config = VALUES(footer_config),
        updated_at = NOW(),
        updated_by = VALUES(created_by)
      RETURNING *
    `;

    const quoteResult = await client.query(quoteQuery, [
      quoteNumber, title, description, client_id, project_id,
      valid_until, labour_rate, payment_terms, delivery_terms,
      notes, terms_conditions, JSON.stringify(letterhead_config), 
      JSON.stringify(footer_config), (req.user as any).id
    ]);

    const quote = quoteResult.rows[0];

    // Create sections and items
    let totalMaterialCost = 0;
    let totalLabourCost = 0;

    for (const [index, section] of sections.entries()) {
      const sectionQuery = `
        INSERT INTO quote_sections (quote_id, name, description, section_order)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          section_order = VALUES(section_order)
        RETURNING *
      `;
      
      const sectionResult = await client.query(sectionQuery, [
        quote.id, section.name, section.description || '', index
      ]);

      const createdSection = sectionResult.rows[0];
      let sectionMaterialCost = 0;
      let sectionLabourCost = 0;

      // Create items for this section
      for (const [itemIndex, item] of (section.items || []).entries()) {
        const itemQuery = `
          INSERT INTO quote_items (
            quote_id, section_id, item_order, description, 
            quantity, unit, unit_price, notes, category, 
            product_code, specifications, is_material
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            description = VALUES(description),
            quantity = VALUES(quantity),
            unit = VALUES(unit),
            unit_price = VALUES(unit_price),
            notes = VALUES(notes),
            category = VALUES(category),
            product_code = VALUES(product_code),
            specifications = VALUES(specifications),
            is_material = VALUES(is_material)
          RETURNING *
        `;

        const itemResult = await client.query(itemQuery, [
          quote.id, createdSection.id, itemIndex, item.description,
          item.quantity, item.unit, item.unit_price, item.notes,
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
        'UPDATE quote_sections SET material_cost = ?, labour_cost = ? WHERE id = ?',
        [sectionMaterialCost, sectionLabourCost, createdSection.id]
      );

      totalMaterialCost += sectionMaterialCost;
      totalLabourCost += sectionLabourCost;
    }

    // Update quote totals
    const subtotal = totalMaterialCost + totalLabourCost;
    const taxAmount = subtotal * (16.00 / 100); // Default tax rate
    const totalAmount = subtotal + taxAmount;

    await client.query(`
      UPDATE quotes 
      SET total_material_cost = ?, total_labour_cost = ?, 
          subtotal = ?, tax_amount = ?, total_amount = ?
      WHERE id = ?
    `, [totalMaterialCost, totalLabourCost, subtotal, taxAmount, totalAmount, quote.id]);

    await client.query('COMMIT');

    res.status(201).json({ id: quote.id, quote_number: quoteNumber });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Update quote
router.put('/:id', requireAuth, async (req, res) => {
  const client = await (req as any).db.connect();
  
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const {
      title,
      description,
      status,
      valid_until,
      labour_rate,
      payment_terms,
      delivery_terms,
      notes,
      terms_conditions,
      sections = [],
      letterhead_config,
      footer_config
    } = req.body;

    // Update quote basic info
    const updateQuery = `
      UPDATE quotes 
      SET title = ?, description = ?, status = ?, valid_until = ?,
          labour_rate = ?, payment_terms = ?, delivery_terms = ?,
          notes = ?, terms_conditions = ?, letterhead_config = ?,
          footer_config = ?, updated_at = NOW(), updated_by = ?
      WHERE id = ?
      RETURNING *
    `;

    await client.query(updateQuery, [
      title, description, status, valid_until, labour_rate,
      payment_terms, delivery_terms, notes, terms_conditions,
      JSON.stringify(letterhead_config), JSON.stringify(footer_config),
      (req.user as any).id, id
    ]);

    // Delete existing sections and items
    await client.query('DELETE FROM quote_items WHERE quote_id = ?', [id]);
    await client.query('DELETE FROM quote_sections WHERE quote_id = ?', [id]);

    // Recreate sections and items (similar to create logic)
    // ... (implement section recreation logic)

    await client.query('COMMIT');
    res.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Delete quote
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await (req as any).db.query(
      'DELETE FROM quotes WHERE id = ? RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quote metrics
router.get('/metrics/summary', requireAuth, async (req, res) => {
  try {
    const metricsQuery = `
      SELECT 
        COUNT(*) as total_quotes,
        COUNT(*) FILTER (WHERE status = 'sent') as sent_quotes,
        COUNT(*) FILTER (WHERE status = 'accepted') as accepted_quotes,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_quotes,
        COALESCE(SUM(total_amount), 0) as total_value,
        COALESCE(SUM(total_amount) FILTER (WHERE status = 'accepted'), 0) as accepted_value,
        ROUND(
          CASE 
            WHEN COUNT(*) FILTER (WHERE status = 'sent') > 0 
            THEN (COUNT(*) FILTER (WHERE status = 'accepted')::float / COUNT(*) FILTER (WHERE status = 'sent')) * 100
            ELSE 0 
          END, 2
        ) as acceptance_rate,
        ROUND(
          CASE 
            WHEN COUNT(*) FILTER (WHERE status = 'accepted') > 0 
            THEN (COUNT(*) FILTER (WHERE converted_to_project_id IS NOT NULL)::float / COUNT(*) FILTER (WHERE status = 'accepted')) * 100
            ELSE 0 
          END, 2
        ) as conversion_rate
      FROM quotes
      WHERE DATE_FORMAT(created_at, '%Y-%m-01') = DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')
    `;

    const result = await (req as any).db.query(metricsQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching quote metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk operations
router.post('/bulk/:action', requireAuth, async (req, res) => {
  try {
    const { action } = req.params;
    const { quote_ids } = req.body;

    if (!Array.isArray(quote_ids) || quote_ids.length === 0) {
      return res.status(400).json({ error: 'Invalid quote IDs provided' });
    }

    const placeholders = quote_ids.map((_, index) => `?`).join(',');

    switch (action) {
      case 'send':
        await (req as any).db.query(
          `UPDATE quotes SET status = 'sent', sent_at = NOW() WHERE id IN (${placeholders})`,
          quote_ids
        );
        break;
      
      case 'accept':
        await (req as any).db.query(
          `UPDATE quotes SET status = 'accepted', accepted_at = NOW() WHERE id IN (${placeholders})`,
          quote_ids
        );
        break;
      
      case 'delete':
        await (req as any).db.query(
          `DELETE FROM quotes WHERE id IN (${placeholders})`,
          quote_ids
        );
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({ success: true, affected_count: quote_ids.length });
  } catch (error) {
    console.error('Error performing bulk operation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;