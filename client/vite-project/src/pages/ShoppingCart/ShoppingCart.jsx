import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";
// import LoadCart from '../../components/LoadCart/LoadCart'
import axios from "axios"
import { useParams } from 'react-router-dom';

const ShoppingCart = () => {
  const {
    isCartOpen,
    cartItems,
    toggleCart,
    incrementItem,
    decrementItem,
  } = useContext(cartContext);
  const navigate = useNavigate();


  
  if (!isCartOpen) return null;

  return (
    <div className="cart" id="cart">
      <h2 className="my-cart">My Cart ({cartItems.length})</h2>
      <div className="cart-content">
        <div className="cart-head">
          <div title="Close" className="close-btn" onClick={toggleCart}>
            Close &times;
          </div>
        </div>
        <div className="cart-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="shopping-cart">
                <div className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="btn-container">
                    <button className="add" onClick={() => incrementItem(item.id)}>
                      +
                    </button>
                    <p className="quantity">Quantity: {item.quantity}</p>
                    <button className="minus" onClick={() => decrementItem(item.id)}>
                      -
                    </button>
                  </div>
                  <p className="price">Price: ${item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">Your cart is empty</p>
          )}
          <h2 className="total">
            Total: $
            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </h2>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
