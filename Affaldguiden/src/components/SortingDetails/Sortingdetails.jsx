import React from "react";
import { useLocation } from "react-router-dom";

const SectionDetails = () => {
  const location = useLocation();
  const { section } = location.state;

  return (
    <section>
      <h1>{section.title}</h1>
      <p>{section.description}</p>
      <div className="category-grid">
        {section.categories.map((category) => (
          <div key={category.id} className="category-card">
            <h2>{category.title}</h2>
            <img src={category.image_url} alt={category.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionDetails;
