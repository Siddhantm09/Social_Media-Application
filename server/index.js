const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./dbConnect')
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const cors = require('cors')
// import { v2 as cloudinary } from 'cloudinary';

dotenv.config('./.env')



// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET_KEY
// });

const app = express()


//middlewares
app.use(express.json());     //Parse json data so that we can use it in req obj
app.use(morgan('common'))   //Shows info of API you hit
app.use(cookieParser());   //Parse cookie data so that we can use it in req obj
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use("/auth", authRouter);
app.use("/posts", postsRouter)
app.use("/user", userRouter)




const PORT = process.env.PORT || 5001

dbConnect();
app.listen(PORT, () => {
    console.log('listening on port 5000');
})






// app.get('/user', function (req, res) {
//     console.log("Name: ", req.query.name);
//     console.log("Age:", req.query.age);
//     res.send(req.query);


// });