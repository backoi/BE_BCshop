const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Connect to MongoDB
const connectMongoDB = require("./config/db");
connectMongoDB();
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const postRoutes = require("./routes/postRoutes");
const brandRoutes = require("./routes/brandRoutes");
const couponRoutes = require("./routes/couponRoutes");
// respond with "hello world" when a GET request is made to the homepage
const corsOptions = {
  origin: "http://localhost:5173", // Chỉ định frontend
  credentials: true, // Cho phép gửi cookie/token
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/post", postRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/coupon", couponRoutes);
app.listen(3003, () => {
  console.log("Server running on port 3003 http://localhost:3003");
});
