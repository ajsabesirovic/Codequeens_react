import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// U produkciji (kada aplikacija ide uživo), React ne pokreće efekte duplo (useEffect)
// Ali u razvojnom okruženju, <StrictMode> to radi namerno, kao alat za debugovanje
// Zato ga privremeno uklanjamo dok učimo useEffect

createRoot(document.getElementById("root")).render(<App />);
// <StrictMode> — privremeno ga sklanjamo da efekti ne bi radili duplo
