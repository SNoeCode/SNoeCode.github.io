import React, { useState, useEffect } from "react";
import { UserProvider } from "./context/UserContext.jsx";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Wishlist from "./pages/Wishlist/Wishlist";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import ContactUs from "./pages/ContactUs/ContactUs";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Account from "./pages/Account/Account";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import Checkout from "./pages/Checkout/Checkout";
import LoadCart from "./components/LoadCart/LoadCart";
import Payment from './components/Payment/Payment';
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import Logout from "./components/Logout/Logout.jsx";
import ProtectedRoute from "./Config/ProtectedRoutes";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
const App = () => {
  const [username, setUsername] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [authedUser, setAuthedUser] = useState(null);
  const isUserLoggedIn = !!localStorage.getItem("token");


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log("Stored username from localStorage:", storedUsername);
    if (storedUsername) {
      //   setUsername(storedUsername);
      setAuthedUser({ username: storedUsername });
    }
  }, []);
  return (
    <>
      <ErrorBoundary>
        <ScrollToTop />
        <Navbar />
        <ShoppingCart />
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<LoadCart />} />
          <Route path="/product-detail/:id" element={<ProductDetails />} />
          <Route path="/categories/:category" element={<CategoriesPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        {/* <ProtectedRoute path="/account" element={<Account />} /></Routes> */}
        <div
          style={{
            // minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
          }}
        />

        <Footer />
        {/* </UserProvider>  */}
      </ErrorBoundary>
    </>
  );
};
export default App;
