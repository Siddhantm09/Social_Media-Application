const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { success, error } = require('../utils/responseWrapper')

const signupController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            //res.status(400).send("All fields are is required");\
            res.send(error(401, 'All fields are is required'))
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            //return res.status(409).send("User already exists");
            res.send(error(409, 'User already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashPassword,
        });
        return res.send(success(201, { user }));
    } catch (error) {
        console.log(error);
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            //res.status(400).send("All fields are is required");
            res.send(error(400, 'All fields are is required'))
        }

        const users = await User.findOne({ email });
        if (!users) {
            //return res.status(400).send("Invalid Email");
            res.send(error(400, 'Invalid Email'))
        }

        const matched = await bcrypt.compare(password, users.password);
        if (!matched) {
            // return res.status(403).send("Password incorrect");
            res.send(error(403, 'Password incorrect'))
        }

        const accessToken = generateAccessToken({ _id: users._id });
        const refreshToken = refreshAccessToken({ _id: users._id });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true

        })

        return res.send(success(200, { accessToken }));

    } catch (error) {
        console.log(error);
    }
};
//check if refresh token is valid and then send new access token
const refreshAccessTokenController = async (req, res) => {
    if (!req.cookies) {
        //return res.status(401).send('Cookie-Refresh Token required')
        res.send(error(401, 'Cookie-Refresh Token required'))
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_ACCESS_TOKEN_KEY
        );
        const _id = decoded._id

        const accessToken = generateAccessToken({ _id })

        return res.status(201).json(accessToken)


    } catch (error) {
        return res.status(401).send("Login Again - Refresh token expired");
        //res.send(error(409, 'Login Again - Refresh token expired'))
    }
};

//internal functions (generate tokens)
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.SECRET_ACCESS_TOKEN_KEY, {
            expiresIn: "15m",
        });
        return token;
    } catch (error) {
        console.log(error);
    }
};
const refreshAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFRESH_ACCESS_TOKEN_KEY, {
            expiresIn: "1y",
        });
        return token;
    } catch (error) {
        console.log(error);
    }
};
module.exports = { signupController, loginController, refreshAccessTokenController };