const { useNavigate } = require("react-router-dom");
const { useContext } = require("react");
const { SessionContext } = require("../contexts/SessionContext");

const NavBar = () => {
    const { token, setToken } = useContext(SessionContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      window.localStorage.removeItem('authToken');
      setToken(null);
      navigate('/');
    }

    return (
        <nav className="navbar">
            <h1>ProFinder</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/board">Board</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
                { token && <a href="/" onClick={handleLogout}>Logout</a> }
            </div>
        </nav>
    );
}

export default NavBar;
