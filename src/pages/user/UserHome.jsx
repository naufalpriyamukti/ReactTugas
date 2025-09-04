import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import Carousel from '../../components/Carousel';
import '../../css/user.css';

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchProducts();
    
    // Mock data for testing
    const mockProducts = [
      {
        id: 1,
        name: 'Mobile Legends',
        description: 'Top-up Diamond Mobile Legends Bang Bang',
        image: '/images/mobile-legends.jpg',
        category: 'MOBA',
        popular: true
      },
      {
        id: 2,
        name: 'Free Fire',
        description: 'Top-up Diamond Free Fire',
        image: '/images/free-fire.jpg',
        category: 'Battle Royale',
        popular: true
      },
      {
        id: 3,
        name: 'PUBG Mobile',
        description: 'Top-up UC PUBG Mobile',
        image: '/images/pubg.jpg',
        category: 'Battle Royale',
        popular: false
      },
      {
        id: 4,
        name: 'Genshin Impact',
        description: 'Top-up Genesis Crystal Genshin Impact',
        image: '/images/genshin.jpg',
        category: 'RPG',
        popular: true
      }
    ];
    
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  return (
    <div className="user-home">
      <Navbar />
      
      <main className="main-content">
        <Carousel />
        
        <section className="products-section">
          <div className="container">
            <h2>Produk Populer</h2>
            <div className="products-grid">
              {loading ? (
                <div className="loading">Loading products...</div>
              ) : (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserHome;