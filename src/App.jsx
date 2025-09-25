// Hookovi su posebne funkcije koje počinju sa "use"
// Dodaju mogućnosti funkcionalnim komponentama npr. state, lifecycle logiku
import { useState } from "react";
// Importamo useState hook iz React-a
import "./App.css";

function App() {
  // Svaki put kad se komponenta renderuje, videćemo ovaj log
  console.log("Komponenta se rerenderuje");

  // - useState nam omogućava da sačuvamo vrednost između rendera.
  // - count = trenutna vrednost (state promenljiva)
  // - setCount = funkcija za ažuriranje vrednosti
  // - useState(0) → početna vrednost je 0
  const [count, setCount] = useState(0);

  // Možemo imati više state-ova u istoj komponenti
  const [theme, setTheme] = useState("dark");

  // Obična promenljiva
  // Ovo se resetuje svaki put kada se komponenta ponovo izvrši (rerenderuje)
  // React ne zna da je vrednost promenjena, pa UI ostaje isti
  let variableCounter = 0;

  const increment = () => {
    // Ako želimo da povećamo vrednost više puta u istom renderu,
    // moramo koristiti funkcijski update:
    // - prevCount predstavlja prethodnu vrednost.
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);

    // Važno: OVAJ console.log će prikazati STARU vrednost,
    // jer se setState izvršava asinhrono (ne odmah).
    // React prvo sakupi sve promene (batching), pa tek onda rerenderuje.
    console.log("Kliknuto + , count =", count);
  };

  const decrement = () => {
    // Ovo NIJE idealno:
    // setCount(count - 1) koristi "snapshot" vrednost iz trenutnog rendera.
    // Bolje koristiti funkcijski update tj. prev=>prev-1
    setCount(count - 1);

    // Menjamo drugi state
    setTheme("light");

    console.log("Kliknuto - , count =", count);
  };

  return (
    <div>
      <h2>Primer sa useState hookom</h2>
      <button onClick={increment}>+</button>
      <p>Count vrednost: {count}</p>
      <button onClick={decrement}>-</button>
      <p>Trenutna tema: {theme}</p>

      <hr />

      <h2>Primer sa običnom promenljivom</h2>
      {/* Ovo se neće ponašati kako očekujemo, jer React ne rerenderuje na promenu običnih promenljivih */}
      <p>Variable counter: {variableCounter}</p>
      <button onClick={() => variableCounter++}>Povećaj običan counter</button>
      <p>
        Nakon klika pogledaj konzolu – vrednost se menja u memoriji, ali UI se
        ne osvežava jer nema rerendera.
      </p>
    </div>
  );
}

export default App;

/*
Render = izvršavanje funkcije komponente i crtanje UI-ja na osnovu return-a.
Rerender = novo izvršavanje kada se promeni state ili props.
Obične promenljive se resetuju pri svakom renderu i ne osvežavaju UI.
useState čuva vrednosti između rendera i obaveštava React da treba rerender.
setState je asinhron → zato odmah posle njega u console.log još vidimo staru vrednost. setState poziv se zakaze za rerender i tek se posle izvrsava.
React radi "batching" → spaja više setState poziva radi optimizacije.
*/
