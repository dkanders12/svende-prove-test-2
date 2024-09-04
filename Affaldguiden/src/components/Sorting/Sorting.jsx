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
  const backgroundColors = [
    "#660099",
    "#017EC0",
    "#06682D",
    "#28A745",
    "#C4A167",
    "#F18700",
    "#7F652B",
    "#951C3F",
    "#6666CC",
    "#2B2C2E",
  ];

  return (
    <section className="sorting-guide">
      <article id="gradient">
        <div id="top-left">
          <h2>Sorteringsguide</h2>
          <p>Vælg en sektion</p>
        </div>
        {trashData.map((section, index) => (
          <div
            id="sorting"
            key={section.id}
            onClick={() => handleSectionClick(section)}
            style={{
              cursor: "pointer",
              backgroundColor:
                backgroundColors[index % backgroundColors.length],
            }}
          >
            <h1>{section.title}</h1>
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
