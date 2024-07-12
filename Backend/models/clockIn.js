const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clockingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clockInTime: { type: Date, required: true },
  clockOutTime: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Clocking', clockingSchema);
