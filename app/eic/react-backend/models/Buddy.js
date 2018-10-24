var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var buddySchema = new Schema({
	user_name: {type: String ,required: true, max: 100},
	full_name: {type: String , required: true, max: 100},
	contact: {type: String , required: true, max: 100},
	student: [{type: Schema.Types.ObjectId , required: false , ref: 'student'}],
	company: {type: Schema.Types.ObjectId, required: false, ref: 'company'}
	skills: [{type: String , required: false , max: 100}],

});

exports.Buddy = mongoose.model('Buddy', buddySchema );