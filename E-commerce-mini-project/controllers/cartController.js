import Cart from "../models/Cart.js";
import Product from "../models/product.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne().populate("items.productId");
    if (!cart) cart = await Cart.create({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stock)
      return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [] });

    const itemIndex = cart.items.findIndex(
      i => i.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne();

    const item = cart.items.find(
      i => i.productId.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    cart.items = cart.items.filter(
      i => i.productId.toString() !== req.params.productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
