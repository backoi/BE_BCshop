const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
// const config = require('config');

//test error
// router.get("/error", async (req, res) => {
//   try {
//     const user = await User.findById("6847ae26b9005b519ee");
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }
//     res.status(200).json({ msg: "User found", user });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//get user info
router.get("/me", authMiddleware, async (req, res) => {
  // console.log("đã vào");
  // console.log("req.user: ", req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User found", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//update user info
router.put("/testupdate", async (req, res) => {
  try {
    const { type, city, district, ward, street, phone, isDefault } = req.body;
    const user = await User.findById("6847ae28161a6b9005b519ee");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //xóa address cũ
    //user.address = [];
    user.address.push({
      type,
      city,
      district,
      ward,
      street,
      phone,
      isDefault,
    });
    await user.save();
    res.status(200).json({ msg: "User updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//update user info
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const { username, email, phone, city } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.username = username;
    user.email = email;
    //tìm address có isDefault = true
    const address = user.address.find((address) => address.isDefault);
    if (address) {
      address.phone = phone;
      address.city = city;
    } else {
      user.address.push({ phone, city, isDefault: true });
    }
    await user.save();
    res.status(200).json({ msg: "User updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
//add address
router.post("/address", async (req, res) => {
  try {
    const { city, district, ward, street, phone, isDefault, type } = req.body;
    const newAddress = { type, city, district, ward, street, phone, isDefault };
    const user = await User.findById("6847ae28161a6b9005b519ee");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.address.push(newAddress);
    //cap nhat luon
    await user.save();
    res.status(200).json({
      msg: "Address added",
      address: user.address[user.address.length - 1],
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
//delete address
router.delete("/address/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.address = user.address.filter(
      (address) => address._id.toString() !== id
    );
    await user.save();
    //console.log("user", user);
    res.status(200).json({ msg: "Address deleted", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//update role
router.put("/role", async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.role = role;
    await user.save();
    res.status(200).json({ msg: "Role updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//address default
router.put("/address/default/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findById("6847ae28161a6b9005b519ee");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.address.forEach((address) => {
      if (address._id.toString() === id) {
        address.isDefault = true;
      } else {
        address.isDefault = false;
      }
    });
    //console.log("usernew", user);
    await user.save(null, { new: true });
    res.status(200).json({ msg: "Address updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
//get orders
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
module.exports = router;
