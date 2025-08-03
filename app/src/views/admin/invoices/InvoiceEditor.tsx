import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiSave, HiPlus, HiTrash, HiEye, HiPrinter, HiMail, HiDuplicate,
  HiArrowLeft, HiCalculator, HiCog, HiClipboard, HiDownload,
  HiRefresh, HiCheck, HiX, HiExclamation, HiInformationCircle,
  HiCurrencyDollar, HiCalendar, HiUser, HiOfficeBuilding,
  HiDocumentText, HiTag, HiLightBulb, HiPencil
} from 'react-icons/hi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface InvoiceItem {
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

interface InvoiceSection {
  id: string;
  name: string;
  description?: string;
  section_order: number;
  items: InvoiceItem[];
  material_cost: number;
  labour_cost: number;
}

interface Invoice {
  id?: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  client_address?: string;
  project_name?: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  sections: InvoiceSection[];
  subtotal: number;
  total_material_cost: number;
  total_labour_cost: number;
  labour_rate: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  notes?: string;
  terms?: string;
  created_at?: string;
  updated_at?: string;
  sent_at?: string;
}

const InvoiceEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice>({
    invoice_number: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    project_name: '',
    status: 'draft',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sections: [],
    subtotal: 0,
    total_material_cost: 0,
    total_labour_cost: 0,
    labour_rate: 36,
    tax_rate: 16,
    tax_amount: 0,
    total_amount: 0,
    amount_paid: 0,
    balance_due: 0,
    notes: '',
    terms: 'Payment is due within 30 days of invoice date. Late payments may be subject to fees.'
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<string>('');

  useEffect(() => {
    if (id && id !== 'new') {
      fetchInvoice();
    } else {
      generateInvoiceNumber();
    }
  }, [id]);

  useEffect(() => {
    calculateTotals();
  }, [invoice.sections, invoice.labour_rate, invoice.tax_rate]);

  useEffect(() => {
    if (autoSave && id !== 'new') {
      const timer = setTimeout(() => {
        handleSave(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [invoice, autoSave]);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      const mockInvoice: Invoice = {
        id: id,
        invoice_number: 'INV-2024-0001',
        client_name: 'John Doe Construction Ltd',
        client_email: 'john@construction.com',
        client_phone: '+254 700 123 456',
        client_address: '123 Nairobi Street, Nairobi, Kenya',
        project_name: 'Residential House - Karen',
        status: 'draft',
        issue_date: '2024-01-15',
        due_date: '2024-02-15',
        sections: [
          {
            id: '1',
            name: 'Foundation Work',
            description: 'Foundation and structural work',
            section_order: 1,
            items: [
              {
                id: '1',
                description: 'Concrete foundation',
                quantity: 50,
                unit: 'm³',
                unit_price: 12000,
                total_price: 600000,
                is_material: true,
                category: 'Concrete'
              }
            ],
            material_cost: 600000,
            labour_cost: 216000
          }
        ],
        subtotal: 816000,
        total_material_cost: 600000,
        total_labour_cost: 216000,
        labour_rate: 36,
        tax_rate: 16,
        tax_amount: 130560,
        total_amount: 946560,
        amount_paid: 0,
        balance_due: 946560,
        notes: 'Thank you for your business!',
        terms: 'Payment is due within 30 days of invoice date.',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      };
      setInvoice(mockInvoice);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInvoiceNumber = async () => {
    // Mock generation - replace with API call
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    const invoiceNumber = `INV-${year}-${randomNum.toString().padStart(4, '0')}`;
    setInvoice(prev => ({ ...prev, invoice_number: invoiceNumber }));
  };

  const calculateTotals = () => {
    let totalMaterialCost = 0;
    let totalLabourCost = 0;

    invoice.sections.forEach(section => {
      let sectionMaterialCost = 0;
      let sectionLabourCost = 0;

      section.items.forEach(item => {
        if (item.is_material) {
          sectionMaterialCost += item.total_price;
        }
      });

      sectionLabourCost = (sectionMaterialCost * invoice.labour_rate) / 100;
      section.material_cost = sectionMaterialCost;
      section.labour_cost = sectionLabourCost;

      totalMaterialCost += sectionMaterialCost;
      totalLabourCost += sectionLabourCost;
    });

    const subtotal = totalMaterialCost + totalLabourCost;
    const taxAmount = (subtotal * invoice.tax_rate) / 100;
    const totalAmount = subtotal + taxAmount;
    const balanceDue = totalAmount - invoice.amount_paid;

    setInvoice(prev => ({
      ...prev,
      total_material_cost: totalMaterialCost,
      total_labour_cost: totalLabourCost,
      subtotal: subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      balance_due: balanceDue
    }));
  };

  const handleSave = async (showNotification = true) => {
    if (saving) return;
    
    setSaving(true);
    try {
      // Validate invoice
      const validationErrors = validateInvoice();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSaving(false);
        return;
      }

      // Mock API call - replace with actual API
      console.log('Saving invoice:', invoice);
      
      if (showNotification) {
        // Show success notification
        alert('Invoice saved successfully!');
      }
      
      setLastSaved(new Date().toLocaleTimeString());
      setErrors({});
    } catch (error) {
      console.error('Error saving invoice:', error);
      if (showNotification) {
        alert('Error saving invoice. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const validateInvoice = () => {
    const errors: Record<string, string> = {};
    
    if (!invoice.client_name.trim()) {
      errors.client_name = 'Client name is required';
    }
    
    if (!invoice.client_email.trim()) {
      errors.client_email = 'Client email is required';
    }
    
    if (invoice.sections.length === 0) {
      errors.sections = 'At least one section is required';
    }
    
    return errors;
  };

  const addSection = () => {
    const newSection: InvoiceSection = {
      id: Date.now().toString(),
      name: `Section ${invoice.sections.length + 1}`,
      description: '',
      section_order: invoice.sections.length + 1,
      items: [],
      material_cost: 0,
      labour_cost: 0
    };
    
    setInvoice(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<InvoiceSection>) => {
    setInvoice(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    
    setInvoice(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const addItem = (sectionId: string) => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit: 'pcs',
      unit_price: 0,
      total_price: 0,
      is_material: true,
      category: ''
    };

    setInvoice(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      )
    }));
  };

  const updateItem = (sectionId: string, itemId: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      ...updates,
                      total_price: (updates.quantity ?? item.quantity) * (updates.unit_price ?? item.unit_price)
                    }
                  : item
              )
            }
          : section
      )
    }));
  };

  const deleteItem = (sectionId: string, itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    setInvoice(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: section.items.filter(item => item.id !== itemId) }
          : section
      )
    }));
  };

  const duplicateInvoice = () => {
    const duplicatedInvoice = {
      ...invoice,
      id: undefined,
      invoice_number: '',
      status: 'draft' as const,
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount_paid: 0,
      sent_at: undefined
    };
    
    setInvoice(duplicatedInvoice);
    generateInvoiceNumber();
  };

  const handleStatusChange = async (newStatus: Invoice['status']) => {
    setInvoice(prev => ({ ...prev, status: newStatus }));
    await handleSave(false);
    
    if (newStatus === 'sent') {
      // Mock sending email
      alert('Invoice sent to client successfully!');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportInvoicePDF = () => {
    const doc = new jsPDF();
    // Header
    doc.setFontSize(18).text('INVOICE', 14, 20);
    // Company logo (optional, if available)
    // doc.addImage(logoImg, 'PNG', 150, 10, 40, 20);
    doc.setFontSize(12).text('Akibeks Engineering Solutions', 14, 30);
    doc.setFontSize(10).text('Nairobi, Kenya | info@akibeks.com | +254 700 000 000', 14, 36);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 40, 196, 40);
    // Client Info
    doc.setFontSize(11).text(`Invoice #: ${invoice.invoice_number}`, 14, 48);
    doc.text(`Date: ${invoice.issue_date}`, 14, 54);
    doc.text(`Due: ${invoice.due_date}`, 14, 60);
    doc.text(`Client: ${invoice.client_name}`, 14, 66);
    doc.text(`Email: ${invoice.client_email}`, 14, 72);
    if (invoice.client_address) doc.text(`Address: ${invoice.client_address}`, 14, 78);
    // Table
    let items = [];
    invoice.sections.forEach(section => {
      section.items.forEach(item => {
        items.push([
          section.name,
          item.description,
          item.quantity,
          item.unit,
          item.unit_price,
          item.total_price
        ]);
      });
    });
    doc.autoTable({
      startY: 85,
      head: [['Section', 'Description', 'Qty', 'Unit', 'Unit Price', 'Total']],
      body: items,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 10 },
    });
    // Totals
    let y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11).text(`Subtotal: ${formatCurrency(invoice.subtotal)}`, 150, y);
    doc.text(`Tax (${invoice.tax_rate}%): ${formatCurrency(invoice.tax_amount)}`, 150, y + 6);
    doc.text(`Total: ${formatCurrency(invoice.total_amount)}`, 150, y + 12);
    doc.text(`Amount Paid: ${formatCurrency(invoice.amount_paid)}`, 150, y + 18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Balance Due: ${formatCurrency(invoice.balance_due)}`, 150, y + 24);
    doc.setFont('helvetica', 'normal');
    // Notes & Terms
    if (invoice.notes) doc.text(`Notes: ${invoice.notes}`, 14, y + 12);
    if (invoice.terms) doc.text(`Terms: ${invoice.terms}`, 14, y + 18);
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text('Thank you for your business!', 14, 285);
    doc.text('Page 1 of 1', 180, 285);
    doc.save(`Invoice_${invoice.invoice_number}.pdf`);
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
                onClick={() => navigate('/admin/invoices')}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {id === 'new' ? 'New Invoice' : `Invoice ${invoice.invoice_number}`}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                  {lastSaved && (
                    <span className="text-sm text-gray-500">
                      Last saved: {lastSaved}
                    </span>
                  )}
                  {autoSave && (
                    <span className="text-sm text-green-600 flex items-center">
                      <HiCheck className="w-4 h-4 mr-1" />
                      Auto-save enabled
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Auto-save</span>
              </label>
              
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <HiEye className="w-5 h-5" />
              </button>
              
              <button
                onClick={duplicateInvoice}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <HiDuplicate className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                {saving ? (
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
            {/* Invoice Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoice.invoice_number}
                    onChange={(e) => setInvoice(prev => ({ ...prev, invoice_number: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={invoice.status}
                    onChange={(e) => handleStatusChange(e.target.value as Invoice['status'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="viewed">Viewed</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={invoice.issue_date}
                    onChange={(e) => setInvoice(prev => ({ ...prev, issue_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoice.due_date}
                    onChange={(e) => setInvoice(prev => ({ ...prev, due_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    value={invoice.client_name}
                    onChange={(e) => setInvoice(prev => ({ ...prev, client_name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.client_name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.client_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.client_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    value={invoice.client_email}
                    onChange={(e) => setInvoice(prev => ({ ...prev, client_email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.client_email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.client_email && (
                    <p className="text-red-600 text-sm mt-1">{errors.client_email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Phone
                  </label>
                  <input
                    type="tel"
                    value={invoice.client_phone || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, client_phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={invoice.project_name || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, project_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Address
                  </label>
                  <textarea
                    value={invoice.client_address || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, client_address: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Invoice Sections</h3>
                <button
                  onClick={addSection}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <HiPlus className="w-4 h-4" />
                  <span>Add Section</span>
                </button>
              </div>
              
              {errors.sections && (
                <p className="text-red-600 text-sm mb-4">{errors.sections}</p>
              )}

              {invoice.sections.map((section, sectionIndex) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => updateSection(section.id, { name: e.target.value })}
                        className="font-medium text-gray-900 border-0 border-b border-gray-200 focus:border-primary-500 focus:ring-0 px-0"
                        placeholder="Section name"
                      />
                      <input
                        type="text"
                        value={section.description || ''}
                        onChange={(e) => updateSection(section.id, { description: e.target.value })}
                        className="text-gray-600 border-0 border-b border-gray-200 focus:border-primary-500 focus:ring-0 px-0"
                        placeholder="Section description"
                      />
                    </div>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg">
                        <div className="col-span-4">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(section.id, item.id, { description: e.target.value })}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Item description"
                          />
                        </div>
                        <div className="col-span-1">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(section.id, item.id, { quantity: Number(e.target.value) })}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-span-1">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => updateItem(section.id, item.id, { unit: e.target.value })}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Unit"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={item.unit_price}
                            onChange={(e) => updateItem(section.id, item.id, { unit_price: Number(e.target.value) })}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-span-2">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.total_price)}
                          </span>
                        </div>
                        <div className="col-span-1">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={item.is_material}
                              onChange={(e) => updateItem(section.id, item.id, { is_material: e.target.checked })}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-1 text-xs text-gray-600">Mat</span>
                          </label>
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
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <HiPlus className="w-4 h-4" />
                      <span>Add Item</span>
                    </button>
                  </div>

                  {/* Section Totals */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Material Cost:</span>
                        <span className="font-medium">{formatCurrency(section.material_cost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Labour Cost ({invoice.labour_rate}%):</span>
                        <span className="font-medium">{formatCurrency(section.labour_cost)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Settings & Notes</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Labour Rate (%)
                  </label>
                  <input
                    type="number"
                    value={invoice.labour_rate}
                    onChange={(e) => setInvoice(prev => ({ ...prev, labour_rate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={invoice.tax_rate}
                    onChange={(e) => setInvoice(prev => ({ ...prev, tax_rate: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Paid
                  </label>
                  <input
                    type="number"
                    value={invoice.amount_paid}
                    onChange={(e) => setInvoice(prev => ({ ...prev, amount_paid: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={invoice.notes || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Additional notes for the client..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    value={invoice.terms || ''}
                    onChange={(e) => setInvoice(prev => ({ ...prev, terms: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Payment terms and conditions..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Invoice Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material Cost:</span>
                    <span className="font-medium">{formatCurrency(invoice.total_material_cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Labour Cost:</span>
                    <span className="font-medium">{formatCurrency(invoice.total_labour_cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({invoice.tax_rate}%):</span>
                    <span className="font-medium">{formatCurrency(invoice.tax_amount)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-gray-900">Total Amount:</span>
                    <span className="font-bold text-lg text-primary-600">{formatCurrency(invoice.total_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium">{formatCurrency(invoice.amount_paid)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-gray-900">Balance Due:</span>
                    <span className={`font-bold text-lg ${invoice.balance_due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(invoice.balance_due)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <HiEye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <HiPrinter className="w-4 h-4" />
                    <span>Print</span>
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('sent')}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <HiMail className="w-4 h-4" />
                    <span>Send to Client</span>
                  </button>
                  
                  <button
                    onClick={exportInvoicePDF}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <HiDownload className="w-4 h-4" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                  <HiLightBulb className="w-5 h-5 mr-2" />
                  Quick Tips
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Use Ctrl+S to save quickly</li>
                  <li>• Enable auto-save for continuous backups</li>
                  <li>• Mark items as material/labour for accurate calculations</li>
                  <li>• Set clear payment terms to avoid delays</li>
                  <li>• Preview before sending to clients</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;