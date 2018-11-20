var express = require("express");
var router = express.Router();
var {
  generateToken,
  ensureUserExists,
  putTokenInDB,
  registerUser,
  sendToken
} = require("../utils/token.utils");
var { log_in_user } = require("../controller/user_controller");
var passport = require("passport");
var config = require("../config");
var request = require("request");
require("../passport")();

router.route("/auth/google-login").post(
  passport.authenticate("google-token", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id
    };
    next();
  },
  generateToken,
  log_in_user,
  putTokenInDB,
  sendToken
);

router.route("/auth/google-register").post(
  passport.authenticate("google-token", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id
    };
    next();
  },
  generateToken,
  putTokenInDB,
  registerUser,
  sendToken
);

module.exports = router;
