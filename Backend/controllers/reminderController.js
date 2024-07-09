const Reminder = require('../models/Reminder');
const asyncHandler = require('express-async-handler');

const createReminder = asyncHandler( async (req, res) => {
  try {
    const { task, remindAt, reminderType } = req.body;
    const newReminder = new Reminder({ task, remindAt, reminderType });
    await newReminder.save();
    res.status(201).json({ message: 'Reminder created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = createReminder;
