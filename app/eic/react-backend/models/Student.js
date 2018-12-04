var mongoose = require("mongoose");
var user = require("./User");

var Schema = mongoose.Schema;

var studentSchema = user.discriminator(
  "Student",
  new Schema({
    biography: { type: String, required: false, max: 1000 },
    interests: { type: String, required: false, max: 500 },
    buddy: [{ type: Schema.Types.ObjectId, required: false, ref: "buddy" }],
    pendingBuddy: [
      { type: Schema.Types.ObjectId, required: false, ref: "buddy" }
    ],
    resourcesCompleted: [
      { type: Schema.Types.ObjectId, required: false, ref: "resources" }
    ]
  })
);

module.exports = mongoose.model("Student");
