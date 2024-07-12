const express = require('express')
const router = express.Router()
const { checkAuthenticated, checkAdmin } = require('../middleware/authMiddleware');
const {  getUser,
         getAllUsers,
         updateUser,
         deleteUser
       } = require('../controllers/userController')

router.use(checkAuthenticated, checkAdmin)

// route to get all users
router.route('/').get( getAllUsers)

// route to a user
router.route('/:id').get(getUser)

//route to update a user credentials
router.route('/:id').patch(updateUser)

// route to delete a user
router.route('/:id').delete(deleteUser)


module.exports = router