var company = require("../models/Company");
var mongoose = require("mongoose");

//Insert new student into database
//Token validation not needed due to registration workflow
exports.create_company_account = function(req, res, next) {
  new company({
    user_name: req.header("x-user-name"),
    contact: JSON.parse(JSON.stringify(req.user)).email
  }).save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    return next();
  });
};
