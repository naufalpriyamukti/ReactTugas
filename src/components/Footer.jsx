import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GameStore</h3>
            <p>Platform top-up game terpercaya dan aman</p>
          </div>
          
          <div className="footer-section">
            <h4>Layanan</h4>
            <ul>
              <li><a href="#mobile-legends">Mobile Legends</a></li>
              <li><a href="#free-fire">Free Fire</a></li>
              <li><a href="#pubg">PUBG Mobile</a></li>
              <li><a href="#genshin">Genshin Impact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Bantuan</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Kontak</a></li>
              <li><a href="#guide">Panduan</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Kontak</h4>
            <p>Email: support@gamestore.com</p>
            <p>WhatsApp: +62 123 456 7890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 GameStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;