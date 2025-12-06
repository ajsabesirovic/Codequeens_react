/**
 * Link - React Router komponenta za navigaciju
 *
 * Link je alternativa za obični <a> tag, ali:
 * - Ne osvežava stranicu (SPA - Single Page Application)
 * - Brža navigacija (samo menja komponente, ne učitava novu stranicu)
 * - Omogućava programsku navigaciju
 *
 * Razlika između <a> i <Link>:
 * - <a href="/blogs"> → osvežava stranicu (full page reload)
 * - <Link to="/blogs"> → ne osvežava stranicu (samo menja komponentu)
 */
import { Link } from "react-router-dom";
import { NasaKomponenta } from "./NasaKomponenta";

/**
 * Header - Navigaciona komponenta
 *
 * Ova komponenta prikazuje navigacione linkove.
 * Link komponenta omogućava navigaciju bez osvežavanja stranice.
 */
export default function Header({ nekiProp }) {
  return (
    <header style={{ padding: 20, display: "flex", gap: 20 }}>
      {/* 
        Link komponenta za navigaciju na "/blogs" rutu
        Kada korisnik klikne, React Router će prikazati BlogsContainer komponentu
        bez osvežavanja cele stranice
      */}
      <Link to="/blogs">
        <NasaKomponenta nekiProp={nekiProp}></NasaKomponenta>
      </Link>
    </header>
  );
}
