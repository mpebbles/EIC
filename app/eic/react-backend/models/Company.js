var mongoose = require('mongoose');
var user = require('../models/User');

var Schema = mongoose.Schema;

var companySchema = user.discriminator('Company', new Schema({
	company_name: {type: String , required: true, max: 100},
	contracts: [{type: Schema.Type.ObjectId , required: false , ref: 'contract'}]
});

exports.Company = mongoose.model('Company', companySchema );