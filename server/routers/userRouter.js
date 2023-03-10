const router = require("express").Router();
const requireUser = require('../middlewares/requireUser')
const userControllers = require('../controllers/userController');


router.post('/follow', requireUser, userControllers.followAndUnfollowUserController)
router.get('/seePosts', requireUser, userControllers.seeAllPostsControllers)
router.delete('/deleteprofile', requireUser, userControllers.deleteMyProfileController)
router.get('/myposts', requireUser, userControllers.getMyPostsController)
router.get('/userposts', requireUser, userControllers.getOtherUsersPostsController)

module.exports = router