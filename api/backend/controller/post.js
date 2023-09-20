const Post = require("../model/post");
// get all posts
exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.find()
    .populate({
      path: "creator",
      select: "_id profileImage userName",
    })
    .populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "_id profileImage userName",
      },
    });

  if (posts.length > 0) {
    res.status(200).json({
      message: "get all posts",
      posts: posts,
    });
  } else if (posts.length < 0) {
    res.status(200).json({
      message: "no  posts to view",
    });
  } else {
    res.status(401).json({
      message: "something go wronf",
    });
  }
};
// ADD POST FUNCTION
exports.addPost = async (decode, req, res, next) => {
  const userId = decode.userId;
  const {
    creatorBigCity,
    creatorCity,
    creatorPhone,
    postDate,
    postText,
    createByWorker,
    job,
  } = req.body;
  let postImages = [];
  if (req.files) {
    const url = `${req.protocol}://${req.get("host")}/uploads/`;
    postImages = req.files.map((file) => {
      return url + file.filename;
    });
  }
  let newPost = await new Post({
    creator: userId,
    creatorBigCity,
    creatorCity,
    creatorPhone,
    postText,
    postDate,
    createByWorker,
    postImages,
    job,
  }).save();
  newPost = await Post.findById(newPost.id).populate({
    path: "creator",
    select: "_id profileImage userName",
  });
  res.status(200).json({
    message: "post add",
    newPost,
  });
};

//DELETE POST BY ID
exports.deletePost = async (decode, req, res, next) => {
  //GET POST ID FROM PARAMS OBJECT
  const postId = req.params["postId"];
  const post = await Post.findById(postId);
  //GET USER BY FROM RECIVED TOKEN
  const allowedToDeletePost =
    decode.userId == post.creator || decode.userEmail ? true : false;

  if (allowedToDeletePost) {
    const deletedPost = await Post.findByIdAndDelete(postId);
    delete res.status(200).json({
      message: "post deleted",
      deletedPost,
    });
  } else {
    delete res.status(201).json({
      message: "faild to delete post",
    });
  }
};
// GET POSTS FOR SPECIAL USER < CREATOR VALUE>
exports.userPosts = async (decode, req, res, next) => {
  // GET USER ID FROM RECIVED TOKEN
  const userId = decode.userId;
  // THEN GET ALL POSTS WHICH IT IS CREATOR FIELD MATH THAT USER ID
  const userPosts = await Post.find({ creator: userId })
    // POPULATE THE CREATOR OF EACH POST
    .populate({
      path: "creator",
      select: "_id profileImage userName",
    })
    // THEN POPULATE ALL COMMENTS WHICH BELOGN TO THAT POST
    .populate({
      path: "comments",
      // THEN POPULATE THE CREATRO OF THAT COMMENT
      populate: {
        path: "creator",
        select: "_id profileImage userName",
      },
    });
  res.status(200).json({
    message: "user posts ",
    userPosts,
  });
};
//GET POST BY ID
exports.getPostById = async (req, res, next) => {
  const postId = req.params["postId"];
  const post = await Post.findById(postId)
    // POPULATE THE CREATOR OF EACH POST
    .populate({
      path: "creator",
      select: "_id profileImage userName",
    })
    // THEN POPULATE ALL COMMENTS WHICH BELOGN TO THAT POST
    .populate({
      path: "comments",
      // THEN POPULATE THE CREATRO OF THAT COMMENT
      populate: {
        path: "creator",
        select: "_id profileImage userName",
      },
    });
  if (post) {
    res.status(200).json({
      message: "get post with id : " + postId,
      post,
    });
  } else {
    res.status(204).json({
      message: "faild to get  post with id : " + postId,
    });
  }
};
