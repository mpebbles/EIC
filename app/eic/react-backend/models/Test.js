var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var testSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model("test", testSchema);
