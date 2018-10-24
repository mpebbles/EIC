var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contractSchema = new Schema({
	company_name: {type: String , required: true, max: 100},
	related_skills: [{type: String, required: false , max 100}],
	related_resources: [{type: Schema.Type.ObjectId , required: false , ref: 'resource'}]
});

exports.Contract = mongoose.model('Contract', contractSchema );