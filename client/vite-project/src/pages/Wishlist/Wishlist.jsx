import React from "react";
const WishList = ({ items, onRemove }) => {
  return (
    <div>
      <h3>Your Wishlist</h3>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No items in your wishlist.</p>
      )}
    </div>
  );
};

export default WishList;
