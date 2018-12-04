var mongoose = require("mongoose");
var user = require("./User");

var Schema = mongoose.Schema;

var companySchema = user.discriminator(
  "Company",
  new Schema({
    companyName: { type: String, required: false, max: 100 },
    biography: { type: String, required: false, max: 100 },
    contracts: [
      { type: Schema.Types.ObjectId, required: false, ref: "contract" }
    ]
  })
);

module.exports = mongoose.model("Company");
