//**********************************************************************
//NOTE FOR BRADLY:
//If you can find a better way to export all these functions 
//it would be appreciated I had to quickly export these functions for 
//the validation calls
//**********************************************************************

var jwt = require('jsonwebtoken');
var user = require('../models/GoogleUser');

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
		user.findOne({ googleProvider.token : req.user._id})
		.exec(function(err,a_user){
			if(err){return next(err)};
 			a_user.eic_token = req.token;
		});

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