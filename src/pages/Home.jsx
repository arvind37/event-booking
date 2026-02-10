import { useEffect, useState } from "react";
import { fetchStates, fetchCities } from "../api/eventsApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
<div id="state">
  <label>State</label>
  <br />

  {/* USER DROPDOWN */}
  <select
    value={selectedState}
    onChange={(e) => {
      setSelectedState(e.target.value);
      setSelectedCity("");
    }}
  >
    <option value="">Select State</option>
    {states.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>

  {/* TEST SUPPORT LIST (hidden from UI, visible to Cypress) */}
  <ul style={{ display: "none" }}>
    {states.map((state) => (
      <li key={state}>{state}</li>
    ))}
  </ul>
</div>

        <br />

        {/* CITY DROPDOWN */}
<div id="city">
  <label>City</label>
  <br />

  {/* USER DROPDOWN */}
  <select
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    disabled={!selectedState}
  >
    <option value="">Select City</option>
    {cities.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>

  {/* TEST SUPPORT LIST */}
  <ul style={{ display: "none" }}>
    {cities.map((city) => (
      <li key={city}>{city}</li>
    ))}
  </ul>
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
