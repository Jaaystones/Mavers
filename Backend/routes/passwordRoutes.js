const express =  require("express")
const router = express.Router()
const { changePassword, forgotPassword, resetPassword } = require("../controllers/passwordControllers")
const { checkAuthenticated } = require("../middleware/authMiddleware")

router.route("/changepassword").patch(checkAuthenticated, changePassword)

router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword/:resetToken").put(resetPassword)


module.exports = router