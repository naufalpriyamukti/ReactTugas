import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  UploadIcon, 
  ImageIcon, 
  DeleteIcon, 
  EditIcon, 
  FilterIcon,
  CheckIcon,
  CloseIcon
} from '../../components/Icons';

const FileUploadManager = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/');
      return;
    }
    
    // TODO: Replace with actual API call
    // fetchFiles();
    
    // Mock files data
    const mockFiles = [
      {
        id: 1,
        name: 'mobile-legends-banner.jpg',
        type: 'image',
        size: '2.5 MB',
        url: '/images/mobile-legends.jpg',
        uploadedAt: '2024-01-15',
        usedIn: ['Products', 'Carousel']
      },
      {
        id: 2,
        name: 'free-fire-icon.png',
        type: 'image',
        size: '156 KB',
        url: '/images/free-fire.png',
        uploadedAt: '2024-01-14',
        usedIn: ['Products']
      },
      {
        id: 3,
        name: 'user-avatar-default.png',
        type: 'image',
        size: '45 KB',
        url: '/images/avatar-default.png',
        uploadedAt: '2024-01-13',
        usedIn: ['Users']
      },
      {
        id: 4,
        name: 'payment-receipt-template.pdf',
        type: 'document',
        size: '89 KB',
        url: '/documents/receipt-template.pdf',
        uploadedAt: '2024-01-12',
        usedIn: ['Reports']
      }
    ];
    
    setFiles(mockFiles);
  }, [isLoggedIn, isAdmin, navigate]);

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (uploadedFiles.length === 0) return;

    setUploading(true);

    try {
      // TODO: Replace with actual file upload API
      // const formData = new FormData();
      // uploadedFiles.forEach(file => formData.append('files', file));
      // const response = await axios.post('/api/files/upload', formData);

      // Mock file upload
      const newFiles = uploadedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString().split('T')[0],
        usedIn: []
      }));

      setFiles(prev => [...prev, ...newFiles]);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload gagal. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = (fileId) => {
    if (window.confirm('Yakin ingin menghapus file ini?')) {
      setFiles(files.filter(file => file.id !== fileId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return;
    
    if (window.confirm(`Yakin ingin menghapus ${selectedFiles.length} file?`)) {
      setFiles(files.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAllFiles = () => {
    const filteredFiles = getFilteredFiles();
    const allSelected = filteredFiles.every(file => selectedFiles.includes(file.id));
    
    if (allSelected) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };

  const getFilteredFiles = () => {
    let filtered = files;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(file => file.type === filterType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFileTypeIcon = (type) => {
    return type === 'image' ? <ImageIcon size={24} /> : <UploadIcon size={24} />;
  };

  if (!isLoggedIn() || !isAdmin()) {
    return null;
  }

  const filteredFiles = getFilteredFiles();

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <div className="admin-header">
          <h1>Manajemen File</h1>
          <div className="header-actions">
            <label className="upload-button">
              <UploadIcon size={20} />
              <span>Upload File</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                accept="image/*,.pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="file-manager-controls">
          <div className="controls-left">
            <div className="search-box">
              <input
                type="text"
                placeholder="Cari file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filter-dropdown">
              <FilterIcon size={20} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">Semua File</option>
                <option value="image">Gambar</option>
                <option value="document">Dokumen</option>
              </select>
            </div>
          </div>

          <div className="controls-right">
            {selectedFiles.length > 0 && (
              <div className="bulk-actions">
                <span>{selectedFiles.length} file dipilih</span>
                <button onClick={handleBulkDelete} className="delete-bulk-btn">
                  <DeleteIcon size={16} />
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>

        {uploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span>Mengupload file...</span>
          </div>
        )}

        <div className="files-container">
          <div className="files-header">
            <div className="select-all">
              <input
                type="checkbox"
                checked={filteredFiles.length > 0 && filteredFiles.every(file => selectedFiles.includes(file.id))}
                onChange={selectAllFiles}
              />
              <span>Pilih Semua</span>
            </div>
            <span className="file-count">{filteredFiles.length} file</span>
          </div>

          <div className="files-grid">
            {filteredFiles.map(file => (
              <div key={file.id} className={`file-card ${selectedFiles.includes(file.id) ? 'selected' : ''}`}>
                <div className="file-header">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                  />
                  <div className="file-actions">
                    <button className="action-btn edit">
                      <EditIcon size={16} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <DeleteIcon size={16} />
                    </button>
                  </div>
                </div>

                <div className="file-preview">
                  {file.type === 'image' ? (
                    <img src={file.url} alt={file.name} className="preview-image" />
                  ) : (
                    <div className="preview-placeholder">
                      {getFileTypeIcon(file.type)}
                    </div>
                  )}
                </div>

                <div className="file-info">
                  <h4 className="file-name" title={file.name}>{file.name}</h4>
                  <div className="file-meta">
                    <span className="file-size">{file.size}</span>
                    <span className="file-date">{file.uploadedAt}</span>
                  </div>
                  
                  {file.usedIn.length > 0 && (
                    <div className="file-usage">
                      <span className="usage-label">Digunakan di:</span>
                      <div className="usage-tags">
                        {file.usedIn.map(usage => (
                          <span key={usage} className="usage-tag">{usage}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="empty-state">
              <UploadIcon size={64} />
              <h3>Tidak ada file</h3>
              <p>
                {searchQuery || filterType !== 'all' 
                  ? 'Tidak ada file yang sesuai dengan filter'
                  : 'Belum ada file yang diupload'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FileUploadManager;