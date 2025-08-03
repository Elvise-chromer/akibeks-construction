import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiDocument,
  HiDocumentText,
  HiDocumentDownload,
  HiFolder,
  HiFolderOpen,
  HiUpload,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiPlus,
  HiDownload,
  HiShare,
  HiClock,
  HiUser,
  HiTag,
  HiLockClosed,
  HiLockOpen,
  HiRefresh,
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiClipboardCopy,
  HiExclamationCircle,
  HiCheckCircle,
  HiInformationCircle
} from 'react-icons/hi';

// Types
interface Document {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  document_type: 'contract' | 'invoice' | 'proposal' | 'report' | 'image' | 'drawing' | 'certificate' | 'other';
  version: number;
  parent_document_id?: string;
  project_id?: string;
  uploaded_by: string;
  checksum: string;
  metadata: {
    title?: string;
    description?: string;
    category?: string;
    client?: string;
    project_name?: string;
  };
  tags: string[];
  is_public: boolean;
  access_permissions: string[];
  download_count: number;
  last_accessed?: string;
  expires_at?: string;
  is_archived: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
}

interface Folder {
  id: string;
  name: string;
  parent_id?: string;
  project_id?: string;
  is_public: boolean;
  created_by: string;
  created_at: string;
  document_count: number;
  children?: Folder[];
}

interface DocumentFilters {
  type: string;
  project: string;
  uploaded_by: string;
  date_range: string;
  is_public: string;
  is_archived: string;
  tags: string[];
}

const DocumentManagement: React.FC = () => {
  // State management
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<DocumentFilters>({
    type: '',
    project: '',
    uploaded_by: '',
    date_range: '',
    is_public: '',
    is_archived: '',
    tags: []
  });
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'upload'>('view');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const mockDocuments: Document[] = [
    {
      id: '1',
      file_name: 'westlands_office_contract.pdf',
      file_path: '/uploads/documents/westlands_office_contract.pdf',
      file_size: 2457600, // 2.4 MB
      mime_type: 'application/pdf',
      document_type: 'contract',
      version: 1,
      project_id: '1',
      uploaded_by: 'admin@akibeks.com',
      checksum: 'a1b2c3d4e5f6g7h8i9j0',
      metadata: {
        title: 'Westlands Office Building Contract',
        description: 'Main construction contract for the Westlands office project',
        category: 'Legal Documents',
        client: 'Smith Construction Ltd',
        project_name: 'Westlands Office Complex'
      },
      tags: ['contract', 'legal', 'westlands', 'commercial'],
      is_public: false,
      access_permissions: ['admin@akibeks.com', 'manager@akibeks.com'],
      download_count: 15,
      last_accessed: '2024-01-14T10:30:00Z',
      expires_at: '2025-01-15T00:00:00Z',
      is_archived: false,
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    },
    {
      id: '2',
      file_name: 'site_layout_drawing.dwg',
      file_path: '/uploads/documents/site_layout_drawing.dwg',
      file_size: 5242880, // 5 MB
      mime_type: 'application/x-autocad',
      document_type: 'drawing',
      version: 3,
      parent_document_id: '2',
      project_id: '2',
      uploaded_by: 'architect@akibeks.com',
      checksum: 'z9y8x7w6v5u4t3s2r1q0',
      metadata: {
        title: 'Kiambu Residential Site Layout',
        description: 'Updated site layout drawing with latest modifications',
        category: 'Technical Drawings',
        client: 'Johnson Enterprises',
        project_name: 'Kiambu Residential Complex'
      },
      tags: ['drawing', 'autocad', 'residential', 'layout'],
      is_public: true,
      access_permissions: [],
      download_count: 8,
      last_accessed: '2024-01-13T16:45:00Z',
      is_archived: false,
      created_at: '2024-01-12T14:20:00Z',
      updated_at: '2024-01-13T16:00:00Z'
    },
    {
      id: '3',
      file_name: 'safety_certificate_2024.pdf',
      file_path: '/uploads/documents/safety_certificate_2024.pdf',
      file_size: 1048576, // 1 MB
      mime_type: 'application/pdf',
      document_type: 'certificate',
      version: 1,
      uploaded_by: 'safety@akibeks.com',
      checksum: 'p9o8i7u6y5t4r3e2w1q0',
      metadata: {
        title: 'OSHA Safety Certification 2024',
        description: 'Annual safety certification from OSHA',
        category: 'Certifications'
      },
      tags: ['certificate', 'safety', 'osha', '2024'],
      is_public: false,
      access_permissions: ['admin@akibeks.com', 'safety@akibeks.com'],
      download_count: 3,
      last_accessed: '2024-01-10T09:00:00Z',
      expires_at: '2024-12-31T23:59:59Z',
      is_archived: false,
      created_at: '2024-01-10T09:00:00Z',
      updated_at: '2024-01-10T09:00:00Z'
    }
  ];

  const mockFolders: Folder[] = [
    {
      id: '1',
      name: 'Projects',
      is_public: false,
      created_by: 'admin@akibeks.com',
      created_at: '2024-01-01T00:00:00Z',
      document_count: 25,
      children: [
        {
          id: '2',
          name: 'Westlands Office',
          parent_id: '1',
          project_id: '1',
          is_public: false,
          created_by: 'admin@akibeks.com',
          created_at: '2024-01-15T00:00:00Z',
          document_count: 12
        },
        {
          id: '3',
          name: 'Kiambu Residential',
          parent_id: '1',
          project_id: '2',
          is_public: false,
          created_by: 'admin@akibeks.com',
          created_at: '2024-01-12T00:00:00Z',
          document_count: 8
        }
      ]
    },
    {
      id: '4',
      name: 'Legal Documents',
      is_public: false,
      created_by: 'admin@akibeks.com',
      created_at: '2024-01-01T00:00:00Z',
      document_count: 15
    },
    {
      id: '5',
      name: 'Certifications',
      is_public: false,
      created_by: 'admin@akibeks.com',
      created_at: '2024-01-01T00:00:00Z',
      document_count: 8
    }
  ];

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocuments(mockDocuments);
      setFolders(mockFolders);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filter and search logic
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchTerm || 
      doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.metadata.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.metadata.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = !filters.type || doc.document_type === filters.type;
    const matchesProject = !filters.project || doc.project_id === filters.project;
    const matchesUploadedBy = !filters.uploaded_by || doc.uploaded_by === filters.uploaded_by;
    const matchesPublic = !filters.is_public || doc.is_public.toString() === filters.is_public;
    const matchesArchived = !filters.is_archived || doc.is_archived.toString() === filters.is_archived;
    const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => doc.tags.includes(tag));

    return matchesSearch && matchesType && matchesProject && matchesUploadedBy && matchesPublic && matchesArchived && matchesTags;
  });

  // Helper functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentIcon = (mimeType: string, documentType: string) => {
    if (mimeType.startsWith('image/')) return HiDocument;
    if (mimeType === 'application/pdf') return HiDocumentText;
    if (mimeType.includes('autocad') || documentType === 'drawing') return HiDocument;
    return HiDocumentText;
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'invoice': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'report': return 'bg-yellow-100 text-yellow-800';
      case 'image': return 'bg-pink-100 text-pink-800';
      case 'drawing': return 'bg-indigo-100 text-indigo-800';
      case 'certificate': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Modal handlers
  const openModal = (mode: 'view' | 'edit' | 'upload', document?: Document) => {
    setModalMode(mode);
    setSelectedDocument(document || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  // File upload handler
  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newDocument: Document = {
          id: Date.now().toString() + i,
          file_name: file.name,
          file_path: `/uploads/documents/${file.name}`,
          file_size: file.size,
          mime_type: file.type,
          document_type: 'other',
          version: 1,
          uploaded_by: 'admin@akibeks.com',
          checksum: Math.random().toString(36).substring(7),
          metadata: {
            title: file.name.replace(/\.[^/.]+$/, ""),
            description: `Uploaded file: ${file.name}`
          },
          tags: [],
          is_public: false,
          access_permissions: ['admin@akibeks.com'],
          download_count: 0,
          is_archived: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setDocuments(prev => [newDocument, ...prev]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== documentId));
    }
  };

  const handleDownload = async (document: Document) => {
    // Simulate download
    console.log('Downloading:', document.file_name);
    
    // Update download count
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id 
        ? { ...doc, download_count: doc.download_count + 1, last_accessed: new Date().toISOString() }
        : doc
    ));
  };

  const toggleArchive = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { 
            ...doc, 
            is_archived: !doc.is_archived,
            archived_at: !doc.is_archived ? new Date().toISOString() : undefined
          }
        : doc
    ));
  };

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / pageSize);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Organize and manage all your project documents</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center"
          >
            <HiUpload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
          <button
            onClick={() => openModal('upload')}
            className="btn-secondary flex items-center"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HiDocument className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HiFolder className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Folders</p>
              <p className="text-2xl font-bold text-gray-900">{folders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HiDownload className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {documents.reduce((sum, doc) => sum + doc.download_count, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <HiClock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatFileSize(documents.reduce((sum, doc) => sum + doc.file_size, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="form-select text-sm"
            >
              <option value="">All Types</option>
              <option value="contract">Contract</option>
              <option value="invoice">Invoice</option>
              <option value="proposal">Proposal</option>
              <option value="report">Report</option>
              <option value="image">Image</option>
              <option value="drawing">Drawing</option>
              <option value="certificate">Certificate</option>
              <option value="other">Other</option>
            </select>

            <select
              value={filters.is_public}
              onChange={(e) => setFilters({ ...filters, is_public: e.target.value })}
              className="form-select text-sm"
            >
              <option value="">All Access</option>
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>

            <select
              value={filters.is_archived}
              onChange={(e) => setFilters({ ...filters, is_archived: e.target.value })}
              className="form-select text-sm"
            >
              <option value="">All Status</option>
              <option value="false">Active</option>
              <option value="true">Archived</option>
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <HiDocumentText className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <HiFolder className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setFilters({
                type: '',
                project: '',
                uploaded_by: '',
                date_range: '',
                is_public: '',
                is_archived: '',
                tags: []
              })}
              className="btn-secondary flex items-center text-sm"
            >
              <HiRefresh className="w-4 h-4 mr-1" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Documents List/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDocuments.map((document) => {
                  const IconComponent = getDocumentIcon(document.mime_type, document.document_type);
                  return (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {document.metadata.title || document.file_name}
                            </div>
                            <div className="text-sm text-gray-500">{document.file_name}</div>
                            {document.tags.length > 0 && (
                              <div className="flex space-x-1 mt-1">
                                {document.tags.slice(0, 3).map((tag, index) => (
                                  <span 
                                    key={index}
                                    className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {document.tags.length > 3 && (
                                  <span className="text-xs text-gray-500">+{document.tags.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentTypeColor(document.document_type)}`}>
                          {document.document_type.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatFileSize(document.file_size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {document.is_public ? (
                            <HiLockOpen className="w-4 h-4 text-green-600 mr-1" />
                          ) : (
                            <HiLockClosed className="w-4 h-4 text-red-600 mr-1" />
                          )}
                          <span className="text-sm text-gray-900">
                            {document.is_public ? 'Public' : 'Private'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {document.download_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(document.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openModal('view', document)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <HiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(document)}
                            className="text-green-600 hover:text-green-900"
                            title="Download"
                          >
                            <HiDownload className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal('edit', document)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <HiPencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleArchive(document.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title={document.is_archived ? 'Unarchive' : 'Archive'}
                          >
                            {document.is_archived ? <HiFolderOpen className="w-4 h-4" /> : <HiFolder className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDelete(document.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, filteredDocuments.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredDocuments.length}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <HiChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedDocuments.map((document) => {
            const IconComponent = getDocumentIcon(document.mime_type, document.document_type);
            return (
              <div key={document.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {document.metadata.title || document.file_name}
                        </h3>
                        <p className="text-xs text-gray-500">{formatFileSize(document.file_size)}</p>
                      </div>
                    </div>
                    {document.is_public ? (
                      <HiLockOpen className="w-4 h-4 text-green-600" />
                    ) : (
                      <HiLockClosed className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentTypeColor(document.document_type)}`}>
                      {document.document_type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {document.metadata.description && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {document.metadata.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{new Date(document.updated_at).toLocaleDateString()}</span>
                    <span>{document.download_count} downloads</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal('view', document)}
                      className="flex-1 text-xs btn-secondary"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(document)}
                      className="flex-1 text-xs btn-primary"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Document Details Modal */}
      {isModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Document Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-6 space-y-6">
              {/* Document Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">File Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">File Name</label>
                      <p className="text-sm text-gray-900">{selectedDocument.file_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">File Size</label>
                      <p className="text-sm text-gray-900">{formatFileSize(selectedDocument.file_size)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentTypeColor(selectedDocument.document_type)}`}>
                        {selectedDocument.document_type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Version</label>
                      <p className="text-sm text-gray-900">v{selectedDocument.version}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Metadata</h4>
                  <div className="space-y-3">
                    {selectedDocument.metadata.title && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Title</label>
                        <p className="text-sm text-gray-900">{selectedDocument.metadata.title}</p>
                      </div>
                    )}
                    {selectedDocument.metadata.description && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Description</label>
                        <p className="text-sm text-gray-900">{selectedDocument.metadata.description}</p>
                      </div>
                    )}
                    {selectedDocument.metadata.client && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Client</label>
                        <p className="text-sm text-gray-900">{selectedDocument.metadata.client}</p>
                      </div>
                    )}
                    {selectedDocument.metadata.project_name && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Project</label>
                        <p className="text-sm text-gray-900">{selectedDocument.metadata.project_name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Access and Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Access Control</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Visibility:</span>
                      <div className="flex items-center">
                        {selectedDocument.is_public ? (
                          <HiLockOpen className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <HiLockClosed className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className="text-sm text-gray-900">
                          {selectedDocument.is_public ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                    {!selectedDocument.is_public && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Authorized Users:</span>
                        <div className="mt-1 space-y-1">
                          {selectedDocument.access_permissions.map((user, index) => (
                            <div key={index} className="text-sm text-gray-900 flex items-center">
                              <HiUser className="w-3 h-3 mr-2" />
                              {user}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Activity</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Downloads: </span>
                      <span className="text-sm text-gray-900">{selectedDocument.download_count}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Uploaded by: </span>
                      <span className="text-sm text-gray-900">{selectedDocument.uploaded_by}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Created: </span>
                      <span className="text-sm text-gray-900">
                        {new Date(selectedDocument.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedDocument.last_accessed && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Last accessed: </span>
                        <span className="text-sm text-gray-900">
                          {new Date(selectedDocument.last_accessed).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {selectedDocument.tags.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        <HiTag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedDocument)}
                className="btn-primary flex items-center"
              >
                <HiDownload className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;