const router = require("express").Router();
const postController = require('../controllers/postsController')
const requireUser = require("../middlewares/requireUser")

router.get('/all', requireUser, postController.getAllPostsController)
router.post('/post', requireUser, postController.createPostController)
router.post('/like', requireUser, postController.likeAndUnlikePostController)
router.put('/', requireUser, postController.updatepostsController)
router.delete('/', requireUser, postController.deletePostController)


module.exports = router