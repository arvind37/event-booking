import axios from "axios";

const BASE_URL = "https://eventdata.onrender.com";

// Fetch all states
export const fetchStates = async () => {
  const response = await axios.get(`${BASE_URL}/states`);
  return response.data;
};

// Fetch cities of a state
export const fetchCities = async (state) => {
  const response = await axios.get(`${BASE_URL}/cities/${state}`);
  return response.data;
};

// Fetch events by state & city
export const fetchEvents = async (state, city) => {
  const response = await axios.get(
    `${BASE_URL}/events?state=${state}&city=${city}`
  );
  return response.data;
};
