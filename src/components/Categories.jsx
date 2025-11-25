// Outlet - React Router komponenta koja renderuje child rute
import { Outlet } from "react-router-dom";

/**
 * Categories - Komponenta sa nested routes unutar protected route
 * 
 * Ova komponenta demonstrira ugnježđene rute na više nivoa:
 * - Level 1: "/posts" (ProtectedRoute)
 * - Level 2: "/posts/categories" (Categories)
 * - Level 3: "/posts/categories/:id" (dinamička child ruta)
 * 
 * Kako radi:
 * - Kada korisnik ode na "/posts/categories" → prikazuje se "Categories" tekst
 * - Kada korisnik ode na "/posts/categories/123" → prikazuje se "Categories" + child ruta (preko Outlet-a)
 * 
 * Outlet omogućava da se child rute prikažu unutar parent komponente.
 */
export const Categories = () => {
  return (
    <div>
      Categories
      {/* 
        Outlet renderuje child rute:
        - Za "/posts/categories" → prikazuje samo "Categories" (bez child rute)
        - Za "/posts/categories/123" → prikazuje "Categories" + child ruta sa :id parametrom
        
        Primer URL-a: "/posts/categories/5"
        - "5" je vrednost :id parametra koja se može čitati pomoću useParams() hook-a
      */}
      <Outlet />
    </div>
  );
};
