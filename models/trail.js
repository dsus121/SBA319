// models/trail.js
const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  length: { type: Number, required: true },
  description: { type: String, required: true }
});

const Trail = mongoose.model('trail', trailSchema);
module.exports = trail;
