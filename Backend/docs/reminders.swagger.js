/**
 * @swagger
 * components:
 *   schemas:
 *     Reminder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         recipientEmail:
 *           type: string
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, sent, failed]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateReminderRequest:
 *       type: object
 *       required:
 *         - title
 *         - message
 *         - recipientEmail
 *         - scheduledDate
 *       properties:
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         recipientEmail:
 *           type: string
 *           format: email
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *     SendReminderRequest:
 *       type: object
 *       required:
 *         - reminderId
 *       properties:
 *         reminderId:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Reminder management endpoints (Admin only)
 */

/**
 * @swagger
 * /reminders/createReminder:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReminderRequest'
 *     responses:
 *       201:
 *         description: Reminder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */

/**
 * @swagger
 * /reminders/sendReminder:
 *   post:
 *     summary: Send a reminder notification
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendReminderRequest'
 *     responses:
 *       200:
 *         description: Reminder sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reminder:
 *                   $ref: '#/components/schemas/Reminder'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reminder not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
