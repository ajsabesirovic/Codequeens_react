const ShoppingCart = ({ products }) => {
  if (products.length == 0) return <p>Korpa je prazna</p>;

  const total = products.reduce((acc, currEl) => acc + currEl, 0);

  return (
    <div>
      <h1>Vasa korpa:</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <p>Total: {total}</p>
      {total > 2000 && <p>Ostvarili ste besplatnu postarinu!</p>}
    </div>
  );
};

export default ShoppingCart;
