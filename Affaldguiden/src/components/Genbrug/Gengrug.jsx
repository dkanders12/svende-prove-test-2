import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createClient } from "@supabase/supabase-js";
import "./Genbrug.scss";

// Initialize Supabase client
const supabaseUrl = "https://osbwqoklbsjptiobzjco.supabase.co"; // Replace with your actual Supabase URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fix marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Gengrug = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch data from Supabase
  const fetchLocations = async () => {
    const { data, error } = await supabase.from("recycling_sites").select("*");

    if (error) {
      console.error("Error fetching locations:", error.message);
    } else {
      setLocations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Function to handle navigation when a location is clicked
  const handleLocationClick = (location) => {
    navigate(`/site-details/${location.id}`, { state: { site: location } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="gradient">
      <article className="genbrug-container">
        <div id="top-left">
          <h2>Genbrugsstationer</h2>
        </div>
        {locations.map(
          (location) =>
            location.latitude !== 0 &&
            location.longitude !== 0 && (
              <div
                key={location.id}
                className="location-card"
                onClick={() => handleLocationClick(location)} // Make the whole card clickable
                style={{ cursor: "pointer" }} // Add cursor pointer for UX
              >
                <MapContainer
                  center={[location.longitude, location.latitude]} // Fixed lat/lng order
                  zoom={12}
                  style={{ height: "200px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[location.longitude, location.latitude]}>
                    <Popup>{location.city}</Popup>
                  </Marker>
                </MapContainer>

                <div className="location-info">
                  <h3>{location.city}</h3>
                  <p className="location-description">Beskrivelse</p>
                  <div className="location-footer">
                    <span className="rating">⭐⭐⭐⭐⭐</span>
                    <span className="extra-info">Åbningstider</span>
                  </div>
                </div>
              </div>
            )
        )}
      </article>
    </section>
  );
};

export default Gengrug;
