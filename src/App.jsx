import { useState, useMemo, useCallback } from "react";
import UserList from "./UserList";
import Parent from "./Parent";

// Lista korisnika – statički definisana izvan komponente App.
// Pošto se ne menja, ne izaziva re-render komponente.
const users = [
  { id: 1, name: "Ajsa" },
  { id: 2, name: "Sumeja" },
  { id: 3, name: "Esma" },
  { id: 4, name: "Mirela" },
];

function App() {
  // query čuva tekst koji korisnik unese u input polje (pretraga)
  const [query, setQuery] = useState("");

  // useMemo se koristi da izračunavanje (filter funkcija) ne bi bilo
  // ponovo izvršeno svaki put kad se komponenta renderuje,
  // već samo kad se promeni "query".
  const filteredUsers = useMemo(() => {
    // Filtrira korisnike koji sadrže tekst iz "query" (ne razlikuje velika/mala slova)
    return users.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);
  // ← useMemo će ponovo izračunati filteredUsers SAMO ako se promeni query

  // useCallback vraća memoizovanu verziju funkcije handleChange
  // To znači da će referenca na funkciju ostati ista između rendera,
  // osim ako se ne promeni nešto u dependency nizu (ovde nema ničega)
  // Ovo sprečava nepotrebne re-render-e child komponenti koje primaju ovu funkciju kao prop
  const handleChange = useCallback((e) => {
    setQuery(e.target.value); // ažurira query kad korisnik piše u input
  }, []);
  return (
    <div>
      {/* <Parent /> 
      Probajte prvo samo Parent da returnate i to bez ikakvih
      funkcija i state-ova u App komponenti, a onda pogledajte ispod*/}
      <input placeholder="Search..." value={query} onChange={handleChange} />
      <UserList users={filteredUsers} />
    </div>
  );
}

export default App;
