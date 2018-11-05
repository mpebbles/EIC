//**********************************************************************
//NOTE FOR BRADLY:
//If you can find a better way to export all these functions
//it would be appreciated I had to quickly export these functions for
//the validation calls
//**********************************************************************
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var googleUser = require('../models/GoogleUser');
var { addEICToken } = require('../models/GoogleUser');
var eic_user = require('../models/User');
var user_controller = require('../controller/user_controller');

var createToken = function(auth) {
	return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

var validate_student_call = function(req) {
	return true;
};

var validate_buddy_call = function(req) {
	return true;
};

var validate_company_call = function (req) {
	return true;
};

module.exports = {
	generateToken: function(req, res, next) {
     	req.token = createToken(req.auth);
     	return next();
  	},
    ensureUserExists: function(req, res, next) {
      let user_info = JSON.parse(JSON.stringify(req.user));
	  let user_email = user_info.email;
      console.log("Checking if user exists", user_email);
      if(user_controller.check_user_exists(user_email)) {
        console.log("User exists in user db", user_email);
        return next();
      } else {
        console.log("User doesnt exist in db", user_email);
        return res.status(406).send();
      }
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
      return next();
    },
  	sendToken: function(req, res) {
      	res.setHeader('x-auth-token', req.token);
      	return res.status(200).send(JSON.stringify(req.user));
  	},
  	validate_student_call,
  	validate_buddy_call,
  	validate_company_call
};
