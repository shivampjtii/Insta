const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users",
        // required: [true, "follower is required"],
        // unique: [true, "it should be unique"]
    },
    followee: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users",
        // required: [true, "followee is required"],
        // unique: [true, "it should be unique"]
    }
},
{timestamps: true}
);

followSchema.index({follower: 1, followee: 1}, {unique: true});

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;



