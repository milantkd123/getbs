import express from "express";
import {
  allOrders,
  userOrders,
  createRazorpayOrder,
  verifyRazorpayPayment,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// ADMIN
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// USER
orderRouter.post("/razorpay/create", authUser, createRazorpayOrder);
orderRouter.post("/razorpay/verify", authUser, verifyRazorpayPayment);
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;