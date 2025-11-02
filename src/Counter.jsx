import { useRef } from "react";

function ClickCounter() {
  // Kreiramo ref koji čuva broj klikova
  const clickCount = useRef(0);

  const handleClick = () => {
    // Svaki put povećavamo broj u .current
    clickCount.current += 1;

    // Komponenta se NE re-renderuje,
    // zato promenu vidimo samo u konzoli
    console.log("Broj klikova:", clickCount.current);
  };

  console.log("Komponenta se renderovala");

  return <button onClick={handleClick}>Klikni me!</button>;
}

export default ClickCounter;
