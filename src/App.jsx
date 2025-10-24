import { useState } from "react";
import "./App.css";
import CleanupExamples from "./CleanupExamples";
import { Examples1, Examples2 } from "./Examples";

function App() {
  const [currentComponent, setCurrentComponent] = useState("examples1");

  return (
    <div className="app">
      <p>
        Here you can see which component is currently being rendered, by
        clicking the btn we are unmounting that component and rendering the
        other one. Open console to check the logs.
      </p>
      {currentComponent === "examples1" ? <Examples1 /> : <Examples2 />}
      {/* Kada je currentComponent === "examples1", prikazuje se <Examples1 /> 
          Kada kliknemo btn Change, state se menja i React
          Unmount-uje (uklanja) komponentu <Examples1 /> iz DOM-a
          Pre nego što je ukloni, poziva njen cleanup (Cleanup examples1) iz useEffect-a.
          Nakon toga, mount-uje novu komponentu <Examples2 />, i pokreće njen useEffect (Useeffect from examples2). */}
      <button
        onClick={() => {
          setCurrentComponent((prev) =>
            prev == "examples1" ? "examples2" : "examples1"
          );
        }}
      >
        Change
      </button>
      {/* 
      ISPIS U KONZOLI
      Kad tek pokrenemo app u konzoli vidimo:

        Useeffect from examples1

        Kliknemo na “Change”:

        Cleanup examples1
        Useeffect from examples2

        Kliknemo ponovo:

        Cleanup examples2
        Useeffect from examples1 */}

      <CleanupExamples />
    </div>
  );
}
export default App;
