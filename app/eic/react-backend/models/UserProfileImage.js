var mongoose = require("mongoose");
var user = require("../models/User");

var Schema = mongoose.Schema;

var UserImageSchema = new Schema({
  userImage: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("UserProfileImage", UserImageSchema);
