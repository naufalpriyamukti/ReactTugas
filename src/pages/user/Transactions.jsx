import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Transactions = () => {
  const { user, isLoggedIn } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }
    
    // TODO: Replace with actual API call
    // fetchUserTransactions(user.id);
    
    // Mock transaction data
    const mockTransactions = [
      {
        id: 1,
        product: 'Mobile Legends',
        item: '86 Diamond',
        gameUsername: 'player123',
        amount: 21000,
        status: 'completed',
        date: '2024-01-15',
        orderId: 'ML001'
      },
      {
        id: 2,
        product: 'Free Fire',
        item: '100 Diamond',
        gameUsername: 'ffplayer456',
        amount: 15000,
        status: 'pending',
        date: '2024-01-14',
        orderId: 'FF002'
      },
      {
        id: 3,
        product: 'PUBG Mobile',
        item: '60 UC',
        gameUsername: 'pubgpro789',
        amount: 12000,
        status: 'failed',
        date: '2024-01-13',
        orderId: 'PB003'
      }
    ];
    
    setTransactions(mockTransactions);
    setLoading(false);
  }, [user, isLoggedIn]);

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { text: 'Selesai', class: 'success' },
      pending: { text: 'Pending', class: 'warning' },
      processing: { text: 'Diproses', class: 'info' },
      failed: { text: 'Gagal', class: 'danger' }
    };
    
    const statusInfo = statusMap[status] || { text: status, class: 'default' };
    
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
  };

  if (!isLoggedIn()) {
    return (
      <div className="transactions-page">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <p>Silakan login untuk melihat riwayat transaksi</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="transactions-page">
      <Navbar />
      
      <main className="main-content">
        <div className="container">
          <h2>Riwayat Transaksi</h2>
          
          {loading ? (
            <div className="loading">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="no-transactions">
              <p>Belum ada transaksi</p>
            </div>
          ) : (
            <div className="transactions-list">
              {transactions.map(transaction => (
                <div key={transaction.id} className="transaction-card">
                  <div className="transaction-header">
                    <div className="transaction-id">#{transaction.orderId}</div>
                    <div className="transaction-date">{transaction.date}</div>
                  </div>
                  
                  <div className="transaction-details">
                    <div className="detail-row">
                      <span>Produk:</span>
                      <span>{transaction.product}</span>
                    </div>
                    <div className="detail-row">
                      <span>Item:</span>
                      <span>{transaction.item}</span>
                    </div>
                    <div className="detail-row">
                      <span>Username Game:</span>
                      <span>{transaction.gameUsername}</span>
                    </div>
                    <div className="detail-row">
                      <span>Total:</span>
                      <span>Rp {transaction.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="transaction-footer">
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Transactions;