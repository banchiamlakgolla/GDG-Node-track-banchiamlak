import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  customerInfo: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;