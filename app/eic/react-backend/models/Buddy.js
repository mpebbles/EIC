var mongoose = require('mongoose');
var user = require('../models/User');

var Schema = mongoose.Schema;

var buddySchema = user.discriminator('Buddy', new Schema({
	student: [{type: Schema.Types.ObjectId , required: false , ref: 'student'}],
	pending_student: [{type: Schema.Types.ObjectId , required: false , ref: 'student'}],
	company: {type: Schema.Types.ObjectId, required: false, ref: 'company'}

}));

module.exports = mongoose.model('Buddy');
