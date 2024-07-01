// RequireAuthenticationWrapper.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const RequireAuthenticationWrapper = ({ children }) => {
  const { isAuthenticated, token } = useContext(SessionContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const checkProfileCompletion = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data || !response.data.name) {
        // Redirect to profile creation if profile is not complete
        navigate("/profile-creation");
      }
    } catch (error) {
      console.log(error);
      // Handle error (e.g., redirect to login page)
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkProfileCompletion();
    } else {
      // Redirect to login page if not authenticated
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  RequireAuthenticationWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return <>{children}</>;
};

export default RequireAuthenticationWrapper;
