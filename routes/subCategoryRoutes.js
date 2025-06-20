const express = require("express");
const SubCategory = require("../models/SubCategory");
const router = express.Router();

// const auth = require('../middleware/auth');
// const config = require('config');

//
router.get("/test", (req, res) => {
  res.send("user route");
});
//get all categories

router.get("/", async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    if (!subCategories) {
      return res.status(404).json({ msg: "No subcate found" });
    }
    return res.status(200).json({ msg: "Cate found", subCategories });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await Category.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ msg: "No cate found" });
//     }
//     return res.status(200).json({ msg: "Cate found", user });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

router.post("/", async (req, res) => {
  const { slug, name, category } = req.body;
  try {
    let cate = await SubCategory.findOne({
      slug,
    });
    if (cate) {
      return res.status(400).json({
        msg: "Cate already exists",
      });
    }
    cate = new SubCategory({
      slug,
      name,
      category,
    });
    await cate.save();

    return res.status(201).json({
      msg: "Created successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
