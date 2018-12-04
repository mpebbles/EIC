var jwt = require("jsonwebtoken");
var { addEICToken, findUsertypeByToken } = require("../models/GoogleUser");
var buddyController = require("../controller/buddyController");
var studentController = require("../controller/studentController");
var companyController = require("../controller/companyController");

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

exports.validateStudentCall = function(req, res) {
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findUsertypeByToken(tokenToFindInDb, function(err, type) {
    if (err) {
      return next(err);
    } else if (type !== "Student") {
      return;
      //res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  });
};

exports.validateBuddyCall = function(req, res) {
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findUsertypeByToken(tokenToFindInDb, function(err, type) {
    if (err) {
      return next(err);
    } else if (type !== "Buddy") {
      return;
      //res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
    }
  });
};

exports.validateCompanyCall = function(req, res) {
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  findUsertypeByToken(tokenToFindInDb, function(err, type) {
    if (err) {
      return next(err);
    } else if (type !== "Company") {
      return;
      //res.status(401).send("401 ERROR UNAUTHORISED TOKEN");
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
    let accountType = req.header("x-account-type");
    let userName = req.header("x-user-name");
    let userEmail = req.user.contact; //JSON.parse(JSON.stringify(req.user)).email;
    console.log("Insert into database", accountType, userName, userEmail);

    if (accountType === "Buddy") {
      buddyController.createBuddyAccount(req, res, next);
      res.locals.eicUserType = "Buddy";
    } else if (accountType === "Student") {
      studentController.createStudentAccount(req, res, next);
      res.locals.eicUserType = "Student";
    } else if (accountType === "Company") {
      companyController.createCompanyAccount(req, res, next);
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
