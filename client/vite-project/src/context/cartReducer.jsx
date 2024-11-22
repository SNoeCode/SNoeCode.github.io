

const cartReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case "ADD_TO_CART": 
   
      // Access newCartItem from action.payload
      if (!action.payload || !action.payload.item) {
          console.error("Error: newCartItem not found in action payload");
          return state; // Or handle the error appropriately
          return state;
      }
      const newCartItem = action.payload.item;
      return {
          ...state,
          cartItems: [...state.cartItems, { ...newCartItem, quantity: 1 }],
      };
    

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.itemId
        ),
      };

    case "INCREMENT":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload.itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;

