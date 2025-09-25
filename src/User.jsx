import { useState } from "react";

const User = () => {
  const [user, setUser] = useState({
    name: "Ajsa",
    age: 21,
  });

  const changeAge = () => {
    //  Kada radimo sa objektom u state-u:
    // - ne možemo samo napisati { age: prevValue.age + 1 }
    //   jer bi to zamenilo ceo objekat i izgubili bismo "name"
    //
    // Rešenje je spread operator (...prevValue)
    //   koji kopira sve postojeće property-je iz prethodnog objekta,
    //   pa onda menjamo samo ono što želimo (age u ovom slučaju).
    setUser((prevValue) => ({
      ...prevValue, // zadržava sve stare property-je
      age: prevValue.age + 1, // menja samo age
    }));
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.age}</h1>
      <button onClick={changeAge}>Change age</button>
    </div>
  );
};

export default User;
