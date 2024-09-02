import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import header from "../../assets/Navbar/Header.png";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav>
      <div id="topNav">
        <img src={header} alt="Header" />
        <NavLink to="/login">
          Login <IoIosLogIn />
        </NavLink>
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
