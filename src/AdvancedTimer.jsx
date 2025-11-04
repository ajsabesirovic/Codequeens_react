import { useState, useRef } from "react";

function AdvancedTimer() {
  // state koji čuva trenutno vreme u sekundama
  const [seconds, setSeconds] = useState(0);

  // useRef služi da sačuvamo *id intervala* između rendera.
  //   Ne želimo da se interval ponovo postavlja svaki put kad komponenta rerenderuje.
  //   Na početku je null jer tajmer još nije startovan.
  const intervalRef = useRef(null);

  // useRef za čuvanje liste "lap" vrednosti.
  //   Pošto ne želimo da svaki dodatak u niz izazove rerender, koristimo ref umesto state-a.
  const lapsRef = useRef([]);

  const start = () => {
    // Ako već postoji interval (već radi tajmer), ne pokrećemo novi
    // — sprečavamo da više intervala paralelno povećava vreme.
    if (intervalRef.current) return;

    // setInterval vraća ID intervala koji možemo kasnije koristiti da ga zaustavimo.
    // Taj ID se čuva u intervalRef.current i ostaje isti kroz sve rerendere.
    intervalRef.current = setInterval(() => {
      // setSeconds sa callback formom jer želimo da uvek koristimo najnoviju vrednost `seconds`
      setSeconds((s) => s + 1);
    }, 1000);
  };
  //   setInterval() vraća ID intervala → to je običan broj (npr. 7), koji moramo negde sačuvati da bismo kasnije mogli da ga obrišemo pomoću clearInterval(id).
  // Ako bismo ID čuvali u state-u, svaki put kad se promeni ID — komponenta bi se ponovo renderovala, što nije potrebno i moglo bi izazvati “loop”.
  // Zato koristimo useRef: vrednost se pamti između rendera, ali ne izaziva rerender kada se promeni.
  // Kada pozovemo start() više puta, uslov:
  // if (intervalRef.current) return;
  // sprečava da se otvori više aktivnih intervala.
  // Da to nemamo, vreme bi se povećavalo ubrzano (dva puta u sekundi, tri puta itd).

  const stop = () => {
    // clearInterval koristi ID koji je vratio setInterval i zaustavlja ga
    clearInterval(intervalRef.current);

    // Obavezno resetujemo ref na null da bismo mogli kasnije da pokrenemo novi interval
    intervalRef.current = null;
  };

  // Resetujemo tajmer i brišemo sve lap vrednosti
  const reset = () => {
    stop(); // prvo zaustavljamo tajmer ako je aktivan
    setSeconds(0); // vraćamo vreme na 0
    lapsRef.current = []; // praznimo niz (ne izaziva rerender)
  };

  // Dodavanje trenutne vrednosti u listu "krugova" (lap)
  const addLap = () => {
    // Ovde ne koristimo state jer ne želimo rerender svaki put kad se doda krug
    lapsRef.current.push(seconds);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h2>Tajmer sa Lap funkcijom</h2>
      <h3>{seconds} sekundi</h3>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={addLap}>Lap</button>
      </div>

      <h4 style={{ marginTop: "16px" }}>Lap vrednosti:</h4>
      <ul>
        {lapsRef.current.map((lap, i) => (
          <li key={i}>
            Krug {i + 1}: {lap} sekundi
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdvancedTimer;
