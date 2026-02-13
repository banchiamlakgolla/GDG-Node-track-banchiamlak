import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    // STOCK CHECK
    for (let item of cart.items) {
      if (item.quantity > item.productId.stock) {
        return res.status(400).json({
          message: `Not enough stock for ${item.productId.name}`
        });
      }
      total += item.quantity * item.productId.price;
    }

    // REDUCE STOCK
    for (let item of cart.items) {
      item.productId.stock -= item.quantity;
      await item.productId.save();
    }

    const order = new Order({
      items: cart.items,
      total,
      date: new Date()
    });

    await order.save();

    // CLEAR CART
    cart.items = [];
    await cart.save();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
