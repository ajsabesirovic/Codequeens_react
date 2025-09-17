const ProductCard = (props) => {
  console.log(props);

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.price}</p>

      {/* Conditional rendering - možemo menjati prikaz na osnovu vrednosti koje dobijamo */}

      {/* Prikazuje paragraf u svakom slucaju, ali u zavisnosti od props.inStock rendera drugaciji tekst */}
      {/* <p>{props.inStock ? "Na stanju" : "Nije na stanju"}</p> */}

      {/* Prikazuje paragraf JEDINO AKO je props.inStock == false */}
      {!props.inStock && <p style={{ color: "red" }}>Nije na stanju</p>}
    </div>
  );
};

export default ProductCard;
