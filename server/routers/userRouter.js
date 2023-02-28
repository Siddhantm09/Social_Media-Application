const router = require("express").Router();
const requireUser = require('../middlewares/requireUser')
const userControllers = require('../controllers/userController');
const { use } = require("./authRouter");

router.post('/follow', requireUser, userControllers.followAndUnfollowUserController)
router.get('/seePosts', requireUser, userControllers.seePostsControllers)
router.delete('/deleteprofile', requireUser, userControllers.deleteMyProfileController)
router.get('/myposts', requireUser, userControllers.getMyPostsController)

module.exports = router