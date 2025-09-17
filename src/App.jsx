import "./App.css";
import Header from "./Header.jsx";
import Message from "./Message.jsx";
import ProductCard from "./ProductCard.jsx";
import UserCard from "./UserCard.jsx";

function App() {
  const isLoggedIn = true;
  const products = [
    { id: 1, title: "Laptop", price: 1200, inStock: true },
    { id: 2, title: "Telefon", price: 600, inStock: false },
    { id: 3, title: "Slusalice", price: 100, inStock: true },
  ];

  // const content2 = isLoggedIn ? <Dashboard /> : <LoginForm />;

  return (
    <>
      <ProductCard title="asf" price="12" inStock={false} />
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          inStock={product.inStock}
        />
      ))}

      {/* Conditional rendering - možemo menjati prikaz na osnovu vrednosti koje dobijamo */}

      {/* {isLoggedIn && <p>Ulogovan</p>} */}
      {/* 

      // Ako je isLoggedIn == true prikazacemo Dashboard, ako je false LoginForm (samo primeri naziva komponenti, nismo ih pravile)
      {isLoggedIn ? <Dashboard /> : <LoginForm />}

      // Content2 ce isto biti ili Dashboard ili LoginForm 
      {content2} */}
    </>
  );
}

export default App;
