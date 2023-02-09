const getAllPostsController = (req, res) => {
    console.log(req._id)
    res.send('These are Posts')

}
module.exports = { getAllPostsController }