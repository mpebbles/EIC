var test = require('../models/Test');
var User = require('../models/GoogleUser');
var eic_user = require('../models/User');
var googleUser = require('../models/GoogleUser');
var User = require('../models/User');
var Student = require('../models/Student')
var Buddy = require('../models/Buddy')
var goog_token = require('../utils/token.utils');
var { findEmailByToken } = require('../models/GoogleUser');

exports.list_users = function(req, res, next) {
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
}

exports.list_db = function(req, res, next) {
	test.find()
	.exec(function(err,list_test){
	if(err){return next(err)};
 	res.json([{list_test}]);
	});
}

//return user type
exports.get_user_type = function(req,res,next){
  // TODO: refactor and implement the token validation calls
  if(!goog_token.validate_student_call(req)
     && !goog_token.validate_buddy_call(req)
     && !goog_token.validate_comany_call(req)) {
       res.send('401 ERROR UNAUTHORISED TOKEN');
  }
  var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
  token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
  //console.log(token_to_find_in_db)
  findEmailByToken(token_to_find_in_db, function(err, contact) {
    console.log(contact);
    User.findOne({'contact': contact})
    .exec(function(err, account){
      res.send(account.itemtype);
    });
  });
}

exports.check_user_exists = function(email) {
	eic_user.count({contact: email}, function (err, count){ 
    	if(count>0){
    		console.log("Count is greater than zero")
        	return true;
    	}
	}); 
	console.log("Count is zero");
	return false;
}
