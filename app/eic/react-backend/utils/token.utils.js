var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var googleUser = require("../models/GoogleUser");
var { addEICToken } = require("../models/GoogleUser");
var eic_user = require("../models/User");
var user_controller = require("../controller/user_controller");
var buddy_controller = require("../controller/buddy_controller");
var student_controller = require("../controller/student_controller");
var company_controller = require("../controller/companyController");

var createToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    "my-secret",
    {
      expiresIn: 60 * 120
    }
  );
};

module.exports = {
  generateToken: function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
  },
  putTokenInDB: function(req, res, next) {
    addEICToken(req, res, next);
    return next();
  },
  registerUser: function(req, res, next) {
    let account_type = req.header("x-account-type");
    let user_name = req.header("x-user-name");
    let user_email = JSON.parse(JSON.stringify(req.user)).email;
    console.log("Insert into database", account_type, user_name, user_email);

    if (account_type === "Buddy") {
      buddy_controller.create_buddy_account(req, res, next);
      res.locals.eicUserType = "Buddy";
    } else if (account_type === "Student") {
      student_controller.create_student_account(req, res, next);
      res.locals.eicUserType = "Student";
    } else if (account_type === "Company") {
      company_controller.create_company_account(req, res, next);
      res.locals.eicUserType = "Company";
    } else {
      return res.status(500);
    }
  },
  sendToken: function(req, res) {
    res.setHeader("x-auth-token", req.token);
    res.setHeader("x-user-type", String(res.locals.eicUserType));
    return res.status(200).send(JSON.stringify(req.user));
  },
  validate_student_call: function(req, res) {
    if (false) {
      res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  },

  validate_buddy_call: function(req, res) {
    if (false) {
      res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  },
  validate_company_call: function(req, res) {
    if (false) {
      res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  }
};
