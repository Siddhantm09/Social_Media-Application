const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    caption: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    ],

    image: {
        publicId: String,
        url: String,
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('post', postSchema) 