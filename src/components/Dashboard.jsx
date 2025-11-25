// Outlet - React Router komponenta koja renderuje child rute
import { Outlet } from "react-router";

/**
 * Dashboard - Komponenta sa Outlet-om
 * 
 * Ova komponenta ima <Outlet /> ali trenutno nema definisane child rute u App.jsx.
 * 
 * Kada bi se dodale child rute u App.jsx:
 * <Route path="dashboard" element={<Dashboard />}>
 *   <Route path="stats" element={<Stats />} />
 *   <Route path="analytics" element={<Analytics />} />
 * </Route>
 * 
 * Tada bi Outlet prikazivao te child komponente:
 * - "/dashboard" → prikazuje samo Dashboard
 * - "/dashboard/stats" → prikazuje Dashboard + Stats (preko Outlet-a)
 * - "/dashboard/analytics" → prikazuje Dashboard + Analytics (preko Outlet-a)
 * 
 * Trenutno, Outlet ne prikazuje ništa jer nema child ruta.
 */
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard komponenta</h1>

      {/* 
        Outlet je mesto gde bi se prikazale child rute ako bi bile definisane.
        Trenutno nema child ruta, pa Outlet ne prikazuje ništa.
        
        Da bi Outlet radio, u App.jsx bi trebalo da bude:
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="..." element={...} />
        </Route>
      */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
