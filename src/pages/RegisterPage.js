import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;
    const handleRegister = async (event) => {
        event.preventDefault();
    
        // Clear previous errors
        setError(null);
    
        try {
            // Ensure you have correct email and password in request body
            const response = await axios.post(`${API_URL}/auth/register`, {
                email,
                password
            });
    
            if (response.status === 200) {
                navigate('/profile-creation');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (error) {
            // Log the error response from the server
            if (error.response) {
                console.log('Error response from server: ', error.response.data);
                setError(error.response.data.message || 'Invalid data.');
            } else {
                console.log('Error:', error.message);
                setError('Something went wrong. Please try again.');
            }
        }
    };
    

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required
                        minLength="8"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <p>
                <Link to="/">Home</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
