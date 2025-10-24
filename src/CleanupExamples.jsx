import { useState, useEffect } from "react";

const CleanupExamples = () => {
  const [showExamples, setShowExamples] = useState(true);
  // ovaj useState kontroliše da li da prikažemo ili sakrijemo primere

  const [count, setCount] = useState(0);

  return (
    <div className="cleanup-examples">
      <h1>useEffect Cleanup Function Examples</h1>

      <div className="example-controls">
        <button onClick={() => setShowExamples(!showExamples)}>
          {showExamples ? "Hide" : "Show"} Examples
        </button>
      </div>

      {/* Ako je showExamples = true, prikazujemo TimerExample komponentu
          Kada kliknemo "Hide", showExamples postaje false znaci komponenta TimerExample se uklanja iz DOM-a.
          Kada se komponenta ukloni, njen useEffect cleanup se izvršava */}

      {showExamples && (
        <>
          <TimerExample />

          {/* <WindowResizeExample />

          <EventListenerExample />

          <ApiCallExample />

          <IntervalExample />

          <ConditionalCleanupExample count={count} />

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setCount(count + 1)}>
              Update Count: {count}
            </button>
          </div> */}
        </>
      )}
    </div>
  );
};

const TimerExample = () => {
  // State koji prati vreme u sekundama
  const [time, setTime] = useState(0);

  // useEffect — postavlja interval koji se izvršava na svaku sekundu
  useEffect(() => {
    console.log("Timer started"); // Ispisuje se kada se komponenta PRVI PUT renderuje (mount)

    // Postavljamo interval koji svakih 1000ms povećava state `time` za 1
    const intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // Cleanup funkcija — izvršava se kada se komponenta UKLANJA (unmount)
    // ili pre nego što se efekat ponovo pokrene (ako bi imao dependency)
    return () => {
      console.log("Timer cleanup - clearing interval");
      clearInterval(intervalId); // Obavezno čišćenje intervala da ne bi ostao aktivan nakon uklanjanja komponente (da se ne bi u pozadini i dalje izvrsavao kad se komponenta ukloni iz dom-a)
    };
  }, []); // Prazan niz znači da se efekat izvršava SAMO jednom (na mount), a cleanup pri unmountu

  return (
    <div className="example-box">
      <h3>Example 1: Timer with Interval</h3>
      <p>Timer running: {time} seconds</p>
      <p className="example-note">
        Open console to see cleanup logs. Cleanup runs when component unmounts.
      </p>
    </div>
  );
};

export default CleanupExamples;

// 1. Kada se stranica učita (inicijalni render)

// showExamples je true, pa se <TimerExample /> prikazuje.
// React poziva useEffect iz TimerExample:
// ispise Timer started
// Postavlja se setInterval → svake sekunde state time raste +1 → komponenta se rerenderuje

// Rendering with time: 1
// Rendering with time: 2
// Rendering with time: 3 ...

// 2. Kada kliknemo “Hide Examples”

// showExamples postaje false, pa React uklanja <TimerExample /> iz DOM-a.
// Pre nego što komponenta bude potpuno uklonjena, React poziva cleanup funkciju iz useEffect:
// ispise Timer cleanup - clearing interval
// Interval se briše (više se ne izvršava u pozadini).

// 3. Kada klikneš ponovo “Show Examples”

// showExamples postaje true → nova instanca <TimerExample /> se ponovo montira.
// React opet pokreće useEffect:
// ispise Timer started
// Novi interval počinje ispočetka (vreme se ponovo računa od nule).

// Konzola
// Timer started : kada se prvi put mountuje
// Timer cleanup - clearing interval  : kada se sakrije (unmount)
// Timer started : kada se ponovo prikaže
// Timer cleanup - clearing interval : kada se ponovo sakrije
