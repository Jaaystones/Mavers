const fs = require('fs');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/imageCloudConfig')
const Task = require('../models/Task');
const { fileSizeFormatter }   = require('../utils/imageUploads');


// Create a new task
const createTask = asyncHandler(async (req, res) => {
  try {
    
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let image_Data = {};

    if (req.file) {
      
      try {
        // Upload file to Cloudinary
          uploadFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Mavers",
          resource_type: "image",
        });

        image_Data = {
          fileName: req.file.originalname,
          filePath: uploadFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2),
        };

        console.log("File data:", image_Data);
        console.log("Local file path:", req.file.path);

        // Optionally delete the file from the local filesystem
        fs.unlinkSync(req.file.path);

      } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        return res.status(500).json({ message: "Image could not be uploaded" });
      }
    } else {
      console.log("No file found in the request.");
    }

    const task = await Task.create({ title, description, assignedTo, dueDate, image: image_Data, });

    if (task) {
      return res.status(201).json({ message: 'New task created', task });
    } else {
      return res.status(400).json({ message: 'Invalid task data' });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
  console.log('Getting all tasks for user:', req.user);
  let tasks;
  if (req.user.role === 'admin') {
    tasks = await Task.find().populate('assignedTo').exec();
  } else {
    tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo').exec();
  }
  console.log('Tasks:', tasks);
  res.status(200).json(tasks);
});

// Get a specific task by ID
const getTaskById = asyncHandler(async (req, res) => {
  console.log('Getting task by ID for user:', req.user);
  const taskId = req.params.id;
  const task = await Task.findById(taskId).populate({ path: 'assignedTo', select: '-password' }).exec();

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if the user is authorized to access the task
  if (req.user.role !== 'admin' && task.assignedTo._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Access forbidden: You can only view your assigned tasks' });
  }

  res.status(200).json(task);
});

// Assess a task
const assessTask = asyncHandler(async (req, res) => {
  const { taskId, comments } = req.body;
  const assessedBy = req.user._id;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.assessment = {
    assessedBy,
    comments,
    date: new Date()
  };

  task.status = 'completed';  // Update task status to 'completed'

  await task.save();

  res.status(200).json({ message: 'Task assessed', task });
});

// Update a task
const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const { title, description, assignedTo, dueDate, image } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if the user is authorized to update the task
  if (req.user.role !== 'admin' && task.assignedTo._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Access forbidden: You can only update your assigned tasks' });
  }

  // Conditionally update fields if they are provided
  if (title) task.title = title;
  if (description) task.description = description;
  if (assignedTo) task.assignedTo = assignedTo;
  if (dueDate) task.dueDate = dueDate;
  if (image) task.image = image;

  const updatedTask = await task.save();

  res.status(200).json({ message: 'Task updated', updatedTask });
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Check if the user is authorized to delete the task
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Only admins can delete tasks' });
  }

  await Task.deleteOne({ _id: taskId });

  res.status(200).json({ message: `Task assigned to ${taskId} deleted` });
});


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  assessTask,
  updateTask,
  deleteTask,
};
