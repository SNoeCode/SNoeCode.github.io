
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import WishList from "../Wishlist/Wishlist"
import "./Account.css";

const Account = () => {
  const username = localStorage.getItem("username");

  return (
    <>
      <div className="container-account">
        <h2>Welcome {username}</h2>

        <div className="account-options">
          <ul>
            <li>
              <Link to="/cart">View Cart</Link>
            </li>
            <h3>Your Cart</h3>
        
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <div>
              <h3>Your Wishlist</h3>
              <WishList items={wishlistItems} />
            </div>
            <li>
              <Link to="/payment">Payment Options</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Account;
