import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiSave, HiUpload, HiTrash, HiEye, HiPencil, HiPlus, HiX,
  HiOfficeBuilding, HiPhone, HiMail, HiGlobe, HiLocationMarker,
  HiCreditCard, HiDocumentText, HiCog, HiColorSwatch
} from 'react-icons/hi';

interface CompanySettings {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url?: string;
  letterhead_url?: string;
  footer_text?: string;
  tax_number?: string;
  registration_number?: string;
  bank_details: {
    account_name: string;
    account_number: string;
    bank: string;
    branch: string;
    swift_code?: string;
  };
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  business_hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  timezone: string;
  currency: string;
  default_tax_rate: number;
  default_labour_rate: number;
  created_at: string;
  updated_at: string;
}

const CompanySettings: React.FC = () => {
  const [settings, setSettings] = useState<CompanySettings>({
    id: '1',
    name: 'AKIBEKS CONSTRUCTION LIMITED',
    address: 'P.O. Box 12345-00100\nNairobi, Kenya',
    phone: '+254-700-000000',
    email: 'info@akibeks.com',
    website: 'www.akibeks.com',
    logo_url: '/logo.png',
    letterhead_url: '',
    footer_text: 'Thank you for choosing Akibeks Construction Limited for your construction needs.',
    tax_number: 'A123456789X',
    registration_number: 'C.123456',
    bank_details: {
      account_name: 'Akibeks Construction Ltd',
      account_number: '1234567890',
      bank: 'KCB Bank',
      branch: 'Westlands',
      swift_code: 'KCBLKENX'
    },
    social_links: {
      facebook: 'https://facebook.com/akibeks',
      twitter: 'https://twitter.com/akibeks',
      linkedin: 'https://linkedin.com/company/akibeks',
      instagram: 'https://instagram.com/akibeks'
    },
    business_hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    timezone: 'Africa/Nairobi',
    currency: 'KES',
    default_tax_rate: 16.0,
    default_labour_rate: 36.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewLogo, setPreviewLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [letterheadFile, setLetterheadFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CompanySettings],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFileUpload = (file: File, type: 'logo' | 'letterhead') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    // Simulate file upload
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (type === 'logo') {
        setSettings(prev => ({ ...prev, logo_url: url }));
        setLogoFile(file);
      } else {
        setSettings(prev => ({ ...prev, letterhead_url: url }));
        setLetterheadFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSettings(prev => ({
        ...prev,
        updated_at: new Date().toISOString()
      }));
      alert('Company settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: HiOfficeBuilding },
    { id: 'contact', name: 'Contact', icon: HiPhone },
    { id: 'branding', name: 'Branding', icon: HiColorSwatch },
    { id: 'financial', name: 'Financial', icon: HiCreditCard },
    { id: 'business', name: 'Business Hours', icon: HiCog },
    { id: 'social', name: 'Social Media', icon: HiGlobe }
  ];

  const timezones = [
    'Africa/Nairobi',
    'Africa/Cairo',
    'Africa/Lagos',
    'UTC',
    'America/New_York',
    'Europe/London'
  ];

  const currencies = [
    { code: 'KES', name: 'Kenyan Shilling' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
          <p className="text-gray-600">Manage your company information and preferences</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          <HiSave className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={settings.registration_number}
                  onChange={(e) => handleInputChange('registration_number', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Number
                </label>
                <input
                  type="text"
                  value={settings.tax_number}
                  onChange={(e) => handleInputChange('tax_number', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <HiPhone className="inline w-4 h-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <HiMail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <HiGlobe className="inline w-4 h-4 mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  value={settings.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Branding & Design</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Company Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {settings.logo_url ? (
                    <div className="space-y-4">
                      <img
                        src={settings.logo_url}
                        alt="Company Logo"
                        className="h-20 mx-auto object-contain"
                      />
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setPreviewLogo(true)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          <HiEye className="inline w-4 h-4 mr-1" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleInputChange('logo_url', '')}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          <HiTrash className="inline w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <HiUpload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Upload company logo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'logo');
                    }}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <HiUpload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </div>
              </div>

              {/* Letterhead Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Letterhead Template
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {settings.letterhead_url ? (
                    <div className="space-y-4">
                      <img
                        src={settings.letterhead_url}
                        alt="Letterhead"
                        className="h-20 mx-auto object-contain"
                      />
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleInputChange('letterhead_url', '')}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          <HiTrash className="inline w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <HiDocumentText className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Upload letterhead template</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'letterhead');
                    }}
                    className="hidden"
                    id="letterhead-upload"
                  />
                  <label
                    htmlFor="letterhead-upload"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <HiUpload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Footer Text
              </label>
              <textarea
                value={settings.footer_text}
                onChange={(e) => handleInputChange('footer_text', e.target.value)}
                rows={2}
                placeholder="Text to appear in document footers"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Financial Settings</h3>
            
            {/* Tax & Labour Rates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={settings.default_tax_rate}
                  onChange={(e) => handleInputChange('default_tax_rate', Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Labour Rate (%)
                </label>
                <input
                  type="number"
                  value={settings.default_labour_rate}
                  onChange={(e) => handleInputChange('default_labour_rate', Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Bank Details */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Bank Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={settings.bank_details.account_name}
                    onChange={(e) => handleInputChange('bank_details.account_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={settings.bank_details.account_number}
                    onChange={(e) => handleInputChange('bank_details.account_number', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={settings.bank_details.bank}
                    onChange={(e) => handleInputChange('bank_details.bank', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={settings.bank_details.branch}
                    onChange={(e) => handleInputChange('bank_details.branch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SWIFT Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={settings.bank_details.swift_code}
                    onChange={(e) => handleInputChange('bank_details.swift_code', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Hours Tab */}
        {activeTab === 'business' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
            
            <div className="space-y-4">
              {Object.entries(settings.business_hours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {day}
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleInputChange(`business_hours.${day}`, e.target.value)}
                      placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Social Media Links</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.social_links.facebook}
                  onChange={(e) => handleInputChange('social_links.facebook', e.target.value)}
                  placeholder="https://facebook.com/yourcompany"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings.social_links.twitter}
                  onChange={(e) => handleInputChange('social_links.twitter', e.target.value)}
                  placeholder="https://twitter.com/yourcompany"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.social_links.linkedin}
                  onChange={(e) => handleInputChange('social_links.linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.social_links.instagram}
                  onChange={(e) => handleInputChange('social_links.instagram', e.target.value)}
                  placeholder="https://instagram.com/yourcompany"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logo Preview Modal */}
      {previewLogo && settings.logo_url && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Logo Preview</h3>
              <button
                onClick={() => setPreviewLogo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center">
              <img
                src={settings.logo_url}
                alt="Company Logo"
                className="max-h-64 mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation */}
      <div className="bg-gray-50 px-6 py-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last updated: {new Date(settings.updated_at).toLocaleString()}
          </div>
          <button
            onClick={saveSettings}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            <HiSave className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;