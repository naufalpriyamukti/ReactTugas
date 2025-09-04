import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gameUsername, setGameUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchProduct(id);
    // fetchProductItems(id);
    
    // Mock data
    const mockProduct = {
      id: parseInt(id),
      name: 'Mobile Legends',
      description: 'Top-up Diamond Mobile Legends Bang Bang',
      image: '/images/mobile-legends.jpg',
      category: 'MOBA'
    };
    
    const mockItems = [
      { id: 1, name: '86 Diamond', price: 20000, bonus: '0 Bonus' },
      { id: 2, name: '172 Diamond', price: 40000, bonus: '0 Bonus' },
      { id: 3, name: '257 Diamond', price: 60000, bonus: '1 Bonus' },
      { id: 4, name: '344 Diamond', price: 80000, bonus: '2 Bonus' },
      { id: 5, name: '429 Diamond', price: 100000, bonus: '3 Bonus' },
      { id: 6, name: '514 Diamond', price: 120000, bonus: '4 Bonus' }
    ];
    
    setProduct(mockProduct);
    setItems(mockItems);
    setLoading(false);
  }, [id]);

  const handleCheckout = () => {
    if (!isLoggedIn()) {
      alert('Silakan login terlebih dahulu untuk melakukan checkout');
      navigate('/login');
      return;
    }
    
    if (!selectedItem) {
      alert('Pilih item terlebih dahulu');
      return;
    }
    
    if (!gameUsername.trim()) {
      alert('Masukkan username game Anda');
      return;
    }
    
    // Navigate to payment page with order data
    navigate('/payment', { 
      state: { 
        product, 
        item: selectedItem, 
        gameUsername 
      } 
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <Navbar />
      
      <main className="main-content">
        <div className="container">
          <div className="product-header">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <span className="category-badge">{product.category}</span>
            </div>
          </div>

          <div className="order-form">
            <div className="form-section">
              <h3>Masukkan Username Game</h3>
              <input
                type="text"
                placeholder="Masukkan ID/Username game Anda"
                value={gameUsername}
                onChange={(e) => setGameUsername(e.target.value)}
                className="game-username-input"
              />
            </div>

            <div className="form-section">
              <h3>Pilih Item</h3>
              <div className="items-grid">
                {items.map(item => (
                  <div 
                    key={item.id}
                    className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="item-name">{item.name}</div>
                    <div className="item-bonus">{item.bonus}</div>
                    <div className="item-price">Rp {item.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="checkout-section">
              <button 
                onClick={handleCheckout}
                className="checkout-button"
                disabled={!selectedItem || !gameUsername.trim()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;