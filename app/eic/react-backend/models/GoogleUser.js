var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var googleUserSchema = new Schema({
  userName: { type: String, required: true, max: 100 },
  fullName: { type: String, required: true, max: 100 },
  eicToken: { type: String, required: false },
  skills: [{ type: String, required: false, max: 100 }],
  contact: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

googleUserSchema.set("toJSON", { getters: true, virtuals: true });

googleUserSchema.statics.upsertGoogleUser = function(
  accessToken,
  refreshToken,
  profile,
  cb
) {
  var that = this;
  return this.findOne(
    {
      "googleProvider.id": profile.id
    },
    function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          userName: profile.emails[0].value,
          contact: profile.emails[0].value,
          googleProvider: {
            id: profile.id,
            token: accessToken
          },
          eicToken: ""
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
    }
  );
};

googleUserSchema.statics.addEICToken = function(req, res, next) {
  mongoose
    .model("GoogleUser")
    .update({ _id: req.user._id }, { $set: { eicToken: req.token } }, function(
      err,
      result
    ) {
      //console.log(err);
    });
};

googleUserSchema.statics.findEmailByToken = function(tokenStr, nextFunc) {
  mongoose
    .model("GoogleUser")
    .findOne({ eicToken: tokenStr })
    .exec(function(err, user) {
      if (user == null) {
        console.log(tokenStr);
      } else {
        nextFunc(err, user.contact);
      }
    });
};

googleUserSchema.statics.findUsertypeByToken = function(tokenStr, nextFunc) {
  mongoose
    .model("GoogleUser")
    .findOne({ eicToken: tokenStr })
    .exec(function(err, user) {
      if (user == null) {
        console.log(tokenStr);
      } else {
        nextFunc(err, user.itemtype);
      }
    });
};

exports.GoogleUser = mongoose.model("GoogleUser", googleUserSchema);
module.exports = {
  addEICToken: googleUserSchema.statics.addEICToken,
  findEmailByToken: googleUserSchema.statics.findEmailByToken,
  findUsertypeByToken: googleUserSchema.statics.findUsertypeByToken
};

module.exports = mongoose.model("GoogleUser");
