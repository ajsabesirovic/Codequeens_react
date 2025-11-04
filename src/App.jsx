import { useRef } from "react";
import "./App.css";
import ClickCounter from "./Counter";
import FocusInput from "./FocusInput";
import PreviousValuesList from "./PreviousValuesLIst";
import AdvancedTimer from "./AdvancedTimer";

function App() {
  return (
    <div className="app">
      {/* <ClickCounter />
      <FocusInput /> */}

      {/* <PreviousValuesList></PreviousValuesList> */}
      <AdvancedTimer></AdvancedTimer>
    </div>
  );
}
export default App;
