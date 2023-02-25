const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");

const getAllPostsController = (req, res) => {
    console.log(req._id);

    return res.send(success(201, "These are Posts"));
};
const createPostController = async (req, res) => {
    try {
        const { caption } = req.body;

        const owner = req._id; //id which we passed in middleware

        const user = await User.findById(req._id); //find user by id

        const post = await Post.create({//create a post
            owner,
            caption,
        });

        user.posts.push(post._id) //save the created post id in user posts section

        await user.save();

        return res.send(success(201, post))

    } catch (e) {

        return res.send(error(500, e.message))
    }
};

const likeAndUnlikePost = async (req, res) => {

    try {
        const { postId } = req.body;
        const currUserId = req._id

        const post = await Post.findById(postId);

        if (!post) {
            return res.send(error(400, 'No Posts found'))
        }

        if (post.likes.includes(currUserId)) {
            const index = post.likes.indexOf(currUserId)
            post.likes.splice(index, 1);

            await post.save();
            return res.send(success(200, "Post Unliked"))
        }
        else {
            post.likes.push(currUserId)
            await post.save()
            return res.send(success(200, "Post liked"))
        }

    } catch (error) {
        return res.send(error(500, e.message))
    }


}


module.exports = { getAllPostsController, createPostController, likeAndUnlikePost };
