const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkAdmin } = require('../middleware/authMiddleware');
const { createReminder, sendReminder } = require('../controllers/reminderController');

// Create a new reminder
router.route('/createReminder').post( checkAuthenticated, checkAdmin, createReminder);

// send a reminder notification
router.route('/sendReminder').post( checkAuthenticated, checkAdmin, sendReminder);

module.exports = router;