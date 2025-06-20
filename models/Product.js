const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  saleOff: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  difficulty: { type: Number, default: 0 },
  pieces: { type: Number, default: 0 },
  dimensions: {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    length: { type: Number, default: 0 },
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  video: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
  description: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
