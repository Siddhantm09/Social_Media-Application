const jwt = require("jsonwebtoken");
const { success, error } = require('../utils/responseWrapper')


module.exports = async (req, res, next) => {
    //Check if Authorization header (startsWith("Bearer")) is present
    if (!req.headers?.authorization?.startsWith("Bearer")) {

        return res.send(error(401, "Authorization header is required"));
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    //verify the access Token valid/expired or not
    try {
        //Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid.If not, it will throw the error.

        const decoded = jwt.verify(
            accessToken,
            process.env.SECRET_ACCESS_TOKEN_KEY
        );

        req._id = decoded._id;

        next();

    } catch (error) {
        console.log(error);

        return res.send(error(401, 'Access Token Invalid / expired'));

    }
    next();
};
