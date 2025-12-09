// Outlet - React Router komponenta koja renderuje child rute
// Kada imamo nested routes (ugnježđene rute), Outlet je mesto gde se child komponente prikazuju
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute - Komponenta za zaštitu ruta
 *
 * Ova komponenta proverava da li je korisnik autentifikovan pre nego što mu dozvoli pristup.
 *
 * Kako radi:
 * 1. Proverava preko AuthContext-a da li postoji prijavljen korisnik
 * 2. Ako postoji → renderuje <Outlet /> koji prikazuje child rute (zaštićene stranice)
 * 3. Ako ne postoji → preusmerava na /login rutu
 *
 * Primer korišćenja:
 * - U App.jsx, sve rute unutar <Route path="/posts" element={<ProtectedRoute />}> su zaštićene
 * - Kada korisnik pokuša da pristupi "/posts", prvo se proverava autentifikacija
 * - Samo autentifikovani korisnici mogu videti sadržaj unutar <Outlet />
 */
const ProtectedRoute = () => {
  // Umesto localStorage, koristimo AuthContext kao jedini izvor istine
  const { isAuthenticated } = useContext(AuthContext);

  // Ako je korisnik autentifikovan, renderujemo Outlet; inače preusmeravamo na /login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
