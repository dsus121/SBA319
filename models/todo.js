const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    trail_id: { type: mongoose.Schema.Types.ObjectId, ref: 'trail', required: true },
    planned_date: { type: Date, required: false },
    checklist: [String],
    notes: { type: String },
    favorite: { type: Boolean, default: false }
});

const todo = mongoose.model('todo', todoSchema);
module.exports = todo;
