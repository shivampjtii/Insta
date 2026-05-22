const express = require("express");
const { createPostController, getPostcontroller, getPostDetails, likePostController } = require("../controllers/post.controller");
const multer = require("multer");
const { authMiddleware } = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post("/", authMiddleware, upload.single("img"), createPostController)

postRouter.get("/", authMiddleware, getPostcontroller);
postRouter.get("/details/:id", authMiddleware, getPostDetails);

postRouter.post("/like/:postId", authMiddleware, likePostController);



module.exports = postRouter;