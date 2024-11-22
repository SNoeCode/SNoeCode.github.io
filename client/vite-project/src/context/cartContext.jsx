import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
const CartContext = createContext();
import cartReducer from "../context/cartReducer";

export const CartProvider = ({ children }) => {
  const initialState = {
    userId: localStorage.getItem("userId") || null,
    cartItems: [],
    isCartOpen: false,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3003/api/cart/addToCart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedCart = response.data.cart;
      dispatch({ type: "ADD_TO_CART", payload: { items: updatedCart.items } });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const addItem = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { item },
    });
  };

  const removeItem = (itemId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { itemId },
    });
  };

  const incrementItem = (itemId) => {
    dispatch({
      type: "INCREMENT",
      payload: { itemId },
    });
  };

  const decrementItem = (itemId) => {
    dispatch({
      type: "DECREMENT",
      payload: { itemId },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cartItems");
  };

  const value = {
    cartItems: state.cartItems,
    isCartOpen: state.isCartOpen,
    addItem,
    toggleCart,
    addToCart,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export default CartContext;
