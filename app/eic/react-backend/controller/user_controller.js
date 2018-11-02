//install asynch dependencies
var async = require('async');
var test = require('../models/Test');
var User = require('../models/GoogleUser');
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


// Display detail page for a specific user
exports.user_detail = function(req, res, next) {

    async.parallel({
        user: function(callback) {

            User.find({ 'user': req.params.user_name})
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.user == null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('user_detail', { user: 'User', user_name:  results.user} );
    });

};
