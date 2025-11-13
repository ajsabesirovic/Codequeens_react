import React, { useState, useCallback, useMemo } from "react";

const ProductList = React.memo(({ products }) => {
  console.log("ProductList rendered");
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} – {p.category}
        </li>
      ))}
    </ul>
  );
});

export default function FilterProducts() {
  const products = useMemo(
    () => [
      { id: 1, name: "Apple", category: "Food" },
      { id: 2, name: "T-Shirt", category: "Clothes" },
      { id: 3, name: "Laptop", category: "Tech" },
      { id: 4, name: "Banana", category: "Food" },
    ],
    []
  );

  const [filtered, setFiltered] = useState(products);

  const filterByCategory = useCallback(
    (category) => {
      setFiltered(
        category === "All"
          ? products
          : products.filter((p) => p.category === category)
      );
    },
    [products]
  );

  console.log("FilterProducts rendered");

  return (
    <div>
      <h2>Product Filter</h2>
      <button onClick={() => filterByCategory("All")}>All</button>
      <button onClick={() => filterByCategory("Food")}>Food</button>
      <button onClick={() => filterByCategory("Clothes")}>Clothes</button>
      <button onClick={() => filterByCategory("Tech")}>Tech</button>
      <ProductList products={filtered} />
    </div>
  );
}
