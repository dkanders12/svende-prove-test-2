import React from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./RecyclingSiteDetails.scss";

const RecyclingSiteDetails = () => {
  const location = useLocation();
  const { site } = location.state;

  // Debugging lat/lng
  console.log("Latitude:", site.latitude, "Longitude:", site.longitude);

  return (
    <section className="recycling-site-details">
      <div className="map-container">
        <MapContainer
          center={[site.longitude || 57.05, site.latitude || 9.95]} // Default fallback values
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {site.latitude && site.longitude && (
            <Marker position={[site.longitude, site.latitude]}>
              <Popup>{site.city}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="site-info">
        <h1>{site.city}</h1>
        <div className="site-address">
          <p>
            <FaMapMarkerAlt /> {site.address}
          </p>
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
      </div>
    </section>
  );
};

export default RecyclingSiteDetails;
