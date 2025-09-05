import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  DashboardIcon, 
  ProductIcon, 
  ItemIcon, 
  OrderIcon, 
  ReportIcon, 
  LogoutIcon,
  GameIcon
} from './Icons';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: DashboardIcon },
    { path: '/admin/products', label: 'Produk', icon: ProductIcon },
    { path: '/admin/items', label: 'Item', icon: ItemIcon },
    { path: '/admin/orders', label: 'Order', icon: OrderIcon },
    { path: '/admin/reports', label: 'Report', icon: ReportIcon }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GameIcon size={28} />
          </div>
          <span className="logo-text">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <div className="nav-icon">
                    <IconComponent size={20} />
                  </div>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <div className="nav-icon">
            <LogoutIcon size={20} />
          </div>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;