const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const Cart = require("../models/cart.Model");
dotenv.config();
const Signup = async (req, res) => {
  console.log("Registration hit", req.body);
  const { name, username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      userId: new mongoose.Types.ObjectId().toString(),
    });

    await newUser.save();
    console.log("User Created Successfully:", newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Google = (req, res) => {
  console.log(req.body);
};

const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("sessionId");
    res.status(200).json({ message: "Logout successful" });
  });

  res.status(200).json({ message: "Logout successful" });
};
const Account = async (req, res) => {
  const user = await User.find({ username });
  const foundUser = User.find((user) => user.id === req.user.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json({ username: user.username, email: user.email });
};
const getUserId = async (req, res) => {
  try {
    const { userId } = req.params || req.session; // Use route params or session
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const Login = async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
};

const saveCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Invalid cart items data" });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId }, 
      { $set: { items: cartItems } }, 
      { new: true, upsert: true } 
    );

    res
      .status(200)
      .json({ message: "Cart saved successfully", cart: updatedCart });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ message: "Error saving cart", error });
  }
};

const getCart = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

const fetchUsername = async (req, res) => {
  console.log("fetch hit");
  console.log(req.body);
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(404).json({ message: "Username not found" });
    }
    res.json({ username });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  Signup,
  Login,
  Logout,
  fetchUsername,
  // getUsername,
  Account,
  getUserId,
  Google,
  saveCart,
};
