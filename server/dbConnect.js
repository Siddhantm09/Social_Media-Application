const mongoose = require("mongoose");

module.exports = async () => {

    const mongoUri =
        "mongodb+srv://SiddhantM123:gJp00qMbwAMADDW0@social-media.x02l13g.mongodb.net/?retryWrites=true&w=majority";


    try {
        const connect = await mongoose.connect(mongoUri, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
        console.log(`MongoDb connected :${connect.connection.host}`);
    }


    catch (error) {
        console.log(error);
        process.exit(1)
    }


};