import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      {/* TEST REQUIRED HEADING */}
      <h1>My Bookings</h1>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {bookings.map((booking, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <h3>{booking.eventName}</h3>

          <p>
            {booking.address}, {booking.city}, {booking.state}
          </p>

          <p>Date: {booking.date}</p>
          <p>Time: {booking.timeSlot}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
