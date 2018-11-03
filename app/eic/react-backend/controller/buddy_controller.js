var test = require('../models/Test');
var buddy = require('../models/Buddy');
var student = require('../models/Student');
var googleUser = require('../models/GoogleUser');
var goog_token = require('../utils/token.utils');


//Gets all buddies in the db
exports.get_buddy_info = function(req,res,next){
	if(!goog_token.validate_buddy_call(req)){
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
	if(!goog_token.validate_buddy_call(req)){
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

//Adds student to this buddy's pending_student[]
exports.add_pending_student = function(req, res, next) {
	if(!goog_token.validate_buddy_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ googleProvider.token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			buddy.find({ 'contact': a_user.contact})
     			.exec(function(err, a_buddy){
         			if (err) return err;
         			student.find({ 'contact': req.params.student_email }
				.exec(function(err, a_student){
             			if(err) return err;
             			a_buddy.pending_student.push(a_student);
         			})
     			});
		});
	}
}

//Adds student to this buddy's student[] from pending_student[]
exports.accept_pending_student = function(req, res, next) {
	if(!goog_token.validate_buddy_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ googleProvider.token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			buddy.find({ 'contact': a_user.contact})
     			.exec(function(err, a_buddy){
         			if (err) return err;
         			a_buddy.pending_student.find({'contact': req.params.student_email }
				.exec(function(err, a_student){
             			if(err) return err;
             			a_buddy.student.push(a_student);
         			})
     			});
		});
	}
}

//View this buddy's pending students
exports.get_pending_student = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ googleProvider.token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			buddy.find({ 'contact': a_user.contact})
     			.exec(function(err, a_buddy){
         			if (err) return err;
         			a_buddy.pending_student.find()
				.exec(function(err, a_student){
             			if(err) return err;
             			res.json({a_student});
         			})
     			});
		});
	}
}

//View this buddy's accepted students
exports.get_student = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ googleProvider.token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			buddy.find({ 'contact': a_user.contact})
     			.exec(function(err, a_buddy){
         			if (err) return err;
         			a_buddy.student.find()
				.exec(function(err, a_student){
             			if(err) return err;
             			res.json({a_student});
         			})
     			});
		});
	}
}

