const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// const auth = require('../middleware/auth');
// const config = require('config');

//
router.get("/test", (req, res) => {
  res.send("user route");
});
//get all categories

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ msg: "No cate found" });
    }
    return res.status(200).json({ msg: "Cate found", categories });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  const { slug, name } = req.body;
  try {
    const cate = await Category.findOne({ slug });
    if (cate) {
      return res.status(400).json({ msg: "Category already exists!" });
    }

    const newCategory = new Category({ slug, name });
    await newCategory.save();

    return res
      .status(201)
      .json({ msg: "Category created successfully", category: newCategory });
  } catch (err) {
    if (err.code === 11000) {
      // Xử lý lỗi duplicate key MongoDB
      return res.status(400).json({ msg: "Slug already exists!" });
    }
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;
