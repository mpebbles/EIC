var mongoose = require('mongoose');
var user = require('user');

var Schema = mongoose.Schema;

var buddySchema = user.discriminator('Buddy', new Schema({
	student: [{type: Schema.Types.ObjectId , required: false , ref: 'student'}],
	pending_student: [{type: Schema.Types.ObjectId , required: false , ref: 'student'}],
	company: {type: Schema.Types.ObjectId, required: false, ref: 'company'}

});

exports.Buddy = mongoose.model('Buddy', buddySchema );