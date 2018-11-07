var mongoose = require('mongoose');
var user_main = require('../models/User');

var Schema = mongoose.Schema;

var studentSchema = user_main.discriminator('Student', new Schema({
	biography: {type: String , required: false, max:100},
	interests: {type: String , required: false, max:100},
	buddy: [{type: Schema.Types.ObjectId , required: false , ref: 'buddy'}],
	pending_buddy: [{type: Schema.Types.ObjectId , required: false , ref: 'buddy'}],
	resources_completed: [{type: Schema.Types.ObjectId, required: false , ref: 'resources'}]
}));

module.exports = mongoose.model('Student');
