import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserIcon, LockIcon, EmailIcon, GameIcon } from '../../components/Icons';
import '../../css/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/login', formData);
      
      // Mock login for testing
      const mockUser = {
        id: 1,
        username: formData.usernameOrEmail,
        email: 'user@example.com',
        role: formData.usernameOrEmail === 'admin' ? 'admin' : 'user'
      };
      
      login(mockUser);
      
      if (mockUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <GameIcon size={40} />
          </div>
          <h2>Selamat Datang</h2>
          <p>Masuk ke akun GameStore Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username atau Email</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <UserIcon size={20} />
              </div>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                placeholder="Masukkan username atau email"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <LockIcon size={20} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? (
              <>
                <div className="spinner"></div>
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>atau</span>
        </div>

        <div className="auth-footer">
          <p className="auth-link">
            Belum punya akun? <Link to="/register" className="link-primary">Daftar sekarang</Link>
          </p>
          <Link to="#" className="forgot-link">Lupa password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;