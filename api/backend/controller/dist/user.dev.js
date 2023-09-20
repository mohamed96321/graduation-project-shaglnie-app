"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = require("../model/user");

var Post = require("../model/post");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt");

var sendMailTo = require("../middleware/send-mail-to"); // GET ALL USER FUNCTION


exports.getAllUsers = function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find().select("-userPassword -__v"));

        case 2:
          users = _context.sent;
          users.length > 0 ? res.status(200).json({
            message: "successfully get all users ",
            usersCount: users.length,
            users: users
          }) : res.status(200).json({
            message: "no existed user yet"
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // SIGN UP FUNCTION


exports.signup = function _callee2(req, res, next) {
  var _req$body, userName, userEmail, userBigCity, userCity, userPhone, userPassword, isWorker, user, url, hash, MUTUAL, newUser, token, job, workerIdentityImages, _newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //CATCH MUTUAL DATA BETWEEN WORKER AND USER
          _req$body = req.body, userName = _req$body.userName, userEmail = _req$body.userEmail, userBigCity = _req$body.userBigCity, userCity = _req$body.userCity, userPhone = _req$body.userPhone, userPassword = _req$body.userPassword, isWorker = _req$body.isWorker;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            userEmail: userEmail
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 28;
            break;
          }

          //CATCH THE STATIC PATH OT SHARE IMAGES OR UPLOADS IMAGES
          url = req.protocol + "://" + req.get("host") + "/uploads/"; // CHECK IF USE IS WORKER OR NOT
          // ENCRYBT USER PASSWORD

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(userPassword, 10));

        case 8:
          hash = _context2.sent;
          // HANDEL MUTUAL DATA INTO OBJECT
          MUTUAL = {
            profileImage: url + "default_profile.png",
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userBigCity: userBigCity,
            userCity: userCity,
            userPassword: hash
          }; // IF USER

          if (!(isWorker == "false")) {
            _context2.next = 18;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(new User(_objectSpread({}, MUTUAL)).save());

        case 13:
          newUser = _context2.sent;
          // SEND TOKEN IF USER
          token = jwt.sign({
            userId: newUser._id,
            userEmail: userEmail
          }, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            message: "successfully user sign up",
            token: token,
            user: newUser
          });
          _context2.next = 26;
          break;

        case 18:
          //  CATCH WORKER JOB
          job = req.body.job;
          workerIdentityImages = req.files.map(function (file) {
            return url + file.filename;
          }); // IF HE IS WORKER WE ADD NEW FILED (job, workerIdentityImages , accepted);

          _context2.next = 22;
          return regeneratorRuntime.awrap(new User(_objectSpread({}, MUTUAL, {
            job: job,
            accepted: false,
            workerIdentityImages: workerIdentityImages
          })).save());

        case 22:
          _newUser = _context2.sent;
          _context2.next = 25;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(_newUser._id, {
            $set: {
              job: job,
              accepted: false,
              workerIdentityImages: workerIdentityImages
            }
          }, {
            //options
            returnNewDocument: true,
            "new": true,
            strict: false
          }));

        case 25:
          res.status(200).json({
            message: "successfully worker sign up"
          });

        case 26:
          _context2.next = 29;
          break;

        case 28:
          res.status(201).json({
            message: "this email already used",
            duplicatedEamil: true
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // SIGN IN FUNCTION


exports.signin = function _callee3(req, res, next) {
  var _req$body2, userEmail, userPassword, user, isPasswordSame, _user, token;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // CATCH EMAIL AND PASSWORD FROM BODY
          _req$body2 = req.body, userEmail = _req$body2.userEmail, userPassword = _req$body2.userPassword; // GET USER FORM DB

          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            userEmail: userEmail
          }));

        case 3:
          user = _context3.sent;

          if (!(user && (user._doc.accepted === undefined || user._doc.accepted === true))) {
            _context3.next = 19;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(userPassword, // 123
          user.userPassword // DHJKLNSMJDKSLNDMS,JEWKL
          ));

        case 7:
          isPasswordSame = _context3.sent;

          if (!isPasswordSame) {
            _context3.next = 16;
            break;
          }

          _context3.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            userEmail: userEmail
          }).select("-__v -userPassword"));

        case 11:
          _user = _context3.sent;
          token = jwt.sign({
            userId: _user._id,
            userEmail: _user.userEmail
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d"
          });
          res.status(200).json({
            message: "successfully sign in",
            token: token,
            user: _user
          });
          _context3.next = 17;
          break;

        case 16:
          // IF ACCEPTED = FALSE
          if (user.accepted === false) {
            res.status(406).json({
              message: "sorry your account did not accepted yet"
            });
          } // OTHER WHISE SIGNIN MUST FAILD
          else {
              res.status(200).json({
                message: "faild to sign in"
              });
            }

        case 17:
          _context3.next = 20;
          break;

        case 19:
          res.status(200).json({
            message: "faild to sign in"
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // get one user by it's id


exports.getUser = function _callee4(req, res, next) {
  var userId, user, userPosts;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(userId).select("-userPassword -__v"));

        case 3:
          user = _context4.sent;

          if (!user) {
            _context4.next = 11;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(Post.find({
            creator: userId
          }).populate({
            path: "creator",
            select: "_id profileImage userName"
          }).populate({
            path: "comments",
            populate: {
              path: "creator",
              select: "_id profileImage userName"
            }
          }));

        case 7:
          userPosts = _context4.sent;
          res.status(200).json({
            message: "successfully get user",
            user: user,
            userPosts: userPosts
          });
          _context4.next = 12;
          break;

        case 11:
          res.status(204).json({
            message: "user does not exist"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // EDIT USER FUNCTION


exports.edit = function _callee5(decode, req, res, next) {
  var _req$body3, userName, userEmail, userPhone, userBigCity, userCity, job, userOld, profileImage, newUser;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, userName = _req$body3.userName, userEmail = _req$body3.userEmail, userPhone = _req$body3.userPhone, userBigCity = _req$body3.userBigCity, userCity = _req$body3.userCity, job = _req$body3.job;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(decode.userId));

        case 3:
          userOld = _context5.sent;
          profileImage = userOld.profileImage;

          if (req.file) {
            profileImage = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
          }

          _context5.next = 8;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(decode.userId, {
            $set: {
              profileImage: profileImage,
              userName: userName,
              userEmail: userEmail,
              userPhone: userPhone,
              userBigCity: userBigCity,
              userCity: userCity,
              job: job
            }
          }, {
            returnNewDocument: true,
            "new": true
          }).select("-userPassword -__v"));

        case 8:
          newUser = _context5.sent;
          res.status(200).json({
            message: "successfully user updated",
            newUser: newUser
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // => DELETE USER


exports.deleteUser = function _callee6(decode, req, res, next) {
  var userId, deletedUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params["id"];
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 3:
          deletedUser = _context6.sent;
          res.status(200).json({
            message: "user deleted",
            deletedUser: deletedUser
          });

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // => GET ONLY USERS


exports.getUsers = function _callee7(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(User.find({
            job: {
              $exists: false
            }
          }));

        case 2:
          users = _context7.sent;
          res.status(200).json({
            users: users
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}; //=> ADD NEW ADmin


exports.addAdmin = function _callee8(req, res, next) {
  var id, newAdmin;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params["id"];
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: id
          }, {
            $set: {
              isAdmin: true
            }
          }, {
            strict: false,
            returnNewDocument: true
          }));

        case 3:
          newAdmin = _context8.sent;
          res.status(200).json({
            message: "new admin added",
            newAdmin: newAdmin
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
};