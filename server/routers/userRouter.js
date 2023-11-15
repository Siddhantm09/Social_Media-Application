const router = require("express").Router();
const requireUser = require('../middlewares/requireUser')
const userControllers = require('../controllers/userController');


router.post('/follow', requireUser, userControllers.followAndUnfollowUserController)
router.get('/getFeedData', requireUser, userControllers.getallFeedControllers)
router.delete('/delete', requireUser, userControllers.deleteMyProfileController)
router.get('/myposts', requireUser, userControllers.getMyPostsController)
router.get('/userposts', requireUser, userControllers.getOtherUsersPostsController)
router.get('/myprofile', requireUser, userControllers.getMyProfileController)
router.get('/getMyInfo', requireUser, userControllers.getMyInfo)
router.put('/update', requireUser, userControllers.updateProfileController)
router.post('/getUserprofile', requireUser, userControllers.getUserProfile)

module.exports = router