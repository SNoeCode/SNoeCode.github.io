import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { authedUser } = useContext(UserContext);
  return authedUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
