const { useNavigate } = require("react-router-dom");
const { useContext } = require("react");
const { SessionContext } = require("../contexts/SessionContext");

const NavBar = () => {
    const { token, setToken } = useContext(SessionContext); // Token from SessionContext
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage and SessionContext
        window.localStorage.removeItem('authToken');
        setToken(null);
        navigate('/'); // Navigate to the homepage after logout
    };

    return (
        <nav className="navbar">
            <h1>ProFinder</h1>
            <div className="links">
                <a href="/">Home</a>
                {token && <a href="/board">Board</a>}
                {token && <a href="/profile">Profile</a>}
                {token && <a href="/profile-creation">Create Profile</a>}
                {token && <a href="/" onClick={handleLogout}>Logout</a>}
                {!token && <a href="/login">Login</a>}
                {!token && <a href="/register">Register</a>}
            </div>
        </nav>
    );
};

export default NavBar;
