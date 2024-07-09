const express = require('express');
const router = express.Router();
const createReminder = require('../controllers/reminderController');
const { checkAuthenticated } = require('../middleware/authMiddleware');

// Create a new reminder
router.post('/', checkAuthenticated, createReminder);

module.exports = router;
