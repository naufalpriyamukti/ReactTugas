import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  PDFIcon, 
  CalendarIcon, 
  FilterIcon,
  StatIcon,
  MoneyIcon,
  OrderIcon,
  ProductIcon,
  CheckIcon
} from '../../components/Icons';

const PDFReportGenerator = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [reportData, setReportData] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([]);

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/');
      return;
    }
    
    // Set default date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
    
    // Load generated reports history
    loadGeneratedReports();
  }, [isLoggedIn, isAdmin, navigate]);

  const loadGeneratedReports = () => {
    // TODO: Replace with actual API call
    const mockReports = [
      {
        id: 1,
        type: 'Sales Report',
        period: 'Jan 1 - Jan 31, 2024',
        generatedAt: '2024-01-31 15:30',
        fileSize: '2.3 MB',
        status: 'completed'
      },
      {
        id: 2,
        type: 'Product Performance',
        period: 'Dec 1 - Dec 31, 2023',
        generatedAt: '2024-01-15 10:45',
        fileSize: '1.8 MB',
        status: 'completed'
      },
      {
        id: 3,
        type: 'Customer Report',
        period: 'Nov 1 - Nov 30, 2023',
        generatedAt: '2024-01-10 14:20',
        fileSize: '3.1 MB',
        status: 'completed'
      }
    ];
    
    setGeneratedReports(mockReports);
  };

  const generateReport = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Pilih rentang tanggal terlebih dahulu');
      return;
    }

    setGenerating(true);

    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/reports/generate', {
      //   type: reportType,
      //   startDate: dateRange.startDate,
      //   endDate: dateRange.endDate
      // });

      // Mock report generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockReportData = {
        type: reportType,
        period: `${dateRange.startDate} - ${dateRange.endDate}`,
        summary: {
          totalRevenue: 25670000,
          totalOrders: 1247,
          totalCustomers: 892,
          avgOrderValue: 205800
        },
        details: generateMockData(reportType)
      };

      setReportData(mockReportData);
      
      // Add to generated reports
      const newReport = {
        id: Date.now(),
        type: getReportTypeName(reportType),
        period: `${dateRange.startDate} - ${dateRange.endDate}`,
        generatedAt: new Date().toLocaleString('id-ID'),
        fileSize: '2.1 MB',
        status: 'completed'
      };
      
      setGeneratedReports(prev => [newReport, ...prev]);
      
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Gagal membuat laporan. Silakan coba lagi.');
    } finally {
      setGenerating(false);
    }
  };

  const generateMockData = (type) => {
    switch (type) {
      case 'sales':
        return {
          dailySales: [
            { date: '2024-01-01', revenue: 1200000, orders: 45 },
            { date: '2024-01-02', revenue: 950000, orders: 38 },
            { date: '2024-01-03', revenue: 1450000, orders: 52 }
          ],
          topProducts: [
            { name: 'Mobile Legends Diamond', sales: 245, revenue: 4900000 },
            { name: 'Free Fire Diamond', sales: 189, revenue: 2835000 },
            { name: 'PUBG UC', sales: 156, revenue: 1872000 }
          ]
        };
      case 'products':
        return {
          productPerformance: [
            { name: 'Mobile Legends', totalSales: 8900000, orders: 445, growth: '+12%' },
            { name: 'Free Fire', totalSales: 6700000, orders: 334, growth: '+8%' },
            { name: 'PUBG Mobile', totalSales: 4500000, orders: 225, growth: '+15%' }
          ]
        };
      case 'customers':
        return {
          customerSegments: [
            { segment: 'New Customers', count: 234, revenue: 4680000 },
            { segment: 'Returning Customers', count: 456, revenue: 15600000 },
            { segment: 'VIP Customers', count: 89, revenue: 8900000 }
          ]
        };
      default:
        return {};
    }
  };

  const getReportTypeName = (type) => {
    const typeNames = {
      sales: 'Laporan Penjualan',
      products: 'Performa Produk',
      customers: 'Laporan Pelanggan',
      financial: 'Laporan Keuangan'
    };
    return typeNames[type] || 'Laporan';
  };

  const downloadPDF = (reportId) => {
    // TODO: Implement actual PDF download
    alert(`Mengunduh laporan ID: ${reportId}`);
  };

  const previewReport = () => {
    if (!reportData) return null;

    return (
      <div className="report-preview">
        <div className="preview-header">
          <h3>{getReportTypeName(reportType)}</h3>
          <p>Periode: {reportData.period}</p>
        </div>
        
        <div className="preview-summary">
          <div className="summary-grid">
            <div className="summary-card">
              <MoneyIcon size={24} />
              <div className="summary-info">
                <h4>Total Pendapatan</h4>
                <p>Rp {reportData.summary.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="summary-card">
              <OrderIcon size={24} />
              <div className="summary-info">
                <h4>Total Pesanan</h4>
                <p>{reportData.summary.totalOrders.toLocaleString()}</p>
              </div>
            </div>
            <div className="summary-card">
              <StatIcon size={24} />
              <div className="summary-info">
                <h4>Rata-rata Pesanan</h4>
                <p>Rp {reportData.summary.avgOrderValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="preview-actions">
          <button onClick={() => downloadPDF(reportData.id)} className="download-btn">
            <PDFIcon size={20} />
            Download PDF
          </button>
          <button onClick={() => setReportData(null)} className="close-preview-btn">
            Tutup Preview
          </button>
        </div>
      </div>
    );
  };

  if (!isLoggedIn() || !isAdmin()) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <div className="admin-header">
          <h1>Generator Laporan PDF</h1>
        </div>

        <div className="pdf-generator-container">
          <div className="generator-card">
            <div className="card-header">
              <PDFIcon size={24} />
              <h3>Buat Laporan Baru</h3>
            </div>

            <div className="generator-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Jenis Laporan</label>
                  <div className="select-wrapper">
                    <FilterIcon size={20} />
                    <select 
                      value={reportType} 
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      <option value="sales">Laporan Penjualan</option>
                      <option value="products">Performa Produk</option>
                      <option value="customers">Laporan Pelanggan</option>
                      <option value="financial">Laporan Keuangan</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tanggal Mulai</label>
                  <div className="date-wrapper">
                    <CalendarIcon size={20} />
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({
                        ...prev,
                        startDate: e.target.value
                      }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tanggal Selesai</label>
                  <div className="date-wrapper">
                    <CalendarIcon size={20} />
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({
                        ...prev,
                        endDate: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={generateReport} 
                disabled={generating}
                className="generate-btn"
              >
                {generating ? (
                  <>
                    <div className="spinner"></div>
                    Membuat Laporan...
                  </>
                ) : (
                  <>
                    <PDFIcon size={20} />
                    Generate Laporan
                  </>
                )}
              </button>
            </div>
          </div>

          {reportData && (
            <div className="preview-card">
              {previewReport()}
            </div>
          )}

          <div className="reports-history-card">
            <div className="card-header">
              <h3>Riwayat Laporan</h3>
              <span className="reports-count">{generatedReports.length} laporan</span>
            </div>

            <div className="reports-list">
              {generatedReports.map(report => (
                <div key={report.id} className="report-item">
                  <div className="report-icon">
                    <PDFIcon size={24} />
                  </div>
                  
                  <div className="report-info">
                    <h4>{report.type}</h4>
                    <p className="report-period">{report.period}</p>
                    <div className="report-meta">
                      <span className="report-date">{report.generatedAt}</span>
                      <span className="report-size">{report.fileSize}</span>
                    </div>
                  </div>
                  
                  <div className="report-status">
                    <CheckIcon size={16} />
                    <span>Selesai</span>
                  </div>
                  
                  <div className="report-actions">
                    <button 
                      onClick={() => downloadPDF(report.id)}
                      className="download-small-btn"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PDFReportGenerator;