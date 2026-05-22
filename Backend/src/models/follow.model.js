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
    },
    status:{
        type: String,
        default: "pending",
        enum:{
            values: ["active", "pending", "rejected"],
            message: "Status can only be active, pending, rejected"
        }
    }
},
{timestamps: true}
);

followSchema.index({follower: 1, followee: 1}, {unique: true});

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;



