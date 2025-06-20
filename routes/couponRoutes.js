const express = require("express");
const Coupon = require("../models/Coupon");
const authMiddleware = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck");
const router = express.Router();
//get coupon by userid
router.get("/user", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const coupon = await Coupon.find({
      $or: [{ targetUsers: userId }, { targetUsers: [] }],
    });
    console.log(coupon);
    const couponList = coupon.map((coupon) => coupon);
    res.status(200).json({ couponList: couponList || [] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
//create coupon
router.post("/", async (req, res) => {
  try {
    const {
      code,
      title,
      discount,
      description,
      targetUsers,
      minOrder,
      expireAt,
    } = req.body;
    const coupon = await Coupon.create({
      code,
      title,
      discount,
      description,
      targetUsers,
      minOrder,
      expireAt,
    });
    res.status(201).json({ msg: "Coupon created", coupon });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//update coupon used
router.put("/used", async (req, res) => {
  const { userId, couponCode } = req.body;
  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    return res.status(404).json({ msg: "Coupon not found" });
  }

  try {
    coupon.usedBy.push(userId);
    await coupon.save();
    res.status(200).json({ msg: "Coupon updated", coupon });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//check coupon
router.post("/check", authMiddleware, async (req, res) => {
  const { couponCode, total } = req.body;
  const userId = req.user.id;
  try {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }
    if (coupon.expireAt < new Date()) {
      return res.status(400).json({ msg: "Coupon expired" });
    }
    if (coupon.minOrder > total) {
      return res
        .status(400)
        .json({ msg: "Total order is less than min order" });
    }
    if (coupon.targetUsers.length > 0 && !coupon.targetUsers.includes(userId)) {
      return res.status(400).json({ msg: "Coupon is not for you" });
    }
    if (coupon.usedBy.includes(userId)) {
      return res.status(400).json({ msg: "Coupon already used" });
    }
    res.status(200).json({ msg: "Coupon is valid", coupon });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//delete coupon
router.delete("/", authMiddleware, roleCheck("admin"), async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOneAndDelete({ code });
  if (!coupon) {
    return res.status(404).json({ msg: "Coupon not found" });
  }
  res.status(200).json({ msg: "Coupon deleted", coupon });
});

module.exports = router;
