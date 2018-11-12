var mongoose = require('mongoose');
var user = require('../models/User');
var fs = require('fs');

var Schema = mongoose.Schema;

var User_Profile_Image_Schema = user.discriminator('User_Profile_Image', new Schema({
	User_Image: {data:Buffer, contentType:String}

});

module.exports = mongoose.model('User_Profile_Image');
