//http://localhost:3003/api/auth
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
const sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mã OTP để đặt lại mật khẩu",
    text: `Mã OTP của bạn là: ${otp}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Lỗi khi gửi email" });
    }
    console.log("Email sent: " + info.response);
  });
};
//register
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "Tài khoản đã tồn tại",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    user = new User({
      username,
      email,
      password: hashedPass,
      role,
    });
    await user.save();

    return res.status(201).json({
      msg: "Tạo tài khoản thành công",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "Lỗi server",
    });
  }
});
//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        msg: "Tài khoản không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Mật khẩu không chính xác",
      });
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    //console.log(process.env.JWT_SECRET);
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "Đăng nhập thành công",
          token: token,
          //role: user.role,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: "Lỗi server",
    });
  }
});
//logout
router.post("/logout", async (req, res) => {
  try {
    res.json({ msg: "Đăng xuất thành công" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Lỗi server" });
  }
});
//change password
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mật khẩu cũ không chính xác" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);
    user.password = hashedPass;
    await user.save();
    res.status(200).json({ msg: "Mật khẩu đã được thay đổi" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Lỗi server" });
  }
});
//forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const otp = generateOTP();
    //send otp to email
    sendOTP(email, otp);
    res.status(200).json({ msg: "Mã OTP đã được gửi", otp });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Lỗi server" });
  }
});

//reset password
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //check if newPassword is the same as oldPassword
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return res
        .status(400)
        .json({ msg: "Mật khẩu mới không được trùng với mật khẩu cũ" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);
    user.password = hashedPass;
    await user.save();
    res.status(200).json({ msg: "Mật khẩu đã được thay đổi" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Lỗi server" });
  }
});
//resend otp
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const otp = generateOTP();
    sendOTP(email, otp);
    res.status(200).json({ msg: "Mã OTP đã được gửi", otp });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Lỗi server" });
  }
});

module.exports = router;
