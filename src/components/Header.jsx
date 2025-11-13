// Importujemo Link komponentu iz react-router-dom
// Link se koristi umesto običnog <a> taga da bismo navigaciju radili bez reload-a cele stranice
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <h2>Router</h2>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        {/* 
          Link komponenta radi slično kao <a href="">, ali ne reload-uje celu stranicu.
          'to' prop određuje na koju stranicu vodi klik.
        */}

        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          About
        </Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
