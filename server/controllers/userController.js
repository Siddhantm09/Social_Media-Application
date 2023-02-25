const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");



const followAndUnfollowUserController = async (req, res) => {

    try {

        const { userToFollowId } = req.body
        const currUserId = req._id

        const currUser = await User.findById(currUserId)
        const userToFollow = await User.findById(userToFollowId)

        if (currUserId === userToFollowId) {
            res.send(error(409, "Cannot follow yourself"))
        }

        if (!userToFollow) {
            res.send(error(404, "User to follow not found"))
        }


        //already follows
        if (currUser.followings.includes(userToFollowId)) {

            //remove from followings
            const followingsindex = currUser.followings.indexOf(userToFollowId)
            currUser.followings.splice(followingsindex, 1);


            //remove from followers
            const followersindex = userToFollow.followers.indexOf(currUser)
            userToFollow.followers.splice(followersindex, 1)

            await currUser.save()
            userToFollow.save()
            return res.send(success(200, "User unfollowed"))
        }
        else {
            //not followed
            currUser.followings.push(userToFollowId)
            userToFollow.followers.push(currUserId)
            await currUser.save()
            await userToFollow.save()
            return res.send(success(200, "User followed"))
        }
    } catch (e) {
        return res.send(error(500, e.message))
    }


}

const seePostsControllers = async (req, res) => {

}
module.exports = { followAndUnfollowUserController, seePostsControllers }