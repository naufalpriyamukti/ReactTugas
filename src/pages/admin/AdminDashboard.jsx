import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import '../../css/admin.css';

const AdminDashboard = () => {
  const { user, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/');
      return;
    }
    
    // TODO: Replace with actual API call
    // fetchDashboardStats();
    
    // Mock stats data
    const mockStats = {
      totalProducts: 12,
      totalOrders: 156,
      totalRevenue: 15600000,
      pendingOrders: 8
    };
    
    setStats(mockStats);
  }, [isLoggedIn, isAdmin, navigate]);

  if (!isLoggedIn() || !isAdmin()) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <div className="admin-user">
            Selamat datang, {user.username}
          </div>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{stats.totalProducts}</h3>
              <p>Total Produk</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{stats.totalOrders}</h3>
              <p>Total Pesanan</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Rp {stats.totalRevenue.toLocaleString()}</h3>
              <p>Total Pendapatan</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pendingOrders}</h3>
              <p>Pesanan Pending</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-charts">
          <div className="chart-card">
            <h3>Grafik Penjualan Mingguan</h3>
            <div className="chart-placeholder">
              [Chart will be implemented here]
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Produk Terpopuler</h3>
            <div className="chart-placeholder">
              [Popular products chart will be implemented here]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;