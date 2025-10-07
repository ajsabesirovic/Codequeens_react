import { useEffect, useState } from "react";
import "./App.css";

// Ova komponenta demonstrira različite načine korišćenja useEffect hook-a
// i kako se on ponaša u zavisnosti od "niza zavisnosti" (dependency array-a).
function App() {
  // useState nam omogućava da čuvamo i menjamo stanje unutar funkcionalne komponente.
  const [count, setCount] = useState(0); // brojač
  const [colorState, setColorState] = useState("green"); // boja teksta

  // ----------------------------- 1️⃣ PRVI useEffect -----------------------------
  // Ovaj useEffect ima jednu zavisnost: [colorState]
  // To znači da će se pokrenuti:
  // - jednom prilikom prvog renderovanja (kad se komponenta učita)
  // - svaki put kada se promeni vrednost "colorState"
  useEffect(() => {
    // document.title = colorState; // primer sporednog efekta (promena naslova taba)
    console.log("Prvi useeffect");
  }, [colorState]); // pokreće se kad se promeni boja

  // ----------------------------- 2️⃣ DRUGI useEffect -----------------------------
  // Ovaj useEffect ima dve zavisnosti: [count, colorState]
  // Pokreće se:
  // - prilikom prvog renderovanja
  // - svaki put kada se promeni count ILI colorState
  useEffect(() => {
    // document.title = `Count: ${count}`;
    console.log("Drugi useeffect");
  }, [count, colorState]);

  // ----------------------------- 3️⃣ TREĆI useEffect -----------------------------
  // Ovaj useEffect NEMA niz zavisnosti (nema [])
  // To znači da će se pokrenuti POSLE SVAKOG rendera komponente!
  // Dakle, ako se count ili colorState promene, komponenta se ponovo renderuje
  // i ovaj efekat će se iznova izvršiti svaki put.
  useEffect(() => {
    console.log("Treci useeffect");
  }); // ← bez [] znači: pokreni nakon svakog rendera

  // ----------------------------- 4️⃣ ČETVRTI useEffect -----------------------------
  // Ovaj useEffect ima PRAZAN niz zavisnosti []
  // Pokreće se SAMO JEDNOM — kada se komponenta prvi put učita.
  // Koristi se često za "inicijalizaciju" podataka (npr. fetchovanje sa API-ja)
  // jer se ponaša kao "componentDidMount" u klasnim komponentama.
  useEffect(() => {
    console.log("Cetvrti useeffect");
  }, []); // ← pokreće se samo jednom

  // Funkcija za promenu boje teksta između "red" i "green"
  const changeColor = () => {
    setColorState((prevValue) => (prevValue === "red" ? "green" : "red"));
  };

  return (
    <div>
      {/* Prikazujemo broj, koji će menjati boju i vrednost */}
      <p style={{ color: colorState }}>{count}</p>

      {/* Dugme za povećanje brojača */}
      <button
        onClick={() => {
          setCount((prevValue) => prevValue + 1);
        }}
      >
        +
      </button>

      {/* Dugme za smanjenje brojača */}
      <button
        onClick={() => {
          setCount((prevValue) => prevValue - 1);
        }}
      >
        -
      </button>

      <br />

      {/* Dugme za promenu boje */}
      <button onClick={changeColor}>Change color</button>
    </div>
  );
}

export default App;
