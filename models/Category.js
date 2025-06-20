const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // "tuong", "mohinh"
    name: { type: String, required: true, unique: true }, // "tượng", "mô hình"
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
