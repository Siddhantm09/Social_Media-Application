const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require('cloudinary');
const mapPostResponse = require('../utils/Utils')
const getAllPostsController = (req, res) => {
    // console.log(req._id);

    return res.send(success(201, "These are Posts"));
};
const createPostController = async (req, res) => {

    try {
        const { caption, postImg } = req.body;

        if (!postImg || !caption) {

            return res.send(error(400, 'Caption and Post Image is required'));
        }

        const owner = req._id; //id which we passed in middleware

        const user = await User.findById(req._id); //find user by id


        const cloudImg = await cloudinary.v2.uploader.upload(postImg, {
            folder: 'Post Image'
        })
        //create a post
        const post = await Post.create({
            owner,
            caption,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.secure_url,
            }
        });

        user.posts.push(post._id)//save the created post id in user posts section
        await user.save()
        return res.send(success(201, post))

    } catch (e) {

        return res.send(error(500, e.message))
    }
};

const likeAndUnlikePostController = async (req, res) => {

    try {

        const postId = req.body.postId;

        const currUserId = req._id

        const post = await Post.findById(postId).populate('owner');

        if (!post) {
            return res.send(error(404, 'No Posts found'))
        }

        if (post.likes.includes(currUserId)) {
            const index = post.likes.indexOf(currUserId)
            post.likes.splice(index, 1);
        }
        else {
            post.likes.push(currUserId)
        }
        await post.save();

        return res.send(success(200, { post: mapPostResponse(post, req._id) }))
        //sending liked or unliked post by mapping with mapPostResponse coz in userProfile.allposts data is mapped in following manner
    } catch (e) {
        return res.send(error(500, e.message))
    }


}
const updatepostsController = async (req, res) => {
    try {
        const currUserId = req._id;

        const { postId, newCaption } = req.body

        const post = await Post.findById(postId)
        const currUser = await User.findById(currUserId)

        if (!post) {
            return res.send(error(404, 'No Posts exists'))
        }
        if (!newCaption) {
            return res.send(error(404, 'No Caption exists'))
        }

        if (post.owner.toString() !== currUserId) {
            return res.send(error(403, 'Only owners can update their posts'))
        }

        post.caption = newCaption
        await post.save()
        return res.send(success(200, post))


    } catch (e) {
        return res.send(error(500, e.message))
    }


}

const deletePostController = async (req, res) => {
    try {
        const currUserId = req._id;
        const { postId } = req.body

        const post = await Post.findById(postId)

        if (!post) {
            return res.send(error(404, 'No Posts exists'))
        }

        //check if logged user is owner of post
        if (post.owner.toString() !== currUserId) {
            return res.send(error(403, 'Only owners can delete their posts'))
        }

        const currUser = await User.findById(currUserId)


        const postIndex = currUser.posts.indexOf(postId)
        currUser.posts.splice(postIndex, 1)//deleteing from User collection
        await currUser.save()
        await post.remove()//deleteing from Post collection

        return res.send(success(200, 'Post deleted successfully'))
    } catch (e) {
        return res.send(error(500, e.message))
    }



}

module.exports = { getAllPostsController, createPostController, likeAndUnlikePostController, updatepostsController, deletePostController };
