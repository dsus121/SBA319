// models/trail.js

const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    trail_num: { type: String, required: false },
    surface: { type: String, required: true },
    oneway: { type: String, required: false },
    type: { type: String, required: true },
    hiking: { type: Boolean, required: true },
    horse: { type: Boolean, required: true },
    bike: { type: Boolean, required: true },
    motorcycle: { type: Boolean, required: true },
    atv: { type: Boolean, required: true },
    dogs: { type: String, required: true }, // "yes", "leashed", or empty
    min_elevat: { type: Number, required: true },
    max_elevat: { type: Number, required: true },
    length_mi_: { type: Number, required: true },
    snowshoe: { type: Boolean, required: true },
    url: { type: String, required: true }
  }, {
    timestamps: true // automatically manage createdAt and updatedAt fields
  });

// create indexes
trailSchema.index({ name: 1 });
trailSchema.index({ trail_num: 1 });
trailSchema.index({ surface: 1 });
trailSchema.index({ oneway: 1 });
trailSchema.index({ type: 1 });
trailSchema.index({ hiking: 1 });
trailSchema.index({ horse: 1 });
trailSchema.index({ bike: 1 });
trailSchema.index({ motorcycle: 1 });
trailSchema.index({ atv: 1 });
trailSchema.index({ dogs: 1 });
trailSchema.index({ min_elevat: 1 });
trailSchema.index({ max_elevat: 1 });
trailSchema.index({ length_mi_: 1 });
trailSchema.index({ snowshoe: 1 });
trailSchema.index({ url: 1 });

const Trail = mongoose.model('Trail', trailSchema, 'trails_testing_data');
module.exports = Trail;
