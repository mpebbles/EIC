var mongoose = require('mongoose');
var user = require('.../models/GoogleUser');

var Schema = mongoose.Schema;

var buddySchema = userSchema.discriminator('Buddy', new Schema({
	full_name: {type: String , required: true, max: 100},
	student: [{type: Schema.Types.ObjectId , required: false , ref: 'student'}],
	company: {type: Schema.Types.ObjectId, required: false, ref: 'company'}
	skills: [{type: String , required: false , max: 100}],

});

exports.Buddy = mongoose.model('Buddy', buddySchema );
