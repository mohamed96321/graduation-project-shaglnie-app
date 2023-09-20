const User = require("../model/user");
const Post = require("../model/post");
exports.search = async (req, res, next) => {
  console.log("search works !");
  const { job, bigCity, city, isWorker } = req.params;
  let worker = isWorker == "true" ? true : false;
  console.log(worker);
  const posts = await Post.find({
    job: { $regex: ".*" + job.slice(0, 4) + ".*" },
    creatorBigCity: { $regex: ".*" + bigCity.slice(0, 4) + ".*" },
    creatorCity: { $regex: ".*" + city.slice(0, 4) + ".*" },
    createByWorker: !worker,
  })
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
  const users = !worker
    ? await User.find({
        job: { $regex: ".*" + job.slice(0, 4) + ".*" },
        userBigCity: { $regex: ".*" + bigCity.slice(0, 4) + ".*" },
        userCity: { $regex: ".*" + city.slice(0, 4) + ".*" },
        accepted: true,
      }).select("userName profileImage userPhone userCity userBigCity")
    : [];
  console.log(users);
  res.status(200).json({
    message: "get posts",
    posts,
    users,
  });
};
