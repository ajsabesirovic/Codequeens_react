import { useState } from "react";

const Form = () => {
  // koristimo useState hook da čuvamo podatke o korisniku
  // inicijalna vrednost je objekat sa tri prazna polja: name, surname i email
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
  });

  // ova funkcija menja vrednosti u našem user objektu kada korisnik nešto upiše u input
  // e.target.name -> uzima ime inputa (npr. "name", "surname" ili "email")
  // e.target.value -> uzima vrednost koju korisnik upisuje
  // setUser(prevValue => ...) -> menja state i vraća novi objekat
  // ...prevValue -> kopira sve prethodne vrednosti (da se ne izgube druga polja)
  // [e.target.name]: e.target.value -> ažurira baš to polje koje se promenilo
  const changeInputValue = (e) => {
    setUser((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {/* Input za ime */}
      <label htmlFor="ime">Ime:</label>
      <input
        type="text"
        name="name" // name mora da se poklapa sa ključem u objektu (user.name)
        onChange={changeInputValue} // kada kucamo, menja se user.name
        value={user.name} // value je vezan za state (controlled component)
      />

      {/* Input za prezime */}
      <label htmlFor="surname">Prezime:</label>
      <input
        type="text"
        name="surname" // povezuje input sa user.surname
        onChange={changeInputValue}
        value={user.surname}
      />

      {/* Input za email */}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email" // povezuje input sa user.email
        onChange={changeInputValue}
        value={user.email}
      />

      {/* Ispisujemo trenutne vrednosti iz state-a */}
      <p>
        Vrednost name: {user.name}, Vrednost surname: {user.surname}, Vrednost
        email: {user.email}
      </p>
    </div>
  );
};

export default Form;
