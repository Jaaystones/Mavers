const express = require('express');
const router = express.Router();
const { registerUser, login, refresh, logout } = require('../controllers/authController');
const { checkAuthenticated, checkAdmin } = require('../middleware/authMiddleware');
const loginLimiter = require('../middleware/loginLimiter');

// Register new user (admin only)
router.route('/register').post( checkAuthenticated, checkAdmin, registerUser);

// Login user
router.route('/login').post(loginLimiter,  login);

// Logout user
router.route('/logout').post(logout);

//refresh
router.route('/refresh').get(refresh)

module.exports = router;
