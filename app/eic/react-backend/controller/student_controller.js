var test = require('../models/Test');
var buddy = require('../models/Buddy');
var student = require('../models/Student');
var googleUser = require('../models/GoogleUser');
var goog_token = require('../utils/token.utils');
var { findEmailByToken } = require('../models/GoogleUser');

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

// Gets buddy profile info based off of token
exports.get_student_profile = function(req,res,next){
	if(!goog_token.validate_buddy_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
		token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
		findEmailByToken(token_to_find_in_db, function(err, contact) {
			if(err){return next(err)};
			student.findOne({ 'contact': contact})
			// this is a_user to make front end logic easier
			.exec(function(err, a_user){
				res.json([{a_user}]);
			})
		});
	}
}

//Get students who have partial matches based on the user name
exports.get_student_partial = function(req,res,next){
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		//console.log(googleUser.find());
		student.find({"user_name":{"$regex":req.params.id,"$options":"i"}})
		.limit(10)
		.exec(function(err,student){
		if(err){return next(err)};
		res.json([{student}]);
	});
	}

}

//Adds buddy to this student's pending_buddy[],
// also adds student to buddy's pending_student[]
exports.add_pending_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
		token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
  	findEmailByToken(token_to_find_in_db, function(err, contact) {
			if(err){return next(err)};
			student.findOne({'contact': contact})
     	.exec(function(err, a_student){
        if (err) return err;
        buddy.findOne({ 'contact': req.params.buddy_email })
				.exec(function(err, a_buddy){
      		if(err) return err;
					student.findOneAndUpdate(
   					{ _id: a_student._id },
   					{ $push: {pending_buddy: a_buddy._id}
					}).exec();
					buddy.findOneAndUpdate(
						{ _id: a_buddy._id },
						{ $push: {pending_student: a_student._id}
					}).exec();
      	})
      });
		});
	}
}

/*
//Adds student to this buddy's student[] from pending_student[]
exports.accept_pending_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ eic_token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			student.find({ 'contact': a_user.contact})
     			.exec(function(err, a_student){
         			if (err) return err;
         			a_student.pending_buddy.find({'contact': req.params.buddy_email }
				.exec(function(err, a_buddy){
             			if(err) return err;
             			a_student.buddy.push(a_buddy);
         			})
     			});
		});
	}
}

//Deletes student from this buddy's pending_student[]
exports.delete_pending_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ eic_token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			student.find({ 'contact': a_user.contact})
     			.exec(function(err, a_student){
         			if (err) return err;
         			a_student.pending_buddy.deleteOne({'contact': req.params.buddy_email }
				.exec(function(err, a_buddy){
             			if(err) return err;
         			})
     			});
		});
	}
}

//Deletes student from this buddy's student[]
exports.delete_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ eic_token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			student.find({ 'contact': a_user.contact})
     			.exec(function(err, a_student){
         			if (err) return err;
         			a_student.buddy.deleteOne({'contact': req.params.buddy_email }
				.exec(function(err, a_buddy){
             			if(err) return err;
         			})
     			});
		});
	}
}

//View this student's pending buddies
exports.get_pending_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		googleUser.find({ eic_token : req.params.goog_token })
		.exec(function(err,a_user){
		if(err){return next(err)};
			student.find({ 'contact': a_user.contact})
     			.exec(function(err, a_student){
         			if (err) return err;
         			a_student.pending_buddy.find()
				.exec(function(err, a_buddy){
             			if(err) return err;
             			res.json({a_buddy});
         			})
     			});
		});
	}
}
*/
//View this student's accepted buddies
exports.get_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
		token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
		findEmailByToken(token_to_find_in_db, function(err, contact) {
		if(err){return next(err)};
			student.findOne({ 'contact': contact})
     	.exec(function(err, a_student){
        if (err) return err;
				buddy.find({"_id": {$in: a_student.buddy}})
				.exec(function(err, a_buddy){
        	if(err) return err;
          res.json([{a_buddy}]);
         	})
     	});
		});
	}
}
