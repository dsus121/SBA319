// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  preferences: {
    favorite_locations: [String]
  }
});

const User = mongoose.model('user', userSchema);
module.exports = user;
