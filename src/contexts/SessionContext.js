import { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL;

    const verifyToken = async (currentToken) => {
      try {
          const response = await fetch(`${API_URL}/auth/verify`, {
              headers: {
                  Authorization: `Bearer ${currentToken}`,
              },
          });
  
          // Check if the response status is OK (2xx range)
          if (response.ok) {
              // Check if response has a body
              const contentLength = response.headers.get("content-length");
              if (contentLength && parseInt(contentLength) > 0) {
                  // Ensure response is JSON if there is content
                  const contentType = response.headers.get("content-type");
                  if (contentType && contentType.includes("application/json")) {
                      const data = await response.json(); // Parse JSON if available
                      console.log(data);
                      setIsLoading(false);
                      setToken(currentToken);
                  } else {
                      console.error("Response is not valid JSON.");
                      setIsLoading(false);
                  }
              } else {
                  // No body in response, token is valid but no content returned
                  console.log("No content in response, but token is valid.");
                  setIsLoading(false);
                  setToken(currentToken);
              }
          } else {
              console.error("Failed to verify token. Removing token from storage.");
              window.localStorage.removeItem('authToken');
              setIsLoading(false);
          }
      } catch (error) {
          console.error("Error verifying token:", error);
          window.localStorage.removeItem('authToken');
          setIsLoading(false);
      }
   };
  
    useEffect(() => {
        const potentialToken = window.localStorage.getItem('authToken');
        if (potentialToken) {
            verifyToken(potentialToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            window.localStorage.setItem('authToken', token);
        }
    }, [token]);

    const logout = () => {
        window.localStorage.removeItem('authToken');
        setToken();
    };

    const withToken = async (endpoint, method = 'GET', payload) => {
        try {
          const url = `${process.env.REACT_APP_API_URL}/api${endpoint}`;
          const requestOptions = {
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          };
    
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      return (
        <SessionContext.Provider value={{ token, setToken, logout, isLoading, withToken }}>
          {children}
        </SessionContext.Provider>
      );
    };

export default SessionContextProvider;