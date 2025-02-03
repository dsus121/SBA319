const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trail_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail', required: true },
    planned_date: { type: Date, required: false },
    checklist: [String],
    notes: { type: String },
    favorite: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema, 'todos');
module.exports = Todo;
