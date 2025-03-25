const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // By default, the user is not an admin
  },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
