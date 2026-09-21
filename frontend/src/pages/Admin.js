import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import api from '../api'; // Add this at the top

const Admin = () => {
  const [form, setForm] = useState({
    productName: '',
    pNo: '',
    crossReference: '',
    category: '',
    description: '',
    type: '',
    image: null
  });
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      // Then change the line to:
      const res = await api.get('/products');
      // const res = await axios.get('http://localhost:5000/api/products');
      console.log('✅ Products fetched:', res.data);
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', form.productName);
    formData.append('pNo', form.pNo);
    formData.append('crossReference', form.crossReference);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('type', form.type);
    if (form.image) formData.append('image', form.image);

    try {
      // await axios.post('http://localhost:5000/api/products', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      // Change to:
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully');
      setForm({ productName: '', pNo: '', crossReference: '', category: '', description: '', type: '', image: null });
      fetchProducts();
    } catch (err) {
      alert('Error: ' + err.response?.data?.error || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // await axios.delete(`http://localhost:5000/api/products/${id}`);
                  // Change to:
          await api.delete(`/products/${id}`);
        alert('Product deleted');
        fetchProducts();
      } catch (err) {
        alert('Error: ' + err.response?.data?.error || err.message);
      }
    }
  };

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // --- Admin Panel ---
  return (
    <div className="admin-container">
      <h2>Add New Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          required
        />
        <input
          name="pNo"
          placeholder="P No"
          value={form.pNo}
          onChange={handleChange}
          required
        />
        <input
          name="crossReference"
          placeholder="Cross Reference (comma separated)"
          value={form.crossReference}
          onChange={handleChange}
        />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Air Filter">Air Filter</option>
          <option value="Diesel Filter">Diesel Filter</option>
          <option value="Fuel Filter">Fuel Filter</option>
          <option value="Oil Filter">Oil Filter</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <input
          name="type"
          placeholder="Type (e.g., Safety)"
          value={form.type}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>

      <hr className="admin-divider" />

      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>P No</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.pNo}</td>
                  <td>{p.productName}</td>
                  <td>{p.category}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;