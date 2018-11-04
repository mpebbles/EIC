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
    putTokenInDB: function(req, res, next) {
      addEICToken(req, res, next);
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
