const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  // Add more fields as needed, e.g., assessment details
}, 
{ timestamps: true}
);

module.exports = mongoose.model('Task', taskSchema);
