import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">bookinghotel.com</span>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>

            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
