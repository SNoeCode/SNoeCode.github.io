
const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("./routes/routes");
const userController = require("./controllers/user.Controller");
const app = express();
require("dotenv").config();
const port = process.env.port || 5000;
const {getUsername} = require('./controllers/user.Controller')
const {
  authenticate,
  authenticateToken,
  extractUserIdFromToken,
  authenticateSessions,
} = require("./middleware/authenticate");

const SECRET_KEY = process.env.SECRET_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
router(app);


app.use((req, res, next) => {
  const allowedOrigin = "http://localhost:5173";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); 
  }

  next();
});


const Cart = require("./models/cart.Model");

async function updateProductIds() {
  try {
    const carts = await Cart.find();
    console.log("Found carts:", carts);

    for (const cart of carts) {
      for (const item of cart.items) {
        if (typeof item.productId === "number") {
          console.log(`Updating productId: ${item.productId}`);
          item.productId = mongoose.Types.ObjectId(item.productId.toString());
        }
      }
      await cart.save();
      console.log(`Updated cart for userId: ${cart.userId}`);
    }
    app.get('/api/fetchUsers',authenticate, async () => {
          axios
            .get("http://localhost:3003/signup")
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        });
      
    console.log("Product IDs updated.");
  } catch (error) {
    console.error("Error updating product IDs:", error);
  }
}

updateProductIds();


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
