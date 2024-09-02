import React from "react";
import play from "../../assets/Footer/App-store.png";
import play1 from "../../assets/Footer/Google-play.png";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer id="footerscss">
      <div>
        <h3>Affaldsguiden</h3>
        <p>Øster Uttrupvej 1A</p>
        <p>9000 Aalborg</p>
      </div>
      <div id="play">
        <img src={play} alt="" />
        <img src={play1} alt="" />
      </div>
      <div id="icons-footer">
        <FaInstagramSquare />
        <CiLinkedin />
        <FaFacebookSquare />
      </div>
    </footer>
  );
};

export default Footer;
