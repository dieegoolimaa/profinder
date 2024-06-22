import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(SessionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setToken(data.token);
        window.localStorage.setItem("authToken", data.token);
        navigate("/dashboard");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
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
        <button type="submit">Log In</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </>
  );
};

export default LoginPage;
