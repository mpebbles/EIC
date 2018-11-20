var mongoose = require("mongoose");
var user = require("./User");

var Schema = mongoose.Schema;

var buddySchema = user.discriminator(
  "Buddy",
  new Schema({
    student: [{ type: Schema.Types.ObjectId, required: false, ref: "student" }],
    pending_student: [
      { type: Schema.Types.ObjectId, required: false, ref: "student" }
    ],
    company: { type: String, required: false, max: 100 },
    //{type: Schema.Types.ObjectId, required: false, ref: 'company'},
    biography: { type: String, required: false, max: 100 },
    skills: { type: String, required: false, max: 500 }
  })
);

module.exports = mongoose.model("Buddy");
