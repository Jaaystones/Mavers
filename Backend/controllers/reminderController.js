const asyncHandler = require('express-async-handler');
const Reminder = require('../models/Reminder');
const Task = require('../models/Task');
const admin = require('../config/firebaseAdmin'); // Firebase Admin SDK initialized

// Create a new reminder
const createReminder = asyncHandler(async (req, res) => {
  const { taskId, remindAt, reminderType } = req.body;

  if (!taskId || !remindAt || !reminderType) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const reminder = await Reminder.create({ task: taskId, remindAt, reminderType });
  
  if (reminder) {
    res.status(201).json({ message: 'Reminder created', reminder });
  } else {
    res.status(400).json({ message: 'Invalid reminder data' });
  }
});

// Send a reminder
const sendReminder = asyncHandler(async (req, res) => {
  const { reminderId, token } = req.body;

  const reminder = await Reminder.findById(reminderId).populate('task');
  if (!reminder) {
    return res.status(404).json({ message: 'Reminder not found' });
  }

  if (reminder.isSent) {
    return res.status(400).json({ message: 'Reminder already sent' });
  }

  const payload = {
    notification: {
      title: `Reminder for Task: ${reminder.task.title}`,
      body: `This is a ${reminder.reminderType} reminder for your task.`,
    },
  };

  try {
    const response = await admin.messaging().sendToDevice(token, payload);
    reminder.isSent = true;
    reminder.sentAt = new Date();
    await reminder.save();
    res.status(200).json({ message: 'Reminder sent successfully', response });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reminder', error });
  }
});

module.exports = {
  createReminder,
  sendReminder,
};
