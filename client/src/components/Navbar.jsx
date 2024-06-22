import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
// import "../styles/Navbar.css";

const Navbar = () => {
  const { logout } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/opportunities">Opportunities</Link>
          </li>
          <li>
            <Link to="/profile-creation">Profile Creation</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/create-opportunity">Create Opportunity</Link>
          </li>
          <li>
            <Link to="/apply">Apply</Link>
          </li>
          <li>
            <Link to="/applications">Applications</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </>
      </ul>
    </nav>
  );
};

export default Navbar;
