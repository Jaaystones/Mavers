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

// Route for creating a task (only admin can create tasks)
router.route('/').post(checkAuthenticated, checkAdmin, upload.single("image"), createTask);

// Route for getting all tasks
router.route('/').get(checkAuthenticated, checkAdmin, getAllTasks);

// Route for getting single task
router.route('/:id').get(checkAuthenticated,  getTaskById);

// Route for assessing a task (only admin can assess tasks)
router.route('/assess').post(checkAuthenticated, checkAdmin, assessTask);

// Route for updating a task
router.route('/:id').patch(checkAuthenticated, checkAdmin, upload.single("image"), updateTask);

// Route for deleting a task (only admin can delete tasks)
router.route('/:id').delete(checkAuthenticated, checkAdmin, deleteTask);



module.exports = router;