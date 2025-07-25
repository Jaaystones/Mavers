const express = require('express');
const router = express.Router();
const { registerUser, login, refresh, logout } = require('../controllers/authController');
const { checkAuthenticated, checkAdmin } = require('../middleware/authMiddleware');
const loginLimiter = require('../middleware/loginLimiter');


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User registered
 */
router.route('/register').post( checkAuthenticated, checkAdmin, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in
 */
router.route('/login').post(loginLimiter,  login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out
 */
router.route('/logout').post(logout);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh authentication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.route('/refresh').get(refresh)

module.exports = router;
