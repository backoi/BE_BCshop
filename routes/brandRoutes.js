const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");
router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.json({ brands });
});

module.exports = router;
