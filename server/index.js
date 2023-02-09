const express = require('express')
const dotenv = require('dotenv')

const dbConnect = require('./dbConnect')
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
dotenv.config('./.env')
const app = express()

//middlewares
app.use(express.json());       //
app.use(morgan('common'))//Shows info of API you hit
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/posts", postsRouter)


dbConnect();

// app.get('/user', function (req, res) {
//     console.log("Name: ", req.query.name);
//     console.log("Age:", req.query.age);
//     res.send(req.query);


// });

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log('listening on port 5000');
})