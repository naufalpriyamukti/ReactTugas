import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminReports = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    dailySales: [],
    monthlySales: [],
    topProducts: [],
    totalRevenue: 0
  });
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });


  const handlePrintPDF = () => {
    // TODO: Implement PDF generation
    // This would typically use a library like jsPDF or react-pdf
    alert('Fitur cetak PDF akan diimplementasikan');
  };

  const handleDateFilterChange = (e) => {
    setDateFilter({
      ...dateFilter,
      [e.target.name]: e.target.value
    });
  };

  const applyDateFilter = () => {
    // TODO: Implement date filtering
    console.log('Applying date filter:', dateFilter);
  };

  if (!isLoggedIn() || !isAdmin()) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <div className="admin-header">
          <h1>Laporan Keuangan</h1>
          <button onClick={handlePrintPDF} className="print-button">
            📄 Cetak PDF
          </button>
        </div>
        
        <div className="report-filters">
          <div className="date-filter">
            <label>Dari Tanggal:</label>
            <input
              type="date"
              name="startDate"
              value={dateFilter.startDate}
              onChange={handleDateFilterChange}
            />
          </div>
          <div className="date-filter">
            <label>Sampai Tanggal:</label>
            <input
              type="date"
              name="endDate"
              value={dateFilter.endDate}
              onChange={handleDateFilterChange}
            />
          </div>
          <button onClick={applyDateFilter} className="filter-button">
            Terapkan Filter
          </button>
        </div>
        
        <div className="report-summary">
          <div className="summary-card">
            <h3>Total Pendapatan</h3>
            <p className="summary-value">Rp {reportData.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="summary-card">
            <h3>Total Pesanan</h3>
            <p className="summary-value">{reportData.dailySales.reduce((sum, day) => sum + day.orders, 0)}</p>
          </div>
          <div className="summary-card">
            <h3>Rata-rata per Hari</h3>
            <p className="summary-value">Rp {Math.round(reportData.totalRevenue / 30).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="report-tables">
          <div className="report-section">
            <h3>Penjualan Harian</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Pendapatan</th>
                  <th>Jumlah Pesanan</th>
                </tr>
              </thead>
              <tbody>
                {reportData.dailySales.map((day, index) => (
                  <tr key={index}>
                    <td>{day.date}</td>
                    <td>Rp {day.revenue.toLocaleString()}</td>
                    <td>{day.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="report-section">
            <h3>Produk Terlaris</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Terjual</th>
                  <th>Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {reportData.topProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.sales}</td>
                    <td>Rp {product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReports;