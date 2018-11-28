var mongoose = require("mongoose");

var resourceSchema = mongoose.model(
  "Resource",
  new mongoose.Schema({
      title: {type: String, required: true, max: 100},
      creator: {type: String, required: true, max: 100},
      creation_date: {type: String, required: true, max: 100},
      related_skills: [{type: String, required: false, max: 100}],
      content: {type: String, required: true, max: 100}
  })
);

module.exports = mongoose.model("Resource");
