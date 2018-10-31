var mongoose = require('mongoose');
var user = require('.../models/GoogleUser');

var Schema = mongoose.Schema;

var studentSchema = userSchema.discriminator('Student', new Schema({
	skills: [{type: String , required: false , max: 100}],
	biography: {type: String , required: true, max:100},
	full_name: {type: String , required: true, max: 100},
	buddy: [{type: Schema.Types.ObjectId , required: false , ref: 'buddy'}],
	resources_completed: [{type: Schema.Types.ObjectId, required: false , ref: 'resources'}]
});

exports.Student = mongoose.model('Student', studentSchema );
