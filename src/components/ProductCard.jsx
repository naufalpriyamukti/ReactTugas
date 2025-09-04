import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.popular && <span className="popular-badge">Popular</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <span className="product-category">{product.category}</span>
        
        <Link to={`/product/${product.id}`} className="buy-button">
          Beli Sekarang
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;