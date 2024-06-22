import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        const data = response.data;
        setToken(data.token);
        localStorage.setItem("authToken", data.token); // Store token in localStorage
        navigate("/profile-creation");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
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
        <Link to="/login">Already have an account? Log In</Link>
      </form>
    </>
  );
};

export default SignupPage;
