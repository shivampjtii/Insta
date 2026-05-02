const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { followUserController, unfollowUserController } = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.post("/follow/:username", authMiddleware, followUserController)
userRoute.post("/unfollow/:username", authMiddleware, unfollowUserController)

module.exports = userRoute;