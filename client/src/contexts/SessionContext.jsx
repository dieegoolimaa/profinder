import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("authToken"));
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const verifyToken = async (currentToken) => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setToken(data.token);
        setIsLoading(false);
      } else {
        window.localStorage.removeItem("authToken");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("authToken");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const potentialToken = window.localStorage.getItem("authToken");
    if (potentialToken) {
      verifyToken(potentialToken);
    } else {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
  };

  SessionContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <SessionContext.Provider value={{ token, setToken, logout, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
