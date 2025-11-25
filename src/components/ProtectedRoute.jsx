// Outlet - React Router komponenta koja renderuje child rute
// Kada imamo nested routes (ugnježđene rute), Outlet je mesto gde se child komponente prikazuju
import { Outlet } from "react-router-dom";

/**
 * ProtectedRoute - Komponenta za zaštitu ruta
 * 
 * Ova komponenta proverava da li je korisnik autentifikovan pre nego što mu dozvoli pristup.
 * 
 * Kako radi:
 * 1. Proverava localStorage da li postoji "isAuthenticated" token
 * 2. Ako postoji → renderuje <Outlet /> koji prikazuje child rute (zaštićene stranice)
 * 3. Ako ne postoji → prikazuje poruku o grešci
 * 
 * Primer korišćenja:
 * - U App.jsx, sve rute unutar <Route path="/posts" element={<ProtectedRoute />}> su zaštićene
 * - Kada korisnik pokuša da pristupi "/posts", prvo se proverava autentifikacija
 * - Samo autentifikovani korisnici mogu videti sadržaj unutar <Outlet />
 */
const ProtectedRoute = () => {
  // Proveravamo da li postoji token autentifikacije u localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Ako je korisnik autentifikovan, renderujemo Outlet koji prikazuje child rute
  // Ako nije, prikazujemo poruku o grešci
  return isAuthenticated ? (
    // Outlet renderuje child rute koje su definisane u App.jsx unutar ove ProtectedRoute
    // Na primer, ako je URL "/posts/123", Outlet će prikazati komponentu za tu rutu
    <Outlet />
  ) : (
    <p>Ne mozete pristupiti ovoj stranici</p>
  );
};

export default ProtectedRoute;
