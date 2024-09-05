import React from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Comments from "../../components/Comment/Comment";
import "./RecyclingSiteDetails.scss";

const RecyclingSiteDetails = () => {
  const location = useLocation();
  const { site } = location.state;

  return (
    <section className="gradient">
      <div className="map-container">
        <MapContainer
          center={[site.longitude, site.latitude]}
          zoom={13}
          style={{ height: "600px", width: "100%" }}
          dragging={false} // Disable dragging
          touchZoom={false} // Disable touch-based zooming
          scrollWheelZoom={false} // Disable zoom with scroll wheel
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[site.longitude, site.latitude]}>
            <Popup>{site.city}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <article className="site-info">
        <div>
          <h2>{site.city}</h2>

          <p>{site.address}</p>
          <p>
            {site.zipcode} {site.city}, {site.country}
          </p>
          <p>
            <FaEnvelope /> {site.email}
          </p>
          <p>
            <FaPhone /> {site.phone}
          </p>
        </div>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} color={index < 4 ? "#ffc107" : "#e4e5e9"} />
          ))}
        </div>
      </article>

      {/* Render the Comments component and pass site.id as the siteId */}
      <Comments siteId={site.id} />
    </section>
  );
};

export default RecyclingSiteDetails;
