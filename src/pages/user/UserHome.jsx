import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import Carousel from '../../components/Carousel';
import '../../css/user.css';

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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