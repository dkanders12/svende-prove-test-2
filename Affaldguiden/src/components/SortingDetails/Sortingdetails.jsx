import React from "react";
import { useLocation } from "react-router-dom";

const SectionDetails = () => {
  const location = useLocation();
  const { section } = location.state;

  return (
    <section
      className="section-details"
      style={{
        marginBottom: "50px",
        background: `linear-gradient(180deg, ${section.color} 0%, #ffffff 100%)`, // Use section color in gradient
      }}
    >
      <h1>{section.title}</h1>
      <p>{section.description}</p>
      <div className="category-type">
        {section.categories.map((category) => (
          <div key={category.id} className="category-card">
            <h2>{category.title}</h2>
            <img src={category.icon_url} alt={category.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionDetails;
