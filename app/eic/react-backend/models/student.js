var mongoose = require('mongoose');
var user = require('user');

var Schema = mongoose.Schema;

var studentSchema = user.discriminator('Student', new Schema({
	biography: {type: String , required: true, max:100},
	buddy: [{type: Schema.Types.ObjectId , required: false , ref: 'buddy'}],
	pending_buddy: [{type: Schema.Types.ObjectId , required: false , ref: 'buddy'}],
	resources_completed: [{type: Schema.Types.ObjectId, required: false , ref: 'resources'}]
});

exports.Student = mongoose.model('Student', studentSchema );