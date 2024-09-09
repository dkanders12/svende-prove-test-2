import React, { useState, useEffect } from "react";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import header from "../../assets/Navbar/Header.png";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  // Check for the authentication status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("sb-osbwqoklbsjptiobzjco-auth-token"); // Access token from localStorage
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear the authentication tokens from localStorage
    localStorage.removeItem("sb-osbwqoklbsjptiobzjco-auth-token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setIsAuthenticated(false); // Update the authentication state to logged out

    // Redirect to the homepage after logout
    navigate("/");
  };

  return (
    <nav>
      <div id="topNav">
        <img src={header} alt="Header" />
        {isAuthenticated ? (
          // If the user is authenticated, show the Logout button
          <NavLink to="#" onClick={handleLogout}>
            Logout <IoIosLogOut />
          </NavLink>
        ) : (
          // If the user is not authenticated, show the Login button
          <NavLink to="/login">
            Login <IoIosLogIn />
          </NavLink>
        )}
        <div className="burger-menu" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>
      <div id="lowerNav" className={menuOpen ? "open" : ""}>
        <ul>
          <li
            className={activeLink === "/" ? "active-link" : ""}
            onClick={() => handleNavLinkClick("/")}
          >
            <NavLink to="/">Forside</NavLink>
          </li>
          <li
            className={activeLink === "/sorteringguide" ? "active-link" : ""}
            onClick={() => handleNavLinkClick("/sorteringguide")}
          >
            <NavLink to="/sorteringguide">Sorteringguide</NavLink>
          </li>
          <li
            className={activeLink === "/genbrugsstationer" ? "active-link" : ""}
            onClick={() => handleNavLinkClick("/genbrugsstationer")}
          >
            <NavLink to="/genbrugsstationer">Genbrugsstationer</NavLink>
          </li>
          <li
            className={activeLink === "/artikler" ? "active-link" : ""}
            onClick={() => handleNavLinkClick("/artikler")}
          >
            <NavLink to="/artikler">Artikler</NavLink>
          </li>
          <li
            className={activeLink === "/bestil-container" ? "active-link" : ""}
            onClick={() => handleNavLinkClick("/bestil-container")}
          >
            <NavLink to="/bestil-container">Bestil Container</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
