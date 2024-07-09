const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

const createTask = asyncHandler (async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;
    const newTask = new Task({ title, description, assignedTo, deadline });
    await newTask.save();
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const clockIn = asyncHandler( async (req, res) => {
  try {
    const clockingTask = new Task({
      title: 'Daily Clock-In',
      description: 'Daily staff clock-in',
      assignedTo: req.user._id,
      deadline: new Date(),
      completed: true
    });
    await clockingTask.save();
    res.status(201).json({ message: 'Clocked in' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { createTask, clockIn };