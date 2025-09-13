import "./App.css";
import Message from "./Message.jsx";
// import koristimo da ubacimo komponentu u drugi fajl

function App() {
  return (
    <div>
      <h1>ajsa besirovic</h1>
      <Message />
    </div>
  );
}
// Komponenta mora da vrati tačno jedan glavni element
// Ako želimo više elemenata, moramo ih uvući u jedan zajednički (npr. <div> ili fragment <> </>)

export default App;
