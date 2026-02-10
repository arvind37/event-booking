import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchEvents } from "../api/eventsApi";
import BookingModal from "../components/BookingModal";
import EventCarousel from "../components/EventCarousel";


function SearchResults() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    if (state && city) {
      fetchEvents(state, city)
        .then((data) => {
          setEvents(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [state, city]);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>
        {events.length} events available in {city}
      </h1>

  

      {events.map((event, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <h3>{event.event_name}</h3>

          <p>
            {event.address}, {event.city}, {event.state}
          </p>

          <p>Rating: {event.rating}</p>

          <button onClick={() => setSelectedEvent(event)}>
            Book FREE Event
          </button>
        </div>
      ))}

      {/* 🔥 THIS WAS MISSING */}
      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default SearchResults;
