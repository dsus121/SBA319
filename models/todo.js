// models/todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trail_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
  planned_date: { type: Date, required: true },
  checklist: [String],
  notes: { type: String }
});

const Todo = mongoose.model('todo', todoSchema);
module.exports = todo;
