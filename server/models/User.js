const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false      //will not send password when using (findbyId etc )
    },
    bio: {
        type: String
    },
    avatar: {
        publicId: String,
        url: String,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }],
}, {
    timestamps: true
});
module.exports = mongoose.model("user", userSchema);
