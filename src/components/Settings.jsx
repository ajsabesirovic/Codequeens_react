/**
 * Settings - Child ruta unutar Home komponente
 * 
 * Ova komponenta je child ruta koja se prikazuje unutar Home komponente.
 * 
 * Kako radi:
 * - U App.jsx je definisana kao: <Route path="settings" element={<Settings />} />
 * - Ova ruta je child ruta Home komponente: <Route path="/" element={<Home />}>
 * - Kada korisnik ode na "/settings", Home komponenta se renderuje sa <Outlet />
 * - <Outlet /> unutar Home komponente prikazuje Settings komponentu
 * 
 * URL struktura:
 * - "/" → prikazuje Home (bez child rute)
 * - "/settings" → prikazuje Home + Settings (preko Outlet-a u Home komponenti)
 */
const Settings = () => {
  return <div>Settings</div>;
};

export default Settings;
