const router = require("express").Router();
const requireUser = require('../middlewares/requireUser')
const userControllers = require('../controllers/userController');
const { use } = require("./authRouter");

router.post('/follow', requireUser, userControllers.followAndUnfollowUserController)
router.post('/seePosts', requireUser, userControllers.seePostsControllers)

module.exports = router