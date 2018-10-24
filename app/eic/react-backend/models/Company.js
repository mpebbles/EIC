var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var companySchema = new Schema({
	company_name: {type: String , required: true, max: 100},
	contracts: [{type: Schema.Type.ObjectId , required: false , ref: 'contract'}]
});

exports.Company = mongoose.model('Company', companySchema );