import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`API URL: ${API_URL}`);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
      });
      if (response.status === 201) {
        const newUser = response.data;
        console.log(newUser);
        navigate("/profile-creation");
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.log("Request failed:", error);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
        </label>
        <button type="submit">Sign Up</button>
        <Link to="/login">Back to Login</Link>
      </form>
    </>
  );
};

export default SignupPage;
