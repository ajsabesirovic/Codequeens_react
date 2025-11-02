import { useRef } from "react";
import "./App.css";
import ClickCounter from "./Counter";
import FocusInput from "./FocusInput";

function App() {
  return (
    <div className="app">
      <ClickCounter />
      <FocusInput />
    </div>
  );
}
export default App;
