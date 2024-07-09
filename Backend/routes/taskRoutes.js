const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { checkAuthenticated } = require('../middleware/authMiddleware');

// Create a new task
router.post('/', checkAuthenticated, taskController.createTask);

// Daily staff clocking
router.post('/clock', checkAuthenticated, taskController.clockIn);

module.exports = router;
