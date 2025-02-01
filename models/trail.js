const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    surface: { type: String, required: true },
    type: { type: String, required: true },
    hiking: { type: Boolean, required: true },
    horse: { type: Boolean, required: true },
    bike: { type: Boolean, required: true },
    motorcycle: { type: Boolean, required: true },
    atv: { type: Boolean, required: true },
    ohv_gt_50: { type: Boolean, required: true },
    highway_ve: { type: Boolean, required: true },
    dogs: { type: Boolean, required: true },
    min_elevat: { type: Number, required: true },
    max_elevat: { type: Number, required: true },
    length_mi: { type: Number, required: true },
    manager: { type: String, required: true }
}, {
    timestamps: { createdAt: 'INPUT_DATE', updatedAt: 'EDIT_DATE' }
});

// indexes for relevant fields
trailSchema.index({ name: 1 });
trailSchema.index({ surface: 1 });
trailSchema.index({ type: 1 });
trailSchema.index({ hiking: 1 });
trailSchema.index({ horse: 1 });
trailSchema.index({ bike: 1 });
trailSchema.index({ motorcycle: 1 });
trailSchema.index({ atv: 1 });
trailSchema.index({ ohv_gt_50: 1 });
trailSchema.index({ highway_ve: 1 });
trailSchema.index({ dogs: 1 });
trailSchema.index({ min_elevat: 1 });
trailSchema.index({ max_elevat: 1 });
trailSchema.index({ length_mi: 1 });

const trail = mongoose.model('trail', trailSchema);
module.exports = trail;
