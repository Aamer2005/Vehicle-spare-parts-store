require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Make sure this file exists
const dns = require('dns');

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(cors({
  origin: '*', // For development/testing – allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// MongoDB connection – using only ONE connection attempt
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/partsdb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB fails (optional)
  });

// ------------------- ROUTES -------------------

// GET all products (with search & category filter)
app.get('/api/products', async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive
      filter.$or = [
        { productName: regex },
        { pNo: regex },
        { crossReference: { $in: [regex] } }
      ];
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const upload = require('./middleware/upload');
app.use('/uploads', express.static('uploads'));

// POST create product (admin)
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { productName, pNo, crossReference, category, description, type } = req.body;
    //const image = req.file ? req.file.path : ''; // Cloudinary returns `path`; for local, use `req.file.filename`
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const newProduct = new Product({
      productName,
      pNo,
      crossReference: crossReference ? crossReference.split(',').map(s => s.trim()) : [],
      category,
      description,
      type,
      image // store the URL or filename
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update product (admin)
app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product (admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));