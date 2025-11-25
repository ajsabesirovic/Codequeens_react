import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Blogs from "./pages/Blogs";
import BlogDetails from "./components/BlogDetails";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Settings from "./components/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
