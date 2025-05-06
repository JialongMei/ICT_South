const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for Vite development server
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

// Check for MongoDB URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not found in environment variables');
  console.log('Starting server without MongoDB connection...');
} else {
  // Connect to MongoDB
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

  // Routes that require MongoDB
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/admin', require('./routes/admin'));
}

// Basic routes that don't require MongoDB
app.get('/', (req, res) => {
  res.json({ message: 'Bandung Social Reporting API is running' });
});

// Test route for government accounts
app.get('/api/test/government-accounts', (req, res) => {
  res.json([
    { id: 1, username: 'govUser1', email: 'gov1@example.com', department: 'Public Works' },
    { id: 2, username: 'govUser2', email: 'gov2@example.com', department: 'Environmental Services' }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});