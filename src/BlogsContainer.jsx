import React from "react";
// Outlet - React Router komponenta koja renderuje child rute
import { Outlet } from "react-router-dom";

/**
 * BlogsContainer - Layout komponenta za blog sekciju
 * 
 * Ova komponenta se koristi kao layout wrapper za sve blog rute.
 * 
 * Kako radi:
 * 1. Kada korisnik ode na "/blogs" → prikazuje se "BLOGS PAGE" + child ruta (preko Outlet-a)
 * 2. Kada korisnik ode na "/blogs/category" → prikazuje se "BLOGS PAGE" + "BLOGS CATEGORY" (preko Outlet-a)
 * 
 * Outlet omogućava:
 * - Da se zajednički layout (npr. header, sidebar) prikaže za sve blog stranice
 * - Da se child rute dinamički menjaju bez gubljenja layout-a
 * - Da se izbegne ponavljanje koda (DRY princip)
 * 
 * Primer strukture:
 * - "/blogs" → BlogsContainer + "BLOGS" (iz index route)
 * - "/blogs/category" → BlogsContainer + "BLOGS CATEGORY" (iz category route)
 */
export const BlogsContainer = () => {
  return (
    <div>
      <h1>BLOGS PAGE</h1>

      {/* 
        Outlet renderuje child rute definisane u App.jsx:
        - Za "/blogs" → prikazuje index route ("BLOGS")
        - Za "/blogs/category" → prikazuje category route ("BLOGS CATEGORY")
        
        Bez Outlet-a, child rute se neće prikazati!
      */}
      <Outlet />
    </div>
  );
};
