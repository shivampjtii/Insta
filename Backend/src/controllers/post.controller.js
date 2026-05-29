const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_API_KEY, // This is the default and can be omitted
//   urlEndpoint: "https://ik.imagekit.io/shivamPjti",
});

const createPostController = async (req, res) => {
  const fill = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "posts"
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: fill.url,
    user: req.user.id
  })

  res.status(201).json({
    message: "post created successfully",
    post
  });

};

const getPostcontroller = async (req, res)=>{
  const posts = await postModel.find({user: req.user.id});

  res.status(200).json({
    message: "posts fetched successfully",
    posts
  })
}

const getPostDetails = async (req,res)=>{
  const id = req.params.id;
  const post = await postModel.findOne({
    $and:[
      {_id: id},
      {user: req.user.id}
    ]
  });

  // const post = await postModel.findById(id);

  if(!post){
    return res.status(404).json({
      message: "Post not found"
    })
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post
  })
}

const likePostController = async (req,res)=>{
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if(!post){
    return res.status(401).json({
      message: "Post not found"
    })
  }

  const like = await likeModel.create({
    post: postId,
    user: username
  })

  res.status(201).json({
    message: "Like created",
    like
  })
}

const getFeedController = async (req, res)=>{
  const user = req.user;
  // const posts = await postModel.find().populate("user");
  // const posts = (await Promise.all(await postModel.find().populate("user").lean())).map(async (post)=>{
  //   const isLiked = await likeModel.findOne({
  //     user: user.username,
  //     post: post._id
  //   })
  //   post.isLiked = Boolean(isLiked);
  //   return post;
  // });

  const posts = await postModel.find()
  .populate("user").sort({_id: -1})
  .lean();

const postsWithLikeStatus = await Promise.all(
  posts.map(async (post) => {
    const isLiked = await likeModel.findOne({
      user: user.username,
      post: post._id,
    });

    post.isLiked = Boolean(isLiked);
    return post;
  })
);

  res.status(200).json({
    message: "Posts fetched successfully",
    posts
  })
}

module.exports = {
  createPostController,
  getPostcontroller,
  getPostDetails,
  likePostController,
  getFeedController
};
