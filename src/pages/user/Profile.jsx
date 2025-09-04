import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Profile = () => {
  const { user, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // TODO: Replace with actual API call
      // await axios.put('/api/user/profile', {
      //   username: formData.username,
      //   email: formData.email
      // });
      
      // Mock update
      setTimeout(() => {
        setMessage('Profil berhasil diperbarui');
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setMessage('Gagal memperbarui profil');
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Konfirmasi password tidak cocok');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      // TODO: Replace with actual API call
      // await axios.put('/api/user/password', {
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword
      // });
      
      // Mock password change
      setTimeout(() => {
        setMessage('Password berhasil diubah');
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setMessage('Gagal mengubah password');
      setLoading(false);
    }
  };

  if (!isLoggedIn()) {
    return (
      <div className="profile-page">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <p>Silakan login untuk mengakses profil</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      
      <main className="main-content">
        <div className="container">
          <h2>Edit Profil</h2>
          
          {message && (
            <div className={`message ${message.includes('berhasil') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <div className="profile-forms">
            <div className="form-section">
              <h3>Informasi Profil</h3>
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="submit" disabled={loading} className="update-button">
                  {loading ? 'Updating...' : 'Update Profil'}
                </button>
              </form>
            </div>
            
            <div className="form-section">
              <h3>Ubah Password</h3>
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Password Lama</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">Password Baru</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="submit" disabled={loading} className="update-button">
                  {loading ? 'Updating...' : 'Ubah Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;