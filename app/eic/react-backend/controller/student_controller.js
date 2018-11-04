var test = require('../models/Test');
var buddy = require('../models/Buddy');
var student = require('../models/Student');
var googleUser = require('../models/GoogleUser');
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
		console.log(googleUser.find());
		student.find({"user_name":{"$regex":req.params.id,"$options":"i"}})
		.limit(10)
		.exec(function(err,student){
		if(err){return next(err)};
		res.json([{student}]);
	});
	}

}

//Adds buddy to this student's pending_buddy[]
exports.add_pending_buddy = function(req, res, next) {
	if(!goog_token.validate_student_call(req)){
		res.send('401 ERROR UNAUTHORISED TOKEN');
	}
	else{
		//googleUser.find({ googleProvider.eic_token : req. })
		//.exec(function(err,a_user){
		//if(err){return next(err)};
		//	student.find({ 'contact': a_user.contact})
    // 			.exec(function(err, a_student){
    //    			if (err) return err;
    //     			buddy.find({ 'contact': req.params.buddy_email })
		//		.exec(function(err, a_buddy){
    //         			if(err) return err;
    //         			a_student.pending_buddy.push(a_buddy);
    //     			})
    // 			});
		//});
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

//View this student's accepted buddies
exports.get_buddy = function(req, res, next) {
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
         			a_student.buddy.find()
				.exec(function(err, a_buddy){
             			if(err) return err;
             			res.json({a_buddy});
         			})
     			});
		});
	}
}
*/
