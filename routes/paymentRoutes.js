const express = require("express");
const router = express.Router();
const {
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
} = require("vnpay");
const Order = require("../models/Order");
const Product = require("../models/Product");

router.post("/create_payment_url", async (req, res) => {
  const { orderId, total } = req.body;
  console.log("orderId", orderId);
  console.log("total", total);
  const vnpay = new VNPay({
    // Thông tin cấu hình bắt buộc
    tmnCode: "TETMSQAP",
    secureSecret: "ISS47Q9SQMWQUKLB5XAGWA0IGSB2V22O",
    vnpayHost: "https://sandbox.vnpayment.vn",

    // Cấu hình tùy chọn
    testMode: true, // Chế độ test
    hashAlgorithm: "SHA512", // Thuật toán mã hóa
    enableLog: true, // Bật/tắt ghi log
    loggerFn: ignoreLogger, // Hàm xử lý log tùy chỉnh

    // Tùy chỉnh endpoints cho từng phương thức API (mới)
    // Hữu ích khi VNPay thay đổi endpoints trong tương lai
    endpoints: {
      paymentEndpoint: "paymentv2/vpcpay.html", // Endpoint thanh toán
      queryDrRefundEndpoint: "merchant_webapi/api/transaction", // Endpoint tra cứu & hoàn tiền
      getBankListEndpoint: "qrpayauth/api/merchant/get_bank_list", // Endpoint lấy danh sách ngân hàng
    },
  });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const paymentUrl = await vnpay.buildPaymentUrl({
    vnp_Amount: total,
    vnp_IpAddr: "13.160.92.202",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: "http://localhost:3003/api/payment/vnpay-return",
    vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
    vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
    vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
  });

  res.json({ code: "00", message: "success", paymentUrl });
});
router.get("/vnpay-return", async (req, res) => {
  console.log(req.query);
  //const result = vnpay.verifyReturnUrl(req.query as unknown as VerifyReturnUrl);
  //xử lý database
  const { vnp_ResponseCode, vnp_TxnRef, vnp_Amount, vnp_OrderInfo } = req.query;
  const order = await Order.findById(vnp_TxnRef);
  if (vnp_ResponseCode == "00") {
    //thành công
    //cập nhật database
    await Order.updateOne(
      { _id: vnp_TxnRef },
      {
        paymentStatus: "completed",
        paymentMethod: "vnpay",
      }
    );

    await order.save();
    //cập nhật tồn kho
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }
    // res.json({ code: "00", message: "success", order });
    //cập nhật session
  } else {
    //res.json({ code: "01", message: "failed", order });
    //thất bại
  }
  const queryParams = new URLSearchParams(req.query).toString();
  const frontendUrl = `http://localhost:5173/payment-result?${queryParams}`;

  // Redirect về trang React với tất cả query params từ VNPay
  res.redirect(frontendUrl);
});

module.exports = router;
////xu lý với dữ liệu động
//xử lý nghiệp vụ đặt hàng chuẩn form
//xu ly mã lỗi giao dich
