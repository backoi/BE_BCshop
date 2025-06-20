const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const authMiddleware = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheck");

// @route   POST api/order
// @desc    Create a new order
// @access  Private
router.post("/", async (req, res) => {
  try {
    const {
      cart,
      shipOption,
      notes,
      discount,
      total,
      paymentMethod,
      shipAddress,
    } = req.body.orderInfo;
    //console.log("vao router order", req.body.orderInfo.shipAddress);
    const newOrder = new Order({
      user: "682e1f7e4cee45344764afc7",
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      shipAddress: {
        fullName: shipAddress.fullName,
        street: shipAddress.street,
        district: shipAddress.district,
        ward: shipAddress.ward,
        city: shipAddress.city,
        phone: "0987654321",
      },
      paymentMethod,
      paymentStatus: paymentMethod == "cash" ? "pending" : "completed",
      shipOption,
      discount,
      notes,
      status: paymentMethod == "cash" ? "pending" : "processing",
    });

    const order = await newOrder.save();
    res.json({ orderId: order._id, total: order.totalAmount });
    //res.json("ok");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    //const { limit = 4, page = 1 } = req.query;
    //console.log("limit", limit);
    //console.log("page", page);
    //const total = await Order.countDocuments({ user: req.user.id });
    //const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    const orders = await Order.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("items.product");
    //.skip((page - 1) * limit)
    //.limit(limit);
    res.json({
      orders,
      //totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/orders/:id
// @desc    Update order
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/orders/:id
// @desc    Delete order
// @access  Private
router.delete("/:id", roleCheck("admin"), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await order.remove();
    res.json({ msg: "Order removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server Error");
  }
});
//delete all orders
router.delete("/", async (req, res) => {
  await Order.deleteMany();
  res.json({ msg: "All orders deleted" });
});

module.exports = router;
