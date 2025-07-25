const express =  require("express")
const router = express.Router()
const { changePassword, forgotPassword, resetPassword } = require("../controllers/passwordControllers")
const { checkAuthenticated } = require("../middleware/authMiddleware")


/**
 * @swagger
 * tags:
 *   name: Password
 *   description: Password management endpoints
 */

/**
 * @swagger
 * /password/changepassword:
 *   patch:
 *     summary: Change password
 *     tags: [Password]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed
 */
router.route("/changepassword").patch(checkAuthenticated, changePassword)

/**
 * @swagger
 * /password/forgotpassword:
 *   post:
 *     summary: Forgot password
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.route("/forgotpassword").post(forgotPassword)

/**
 * @swagger
 * /password/resetpassword/{resetToken}:
 *   put:
 *     summary: Reset password
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset
 */
router.route("/resetpassword/:resetToken").put(resetPassword)


module.exports = router