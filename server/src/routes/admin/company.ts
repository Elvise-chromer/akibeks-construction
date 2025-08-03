import express from 'express';
import { requireAuth } from '../../middleware/auth';

const router = express.Router();

// Get company settings
router.get('/settings', requireAuth, async (req, res) => {
  try {
    const result = await (req as any).db.query(
      'SELECT * FROM company_settings ORDER BY created_at DESC LIMIT 1'
    );

    if (result.rows.length === 0) {
      // Create default settings if none exist
      const defaultSettings = {
        name: 'AKIBEKS CONSTRUCTION LIMITED',
        address: 'P.O. Box 12345-00100\nNairobi, Kenya',
        phone: '+254-700-000000',
        email: 'info@akibeks.com',
        website: 'www.akibeks.com',
        timezone: 'Africa/Nairobi',
        currency: 'KES',
        default_tax_rate: 16.00,
        default_labour_rate: 36.00
      };

      const insertResult = await (req as any).db.query(`
        INSERT INTO company_settings (
          name, address, phone, email, website, timezone, 
          currency, default_tax_rate, default_labour_rate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE 
        name = VALUES(name), address = VALUES(address), phone = VALUES(phone), 
        email = VALUES(email), website = VALUES(website), timezone = VALUES(timezone), 
        currency = VALUES(currency), default_tax_rate = VALUES(default_tax_rate), 
        default_labour_rate = VALUES(default_labour_rate)
      `, [
        defaultSettings.name, defaultSettings.address, defaultSettings.phone,
        defaultSettings.email, defaultSettings.website, defaultSettings.timezone,
        defaultSettings.currency, defaultSettings.default_tax_rate, 
        defaultSettings.default_labour_rate
      ]);

      return res.json(insertResult.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching company settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update company settings
router.put('/settings', requireAuth, async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      website,
      logo_url,
      letterhead_url,
      footer_text,
      tax_number,
      registration_number,
      bank_details,
      social_links,
      business_hours,
      timezone,
      currency,
      default_tax_rate,
      default_labour_rate
    } = req.body;

    // Check if settings exist
    const existingResult = await (req as any).db.query(
      'SELECT id FROM company_settings ORDER BY created_at DESC LIMIT 1'
    );

    let result;
    if (existingResult.rows.length === 0) {
      // Create new settings
      result = await (req as any).db.query(`
        INSERT INTO company_settings (
          name, address, phone, email, website, logo_url, letterhead_url,
          footer_text, tax_number, registration_number, bank_details,
          social_links, business_hours, timezone, currency, 
          default_tax_rate, default_labour_rate, updated_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE 
        name = VALUES(name), address = VALUES(address), phone = VALUES(phone), 
        email = VALUES(email), website = VALUES(website), logo_url = VALUES(logo_url), 
        letterhead_url = VALUES(letterhead_url), footer_text = VALUES(footer_text), 
        tax_number = VALUES(tax_number), registration_number = VALUES(registration_number), 
        bank_details = VALUES(bank_details), social_links = VALUES(social_links), 
        business_hours = VALUES(business_hours), timezone = VALUES(timezone), 
        currency = VALUES(currency), default_tax_rate = VALUES(default_tax_rate), 
        default_labour_rate = VALUES(default_labour_rate), updated_at = NOW(), updated_by = ?
      `, [
        name, address, phone, email, website, logo_url, letterhead_url,
        footer_text, tax_number, registration_number, JSON.stringify(bank_details || {}),
        JSON.stringify(social_links || {}), JSON.stringify(business_hours || {}),
        timezone, currency, default_tax_rate, default_labour_rate, (req.user as any).id
      ]);
    } else {
      // Update existing settings
      result = await (req as any).db.query(`
        UPDATE company_settings 
        SET name = ?, address = ?, phone = ?, email = ?, website = ?,
            logo_url = ?, letterhead_url = ?, footer_text = ?, 
            tax_number = ?, registration_number = ?, bank_details = ?,
            social_links = ?, business_hours = ?, timezone = ?,
            currency = ?, default_tax_rate = ?, default_labour_rate = ?,
            updated_at = NOW(), updated_by = ?
        WHERE id = ?
        RETURNING *
      `, [
        name, address, phone, email, website, logo_url, letterhead_url,
        footer_text, tax_number, registration_number, JSON.stringify(bank_details || {}),
        JSON.stringify(social_links || {}), JSON.stringify(business_hours || {}),
        timezone, currency, default_tax_rate, default_labour_rate, (req.user as any).id,
        existingResult.rows[0].id
      ]);
    }

    // Log the change
    await (req as any).db.query(`
      INSERT INTO audit_logs (
        user_id, action, resource_type, resource_id, 
        new_values, created_at
      ) VALUES (?, 'update', 'company_settings', ?, ?, NOW())
    `, [
      (req.user as any).id,
      result.rows[0].id,
      JSON.stringify({ 
        name, 
        phone, 
        email, 
        default_tax_rate, 
        default_labour_rate 
      })
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating company settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload company logo
router.post('/logo', requireAuth, async (req, res) => {
  try {
    // This would typically handle file upload
    // For now, we'll just update the logo_url field
    const { logo_url } = req.body;

    const result = await (req as any).db.query(`
      UPDATE company_settings 
      SET logo_url = ?, updated_at = NOW(), updated_by = ?
      WHERE id = (SELECT id FROM company_settings ORDER BY created_at DESC LIMIT 1)
      RETURNING *
    `, [logo_url, (req.user as any).id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company settings not found' });
    }

    res.json({ success: true, logo_url: result.rows[0].logo_url });
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload letterhead template
router.post('/letterhead', requireAuth, async (req, res) => {
  try {
    const { letterhead_url } = req.body;

    const result = await (req as any).db.query(`
      UPDATE company_settings 
      SET letterhead_url = ?, updated_at = NOW(), updated_by = ?
      WHERE id = (SELECT id FROM company_settings ORDER BY created_at DESC LIMIT 1)
      RETURNING *
    `, [letterhead_url, (req.user as any).id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company settings not found' });
    }

    res.json({ success: true, letterhead_url: result.rows[0].letterhead_url });
  } catch (error) {
    console.error('Error uploading letterhead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get public company info (for frontend logo and basic info)
router.get('/public', async (req, res) => {
  try {
    const result = await (req as any).db.query(`
      SELECT 
        name, phone, email, website, logo_url, 
        timezone, currency, address, social_links
      FROM company_settings 
      ORDER BY created_at DESC 
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      // Return default settings if none exist
      return res.json({
        name: 'AKIBEKS CONSTRUCTION LIMITED',
        phone: '+254-700-000000',
        email: 'info@akibeks.co.ke',
        website: 'https://akibeks.co.ke',
        logo_url: '/assets/logo.png',
        timezone: 'Africa/Nairobi',
        currency: 'KES',
        address: 'P.O. Box 12345-00100\nNairobi, Kenya',
        social_links: {}
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching public company info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company metrics
router.get('/metrics', requireAuth, async (req, res) => {
  try {
    const metricsQuery = `
      WITH company_stats AS (
        SELECT 
          (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
          (SELECT COUNT(*) FROM users WHERE role != 'client') as total_employees,
          (SELECT COUNT(*) FROM users WHERE role = 'client') as total_clients,
          (SELECT COUNT(*) FROM leads WHERE status NOT IN ('won', 'lost')) as active_leads,
          (SELECT COALESCE(SUM(total_amount), 0) FROM invoices WHERE status = 'paid' AND paid_date >= DATE_FORMAT(CURRENT_DATE, '%Y-01-01')) as annual_revenue,
          (SELECT COALESCE(SUM(total_amount), 0) FROM invoices WHERE status = 'paid' AND paid_date >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')) as monthly_revenue,
          (SELECT COUNT(*) FROM projects WHERE status = 'completed' AND updated_at >= DATE_FORMAT(CURRENT_DATE, '%Y-01-01')) as completed_projects_this_year,
          (SELECT COUNT(*) FROM invoices WHERE status IN ('sent', 'overdue') AND due_date < CURRENT_DATE) as overdue_invoices
      )
      SELECT * FROM company_stats
    `;

    const result = await (req as any).db.query(metricsQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching company metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;