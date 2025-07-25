const express = require('express');
const router = express.Router();
const { upload } = require('../utils/imageUploads');
const { createTask,
        getAllTasks,
        getTaskById,
        assessTask, 
        updateTask,
        deleteTask
 } = require('../controllers/taskController');
const { checkAuthenticated, checkAdmin } = require('../middleware/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task (admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created
 */
router.route('/').post(checkAuthenticated, checkAdmin, upload.single("image"), createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.route('/').get(checkAuthenticated, checkAdmin, getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task data
 */
router.route('/:id').get(checkAuthenticated,  getTaskById);

/**
 * @swagger
 * /tasks/assess:
 *   post:
 *     summary: Assess a task (admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task assessed
 */
router.route('/assess').post(checkAuthenticated, checkAdmin, assessTask);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.route('/:id').patch(checkAuthenticated, checkAdmin, upload.single("image"), updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by ID (admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.route('/:id').delete(checkAuthenticated, checkAdmin, deleteTask);



module.exports = router;