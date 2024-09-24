const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const purchaseSchema = new Schema({
  courseId: { type: ObjectId, required: true, ref: "courses", required: true },
  userId: { type: ObjectId, required: true, ref: "users", required: true },
  purchasedOn: { type: Date, default: Date.now },
  price: { type: Number, default: 0, min: 0, required: true },
});

const purchaseModel = model("purchases", purchaseSchema);

module.exports = purchaseModel;
