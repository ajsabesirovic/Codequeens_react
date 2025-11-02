import { useRef } from "react";

function FocusInput() {
  // useRef kreira objekat koji ima property .current
  // Ovaj obj čuva vrednost i NE izaziva re-render kada se promeni
  const inputRef = useRef();

  const handleFocus = () => {
    // .current sadrži DOM element (input)
    // Ovako pristupamo direktno tom elementu
    inputRef.current.focus(); // Postavlja fokus na input polje
  };

  return (
    <div>
      {/* povezujemo ref sa HTML elementom */}
      <input ref={inputRef} placeholder="Klikni dugme da se fokusira" />
      <button onClick={handleFocus}>Fokusiraj input</button>
    </div>
  );
}

export default FocusInput;
