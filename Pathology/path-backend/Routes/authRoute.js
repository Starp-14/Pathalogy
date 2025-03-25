const express = require('express');
const User = require('../Models/userModel'); // Import the User model
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Set isAdmin to true for the first user only
  const isAdmin = (await User.countDocuments()) === 0; // Check if this is the first user

  // Create new user with plain text password and set isAdmin based on the user count
  const newUser = new User({ email, password, isAdmin });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while registering' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Check if passwords match (using plain text password comparison)
  if (user.password === password) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
