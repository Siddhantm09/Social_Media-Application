const router = require("express").Router();
const authController = require("../controllers/authController");



router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);
router.post("/logout", authController.logoutController);
router.get("/refresh", authController.refreshAccessTokenController);


module.exports = router;