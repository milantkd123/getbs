import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },

  status: {
    type: String,
    enum: ["Payment Pending", "Order Placed", "Shipped", "Delivered", "Cancelled"],
    default: "Payment Pending",
  },

  paymentMethod: { type: String, default: "Razorpay" },
  payment: { type: Boolean, default: false },

  razorpayOrderId: String,
  razorpayPaymentId: String,

  date: { type: Number, required: true },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

// ✅ THIS LINE MUST EXIST
export default orderModel;
