var mongoose = require('mongoose');
var user = require('.../models/GoogleUser');

var Schema = mongoose.Schema;

var companySchema = userSchema.discriminator('Company', new Schema({
	contracts: [{type: Schema.Type.ObjectId , required: false , ref: 'contract'}]
});

exports.Company = mongoose.model('Company', companySchema );
