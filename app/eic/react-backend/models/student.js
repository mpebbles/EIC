var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
	user_name: {type: String ,required: true, max: 100},
	skills: [{type: String , required: false , max: 100}],
	biography: {type: String , required: true, max:100},
	contact: {type: String , required: true, max:100},
	full_name: {type: String , required: true, max: 100},
	buddy: [{type: Schema.Types.ObjectId , required: false , ref: 'buddy'}],
	resources_completed: [{type: Schema.Types.ObjectId, required: false , ref: 'resources'}]
});

exports.Student = mongoose.model('Student', studentSchema );