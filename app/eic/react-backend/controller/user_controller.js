var test = require('../models/Test');
var googleUser = require('../models/GoogleUser');
var user = require('../models/User');
var student = require('../models/Student');
var buddy = require('../models/Buddy');
var userProfileImage = require('../models/UserProfileImage');
var goog_token = require('../utils/token.utils');
var fs = require('fs');
var { findEmailByToken } = require('../models/GoogleUser');
const {body,validationResult} = require('express-validator/check');
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
    user.findOne({'contact': contact})
    .exec(function(err, account){
      res.send(account.itemtype);
    });
  });
}

//this is the post request to add/update a user's profile image

exports.addUserProfileImage = [
  (req, res, next) => {
    if(!goog_token.validate_student_call(req)){
      res.send('401 ERROR UNAUTHORISED TOKEN');
    }
    else{
      var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
      token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
    
      findEmailByToken(token_to_find_in_db, function(err, contact) {
        user.findOne({'contact': contact})
        .exec(function(err, user){
          if(!user.userProfileImageId){
            console.log('user doesnt have file');
            var newUserImage = new userProfileImage();
            newUserImage.userImage.data = fs.readFileSync(req.file.path);
            newUserImage.save();
            user.userProfileImageId = newUserImage.id;
            user.save();
            fs.unlink(req.file.path);
          }
          else{
            console.log('found user with image');
            userProfileImage.findById(user.userProfileImageId,
            (function(err, userProfileImage){
              userProfileImage.userImage.data = fs.readFileSync(req.file.path);
              userProfileImage.save();
              fs.unlink(req.file.path, (err)=> {
                if(err) throw err; 
                console.log('could not delete file');
              });
            }));
          }
        });
      });
    }

  }
]
exports.getUserProfileImage = function(req, res, next){
  if(!goog_token.validate_buddy_call(req)){
    res.send('401 ERROR UNAUTHORISED TOKEN');
  }
  else{
    var token_to_find_in_db = JSON.stringify(req.headers.authorization).split(" ")[1];
    console.log(token_to_find_in_db);
    token_to_find_in_db = token_to_find_in_db.substring(0,token_to_find_in_db.length - 1);
    findEmailByToken(token_to_find_in_db, function(err, contact) {
      user.findOne({'contact':'hycheng@ucsc.edu'})
      .exec(function(err, user){
        console.log(user.userProfileImageId);
        userProfileImage.findById(user.userProfileImageId,
        function(err, userProfileImage){
          console.log(userProfileImage.id);
          if(err){throw err;}
          if(!userProfileImage){res.send('error image not found');}
          else{
            res.send(userProfileImage.userImage.data);
          }
        });
      });
    });
  }
}

exports.getTestImage = function(req, res, next){
  user.findOne({'contact':'hycheng@ucsc.edu'})
  .exec(function(err, user){
    console.log(user.userProfileImageId);
    userProfileImage.findById(user.userProfileImageId,
      (function(err, userProfileImage){
        console.log(userProfileImage.id);
        if(err){throw err;}
        if(!userProfileImage){res.send('error image not found');}
        else{
          res.send(userProfileImage.userImage.data);
        }
      }));
   
    
  });
}