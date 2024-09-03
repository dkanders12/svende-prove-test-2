import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrashData } from "../../provider/SortingProvid";
import "./Sorting.scss";

const SortingGuide = () => {
  const [trashData, setTrashData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrashData();
      console.log("Fetched data from API:", data);
      setTrashData(data);
    };

    fetchData();
  }, []);

  const handleSectionClick = (section) => {
    console.log("Clicked Section:", section);
    navigate(`/section/${section.id}`, { state: { section } });
  };

  return (
    <section className="sorting-guide">
      <article id="gradient">
        {trashData.map((section) => (
          <div
            key={section.id}
            onClick={() => handleSectionClick(section)}
            style={{ cursor: "pointer" }}
          >
            <h1>{section.title}</h1>
            <p className="subtitle">{section.description}</p>

            <img
              src={section.image_url}
              alt={section.title}
              className="section-image"
            />
          </div>
        ))}
      </article>
    </section>
  );
};

export default SortingGuide;
