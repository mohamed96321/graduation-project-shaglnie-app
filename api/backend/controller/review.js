const Review = require("../model/review");
exports.getReview = async (req, res, next) => {
  const belongTo = req.params["belongTo"];
  console.log(belongTo);
  const reviews = await Review.find({ belongTo: belongTo }).populate({
    path: "creator",
    select: "_id profileImage userName",
  });
  res.status(200).json({
    message: "site reviews",
    reviews,
  });
};
exports.addReview = async (decode, req, res, next) => {
  const { reviewText, belongTo } = req.body;
  const creator = decode.userId;
  const newReview = await new Review({
    creator,
    reviewText,
    belongTo,
  }).save();
  res.status(200).json({
    message: "review added",
    newReview,
  });
};
