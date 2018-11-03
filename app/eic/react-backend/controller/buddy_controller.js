var test = require('../models/Test');
var buddy = require('../models/Buddy');
var goog_token = require('../utils/token.utils');


//Gets all buddies in the db
exports.get_buddy_info = function(req,res,next){
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		buddy.find()
		.exec(function(err,buddy){
		if(err){return next(err)};
		res.json([{buddy}]);
		});
	}
}
//Gets buddy based on email
exports.get_buddy_email = function(req,res,next){
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		buddy.find({contact:req.params.id})
		.exec(function(err,buddy){
		if(err){return next(err)};
		res.json([{buddy}]);
		});
	}
}
//Gets buddy based on partial matches
exports.get_buddy_partial = function(req,res,next){
	if(!goog_token.validate_buddy_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		console.log(req.params.id);
		buddy.find({"user_name":{"$regex":req.params.id,"$options":"i"}})
		.limit(10)
		.exec(function(err,buddy){
		if(err){return next(err)};
		res.json([{buddy}]);
	});
	}

}
