const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trail_id: { type: Schema.Types.ObjectId, ref: 'Trail', required: true },
  planned_date: { type: Date, default: Date.now },
  checklist: { type: [String], default: [] },
  notes: { type: String, default: '' },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
