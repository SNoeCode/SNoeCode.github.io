import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../context/UserContext";
import {
  FacebookButton,
  FacebookLoginButton,
} from "../../components/FacebookButton/FacebookButton";
import Captcha from "../../Image/clipart-captcha-code-1-512x512-61ae.png";
import {
  auth,
  provider,
  signInWithPopup,
} from "../../googleShit/firebaseConfig";
import LoadCart from "../../components/LoadCart/LoadCart";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInputValue, setUserInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // const { authedUser, setAuthedUser } = useContext(UserContext);
  const { authedUser, handleSetAuthedUser, setAuthedUser } =
    useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (username && password) {
      setErrorMessage("");
    }
  }, [username, password]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userToken = await result.user.getIdToken();
      const loggedInUsername = result.user.displayName;
      console.warn(result);
      axios({
        url: "http://localhost:3003/api/google",
        method: "post",
        data: result.user,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log("error", error));
      localStorage.setItem("token", userToken);
      localStorage.setItem("username", loggedInUsername);
      localStorage.setItem("userId", response.data.userId);
      console.log("User logged in:", result.user);
      setAuthedUser({ username: loggedInUsername });
      if (loggedInUsername) {
        navigate(`/account`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Failed to log in with Google.");
    }
    function closePopup() {
      if (this.window) {
        this.window.postMessage("closePopup", "*");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleConfirm = async () => {
    try {
      const verificationCode = "just example";
      if (userInputValue !== verificationCode) return;

      const response = await axios.post("http://localhost:3003/api/login", {
        username,

        password,
        withCredentials: true,
      });

      console.log("Login response:", response);

      const { user, token } = response.data;

      handleSetAuthedUser({ id: user.id, username: user.username });

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", user.id);
      alert("Login successful");
      setUsername("");
      setPassword("");
      navigate("/account");
    } catch (error) {
      if (error.response) {
        console.error("Server response error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserInputValue("");
  };

  return (
    <>
      <div className="user-image-container">
        <div className="user-login-container">
          <h2
            style={{
              mt: "150px",
              color: "#C2181A",
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            <b>Welcome Back! Please Login!</b>
          </h2>

          <form className="user-login-form" onSubmit={handleLogin}>
            <div className="user-form-group">
              <label>Username: </label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                value={username}
              />
            </div>
            <div className="user-form-group">
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button
              type="submit"
              className="user-login-button"
              // onClick={(e)=>{handleLogin(e)}}
            >
              Login
            </button>
            <p className="user-sign-up">
              No Account?
              <a
                href="/signup"
                onClick={() => navigate("/signup")}
                id="sign-up-hover"
              >
                <span>Sign up?</span>
              </a>
            </p>
            <FacebookButton />
            <div>
              <button type="button" onClick={handleGoogleLogin}>
                Sign in with Google
              </button>
            </div>
          </form>
          <FacebookLoginButton />
        </div>
        {isModalOpen && (
          <div className="user-modal">
            <div className="user-modal-content">
              <h2>Verification Required</h2>
              <h3>Please type in captcha to continue</h3>
              <label htmlFor="prompt-input">
                <div className="user-modal-img-container">
                  <img src={Captcha} alt="Captcha" />
                </div>
              </label>
              <input
                id="prompt-input"
                type="text"
                value={userInputValue}
                onChange={(e) => setUserInputValue(e.target.value)}
              />
              <div className="user-modal-buttons">
                <button
                  type="submit"
                  onClick={handleConfirm}
                  className="user-confirm-button"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCloseModal}
                  className="user-cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
