import { Link } from "react-router-dom";

function Navbar() {
  return (
        <nav style={styles.nav}>
      <div style={styles.logo}>
        XEvent
      </div>

      <ul style={styles.menu}>
        <li>
          <Link to="/" style={styles.link}>Find Events</Link>
        </li>
        <li>
          <Link to="/my-bookings" style={styles.link}>My Bookings</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#1976d2",
  },
  logo: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};
