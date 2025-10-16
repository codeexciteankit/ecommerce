import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Save new order
router.post("/", async (req, res) => {
  const { userEmail, items, totalPrice } = req.body;
  try {
    const order = new Order({ userEmail, items, totalPrice });
    await order.save();
    res.json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
