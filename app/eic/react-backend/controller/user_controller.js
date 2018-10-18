//install asynch dependencies
var async = require('async');
var test = require('../models/test');
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