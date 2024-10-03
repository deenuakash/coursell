const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const courseSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: ObjectId, required: true, ref: "users" },
  updatedAt: { type: Date, default: Date.now },
  description: { type: String },
});

const courseModel = model("courses", courseSchema);

module.exports = courseModel;
