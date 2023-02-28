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
            const followersindex = userToFollow.followers.indexOf(currUserId);
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

const seeAllPostsControllers = async (req, res) => {
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

const getMyPostsController = async (req, res) => {

    try {
        const currUserId = req._id


        const currUser = await User.findById(currUserId);

        const myPosts = await Post.find({
            owner: {
                $in: currUser._id,
            },
        })

        if (!myPosts) {
            return res.send(error(404, "No Posts exists"));
        } else {
            return res.send(success(200, myPosts));

        }
    } catch (e) {
        return res.send(error(500, e.message));
    }

};



const deleteMyProfileController = async (req, res) => {
    try {
        const currUserId = req._id

        const currUser = await User.findById(currUserId);

        if (!currUser) {
            return res.send(error(404, "No such user exists"));
        }



        //user jiska followers and followings me current id hai
        const users = await User.find({

            followers: {
                $in: currUser._id,
            }, followings: {
                $in: currUser._id,
            },

        })

        //posts jiska owner me curr id hai
        const posts = await Post.find({
            owner: {
                $in: currUser._id,
            }
        })

        //remove posts
        if (posts) {
            posts.map(async (key) => {

                key.remove()

            })
        }


        //if no followers or following exists(Note:users,posts is array which returns details in objects)
        if (users.length === 0) {
            await currUser.remove()//remove currUser collection
            return res.send(error(404, "No followers or followings,User deleted successfully"));
        }
        //remove from other users followers and followings
        else {

            users.map(async (key) => {
                const index = key.followers.indexOf(currUserId)
                const index2 = key.followings.indexOf(currUserId)

                key.followers.splice(index, 1)
                key.followings.splice(index2, 1)
                await key.save()
                await currUser.remove()//remove currUser collection
                return res.send(success(200, 'User deleted successfully'));
            })
        }

    } catch (e) {
        return res.send(error(500, e.message));
    }

}
const getOtherUsersPostsController = async (req, res) => {
    try {
        const currUserId = req._id
        const { otheruserId } = req.body
        const currUser = await User.findById(currUserId);
        const otherUser = await User.findById(otheruserId);

        if (!currUser.followings.includes(otheruserId)) {
            return res.send(error(404, 'You dont follow this user'));
        }

        const otherUserPosts = await Post.find({
            owner: {
                $in: otherUser._id,
            }
        })

        return res.send(success(200, otherUserPosts));


    } catch (e) {
        return res.send(error(500, e.message));
    }

};




module.exports = {
    followAndUnfollowUserController,
    seeAllPostsControllers,
    getMyPostsController,
    deleteMyProfileController,
    getOtherUsersPostsController

}
