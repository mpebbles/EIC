var test = require('../models/Test');
var student = require('../models/Student');
var goog_token = require('../utils/token.utils');


//Returns all students and their info
exports.get_student_info = function(req,res,next){
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		student.find()
		.exec(function(err,student){
		if(err){return next(err)};
		res.json([{student}]);
	});
	}
	
}

//Gets information based on the specific email
exports.get_student_email = function(req,res,next){
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		student.find({contact:req.params.id})
		.exec(function(err,student){
		if(err){return next(err)};
		res.json([{student}]);
		});
	}	

}
//Get students who have partial matches based on the user name
exports.get_student_partial = function(req,res,next){
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		student.find({"user_name":{"$regex":req.params.id,"$options":"i"}})
		.limit(10)
		.exec(function(err,student){
		if(err){return next(err)};
		res.json([{student}]);
	});
	}
	
}

