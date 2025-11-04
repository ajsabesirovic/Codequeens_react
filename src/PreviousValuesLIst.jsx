import { useState, useRef, useEffect } from "react";

function PreviousValuesList() {
  // state koji čuva trenutno unetu vrednost iz input polja
  const [value, setValue] = useState("");

  // useRef koji čuva sve prethodne vrednosti unete u polje
  //     (ne želimo rerender svaki put kad se niz promeni)
  const previousValues = useRef([]);

  // useEffect se pokreće svaki put kada se promeni `value`
  useEffect(() => {
    // Ako nije prazan string (korisnik je nešto uneo)
    if (value.trim() !== "") {
      // Dodajemo novu vrednost u niz unutar ref-a
      // pošto je .current objekat, možemo ga direktno menjati
      previousValues.current.push(value);
    }

    // Ispisujemo dužinu niza u konzolu samo radi praćenja
    console.log(previousValues.current.length);
  }, [value]); // <- efekat se pokreće na svaku promenu value

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h2>Praćenje prethodnih vrednosti</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Upiši nešto..."
        style={{ padding: "6px", marginRight: "8px" }}
      />

      <p>
        Trenutna vrednost: <strong>{value}</strong>
      </p>

      <p>Ukupan broj promena: {previousValues.current.length}</p>

      <h3>Prethodne vrednosti:</h3>
      <ul>
        {previousValues.current.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousValuesList;
