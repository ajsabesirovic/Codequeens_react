// BrowserRouter - omogućava React Router funkcionalnost u celoj aplikaciji
// Routes - definiše grupu ruta koje se mogu prikazati
// Route - definiše pojedinačnu rutu sa putanjom i komponentom koja se renderuje
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Blogs from "./pages/Blogs";
import BlogDetails from "./components/BlogDetails";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Settings from "./components/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { BlogsContainer } from "./BlogsContainer";
import { Categories } from "./components/Categories";

export default function App() {
  return (
    // BrowserRouter mora da okruži celu aplikaciju da bi React Router radio
    <BrowserRouter>
      <Routes>
        {/* 
          NESTED ROUTES (Ugnježđene rute):
          - Route sa path="/" je parent ruta koja renderuje <Home /> komponentu
          - Unutar Home komponente mora postojati <Outlet /> da bi se child rute prikazale
          - Child ruta "settings" će biti dostupna na URL-u: "/settings"
          - Kada korisnik ode na "/settings", Home komponenta će se renderovati,
            a <Outlet /> unutar Home će prikazati Settings komponentu
        */}
        <Route path="/" element={<Home />}>
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 
          PROTECTED ROUTES (Zaštićene rute):
          - ProtectedRoute komponenta proverava da li je korisnik autentifikovan
          - Ako jeste, renderuje <Outlet /> koji prikazuje child rute
          - Ako nije, prikazuje poruku o grešci
          - Sve child rute unutar ProtectedRoute su automatski zaštićene
        */}
        <Route path="/posts" element={<ProtectedRoute />}>
          {/* 
            index route - prikazuje se kada je URL tačno "/posts" (bez dodatnih delova)
            Ovo je ekvivalentno sa path="" ali je eksplicitnije
          */}
          <Route index element={<p>POSTOVI</p>}></Route>
          
          {/* 
            DYNAMIC ROUTE (Dinamička ruta):
            - :id je parametar koji može biti bilo koja vrednost
            - Primer URL-a: "/posts/123" ili "/posts/abc"
            - Vrednost :id se može čitati u komponenti pomoću useParams() hook-a
          */}
          <Route path=":id" element={<p>prvi post</p>}></Route>

          {/* 
            NESTED ROUTES UNUTAR PROTECTED ROUTE:
            - Categories je parent ruta za "/posts/categories"
            - Unutar Categories komponente mora biti <Outlet /> da bi se child rute prikazale
            - Child ruta ":id" će biti dostupna na URL-u: "/posts/categories/123"
            - Ovo je primer ugnježđenih ruta na više nivoa
          */}
          <Route path="categories" element={<Categories />}>
            <Route path=":id" element={<p>kategorija</p>}></Route>
          </Route>
        </Route>

        {/* 
          LAYOUT ROUTE (Layout ruta):
          - BlogsContainer je layout komponenta koja se uvek renderuje za "/blogs" i njene child rute
          - Unutar BlogsContainer mora postojati <Outlet /> da bi se child rute prikazale
          - Kada korisnik ode na "/blogs", prikazuje se BlogsContainer sa sadržajem iz <Outlet />
          - Kada korisnik ode na "/blogs/category", prikazuje se BlogsContainer sa "BLOGS CATEGORY" tekstom
        */}
        <Route path="/blogs" element={<BlogsContainer />}>
          <Route index element={<p>BLOGS</p>}></Route>
          <Route path="category" element={<p>BLOGS CATEGORY</p>}></Route>
        </Route>
        
        {/* 
          STANDALONE ROUTE (Samostalna ruta):
          - Dashboard nema child rute, samo se renderuje kada je URL "/dashboard"
          - Nema potrebe za <Outlet /> jer nema child ruta
        */}
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
