import crypto from "crypto";
import orderModel from "../models/orderModel.js";

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 1️⃣ Verify signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(req.body);
    const digest = shasum.digest("hex");

    const razorpaySignature = req.headers["x-razorpay-signature"];

    if (digest !== razorpaySignature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // 2️⃣ Parse event
    const event = JSON.parse(req.body.toString());

    // 3️⃣ Handle payment success
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      await orderModel.findOneAndUpdate(
        { razorpayOrderId },
        {
          payment: true,
          status: "Order Placed",
          razorpayPaymentId,
        }
      );
    }

    res.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ message: "Webhook handler failed" });
  }
};
