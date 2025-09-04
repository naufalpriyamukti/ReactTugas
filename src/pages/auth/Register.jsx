import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserIcon, LockIcon, EmailIcon, GameIcon, SettingsIcon } from '../../components/Icons';
import '../../css/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
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
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/register', formData);
      
      // Mock registration for testing
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        role: formData.role
      };
      
      login(newUser);
      
      if (newUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-logo">
            <GameIcon size={40} />
          </div>
          <h2>Buat Akun Baru</h2>
          <p>Bergabung dengan GameStore sekarang</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <UserIcon size={20} />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Pilih username unik"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <EmailIcon size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="form-row">
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
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <LockIcon size={20} />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Tipe Akun</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <SettingsIcon size={20} />
              </div>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User - Pembeli</option>
                <option value="admin">Admin - Pengelola</option>
              </select>
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
              'Daftar Sekarang'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>atau</span>
        </div>

        <div className="auth-footer">
          <p className="auth-link">
            Sudah punya akun? <Link to="/login" className="link-primary">Masuk sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;