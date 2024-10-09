import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext.js";

const LoginPage = () => {    
    // Hooks
    const navigate = useNavigate();
    const { setToken } = useContext(SessionContext);  // Assuming context provides setToken

    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            // Check response status
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setToken(data.token);  // Set token using context
                window.localStorage.setItem('authToken', data.token);  // Save token to localStorage
                navigate('/board');  // Redirect to dashboard
            } else {
                const data = await response.json();
                setError(data.message);  // Show error message if login fails
            }   
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}  {/* Display error in red */}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>    
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default LoginPage;
