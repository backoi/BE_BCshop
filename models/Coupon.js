const mongoose = require("mongoose");
const couponSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  targetUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  minOrder: {
    type: Number,
    required: true,
  },
  usedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
