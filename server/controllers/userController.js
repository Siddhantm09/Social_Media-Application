const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");

const followAndUnfollowUserController = async (req, res) => {
    try {
        const { userToFollowId } = req.body;
        const currUserId = req._id;

        const currUser = await User.findById(currUserId);
        const userToFollow = await User.findById(userToFollowId);

        if (currUserId === userToFollowId) {
            res.send(error(409, "Cannot follow yourself"));
        }

        if (!userToFollow) {
            res.send(error(404, "User to follow not found"));
        }

        //already follows
        if (currUser.followings.includes(userToFollowId)) {
            //remove from followings
            const followingsindex = currUser.followings.indexOf(userToFollowId);
            currUser.followings.splice(followingsindex, 1);

            //remove from followers
            const followersindex = userToFollow.followers.indexOf(currUser);
            userToFollow.followers.splice(followersindex, 1);

            await currUser.save();
            userToFollow.save();
            return res.send(success(200, "User unfollowed"));
        } else {
            //not followed
            currUser.followings.push(userToFollowId);
            userToFollow.followers.push(currUserId);
            await currUser.save();
            await userToFollow.save();
            return res.send(success(200, "User followed"));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const seePostsControllers = async (req, res) => {
    try {
        const currUserId = req._id; //jisko post dekhna hai uska id

        const currUser = await User.findById(currUserId); //jisko post dekhna hai uska id

        //posts ke owner jo mere followings me hai
        const posts = await Post.find({
            owner: {
                $in: currUser.followings,
            },
        });

        if (!posts) {
            return res.send(error(404, "No Posts exists"));
        } else {
            return res.send(success(200, posts));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getMyPostsController = (req, res) => { };
const deleteMyProfileController = (req, res) => { };

module.exports = {
    followAndUnfollowUserController,
    seePostsControllers,
    getMyPostsController,
    deleteMyProfileController,
};
