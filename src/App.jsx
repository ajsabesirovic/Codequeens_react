// Importujemo osnovne komponente za routing iz react-router-dom
// BrowserRouter - omotava aplikaciju i omogućava korišćenje routing funkcionalnosti
// Routes - grupiše sve definisane rute
// Route - definiše pojedinačnu rutu (putanja + komponenta)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="app-container">
      {/* BrowserRouter mora da wrappuje sve Link-ove i Routes */}
      <BrowserRouter>
        {/* Header je van Routes, znači prikazuje se na svakoj stranici */}
        <Header />

        {/* Definišemo sve rute, path oznacava putanju, element komponentu koja treba da se prikaze */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Wildcard ruta (*) hvata sve nepostojeće putanje */}
          <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// SPA (Single Page Application)
// React Router omogućava navigaciju između stranica bez reload-a cele stranice
// Znači Header ostaje isti dok se menja sadržaj ispod (<Routes>)
