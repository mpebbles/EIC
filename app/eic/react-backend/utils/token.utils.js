var jwt = require("jsonwebtoken");
var { addEICToken, findUsertypeByToken } = require("../models/GoogleUser");
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

exports.validate_student_call = function (req, res) {
  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findUsertypeByToken(token_to_find_in_db, function (err, type) {
    if (err) {
      return next(err);
    } else if (type !== "Student") {
      res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  });
};

exports.validate_buddy_call = function (req, res) {
  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
  0,
  token_to_find_in_db.length - 1
  );
  findUsertypeByToken(token_to_find_in_db, function (err, type) {
    if (err) {
      return next(err);
    } else if (type !== "Buddy") {
      res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  });
};

exports.validate_company_call = function (req, res) {
  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  token_to_find_in_db = token_to_find_in_db.substring(
    0,
    token_to_find_in_db.length - 1
  );
  findUsertypeByToken(token_to_find_in_db, function (err, type) {
    if (err) {
      return next(err);
    } else if (type !== "Company") {
      res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  });
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
    let user_email = req.user.contact; //JSON.parse(JSON.stringify(req.user)).email;
    console.log("Insert into database", account_type, user_name, user_email);

    if (account_type === "Buddy") {
      buddy_controller.create_buddy_account(req, res, next);
      res.locals.eicUserType = "Buddy";
    } else if (account_type === "Student") {
      student_controller.create_student_account(req, res, next);
      res.locals.eicUserType = "Student";
    } else if (account_type === "Company") {
      company_controller.createCompanyAccount(req, res, next);
      res.locals.eicUserType = "Company";
    } else {
      return res.status(500);
    }
  },
  sendToken: function(req, res) {
    res.setHeader("x-auth-token", req.token);
    res.setHeader("x-user-type", String(res.locals.eicUserType));
    return res.status(200).send(JSON.stringify(req.user));
  }
};
