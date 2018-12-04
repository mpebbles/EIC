var company = require("../models/Company");
var { findEmailByToken } = require("../models/GoogleUser");
var tokenUtils = require("../utils/token.utils");

//Insert new company into database
//Token validation not needed due to registration workflow
exports.createCompanyAccount = function(req, res, next) {
  new company({
    userName: req.header("x-user-name"),
    contact: req.user.contact
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    return next();
  });
};

//Returns all companies and their info
exports.getCompanyInfo = function(req, res, next) {
  company.find().exec(function(err, company) {
    if (err) {
      return next(err);
    }
    res.json([{ company }]);
  });
};

exports.getCompanyProfile = function(req, res, next) {
  console.log("zero");
  tokenUtils.validateCompanyCall(req, res);
  var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
    " "
  )[1];
  tokenToFindInDb = tokenToFindInDb.substring(
    0,
    tokenToFindInDb.length - 1
  );
  console.log("one");
  findEmailByToken(tokenToFindInDb, function(err, contact) {
    if (err) {
      return next(err);
    }
    console.log("two");
    company
      .findOne({ contact: contact })
      // this is aUser to make front end logic easier
      .exec(function(err, aUser) {
        console.log(aUser);
        res.json([{ aUser }]);
      });
  });
};

exports.editCompanyProfile = [
  (req, res, next) => {
    var tokenToFindInDb = JSON.stringify(req.headers.authorization).split(
      " "
    )[1];
    tokenToFindInDb = tokenToFindInDb.substring(
      0,
      tokenToFindInDb.length - 1
    );
    findEmailByToken(tokenToFindInDb, function(err, contact) {
      company
        .findOneAndUpdate(
          { contact: contact },
          {
            biography: req.body.biography
          }
        )
        .exec();
    });
  }
];
