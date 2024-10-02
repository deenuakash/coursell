const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const verificationSchema = new Schema({
  userId: { type: ObjectId, ref: "users" },
  email: String,
  otp: String,
  expires: Date,
});

const verificationModel = model("verification", verificationSchema);

module.exports = verificationModel;
