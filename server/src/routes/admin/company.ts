import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { db } from '../../db/connection';
import { settings } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { AuthRequest, requireRole } from '../../middleware/auth';

const router = express.Router();

// Helper function for activity logging
const logActivity = async (params: { userId: number; action: string; resource: string; details: string; ipAddress?: string; userAgent?: string }) => {
  try {
    const { activityLogs } = await import('../../db/schema');
    await db.insert(activityLogs).values({
      uuid: crypto.randomUUID(),
      userId: params.userId.toString(),
      action: params.action,
      details: params.details,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      resource: params.resource,
      resourceId: '',
      success: true
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Get company settings
router.get('/settings', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    // Get all company settings
    const companySettings = await db
      .select()
      .from(settings)
      .where(eq(settings.category, 'company'))
      .orderBy(desc(settings.createdAt));

    // Convert to key-value object
    const settingsObject: Record<string, any> = {};
    companySettings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });

    // If no settings exist, create defaults
    if (companySettings.length === 0) {
      const defaultSettings = [
        { key: 'company_name', value: 'AKIBEKS CONSTRUCTION LIMITED', description: 'Company name' },
        { key: 'company_address', value: 'P.O. Box 12345-00100\nNairobi, Kenya', description: 'Company address' },
        { key: 'company_phone', value: '+254-700-000000', description: 'Company phone number' },
        { key: 'company_email', value: 'info@akibeks.com', description: 'Company email' },
        { key: 'company_website', value: 'www.akibeks.com', description: 'Company website' },
        { key: 'company_timezone', value: 'Africa/Nairobi', description: 'Company timezone' },
        { key: 'company_currency', value: 'KES', description: 'Default currency' },
        { key: 'default_tax_rate', value: 16.00, description: 'Default tax rate (%)' },
        { key: 'default_labour_rate', value: 36.00, description: 'Default labour rate (%)' }
      ];

      for (const setting of defaultSettings) {
        await db.insert(settings).values({
          key: setting.key,
          value: JSON.stringify(setting.value),
          description: setting.description,
          category: 'company',
          isPublic: false,
          updatedBy: req.user!.id
        });
        settingsObject[setting.key] = setting.value;
      }
    }

    res.json({
      success: true,
      data: settingsObject
    });
  } catch (error) {
    console.error('Error fetching company settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching company settings'
    });
  }
});

// Update company settings
router.put('/settings', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const {
      company_name,
      company_address,
      company_phone,
      company_email,
      company_website,
      company_timezone,
      company_currency,
      default_tax_rate,
      default_labour_rate,
      ...otherSettings
    } = req.body;

    const settingsToUpdate = {
      company_name,
      company_address,
      company_phone,
      company_email,
      company_website,
      company_timezone,
      company_currency,
      default_tax_rate,
      default_labour_rate,
      ...otherSettings
    };

    // Update each setting
    for (const [key, value] of Object.entries(settingsToUpdate)) {
      if (value !== undefined) {
        // Check if setting exists
        const existingSetting = await db
          .select()
          .from(settings)
          .where(eq(settings.key, key))
          .limit(1);

        if (existingSetting.length > 0) {
          // Update existing setting
          await db
            .update(settings)
            .set({
              value: JSON.stringify(value),
              updatedBy: req.user!.id,
              updatedAt: new Date()
            })
            .where(eq(settings.key, key));
        } else {
          // Create new setting
          await db.insert(settings).values({
            key,
            value: JSON.stringify(value),
            description: `Company setting: ${key}`,
            category: 'company',
            isPublic: false,
            updatedBy: req.user!.id
          });
        }
      }
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'company_settings',
      details: 'Updated company settings',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Company settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating company settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating company settings'
    });
  }
});

// Get company logo and branding
router.get('/branding', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const brandingSettings = await db
      .select()
      .from(settings)
      .where(eq(settings.category, 'branding'));

    const brandingObject: Record<string, any> = {};
    brandingSettings.forEach(setting => {
      try {
        brandingObject[setting.key] = JSON.parse(setting.value as string);
      } catch {
        brandingObject[setting.key] = setting.value;
      }
    });

    res.json({
      success: true,
      data: brandingObject
    });
  } catch (error) {
    console.error('Error fetching branding settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching branding settings'
    });
  }
});

// Update company branding
router.put('/branding', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const brandingData = req.body;

    for (const [key, value] of Object.entries(brandingData)) {
      if (value !== undefined) {
        const existingSetting = await db
          .select()
          .from(settings)
          .where(eq(settings.key, key))
          .limit(1);

        if (existingSetting.length > 0) {
          await db
            .update(settings)
            .set({
              value: JSON.stringify(value),
              updatedBy: req.user!.id,
              updatedAt: new Date()
            })
            .where(eq(settings.key, key));
        } else {
          await db.insert(settings).values({
            key,
            value: JSON.stringify(value),
            description: `Branding setting: ${key}`,
            category: 'branding',
            isPublic: false,
            updatedBy: req.user!.id
          });
        }
      }
    }

    await logActivity({
      userId: req.user!.id,
      action: 'UPDATE',
      resource: 'company_branding',
      details: 'Updated company branding',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Branding updated successfully'
    });
  } catch (error) {
    console.error('Error updating branding:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating branding'
    });
  }
});

// Get all settings by category
router.get('/settings/:category', requireRole(['admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.params;

    const categorySettings = await db
      .select()
      .from(settings)
      .where(eq(settings.category, category))
      .orderBy(desc(settings.createdAt));

    const settingsObject: Record<string, any> = {};
    categorySettings.forEach(setting => {
      try {
        settingsObject[setting.key] = JSON.parse(setting.value as string);
      } catch {
        settingsObject[setting.key] = setting.value;
      }
    });

    res.json({
      success: true,
      data: settingsObject
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching settings'
    });
  }
});

export default router;