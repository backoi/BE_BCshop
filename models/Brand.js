const mongoose = require("mongoose");
const brandSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // "MegaHouse", "ArtSpirit"
    slug: { type: String, required: true, unique: true }, // "mega-house", "art-spirit"
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
