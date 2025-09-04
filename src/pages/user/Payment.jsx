import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  const [orderData, setOrderData] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    
    if (!location.state) {
      navigate('/');
      return;
    }
    
    setOrderData(location.state);
  }, [location.state, isLoggedIn, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // TODO: Integrate with Midtrans Snap
      // const response = await axios.post('/api/payment/create', {
      //   product: orderData.product,
      //   item: orderData.item,
      //   gameUsername: orderData.gameUsername,
      //   userId: user.id
      // });
      
      // Mock payment process
      setTimeout(() => {
        alert('Redirecting to Midtrans payment gateway...');
        // In real implementation, this would redirect to Midtrans Snap
        setTransactionStatus('processing');
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Terjadi kesalahan saat memproses pembayaran');
      setLoading(false);
    }
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-page">
      <Navbar />
      
      <main className="main-content">
        <div className="container">
          <div className="payment-card">
            <h2>Pembayaran</h2>
            
            <div className="transaction-status">
              <span className={`status ${transactionStatus}`}>
                Status: {transactionStatus === 'pending' ? 'Menunggu Pembayaran' : 'Sedang Diproses'}
              </span>
            </div>
            
            <div className="transaction-details">
              <h3>Detail Transaksi</h3>
              <div className="detail-row">
                <span>Produk:</span>
                <span>{orderData.product.name}</span>
              </div>
              <div className="detail-row">
                <span>Item:</span>
                <span>{orderData.item.name}</span>
              </div>
              <div className="detail-row">
                <span>Username Game:</span>
                <span>{orderData.gameUsername}</span>
              </div>
              <div className="detail-row">
                <span>Pembeli:</span>
                <span>{user.username}</span>
              </div>
            </div>
            
            <div className="payment-details">
              <h3>Detail Pembayaran</h3>
              <div className="detail-row">
                <span>Harga:</span>
                <span>Rp {orderData.item.price.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span>Biaya Admin:</span>
                <span>Rp 1.000</span>
              </div>
              <div className="detail-row total">
                <span>Total:</span>
                <span>Rp {(orderData.item.price + 1000).toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePayment}
              disabled={loading || transactionStatus !== 'pending'}
              className="pay-button"
            >
              {loading ? 'Processing...' : 'Bayar Sekarang'}
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;