var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var resourceSchema = new Schema({
	title: {type: String , required: true, max: 100},
	creator: {type: String , required: true, max: 100},
	creation_date: {type: String , required: true, max: 100},
	related_skills: [{type: String , required: false, max: 100}],
	content: {type: String , required: true, max: 100}
});

exports.Resource = mongoose.model('Resource', resourceSchema );
