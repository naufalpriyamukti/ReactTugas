import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  SearchIcon, 
  UserIcon, 
  LogoutIcon, 
  SettingsIcon, 
  HistoryIcon, 
  DashboardIcon,
  GameIcon,
  ChevronDownIcon
} from './Icons';

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
            <div className="logo-icon">
              <GameIcon size={32} className="logo-svg" />
            </div>
            <span className="logo-text">GameStore</span>
          </Link>
        </div>

        <div className="nav-center">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <SearchIcon size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Cari produk game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              Cari
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
                <div className="profile-avatar">
                  <UserIcon size={20} />
                </div>
                <span className="profile-name">{user.username}</span>
                <ChevronDownIcon size={16} className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <UserIcon size={24} className="user-avatar" />
                      <div className="user-details">
                        <span className="user-name">{user.username}</span>
                        <span className="user-role">{user.role}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dropdown-items">
                    <Link to="/profile" onClick={() => setShowDropdown(false)} className="dropdown-item">
                      <SettingsIcon size={18} />
                      <span>Edit Profile</span>
                    </Link>
                    <Link to="/transactions" onClick={() => setShowDropdown(false)} className="dropdown-item">
                      <HistoryIcon size={18} />
                      <span>Riwayat Transaksi</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setShowDropdown(false)} className="dropdown-item">
                        <DashboardIcon size={18} />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                  </div>
                  
                  <div className="dropdown-footer">
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <LogoutIcon size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-button login-btn">
                <UserIcon size={18} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="nav-button register-btn">
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;