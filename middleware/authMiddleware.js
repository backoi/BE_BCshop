// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   try {
//     // Lấy token từ header
//     const authHeader = req.header("Authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     // Tách token khỏi chuỗi "Bearer <token>"
//     const token = authHeader.split(" ")[1];
//     console.log("Token received:", token);

//     // Xác minh token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded || !decoded.id) {
//       return res.status(401).json({ msg: "Invalid token payload" });
//     }

//     // Tìm user trong database
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ msg: "User not found" });
//     }

//     // Gán thông tin user vào req để sử dụng trong các middleware tiếp theo
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("JWT verification error:", error.message);
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ msg: "Token expired, please log in again" });
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({ msg: "Invalid token" });
//     }
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  //console.log("đã vào middleware");
  const token = req.header("Authorization")?.replace("Bearer ", "");
  //console.log("Token: ", token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //console.log("Token: ", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //console.log("Decoded: ", decoded);

    next();
    //console.log("User: ", req.user);
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
