import React from "react";
import { useCallback, useState } from "react";

// Komponentu Button umotavamo u React.memo da bi React zapamtio njen prethodni rezultat renderovanja.
// React.memo sprečava ponovno renderovanje ako se props-i nisu promenili.
const Button = React.memo(({ onClick }) => {
  console.log("Button rendered"); // Ispisuje se svaki put kada se Button ponovo renderuje
  return <button onClick={onClick}>Click me</button>; // Dugme koje poziva funkciju prosleđenu kroz prop
});

function Parent() {
  console.log("Parent rendered"); // Ispisuje se svaki put kada se Parent renderuje
  const [count, setCount] = useState(0);

  // useCallback memoizuje funkciju i vraća istu referencu pri svakom renderovanju
  // Pošto zavisnosti [] ne sadrže ništa, funkcija se kreira samo jednom.
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>

      {/* Svaki klik izaziva ponovno renderovanje Parent komponente */}
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {/* Button komponenta prima handleClick kao prop. 
          Zahvaljujući useCallback-u, handleClick uvek ostaje ista funkcija,
          pa React.memo sprečava ponovno renderovanje Button komponente */}
      <Button onClick={handleClick} />
    </div>
  );
}

export default Parent;
