import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminItems = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    productId: '',
    bonus: ''
  });

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      navigate('/');
      return;
    }
    
    // TODO: Replace with actual API calls
    // fetchItems();
    // fetchProducts();
    
    // Mock data
    const mockProducts = [
      { id: 1, name: 'Mobile Legends' },
      { id: 2, name: 'Free Fire' },
      { id: 3, name: 'PUBG Mobile' },
      { id: 4, name: 'Genshin Impact' }
    ];
    
    const mockItems = [
      { id: 1, name: '86 Diamond', price: 20000, productId: 1, productName: 'Mobile Legends', bonus: '0 Bonus' },
      { id: 2, name: '172 Diamond', price: 40000, productId: 1, productName: 'Mobile Legends', bonus: '0 Bonus' },
      { id: 3, name: '100 Diamond', price: 15000, productId: 2, productName: 'Free Fire', bonus: '10 Bonus' },
      { id: 4, name: '60 UC', price: 12000, productId: 3, productName: 'PUBG Mobile', bonus: '5 Bonus' }
    ];
    
    setProducts(mockProducts);
    setItems(mockItems);
  }, [isLoggedIn, isAdmin, navigate]);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', productId: '', bonus: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      productId: item.productId,
      bonus: item.bonus
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus item ini?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productName = products.find(p => p.id === parseInt(formData.productId))?.name || '';
    
    if (editingItem) {
      setItems(items.map(i => 
        i.id === editingItem.id ? { 
          ...i, 
          ...formData, 
          price: parseInt(formData.price),
          productId: parseInt(formData.productId),
          productName 
        } : i
      ));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        price: parseInt(formData.price),
        productId: parseInt(formData.productId),
        productName
      };
      setItems([...items, newItem]);
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
          <h1>Kelola Item</h1>
          <button onClick={handleAdd} className="add-button">
            Tambah Item
          </button>
        </div>
        
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Item</th>
                <th>Produk</th>
                <th>Harga</th>
                <th>Bonus</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.productName}</td>
                  <td>Rp {item.price.toLocaleString()}</td>
                  <td>{item.bonus}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(item)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
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
              <h3>{editingItem ? 'Edit Item' : 'Tambah Item'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nama Item</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Produk</label>
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Produk</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Harga</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Bonus</label>
                  <input
                    type="text"
                    name="bonus"
                    value={formData.bonus}
                    onChange={handleChange}
                    placeholder="e.g. 10 Bonus"
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="submit" className="save-button">
                    {editingItem ? 'Update' : 'Tambah'}
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

export default AdminItems;