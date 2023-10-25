const modifyPostResponse = (post, userId) => { //here post can be either logged in user post or otheruser post
    //userId is the logged in user(we are sending from controller)
    return {
        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
            _id: post.owner._id,
            name: post.owner.name,
            avatar: post.owner.avatar
        },
        likesCount: post.likes.length,
        isLiked: post.likes.includes(userId)

    }
}




module.exports = modifyPostResponse 