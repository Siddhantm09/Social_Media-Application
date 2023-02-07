const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./dbConnect')
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");
dotenv.config('./.env')
const app = express()




app.use(express.json());
app.use("/auth", authRouter);
app.use(morgan('common'))


app.get('/', (req, res) => {
    res.send('ok from server')
})

const PORT = process.env.PORT || 5001

dbConnect();

app.listen(PORT, () => {
    console.log('listening on port 5000');
})