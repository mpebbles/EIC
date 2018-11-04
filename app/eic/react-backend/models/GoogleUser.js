var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var googleUserSchema = new Schema({
    user_name: {type: String ,required: true, max: 100},
    full_name: {type: String , required: true, max: 100},
    eic_token: {type: String , required: false},
    skills: [{type: String , required: false , max: 100}],
    contact: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    }
});

googleUserSchema.set('toJSON', {getters: true, virtuals: true});

googleUserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
	var that = this;
	return this.findOne({
		'googleProvider.id': profile.id
	}, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
            	var newUser = new that({
            		full_name: profile.displayName,
            		user_name: profile.emails[0].value,
            		contact: profile.emails[0].value,
            		googleProvider: {
            			id: profile.id,
            			token: accessToken
            		},
                eic_token: "",
            	});
              //console.log("HERE!!!!!!")
            	newUser.save(function(error, savedUser) {
            		if (error) {
            			console.log(error);
            		}
            		return cb(error, savedUser);
            	});
            } else {
            	return cb(err, user);
            }
        });
};

googleUserSchema.statics.addEICToken = function(req, res, next) {
  mongoose.model('GoogleUser').update({ "_id": req.user._id },
   { $set: { "eic_token": req.token } }, function(err, result) {
    //console.log(err);
   });
};

googleUserSchema.statics.findEmailByToken = function(token_str, next_func) {
  mongoose.model('GoogleUser').findOne({"eic_token": token_str}).exec(function(err, user){
    next_func(err, user.contact);
  });
}

exports.GoogleUser = mongoose.model('GoogleUser', googleUserSchema);
module.exports = {
  addEICToken: googleUserSchema.statics.addEICToken,
  findEmailByToken: googleUserSchema.statics.findEmailByToken,
}
