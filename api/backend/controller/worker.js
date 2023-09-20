const User = require("../model/user");
exports.getAllAcceptedWrokers = async (req, res, next) => {
  const workers = await User.find({ job: { $exists: true }, accepted: true });
  res.status(200).json({
    users: workers,
  });
};
//=>
exports.getAllWrokersReq = async (req, res, next) => {
  const workers = await User.find({ job: { $exists: true }, accepted: false });
  res.status(200).json({
    users: workers,
  });
};
// => GET WORKER BY JOB
exports.getWorkerByJob = async (req, res) => {
  const job = req.params["job"];
  const workers = await User.find({ job });
  res.status(200).json({
    workers,
  });
};
//ACCEPT WOKER FUNCTION
exports.acceptWorker = async (decode, req, res, next) => {
  console.log("accept worker ++++++++++++++");
  const userId = req.params.id;

  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        accepted: true,
      },
    },
    { returnNewDocument: true, new: true, strict: false }
  ).select("-userPassword -__v");
  res.status(200).json({
    message: "successfully add  worker",
    //: newUser,
  });
};
//BLOCK WORKER WOKER FUNCTION
exports.blockWorker = async (decode, req, res, next) => {
  const userId = req.params.id;
  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        accepted: false,
      },
    },
    { returnNewDocument: true, new: true, strict: false }
  ).select("-userPassword -__v");
  res.status(200).json({
    message: "successfully add  worker",
    newUser: newUser,
  });
};
