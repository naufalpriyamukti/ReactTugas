import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="logo-text">GameStore</span>
          </Link>
        </div>

        <div className="nav-center">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Cari produk game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
        </div>

        <div className="nav-right">
          {isLoggedIn() ? (
            <div className="profile-dropdown">
              <button
                className="profile-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                👤 {user.username}
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    Edit Profile
                  </Link>
                  <Link to="/transactions" onClick={() => setShowDropdown(false)}>
                    Riwayat Transaksi
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowDropdown(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/register" className="nav-button primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;