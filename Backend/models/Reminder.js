const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  remindAt: { type: Date, required: true },
  reminderType: { type: String, enum: ['green', 'yellow', 'red', 'black'], required: true },
  sentAt: { type: Date },
  isSent: { type: Boolean, default: false}
},
{ timestamps: true }
);

module.exports = mongoose.model('Reminder', reminderSchema);
