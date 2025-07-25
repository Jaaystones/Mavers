const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkAdmin } = require('../middleware/authMiddleware');
const { createReminder, sendReminder } = require('../controllers/reminderController');


/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Reminder endpoints
 */

/**
 * @swagger
 * /reminders/createReminder:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Reminder created
 */
router.route('/createReminder').post( checkAuthenticated, checkAdmin, createReminder);

/**
 * @swagger
 * /reminders/sendReminder:
 *   post:
 *     summary: Send a reminder notification
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reminder sent
 */
router.route('/sendReminder').post( checkAuthenticated, checkAdmin, sendReminder);

module.exports = router;