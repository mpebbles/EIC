var eic_user = require("../models/User");
var user = require("../models/User");
var userProfileImage = require("../models/UserProfileImage");
var fs = require("fs");
var { findEmailByToken } = require("../models/GoogleUser");
const { body, validationResult } = require("express-validator/check");

exports.log_in_user = function(req, res, next) {
  let user_info = JSON.parse(JSON.stringify(req.user));
  let user_email = user_info.email;
  eic_user.findOne({ contact: user_email }, function(err, result) {
    if (err) {
      return res.status(406).send();
    } else {
      if (result === null) {
        return res.status(406).send();
      }
      res.locals.eicUserType = result.itemtype;
      return next();
    }
  });
};

//this is the post request to add/update a user's profile image
exports.addUserProfileImage = [
  (req, res, next) => {
    var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
      " "
    )[1];
    token_to_find_in_db = token_to_find_in_db.substring(
      0,
      token_to_find_in_db.length - 1
    );

    findEmailByToken(token_to_find_in_db, function(err, contact) {
      user.findOne({ contact: contact }).exec(function(err, user) {
        if (!user.userProfileImageId) {
          var newUserImage = new userProfileImage();
          newUserImage.userImage.data = fs.readFileSync(req.file.path);
          newUserImage.save(function(err) {
            if (err) return handleError(err);
          });
          user.userProfileImageId = newUserImage.id;
          user.save(function(err) {
            if (err) return handleError(err);
          });
          fs.unlink(req.file.path, err => {
            if (err) throw err;
          });
        } else {
          userProfileImage.findById(user.userProfileImageId, function(
            err,
            userProfileImage
          ) {
            userProfileImage.userImage.data = fs.readFileSync(req.file.path);
            userProfileImage.save();
            fs.unlink(req.file.path, err => {
              if (err) throw err;
            });
          });
        }
        res.send();
      });
    });
  }
];

exports.getUserProfileImage = function(req, res, next) {
  user.findOne({ contact: req.params.id }).exec(function(err, user) {
    userProfileImage.findById(user.userProfileImageId, function(
      err,
      userProfileImage
    ) {
      if (!userProfileImage) {
        res.send("404 ERROR IMAGE NOT FOUND");
      } else {
        //res.send(userProfileImage.userImage.data);
        //res.writeHead(200, {'Content-Type': 'image/jpeg'});
        //res.end(userProfileImage.userImage.data)
        res.send(
          Buffer.from(userProfileImage.userImage.data).toString("base64")
        );
      }
    });
  });
};
