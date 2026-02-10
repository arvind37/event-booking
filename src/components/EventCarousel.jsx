import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function EventCarousel({ events }) {
  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Featured Events</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div style={styles.card}>
  {/* EVENT NAME (IMPORTANT) */}
  <h3>{event.event_name}</h3>

  <p>
    {event.address}, {event.city}, {event.state}
  </p>

  <p>Rating: {event.rating}</p>
</div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default EventCarousel;
const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    background: "#fff",
    height: "100%",
  },
};
