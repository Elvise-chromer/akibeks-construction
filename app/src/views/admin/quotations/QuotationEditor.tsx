import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiSave, HiPlus, HiTrash, HiEye, HiPrinter, HiMail, HiDuplicate,
  HiArrowLeft, HiCalculator, HiCog, HiClipboard, HiDownload,
  HiRefresh, HiCheck, HiX, HiExclamation, HiInformationCircle,
  HiCurrencyDollar, HiCalendar, HiUser, HiOfficeBuilding,
  HiDocumentText, HiTag, HiLightBulb, HiPencil, HiClock
} from 'react-icons/hi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAutoSave } from '../../../hooks/useAutoSave';
import toast from 'react-hot-toast';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  is_material: boolean;
  notes?: string;
  category?: string;
}

interface QuotationSection {
  id: string;
  name: string;
  description?: string;
  section_order: number;
  items: QuotationItem[];
  material_cost: number;
  labour_cost: number;
}

interface Quotation {
  id?: string;
  quote_number: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  client_address?: string;
  project_name?: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'revised';
  quote_date: string;
  valid_until: string;
  sections: QuotationSection[];
  subtotal: number;
  total_material_cost: number;
  total_labour_cost: number;
  labour_rate: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  notes?: string;
  terms?: string;
  created_at?: string;
  updated_at?: string;
  sent_at?: string;
  viewed_at?: string;
  accepted_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
  converted_to_project?: boolean;
}

const QuotationEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState<Quotation>({
    quote_number: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    project_name: '',
    status: 'draft',
    quote_date: new Date().toISOString().split('T')[0],
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sections: [],
    subtotal: 0,
    total_material_cost: 0,
    total_labour_cost: 0,
    labour_rate: 36,
    tax_rate: 16,
    tax_amount: 0,
    total_amount: 0,
    notes: '',
    terms: 'This quotation is valid for 30 days from the date of issue. Acceptance of this quotation constitutes a binding agreement.'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Auto-save functionality
  const handleAutoSave = useCallback(async (data: Quotation): Promise<boolean> => {
    try {
      if (!data.quote_number || !data.client_name || !data.client_email) {
        return false; // Don't save incomplete quotations
      }

      const response = await fetch(`/api/quotations${data.id ? `/${data.id}` : ''}`, {
        method: data.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.quotation) {
          setQuotation(prev => ({ ...prev, id: result.quotation.id }));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Auto-save error:', error);
      return false;
    }
  }, []);

  const autoSave = useAutoSave(quotation, {
    delay: 3000,
    enabled: true,
    onSave: handleAutoSave,
    saveKey: `quotation_${id || 'new'}`,
    showNotifications: false
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchQuotation();
    } else {
      generateQuotationNumber();
    }
  }, [id]);

  const fetchQuotation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quotations/${id}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.quotation) {
          setQuotation(result.quotation);
        }
      }
    } catch (error) {
      console.error('Error fetching quotation:', error);
      toast.error('Failed to load quotation');
    } finally {
      setLoading(false);
    }
  };

  const generateQuotationNumber = async () => {
    try {
      const response = await fetch('/api/quotations/generate-number');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setQuotation(prev => ({ ...prev, quote_number: result.quote_number }));
        }
      }
    } catch (error) {
      console.error('Error generating quotation number:', error);
      // Fallback to timestamp-based number
      const timestamp = Date.now();
      setQuotation(prev => ({ ...prev, quote_number: `QT-${timestamp}` }));
    }
  };

  const calculateTotals = () => {
    let totalMaterialCost = 0;
    let totalLabourCost = 0;
    let subtotal = 0;

    quotation.sections.forEach(section => {
      let sectionMaterialCost = 0;
      let sectionLabourCost = 0;

      section.items.forEach(item => {
        const itemTotal = item.quantity * item.unit_price;
        if (item.is_material) {
          sectionMaterialCost += itemTotal;
        } else {
          sectionLabourCost += itemTotal;
        }
      });

      section.material_cost = sectionMaterialCost;
      section.labour_cost = sectionLabourCost;
      totalMaterialCost += sectionMaterialCost;
      totalLabourCost += sectionLabourCost;
    });

    subtotal = totalMaterialCost + totalLabourCost;
    const taxAmount = subtotal * (quotation.tax_rate / 100);
    const totalAmount = subtotal + taxAmount;

    setQuotation(prev => ({
      ...prev,
      total_material_cost: totalMaterialCost,
      total_labour_cost: totalLabourCost,
      subtotal: subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount
    }));
  };

  const handleSave = async (showNotification = true) => {
    try {
      const validationErrors = validateQuotation();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        if (showNotification) {
          toast.error('Please fix the errors before saving.');
        }
        return false;
      }

      const success = await autoSave.saveNow();
      
      if (success && showNotification) {
        toast.success('Quotation saved successfully!');
      }
      
      setErrors({});
      return success;
    } catch (error) {
      console.error('Error saving quotation:', error);
      if (showNotification) {
        toast.error('An error occurred while saving the quotation.');
      }
      return false;
    }
  };

  const validateQuotation = () => {
    const errors: Record<string, string> = {};
    
    if (!quotation.client_name.trim()) {
      errors.client_name = 'Client name is required';
    }
    
    if (!quotation.client_email.trim()) {
      errors.client_email = 'Client email is required';
    }
    
    if (quotation.sections.length === 0) {
      errors.sections = 'At least one section is required';
    }
    
    return errors;
  };

  const addSection = () => {
    const newSection: QuotationSection = {
      id: Date.now().toString(),
      name: `Section ${quotation.sections.length + 1}`,
      description: '',
      section_order: quotation.sections.length + 1,
      items: [],
      material_cost: 0,
      labour_cost: 0
    };
    
    setQuotation(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<QuotationSection>) => {
    setQuotation(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    
    setQuotation(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const addItem = (sectionId: string) => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit: 'pcs',
      unit_price: 0,
      total_price: 0,
      is_material: true,
      notes: '',
      category: 'materials'
    };
    
    setQuotation(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      )
    }));
  };

  const updateItem = (sectionId: string, itemId: string, updates: Partial<QuotationItem>) => {
    setQuotation(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? { ...item, ...updates, total_price: (updates.quantity || item.quantity) * (updates.unit_price || item.unit_price) }
                  : item
              )
            }
          : section
      )
    }));
  };

  const deleteItem = (sectionId: string, itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setQuotation(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: section.items.filter(item => item.id !== itemId) }
          : section
      )
    }));
  };

  const duplicateQuotation = () => {
    const newQuotation = {
      ...quotation,
      id: undefined,
      quote_number: '',
      status: 'draft' as const,
      quote_date: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      created_at: undefined,
      updated_at: undefined,
      sent_at: undefined,
      viewed_at: undefined,
      accepted_at: undefined,
      rejected_at: undefined
    };
    
    // Navigate to new quotation with data
    navigate('/admin/quotations/new', { state: { quotation: newQuotation } });
  };

  const handleStatusChange = async (newStatus: Quotation['status']) => {
    try {
      setQuotation(prev => ({ ...prev, status: newStatus }));
      await handleSave(false);
      toast.success(`Quotation status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      viewed: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-orange-100 text-orange-800',
      revised: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const exportQuotationPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Akibeks Construction Ltd', 20, 20);
    doc.setFontSize(12);
    doc.text('QUOTATION', 20, 30);
    
    // Quotation details
    doc.setFontSize(10);
    doc.text(`Quote Number: ${quotation.quote_number}`, 20, 45);
    doc.text(`Date: ${quotation.quote_date}`, 20, 55);
    doc.text(`Valid Until: ${quotation.valid_until}`, 20, 65);
    
    // Client details
    doc.text('Client Details:', 20, 80);
    doc.text(`Name: ${quotation.client_name}`, 20, 90);
    doc.text(`Email: ${quotation.client_email}`, 20, 100);
    if (quotation.client_phone) {
      doc.text(`Phone: ${quotation.client_phone}`, 20, 110);
    }
    
    // Items table
    const tableData = quotation.sections.flatMap(section => 
      section.items.map(item => [
        item.description,
        item.quantity.toString(),
        item.unit,
        formatCurrency(item.unit_price),
        formatCurrency(item.total_price)
      ])
    );
    
    (doc as any).autoTable({
      startY: 130,
      head: [['Description', 'Qty', 'Unit', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'grid'
    });
    
    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ${formatCurrency(quotation.subtotal)}`, 150, finalY);
    doc.text(`Tax (${quotation.tax_rate}%): ${formatCurrency(quotation.tax_amount)}`, 150, finalY + 10);
    doc.text(`Total: ${formatCurrency(quotation.total_amount)}`, 150, finalY + 20);
    
    doc.save(`Quotation_${quotation.quote_number}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/quotations')}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {id === 'new' ? 'New Quotation' : `Quotation ${quotation.quote_number}`}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
                    {quotation.status}
                  </span>
                  {autoSave.lastSaved && (
                    <span className="text-sm text-gray-500 flex items-center">
                      <HiClock className="w-4 h-4 mr-1" />
                      Last saved: {autoSave.lastSaved}
                    </span>
                  )}
                  {autoSave.isSaving && (
                    <span className="text-sm text-blue-600 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-1"></div>
                      Saving...
                    </span>
                  )}
                  {autoSave.hasUnsavedChanges && !autoSave.isSaving && (
                    <span className="text-sm text-orange-600 flex items-center">
                      <HiExclamation className="w-4 h-4 mr-1" />
                      Unsaved changes
                    </span>
                  )}
                  {autoSave.error && (
                    <span className="text-sm text-red-600 flex items-center">
                      <HiExclamation className="w-4 h-4 mr-1" />
                      Save error
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <HiEye className="w-5 h-5" />
              </button>
              
              <button
                onClick={duplicateQuotation}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <HiDuplicate className="w-5 h-5" />
              </button>
              
              <button
                onClick={exportQuotationPDF}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <HiDownload className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => handleSave(true)}
                disabled={autoSave.isSaving}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                {autoSave.isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <HiSave className="w-4 h-4" />
                )}
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quotation Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quotation Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quotation Number
                  </label>
                  <input
                    type="text"
                    value={quotation.quote_number}
                    onChange={(e) => setQuotation(prev => ({ ...prev, quote_number: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="QT-2024-001"
                  />
                  {errors.quote_number && (
                    <p className="mt-1 text-sm text-red-600">{errors.quote_number}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={quotation.project_name || ''}
                    onChange={(e) => setQuotation(prev => ({ ...prev, project_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Project name"
                  />
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Client Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={quotation.client_name}
                    onChange={(e) => setQuotation(prev => ({ ...prev, client_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Client name"
                  />
                  {errors.client_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.client_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={quotation.client_email}
                    onChange={(e) => setQuotation(prev => ({ ...prev, client_email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="client@example.com"
                  />
                  {errors.client_email && (
                    <p className="mt-1 text-sm text-red-600">{errors.client_email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={quotation.client_phone || ''}
                    onChange={(e) => setQuotation(prev => ({ ...prev, client_phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+254 700 123 456"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={quotation.client_address || ''}
                    onChange={(e) => setQuotation(prev => ({ ...prev, client_address: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Client address"
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Sections & Items</h3>
                <button
                  onClick={addSection}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <HiPlus className="w-4 h-4" />
                  <span>Add Section</span>
                </button>
              </div>
              
              {quotation.sections.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <HiDocumentText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No sections added yet. Click "Add Section" to get started.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {quotation.sections.map((section, sectionIndex) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <input
                          type="text"
                          value={section.name}
                          onChange={(e) => updateSection(section.id, { name: e.target.value })}
                          className="text-lg font-semibold bg-transparent border-none focus:ring-0"
                        />
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <textarea
                        value={section.description || ''}
                        onChange={(e) => updateSection(section.id, { description: e.target.value })}
                        placeholder="Section description (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
                        rows={2}
                      />
                      
                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(section.id, item.id, { description: e.target.value })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                placeholder="Item description"
                              />
                            </div>
                            <div className="col-span-1">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(section.id, item.id, { quantity: parseFloat(e.target.value) || 0 })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div className="col-span-1">
                              <input
                                type="text"
                                value={item.unit}
                                onChange={(e) => updateItem(section.id, item.id, { unit: e.target.value })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                placeholder="pcs"
                              />
                            </div>
                            <div className="col-span-2">
                              <input
                                type="number"
                                value={item.unit_price}
                                onChange={(e) => updateItem(section.id, item.id, { unit_price: parseFloat(e.target.value) || 0 })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div className="col-span-2">
                              <span className="text-sm font-medium">
                                {formatCurrency(item.total_price)}
                              </span>
                            </div>
                            <div className="col-span-1">
                              <select
                                value={item.is_material ? 'material' : 'labour'}
                                onChange={(e) => updateItem(section.id, item.id, { is_material: e.target.value === 'material' })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                              >
                                <option value="material">Material</option>
                                <option value="labour">Labour</option>
                              </select>
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={() => deleteItem(section.id, item.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <HiTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <button
                          onClick={() => addItem(section.id)}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <HiPlus className="w-4 h-4" />
                          <span>Add Item</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status & Actions</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={quotation.status}
                    onChange={(e) => handleStatusChange(e.target.value as Quotation['status'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="viewed">Viewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                    <option value="revised">Revised</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quote Date
                  </label>
                  <input
                    type="date"
                    value={quotation.quote_date}
                    onChange={(e) => setQuotation(prev => ({ ...prev, quote_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={quotation.valid_until}
                    onChange={(e) => setQuotation(prev => ({ ...prev, valid_until: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Totals</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material Cost:</span>
                  <span className="font-medium">{formatCurrency(quotation.total_material_cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Labour Cost:</span>
                  <span className="font-medium">{formatCurrency(quotation.total_labour_cost)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(quotation.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({quotation.tax_rate}%):</span>
                  <span className="font-medium">{formatCurrency(quotation.tax_amount)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(quotation.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Labour Rate (per hour)
                  </label>
                  <input
                    type="number"
                    value={quotation.labour_rate}
                    onChange={(e) => setQuotation(prev => ({ ...prev, labour_rate: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={quotation.tax_rate}
                    onChange={(e) => setQuotation(prev => ({ ...prev, tax_rate: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Notes & Terms</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={quotation.notes || ''}
                    onChange={(e) => setQuotation(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    value={quotation.terms || ''}
                    onChange={(e) => setQuotation(prev => ({ ...prev, terms: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Terms and conditions..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationEditor;