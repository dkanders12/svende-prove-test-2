import React from "react";
import { useLocation } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";
import "./Sortingdetails.scss";

const Sortingdetails = () => {
  const location = useLocation();
  const { section } = location.state;

  // Ensure the color has the '#' symbol
  const sectionColor = section.color.startsWith("#")
    ? section.color
    : `#${section.color}`;

  return (
    <section
      className="section-details"
      style={{
        background: `linear-gradient(180deg, ${sectionColor} 0%, #ffffff 100%)`,
      }}
    >
      <div className="header">
        <div id="top-left">
          <h2>{section.title}</h2>
          <p>vælg et product</p>
        </div>
        <div className="category-type">
          {section.categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="card-content">
                <div className="icon">
                  <img src={category.icon_url} alt={category.title} />
                </div>
                <h3>{category.title}</h3>
                <div className="arrow">
                  <FaArrowAltCircleDown />
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
    </section>
  );
};

export default Sortingdetails;
