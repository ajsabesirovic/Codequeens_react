import { useMemo, useState } from "react";

function ExpensiveCalculationExample() {
  // count i other su dve različite vrednosti u state-u
  // count koristimo za računanje, a other samo za demonstraciju promene
  const [count, setCount] = useState(1);
  const [other, setOther] = useState(false);

  // useMemo kešira (pamti) rezultat funkcije calculate(count)
  // i ponovo je poziva SAMO ako se promeni vrednost u dependency array-u.
  // U ovom primeru imamo [other] kao dependency, što znači:
  // - Ako kliknemo "Increment" (menja count), useMemo se NE pokreće ponovo.
  // - Ako kliknemo "Toggle" (menja other), useMemo se pokreće ponovo.
  // Dakle, iako se count promeni, expensiveValue ostaje isti.
  const expensiveValue = useMemo(() => {
    return calculate(count); // poziva se samo kad se promeni "other"
  }, [other]);

  // U dependency array-u bi zapravo trebalo da bude "count", jer se funkcija calculate()
  // oslanja na vrednost promenljive count. Ako "count" nije u dependency array-u,
  // useMemo neće primetiti da se count promenio i neće ponovo izračunati vrednost.
  // Dakle, "expensiveValue" će ostati stara iako se count povećava.
  // Kada umesto [other] stavimo [count], useMemo će ponovo pozvati calculate()
  // svaki put kada se count promeni, što je ispravno ponašanje.

  return (
    <div>
      {/* prikaz trenutne vrednosti count */}
      <h3>Count: {count}</h3>

      {/* klik povećava count za 1 */}
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {/* klik menja other iz true u false i obrnuto */}
      <button onClick={() => setOther(!other)}>Toggle</button>

      {/* prikazuje da li je other TRUE ili FALSE */}
      <p>{other ? "TRUE" : "FALSE"} HA</p>

      {/* prikazuje vrednost dobijenu iz useMemo */}
      <p>Expensive value: {expensiveValue}</p>
    </div>
  );
}
export default ExpensiveCalculationExample;

// Funkcija koja simulira "teško" računanje
function calculate(count) {
  // Ispisujemo u konzolu svaki put kad se funkcija pozove
  console.log(count);
  console.log("Computing...");

  // simulacija zahtevnog izračunavanja
  let total = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    total += i;
  }

  // rezultat zavisi od count-a
  return total * count;
}

/*
OBJAŠNJENJE:
- Bez useMemo, funkcija calculate() bi se pozivala pri SVAKOM renderovanju,
  bez obzira na to da li se count promenio.
- Sa useMemo, rezultat izračunavanja se "pamti" (memoizuje) dok se ne promeni dependency.
- Ako dependency array sadrži [other], rezultat se menja samo kad se other promeni.
- Ako dependency array sadrži [count], rezultat se menja samo kad se count promeni.
- Ako je dependency array prazan [], rezultat se računa samo jednom (pri prvom renderu).
*/
