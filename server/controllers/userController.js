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
        console.log(currUserId);
        const currUser = await User.findById(currUserId);

        if (!currUser) {
            return res.send(error(404, "No such user exists"));
        }



        //remove from other users followers
        const usersFromFollowers = await User.find({
            followers: {
                $in: currUser._id,
            },
        })

        if (!usersFromFollowers) {
            return res.send(error(404, "No such followers exists"));
        }
        else {
            usersFromFollowers.map(async (key) => {
                const index = key.followers.indexOf(currUserId)

                key.followers.splice(index, 1)
                await key.save()
            })
        }




        //remove from  other users followings
        const usersFromFollowing = await User.find({
            followings: {
                $in: currUser._id,
            },
        })
        if (!usersFromFollowing) {
            return res.send(error(404, "No such followings exists"));
        }
        else {
            usersFromFollowing.map(async (key) => {
                const index2 = key.followings.indexOf(currUserId)

                key.followings.splice(index2, 1)
                await key.save()
            })
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }





    //remove his posts
    //remove his likes from other users posts

    //await currUser.remove()//delete user finally

};



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

};
