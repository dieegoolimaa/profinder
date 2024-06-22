import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

// eslint-disable-next-line react/prop-types
const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const verifyToken = async (currentToken) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.ok) {
        setToken(currentToken);
        setIsLoading(false);
      } else {
        window.localStorage.removeItem("authToken");
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      window.localStorage.removeItem("authToken");
      setIsLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    const potentialToken = window.localStorage.getItem("authToken");
    if (potentialToken) {
      verifyToken(potentialToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
    navigate("/login");
  };

  const withToken = async (endpoint, method = "GET", payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ token, setToken, logout, isLoading, withToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
