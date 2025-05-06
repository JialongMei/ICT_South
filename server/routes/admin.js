// server/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Middleware to check if user is admin
router.use(auth, adminAuth);

// Create government account (admin only)
router.post('/create-government-account', async (req, res) => {
  try {
    const { username, email, password, department } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new government user
    user = new User({
      username,
      email,
      password,
      role: 'government',
      department
    });

    await user.save();

    res.json({
      message: 'Government account created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all government accounts
router.get('/government-accounts', async (req, res) => {
  try {
    const accounts = await User.find({ role: 'government' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update government account
router.put('/government-accounts/:id', async (req, res) => {
  try {
    const { username, email, department } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, department },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete government account
router.delete('/government-accounts/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Government account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;