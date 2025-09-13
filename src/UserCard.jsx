// "props" su svojstva (properties) koja prosleđujemo iz komponente App u ovu komponentu
// Možemo ih posmatrati kao objekat koji sadrži vrednosti koje šaljemo
// Dakle, props = { name: "ajsa", age: 21 }

// 1. verzija sa props
// function UserCard(props) {
//   return (
//     <div>
//       <h1>{props.name}</h1>   // props.name pristupa vrednosti "name" iz prosleđenog objekta
//       <p>{props.age}</p>      // props.age pristupa vrednosti "age" iz prosleđenog objekta
//     </div>
//   );
// }

// shorter version – destrukturiranje props-a direktno u parametru funkcije
// Umesto props.name i props.age, odmah izvlacimo { name, age } iz objekta
function UserCard({ name, age }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
    </div>
  );
}

export default UserCard;
