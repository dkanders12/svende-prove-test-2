import React, { useEffect, useState } from "react";
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="gradient">
      <article id="stederContainer">
        {locations.map(
          (location) =>
            location.latitude !== 0 &&
            location.longitude !== 0 && (
              <div key={location.id} className="location-map">
                <h3>{location.city}</h3>
                <MapContainer
                  center={[location.longitude, location.latitude]}
                  zoom={10}
                  style={{
                    height: "300px",
                    width: "500px",
                    marginBottom: "20px",
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[location.longitude, location.latitude]}>
                    <Popup>
                      <div>
                        <h4>{location.city}</h4>
                        <p>Email: {location.email}</p>
                        <p>Phone: {location.phone}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )
        )}
      </article>
    </section>
  );
};

export default Gengrug;
