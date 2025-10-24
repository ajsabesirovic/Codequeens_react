import { useEffect } from "react";

export function Examples1() {
  useEffect(() => {
    // Ovaj deo useEffect-a se izvršava odmah kada se komponenta "mount-a" tj. prikaže na ekranu
    console.log("Useeffect from examples1");

    // return deo u useEffect-u predstavlja tzv. "cleanup function"
    // Cleanup function se izvršava *pre nego što se komponenta ukloni iz DOM-a* (UNMOUNT),
    // ili *pre nego što se useEffect ponovo pokrene* (ako ima zavisnosti u dependency nizu).
    // U ovom slučaju, pošto je dependency niz prazan ([]),
    // cleanup se izvršava samo kada se komponenta unmount-uje.
    return () => {
      console.log("Cleanup examples1");
    };
  }, []); // Prazan niz znači: pokreni useEffect SAMO JEDNOM (na mount), i cleanup pri unmount-u.

  return <h1>Examples1</h1>;
}

export function Examples2() {
  useEffect(() => {
    // Kada se ova komponenta prikaže na ekranu, useEffect se odmah poziva
    console.log("Useeffect from examples2");

    // Kada ova komponenta bude uklonjena (unmount), pokreće se cleanup
    return () => {
      console.log("Cleanup examples2");
    };
  }, []);

  return <h1>Examples2</h1>;
}
