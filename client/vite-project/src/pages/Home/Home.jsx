import "./Home.css"; 
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import cartContext from "../../context/cartContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getProducts } from "../../config/api";

const Home = () => {
  const { authedUser, handleSetAuthedUser } = useContext(UserContext);

  const { addItem, addToCart } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [isAdded, setIsAdded] = useState({});
  const navigate = useNavigate();
 

  useEffect(() => {
    console.log("Home component mounted.");
    const userId = localStorage.getItem("userId");
    console.log("userId:", userId);
    const username = localStorage.getItem("username");
 console.log("username:", username);

    if (userId && username) {
      handleSetAuthedUser({ id: userId, username: username });
    }
  }, []);


  useEffect(() => {
 
    getProducts()
      .then((res) => {
        console.log("Products fetched:", res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("token");
    // console.log("Attempting to add to cart:", { item, token });

    if (!token || !authedUser?.id) {
      console.warn("User not logged in or missing token.");
      alert("Please log in to add items to your cart.");
      return;
    }

    const newItem = { ...item, quantity: 1 };
    addItem(newItem);
    await addToCart(authedUser.id, item.id, 1)
    setIsAdded((prev) => ({ ...prev, [item.id]: true }));
    console.log("Item added to local state:", newItem);

    try {
      const response = await axios.post(
        `http://localhost:3003/api/cart/${authedUser}/add`,
        { productId: item._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
      console.log("Successfully added to backend cart:", response.data);
      await addItem(productId);
      await addToCart(authedUser.id, productId, 1);
      setIsAdded((prev) => ({ ...prev, [item._id]: true }));
    } catch (error) {
      console.error("Error adding to backend cart:", error);
    } finally {
      setTimeout(() => {
        setIsAdded((prev) => ({ ...prev, [item.id]: false }));
      }, 3000);
    }
  };

  // Navigate to product details page
  const navigateToNewPage = (id) => {
    console.log("Navigating to product details:", id);
    navigate(`/product-detail/${id}`);
  };

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <h1>Welcome to Our Online Store</h1>
          <p>Find the best products here</p>
        </div>

        <div className="container">
          {products.map((item) => {
            item.quantity = 1; // Ensure default quantity
            return (
              <div key={item._id} className="card">{item._id}
                <h1>
                  <b>{item.title}</b>
                </h1>
                <img src={item.image} alt={item.title} className="img" />
                <h2>
                  <b>Price: ${item.price}</b>
                </h2>
                <div className="rating-container">
                  <Box
                    sx={{
                      "& > legend": {
                        mt: 2,
                        width: "auto",
                        color: "#cd74a0",
                        textAlign: "center",
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Typography component="legend">Product Rating</Typography>
                    <Rating
                      name="read-only"
                      value={item.rating.rate}
                      size="small"
                      readOnly
                    />
                  </Box>
                  <button
                    onClick={() => navigateToNewPage(item.id)}
                    className="button-1"
                  >
                    More Details
                  </button>
                </div>
                <button
                  id="add-to-cart"
                  className={`btn ${isAdded[item.id] ? "added" : ""}`}
                  onClick={() => handleAddToCart(item)}
                >
                  {isAdded[item.id] ? "Added" : "Add to cart"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
