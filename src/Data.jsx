import { useEffect, useState } from "react";

// Komponenta Data demonstrira kako useEffect reaguje na promene stanja (state-a)
// i kako se koristi za "sporedne efekte" (npr. fetchovanje podataka sa API-ja)
const Data = () => {
  // useState hook kreira state promenljivu "resourceType"
  // i funkciju "setResourceType" pomoću koje menjamo njenu vrednost.
  // Početna vrednost je "posts".
  const [resourceType, setResourceType] = useState("posts");

  // useEffect se koristi za obavljanje sporednih efekata u React-u
  // kao što su fetchovanje podataka, manipulacija DOM-om, rad sa tajmerima itd.
  //
  // Ovaj useEffect će se pokrenuti svaki put kada se promeni vrednost "resourceType".
  // Dakle, kad korisnik klikne na dugme (Posts, Users ili Comments),
  // promeniće se resourceType i useEffect će se ponovo izvršiti.
  useEffect(() => {
    // Fetch šalje HTTP zahtev ka API-ju jsonplaceholder
    // i vraća podatke u zavisnosti od resourceType (posts, users ili comments).
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json()) // odgovor pretvaramo u JSON format
      .then((json) => console.log(json)); // rezultat ispisujemo u konzolu

    // U zavisnosti od vrednosti u nizu zavisnosti ([resourceType]),
    // useEffect zna kada treba da se pokrene ponovo.
    // Ako bismo niz ostavili prazan ([]), efekat bi se pokrenuo SAMO jednom pri mount-u komponente.
    // Ako bismo ga izostavili potpuno, efekat bi se pokretao posle SVAKOG rendera (što je neefikasno).
  }, [resourceType]); // ← useEffect se ponovo pokreće SAMO kada se resourceType promeni

  // U JSX-u prikazujemo tri dugmeta pomoću kojih korisnik može da menja resourceType.
  // Klik na dugme poziva setResourceType i time menja stanje.
  // useEffect automatski reaguje na tu promenu i ponovo fetchuje podatke.
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setResourceType("posts");
          }}
        >
          Posts
        </button>

        <button
          onClick={() => {
            setResourceType("users");
          }}
        >
          Users
        </button>

        <button
          onClick={() => {
            setResourceType("comments");
          }}
        >
          Comments
        </button>
      </div>

      {/* Ovde prikazujemo trenutno izabrani tip resursa */}
      <p>{resourceType}</p>
    </div>
  );
};

export default Data;
