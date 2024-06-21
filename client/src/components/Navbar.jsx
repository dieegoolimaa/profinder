import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";

const Navbar = () => {
  const { logout } = useContext(SessionContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/opportunities">Opportunities</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
