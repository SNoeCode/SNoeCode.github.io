const mongoose = require("mongoose");

const express = require("express");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
     required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  userId: { type: String, required: true, default: () => new mongoose.Types.ObjectId().toString() },
  items: [
    {
      productId: { type: String, required: true },
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: [],
    },
  ],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
