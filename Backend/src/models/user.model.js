const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username must be unique"],
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true, "email must be unique"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80"
    }

});

const userModel = mongoose.model("users", userSchema);


module.exports = userModel;