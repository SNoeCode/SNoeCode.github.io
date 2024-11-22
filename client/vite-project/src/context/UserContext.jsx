import React, { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export const UserContext = createContext();

export function UserProvider({ children }) {
  const [authedUser, setAuthedUser] = useState(null);

  const handleSetAuthedUser = (user) => {
    console.log("Setting authedUser:", user);
    setAuthedUser(user);

    if (user?.id) {
      // Save to localStorage for persistence
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.username);
    }
  };


  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
     if (storedUserId && storedUsername) {
      setAuthedUser({ id: storedUserId, username: storedUsername });
    }
  }, []);

  return (
    <UserContext.Provider value={{ authedUser, handleSetAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
}


export default UserProvider;
