import "./App.css";
import Header from "./Header.jsx";
import Message from "./Message.jsx";
import UserCard from "./UserCard.jsx";

function App() {
  const users = [
    { id: 1, name: "ajsa", age: 21 },
    { id: 2, name: "jana", age: 20 },
  ];

  // Ovde za svakog korisnika iz niza users kreiramo UserCard komponentu
  // i šaljemo joj podatke kao ATRIBUTE (name i age)
  // Npr. <UserCard name="ajsa" age={21} />
  const content = users.map((user) => (
    <UserCard name={user.name} age={user.age} />
  ));

  return (
    <>
      <Header />
      <Message />

      {/* Primer: prikazujemo listu UserCard komponenti */}
      {users.map((user, index) => (
        <UserCard name={user.name} age={user.age} key={index} />
      ))}

      {/* Napomena o key-u:
         - Key je obavezan kada renderujemo listu elemenata.
         - Ako lista nikada ne menja svoj sadržaj, može se koristiti index.
         - Ako lista može da se menja (dodavanje, brisanje), bolje je koristiti jedinstveni ID. 
      */}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
          // Ovde koristimo "id" jer je jedinstven za svakog korisnika.
          // React tada može da prati elemente na ispravan način.
        ))}
      </ul>
    </>
  );
}

export default App;
