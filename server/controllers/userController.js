const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require('cloudinary');
const mapPostResponse = require('../utils/Utils')
const followAndUnfollowUserController = async (req, res) => {
    try {

        const { userToFollowId } = req.body;
        const currUserId = req._id;

        const currUser = await User.findById(currUserId);
        const userToFollow = await User.findById(userToFollowId);


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


        } else {
            //not followed
            currUser.followings.push(userToFollowId);
            userToFollow.followers.push(currUserId);

        }

        // if (currUserId === userToFollowId) {
        //     currUser.followings.findById()
        // }
        await currUser.save();
        await userToFollow.save();
        return res.send(success(200, { user: userToFollow }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getallFeedControllers = async (req, res) => {
    try {
        const currUserId = req._id; //jisko post dekhna hai uska id

        const currUser = await User.findById(currUserId).populate('followings').populate('followers'); //jisko post dekhna hai uska id

        //posts ke owner jo mere followings me hai
        const followingsposts = await Post.find({
            owner: {
                $in: currUser.followings,
            },
        }).populate('owner');

        if (!followingsposts) {
            return res.send(error(404, "No Posts exists"));
        }
        const followingsIds = currUser.followings.map((item) => item._id)//ids of followings
        followingsIds.push(req._id)
        const suggestions = await User.find({
            _id: {
                $nin: followingsIds  //ids not in followingsIds
            }
        })
        const MappedFollowingposts = followingsposts.map((item) => mapPostResponse(item, req._id)).reverse()

        return res.send(success(200, { ...currUser._doc, MappedFollowingposts, suggestions }));

    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getMyPostsController = async (req, res) => {

    try {
        const currUserId = req._id

        const currUser = await User.findById(currUserId);

        //check if user exists in DB(will exist by default)
        if (currUser) {
            const myPosts = await Post.find({  //returns an array of obj
                owner: currUserId

            }).populate('likes')
            if (!myPosts) {
                return res.send(error(404, "No Posts exists"));
            } else {
                return res.send(success(200, myPosts));

            }
        }



    } catch (e) {
        return res.send(error(500, e.message));
    }

};



// const deleteMyProfileController = async (req, res) => {
//     try {
//         const currUserId = req._id

//         const currUser = await User.findById(currUserId);

//         if (!currUser) {
//             return res.send(error(404, "No such user exists"));
//         }



//         //user jiska followers and followings me current id hai
//         const users = await User.find({

//             followers: {
//                 $in: currUser._id,
//             }, followings: {
//                 $in: currUser._id,
//             },

//         })

//         //posts jiska owner me curr id hai
//         const posts = await Post.find({
//             owner: {
//                 $in: currUser._id,
//             }
//         })

//         //remove posts
//         if (posts) {
//             posts.map(async (key) => {

//                 key.remove()

//             })
//         }


//         //if no followers or following exists(Note:users,posts is array which returns details in objects)
//         if (users.length === 0) {
//             await currUser.remove()//remove currUser collection
//             return res.send(error(404, "No followers or followings,User deleted successfully"));
//         }
//         //remove from other users followers and followings
//         else {

//             users.map(async (key) => {
//                 const index = key.followers.indexOf(currUserId)
//                 const index2 = key.followings.indexOf(currUserId)

//                 key.followers.splice(index, 1)
//                 key.followings.splice(index2, 1)
//                 await key.save()
//                 await currUser.remove()//remove currUser collection
//                 return res.send(success(200, 'User deleted successfully'));
//             })
//         }

//     } catch (e) {
//         return res.send(error(500, e.message));
//     }

// }


const deleteMyProfileController = async (req, res) => {

    try {
        const currUserId = req._id
        const currUser = await User.findById(currUserId);

        //delete all posts
        await Post.deleteMany({
            owner: currUserId
        })


        currUser.followers.forEach(async (followerId) => {
            console.log('Here');
            const follower = await User.findById(followerId);
            //console.log('follower', follower);
            const index = follower.followings.indexOf(currUserId);
            // console.log('index', index);
            follower.followings.splice(index, 1);
            //console.log('after splice', follower.followings);
            await follower.save();
            //console.log("after save 184", follower);
        });

        // remove myself from my followings' followers
        currUser.followings.forEach(async (followingId) => {
            const following = await User.findById(followingId);
            //console.log("following", following);
            const index = following.followers.indexOf(currUserId);
            // console.log("index", index);
            following.followers.splice(index, 1);
            console.log(following.followers);
            await following.save();
            //console.log("after save 196", following);
        });


        //remove myself from others posts likes(my way)
        // const posts = await Post.find({
        //     likes: {
        //         $in: currUser._id,
        //     }
        // })
        // console.log(posts);
        // posts.map((key) => {  
        //     const likesArray = key.likes
        //     const index = likesArray.indexOf(currUserId)
        //     likesArray.splice(index, 1)
        //     key.save()
        // })

        //remove myself from others posts likes(sir's way)
        const allPosts = await Post.find();
        allPosts.forEach(async (post) => {
            const index = post.likes.indexOf(currUserId)
            post.likes.splice(index, 1)
            await post.save()
        })



        await currUser.remove()//remove user from backend


        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,

        })

        return res.send(success(200, 'Successfull'));
    } catch (e) {
        return res.send(error(500, e.message));
    }
}

const getOtherUsersPostsController = async (req, res) => {
    try {
        const currUserId = req._id
        const { otheruserId } = req.body

        if (!otheruserId) {

            return res.send(error(400, 'User id is required'))

        }
        const currUser = await User.findById(currUserId);

        //check if your follow that user
        if (!currUser.followings.includes(otheruserId)) {
            return res.send(error(404, 'You dont follow this user'));
        }

        const otherUserPosts = await Post.find({
            owner: otheruserId
        }).populate('likes')

        return res.send(success(200, otherUserPosts));


    } catch (e) {
        return res.send(error(500, e.message));
    }

};

const getMyProfileController = async (req, res) => {
    try {
        const currUserId = req._id;
        const currUser = await User.findById(currUserId).populate('posts');
        if (currUser) {
            return res.send(success(200, currUser));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }

}

const getMyInfo = async (req, res) => {
    try {
        const currUserId = req._id;
        const currUser = await User.findById(currUserId).populate('posts').populate('followings');

        if (currUser) {
            return res.send(success(200, { currUser }));
        }
    } catch (e) {
        return res.send(error(500, e.message));
    }

}

const updateProfileController = async (req, res) => {
    try {
        const { name, bio, userImg } = req.body;

        const user = await User.findById(req._id)

        if (name) {
            user.name = name;

        }
        if (bio) {
            user.bio = bio;

        }
        if (userImg) {

            const cloudImg = await cloudinary.v2.uploader.upload(userImg, {
                folder: 'photos'
            })


            user.avatar = {
                publicId: cloudImg.public_id,
                url: cloudImg.secure_url,

            }

        }

        await user.save()

        return res.send(success(200, { user }));
    } catch (e) {
        return res.send(error(500, e.message));
    }

}

const getUserProfile = async (req, res) => {
    try {

        const userId = req.body.userId;
        console.log(userId);
        //give user with populated posts and that posts with populated post's owner
        const user = await User.findById(userId).populate({
            path: 'posts',
            populate: {
                path: 'owner'
            }
        });

        const fullPosts = user.posts
        const allposts = fullPosts.map((item) => mapPostResponse(item, req._id)).reverse()
        return res.send(success(200, { ...user._doc, allposts }));
    } catch (e) {
        return res.send(error(500, e.message))
    }

}

module.exports = {
    followAndUnfollowUserController,
    getallFeedControllers,
    getMyPostsController,
    getOtherUsersPostsController,
    getMyProfileController,
    deleteMyProfileController,
    getMyInfo,
    updateProfileController,
    getUserProfile
}
