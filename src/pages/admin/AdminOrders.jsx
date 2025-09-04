import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminOrders = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/');
      return;
    }
    
    // TODO: Replace with actual API call
    // fetchOrders();
    
    // Mock orders data
    const mockOrders = [
      {
        id: 1,
        orderId: 'ML001',
        username: 'user123',
        product: 'Mobile Legends',
        item: '86 Diamond',
        gameUsername: 'player123',
        amount: 21000,
        status: 'pending',
        date: '2024-01-15',
        email: 'user@example.com'
      },
      {
        id: 2,
        orderId: 'FF002',
        username: 'user456',
        product: 'Free Fire',
        item: '100 Diamond',
        gameUsername: 'ffplayer456',
        amount: 15000,
        status: 'completed',
        date: '2024-01-14',
        email: 'user2@example.com'
      },
      {
        id: 3,
        orderId: 'PB003',
        username: 'user789',
        product: 'PUBG Mobile',
        item: '60 UC',
        gameUsername: 'pubgpro789',
        amount: 12000,
        status: 'processing',
        date: '2024-01-13',
        email: 'user3@example.com'
      }
    ];
    
    setOrders(mockOrders);
  }, [isLoggedIn, isAdmin, navigate]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    // TODO: API call to update order status
    // updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      processing: '#3498db',
      completed: '#27ae60',
      failed: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  if (!isLoggedIn() || !isAdmin()) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <div className="admin-header">
          <h1>Kelola Pesanan</h1>
          <div className="filter-controls">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="status-filter"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Produk</th>
                <th>Item</th>
                <th>Username Game</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.orderId}</td>
                  <td>{order.username}</td>
                  <td>{order.email}</td>
                  <td>{order.product}</td>
                  <td>{order.item}</td>
                  <td>{order.gameUsername}</td>
                  <td>Rp {order.amount.toLocaleString()}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;