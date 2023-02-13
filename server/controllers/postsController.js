const { success, error } = require("../utils/responseWrapper");

const getAllPostsController = (req, res) => {
    console.log(req._id)

    return res.send(success(201, 'These are Posts'));

}
module.exports = { getAllPostsController }