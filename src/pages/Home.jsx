import { useEffect, useState } from "react";
import { fetchStates, fetchCities } from "../api/eventsApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [showStates, setShowStates] = useState(false);
const [showCities, setShowCities] = useState(false);

  const navigate = useNavigate();

  // Fetch states on page load
  useEffect(() => {
    fetchStates()
      .then((data) => setStates(data))
      .catch((error) => console.error(error));
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState)
        .then((data) => setCities(data))
        .catch((error) => console.error(error));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedState || !selectedCity) return;

    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Find Events</h1>

      <form onSubmit={handleSubmit}>
{/* STATE DROPDOWN */}
<div id="state" style={{ position: "relative", width: "250px" }}>
  <label>State</label>

  {/* Selected value box */}
  <div
    onClick={() => setShowStates((prev) => !prev)}
    style={{
      border: "1px solid #ccc",
      padding: "8px",
      cursor: "pointer",
      background: "#fff",
    }}
  >
    {selectedState || "Select State"}
  </div>

  {/* Dropdown list */}
  {showStates && (
    <ul
      style={{
        border: "1px solid #ccc",
        margin: 0,
        padding: 0,
        listStyle: "none",
        position: "absolute",
        width: "100%",
        background: "#fff",
        zIndex: 10,
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {states.map((state) => (
        <li
          key={state}
          onClick={() => {
            setSelectedState(state);
            setSelectedCity("");
            setShowStates(false);
          }}
          style={{
            padding: "8px",
            cursor: "pointer",
          }}
        >
          {state}
        </li>
      ))}
    </ul>
  )}
</div>




        <br />
{/* CITY DROPDOWN */}
<div id="city" style={{ position: "relative", width: "250px", marginTop: "20px" }}>
  <label>City</label>

  <div
    onClick={() => selectedState && setShowCities((prev) => !prev)}
    style={{
      border: "1px solid #ccc",
      padding: "8px",
      cursor: selectedState ? "pointer" : "not-allowed",
      background: "#fff",
      color: selectedState ? "#000" : "#aaa",
    }}
  >
    {selectedCity || "Select City"}
  </div>

  {showCities && (
    <ul
      style={{
        border: "1px solid #ccc",
        margin: 0,
        padding: 0,
        listStyle: "none",
        position: "absolute",
        width: "100%",
        background: "#fff",
        zIndex: 10,
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {cities.map((city) => (
        <li
          key={city}
          onClick={() => {
            setSelectedCity(city);
            setShowCities(false);
          }}
          style={{
            padding: "8px",
            cursor: "pointer",
          }}
        >
          {city}
        </li>
      ))}
    </ul>
  )}
</div>


        <br />

        {/* SEARCH BUTTON */}
        <button type="submit" id="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;
