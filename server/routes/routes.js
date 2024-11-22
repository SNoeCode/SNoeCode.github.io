const User = require("../models/user.Model");
const Cart = require("../models/cart.Model");
const mongoose = require("mongoose");

const {
  Login,
  Signup,
  fetchUsername,
  Account,
  Google,
} = require("../controllers/user.Controller");

const { addToCart, getCart } = require("../controllers/cart.Controller");
const {
  authenticate,
  authenticateToken,
  extractUserIdFromToken,
} = require("../middleware/authenticate");

module.exports = (app) => {
  app.post(
    "/api/cart/:userId/add",
    extractUserIdFromToken,
    async (req, res) => {
      const { userId } = req.params;
      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ message: "Product ID and quantity are required" });
      }
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId format" });
      }
      try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        cart.items.push({ productId, quantity });
        await cart.save();
        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
      }
    }
  );
  app.post("/api/cart/:productId/addToCart", authenticateToken, (req, res) => {
    const productId = req.params.productId;

    if (!req.body.quantity || typeof req.body.quantity !== "number") {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    res.status(200).json({ message: "Product added to cart" });
  });
  app.get("/api/fetchUsername", fetchUsername);
  app.post("/api/addToCart", authenticate, async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId format" });
      }

      const itemIndex = cart.items.findIndex((item) =>
        item.productId.equals(validProductId)
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId: validProductId, quantity });
      }

      await cart.save();
      res.status(200).json({ message: "Item added to cart", cart });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error adding to cart", error: err.message });
    }
  });
  // Route
  app.post("/api/cart/addToCart", authenticateToken, addToCart);

  app.post("/api/signup", Signup);

  app.post("/api/login", Login);
  app.use(authenticate);

  app.post("/cart/addToCart", addToCart);

  app.get("/cart/:userId", getCart);
};
