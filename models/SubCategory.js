const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // "gundam", "go_huong"
    name: { type: String, required: true }, // "gün dám", "gỗ hương"
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
