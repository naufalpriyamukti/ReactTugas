import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminProducts = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/');
      return;
    }
    
    // TODO: Replace with actual API call
    // fetchProducts();
    
    // Mock products data
    const mockProducts = [
      { id: 1, name: 'Mobile Legends', description: 'MOBA Game', category: 'Game', image: '/images/ml.jpg' },
      { id: 2, name: 'Free Fire', description: 'Battle Royale', category: 'Game', image: '/images/ff.jpg' },
      { id: 3, name: 'PUBG Mobile', description: 'Battle Royale', category: 'Game', image: '/images/pubg.jpg' },
      { id: 4, name: 'Genshin Impact', description: 'RPG Game', category: 'Game', image: '/images/genshin.jpg' }
    ];
    
    setProducts(mockProducts);
  }, [isLoggedIn, isAdmin, navigate]);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', category: '', image: '' });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      // TODO: API call to delete product
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...formData } : p
      ));
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...formData
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isLoggedIn() || !isAdmin()) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <div className="admin-header">
          <h1>Kelola Produk</h1>
          <button onClick={handleAdd} className="add-button">
            Tambah Produk
          </button>
        </div>
        
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Kategori</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>
                    <img src={product.image} alt={product.name} className="table-image" />
                  </td>
                  <td>
                    <button 
                      onClick={() => handleEdit(product)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nama Produk</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Kategori</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>URL Gambar</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="submit" className="save-button">
                    {editingProduct ? 'Update' : 'Tambah'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="cancel-button"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;