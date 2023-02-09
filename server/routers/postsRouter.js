const router = require("express").Router();
const postController = require('../controllers/postsController')
const requireUser = require("../middlewares/requireUser")

router.get('/all', requireUser, postController.getAllPostsController)
module.exports = router