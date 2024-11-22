import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getProducts, getCategories } from "../../config/api.js";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import cartContext from "../../context/cartContext.jsx";
import { UserContext } from "../../context/UserContext";
import Logout from "../Logout/Logout.jsx";
// import { Cart } from '../../context/cartContext'
const Navbar = () => {
  const { cartItems, setCartItems, toggleCart } = useContext(cartContext);

  const { authedUser, handleSetAuthedUser } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const username = localStorage.getItem("username");
  const isUserSignedIn = !!localStorage.getItem("token");
  const cartQuantity = cartItems ? cartItems.length : 0;
  const navigate = useNavigate();

  const handleSignedOut = () => {
   
    axios.post;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    setCartItems && setCartItems([]);
    handleSetAuthedUser(null);
  };
  const saveCart = async () => {
    try {
      await axios.post(
        "/api/cart/save",
        { cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
    getProducts().then((res) => {
      setLoading(true);
      setProducts(res.data);
    });
  }, []);

  const handleSearchClick = (id) => {
    navigate(`/product-detail/${id}`);
  };
  const handleSearchSubmit = () => {
    navigate(`/categories?query=${searchTerm}`);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="container-navbar">
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <i
                className="fas fa-house-chimney fa-2x"
                onClick={() => navigate("/")}
              ></i>
            </li>
            <li className="dropdown">
              <button className="dropdown-btn">Categories</button>
              <div className="dropdown-content">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleNavigation(`/categories/${category}`)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </li>

            <li>
              <button onClick={() => handleNavigation("/contact-us")}>
                Contact Us
              </button>
            </li>
            <div className="searchbar-container">
              <SearchBar />
              <button>Search</button>
            </div>
            <ul>
              {isUserSignedIn && username && authedUser ? (
          
                <>
                  <li>
                    Hi, {authedUser.username}
                    <Link to="/account">
                      <li>Account</li>
                    </Link>
                    {/* <Logout /> */}
                    <button className="signout-btn" onClick={handleSignedOut}>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <li>Signup</li>
                  </Link>
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                </>
              )}
            </ul>

            <li className="shopping-cart">
              <i className="fas fa-cart-shopping fa-2x" onClick={toggleCart}>
                <span className="badge">{cartQuantity}</span>
              </i>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
