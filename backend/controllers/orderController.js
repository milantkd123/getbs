import userModel from "../models/userModel.js";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import razorpayInstance from "../config/razorpay.js";

/* ================= CREATE ORDER ================= */
export const createRazorpayOrder = async (req, res) => {
  console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET ? "LOADED" : "MISSING");

  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // 1️⃣ Create order in DB (UNPAID)
    const order = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      status: "Payment Pending",
      date: Date.now(),
    });

    // 2️⃣ Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: order._id.toString(),
    });

    res.json({
      success: true,
      razorpayOrder,
      orderId: order._id,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================= VERIFY PAYMENT ================= */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // ✅ Payment verified → update order
    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Order Placed",
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
    });

    res.json({ success: true, message: "Payment verified successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



/* ================= ALL ORDERS (ADMIN) ================= */
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= USER ORDERS ================= */
export const userOrders = async (req, res) => {
  try {
    // 🔥 FROM AUTH, NOT BODY
    const userId = req.user._id;

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= UPDATE STATUS (ADMIN) ================= */
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
