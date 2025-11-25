// Outlet - React Router komponenta koja renderuje child rute
import { Outlet } from "react-router";

/**
 * Home - Layout komponenta sa nested routes
 * 
 * Ova komponenta je parent ruta koja omogućava child rutama da se prikazuju unutar nje.
 * 
 * Kako radi Outlet:
 * - Outlet je "placeholder" gde se renderuju child komponente
 * - Kada korisnik ode na "/" → prikazuje se "Home" tekst
 * - Kada korisnik ode na "/settings" → prikazuje se "Home" tekst + Settings komponenta (preko Outlet-a)
 * 
 * Primer:
 * - URL: "/" → prikazuje: "Home" (bez child rute)
 * - URL: "/settings" → prikazuje: "Home" + sadržaj Settings komponente (preko Outlet-a)
 * 
 * VAŽNO: Bez <Outlet />, child rute se neće prikazati!
 */
const Home = () => {
  return (
    <div>
      Home
      {/* 
        Outlet je mesto gde se renderuju child rute definisane u App.jsx
        U ovom slučaju, kada korisnik ode na "/settings", 
        Settings komponenta će se renderovati na mestu gde je <Outlet />
      */}
      <Outlet />
    </div>
  );
};

export default Home;
