import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Blogs from "./pages/Blogs";
import BlogDetails from "./components/BlogDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/blogs" element={<Blogs />} />

        {/* 
          Dinamička ruta - :id je "placeholder"
          - hvata npr. /blogs/1 ili /blogs/2...
          - vrednost id ćemo čitati u BlogDetails pomoću useParams()
        */}
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Fallback ruta - ako korisnik upiše nešto što ne postoji */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
