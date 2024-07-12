const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  assessment: {
    assessedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: { type: String },
    date: { type: Date }
  },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

