// server/scripts/createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

async function createAdminUser() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists');
      mongoose.disconnect();
      return;
    }

    // Create admin user
    const admin = new User({
      username: 'admin',
      email: 'admin@bandungsocial.gov',
      password: 'adminPassword123', // Change this to a secure password
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating admin user:', err);
    mongoose.disconnect();
  }
}

createAdminUser();