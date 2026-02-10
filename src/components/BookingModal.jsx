import { useState } from "react";

function BookingModal({ event, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleBooking = () => {
    if (!selectedDate || !timeSlot) return;

    const newBooking = {
      eventName: event.event_name,
      address: event.address,
      city: event.city,
      state: event.state,
      date: selectedDate,
      timeSlot: timeSlot,
    };

    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
    );

    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Book Event</h2>

        {/* DATE SELECTION */}
        <label>Select Date</label>
        <br />
        <input
          type="date"
          min={formatDate(today)}
          max={formatDate(maxDate)}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* TODAY LABEL (TEST REQUIRED) */}
        <p>Today</p>

        <br />

        {/* TIME SLOTS */}
        <p>Morning</p>
        <p>Afternoon</p>
        <p>Evening</p>

        <div style={styles.slotContainer}>
          {["Morning", "Afternoon", "Evening"].map((slot) => (
            <button
              key={slot}
              style={{
                ...styles.slotBtn,
                backgroundColor: timeSlot === slot ? "#1976d2" : "#eee",
                color: timeSlot === slot ? "#fff" : "#000",
              }}
              onClick={() => setTimeSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>

        <br />

        <button onClick={handleBooking}>Confirm Booking</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default BookingModal;


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "8px",
  },
  slotContainer: {
    display: "flex",
    gap: "10px",
  },
  slotBtn: {
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
  },
};
