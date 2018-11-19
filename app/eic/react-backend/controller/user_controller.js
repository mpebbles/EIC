var test = require('../models/Test');
var User = require('../models/GoogleUser');
var eic_user = require('../models/User');
var googleUser = require('../models/GoogleUser');
var User = require('../models/User');
var Student = require('../models/Student')
var Buddy = require('../models/Buddy')
var token_utils = require('../utils/token.utils');
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
  console.log("Getting user type");

  User.findOne({ contact: 'bpuckett@ucsc.edu' }, function (err, user) {
    console.log("Found user type", user.itemtype);
    res.send(user.itemtype);
  });

  // var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
  // token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
  // //console.log(token_to_find_in_db)
  // findEmailByToken(token_to_find_in_db, function(err, contact) {
  //   console.log(contact);
  //   User.findOne({'contact': contact})
  //   .exec(function(err, account){
  //     res.send(account.itemtype);
  //   });
  // });
}

exports.log_in_user = function(req, res, next) {
    let user_info = JSON.parse(JSON.stringify(req.user));
    let user_email = user_info.email;
    eic_user.findOne({contact: user_email}, function(err, result) {
      if(err) {
        return res.status(406).send();
      } else {
        if(result ===  null) {
          return res.status(406).send();
        }
        res.locals.eicUserType = result.itemtype;
        return next();
      }
    });
}
