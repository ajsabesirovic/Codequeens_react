import { useCart } from "../context/CartContext";

/**
 * ====================================================================================
 * KORAK 5: KORIŠĆENJE CONTEXT-A U KOMPONENTI
 * ====================================================================================
 * 
 * Ova komponenta demonstrira kako se koristi useCart hook da pristupi
 * globalnom cart state-u i funkcijama za manipulaciju.
 * 
 * KOMPLETAN TOK KADA KORISNIK INTERAGUJE SA UI:
 * ---------------------------------------------
 * 
 * PRIMER 1: Korisnik klikne "Add" dugme na proizvodu
 * ---------------------------------------------------
 * 1. onClick={() => addItem(product)} se izvršava
 * 2. addItem je funkcija iz CartContext-a koja poziva:
 *    dispatch({ type: "ADD_ITEM", payload: product })
 * 3. React poziva cartReducer(state, action)
 * 4. Reducer proverava action.type === "ADD_ITEM"
 * 5. Reducer vraća novi state: { ...state, items: [...state.items, noviProizvod] }
 * 6. useReducer u CartProvider ažurira state
 * 7. CartProvider se re-renderuje
 * 8. useMemo ponovo računa totalCount i totalPrice
 * 9. value objekat se ažurira
 * 10. Context.Provider prosleđuje novi value
 * 11. CartExample komponenta se re-renderuje (dobila je novi value iz Context-a)
 * 12. UI se ažurira - korisnik vidi proizvod u korpi!
 * 
 * PRIMER 2: Korisnik klikne "+" dugme u korpi
 * -------------------------------------------
 * 1. onClick={() => increment(item.id)} se izvršava
 * 2. increment šalje dispatch({ type: "INCREMENT", payload: item.id })
 * 3. Reducer pronalazi proizvod po id-u i povećava qty za 1
 * 4. Vraća novi state sa ažuriranim qty
 * 5. React re-renderuje komponentu sa novim qty vrednošću
 * 
 * PRIMER 3: Korisnik klikne "-" dugme u korpi
 * --------------------------------------------
 * 1. onClick={() => decrement(item.id)} se izvršava
 * 2. decrement šalje dispatch({ type: "DECREMENT", payload: item.id })
 * 3. Reducer smanjuje qty za 1
 * 4. Ako qty padne na 0, filter uklanja proizvod iz korpe
 * 5. React re-renderuje komponentu
 * 
 * ZAŠTO OVO RADI?
 * --------------
 * - useCart() hook pristupa CartContext-u koji je kreiran u CartContext.jsx
 * - CartProvider u App.jsx obavija CartExample, tako da useCart() može pristupiti Context-u
 * - Kada se state promeni u CartProvider-u, sve komponente koje koriste useCart() se re-renderuju
 * - Ovo je globalni state - bilo koja komponenta unutar CartProvider-a može pristupiti korpi!
 */
const PRODUCTS = [
  { id: "p1", name: "Laptop", price: 1200 },
  { id: "p2", name: "Headphones", price: 150 },
  { id: "p3", name: "Keyboard", price: 90 },
  { id: "p4", name: "Mouse", price: 60 },
];

const CartExample = () => {
  /**
   * useCart() hook pristupa CartContext-u i vraća value objekat iz CartProvider-a.
   * 
   * Destructuring izvlači sve što nam treba:
   * - items: lista proizvoda u korpi
   * - addItem, increment, decrement, removeItem, clearCart: funkcije za manipulaciju
   * - totalCount, totalPrice: izvedene vrednosti
   * 
   * Ove vrednosti dolaze direktno iz CartProvider komponente u CartContext.jsx.
   * 
   * VAŽNO: Ova komponenta se automatski re-renderuje kada se bilo šta promeni
   * u cart state-u (items, totalCount, totalPrice) jer je povezana sa Context-om!
   */
  const {
    items,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        marginTop: "24px",
      }}
    >
      <section>
        <h2>Products</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {PRODUCTS.map((product) => (
            <li
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            >
              <div>
                <div style={{ fontWeight: "600" }}>{product.name}</div>
                <div style={{ color: "#555" }}>${product.price}</div>
              </div>
              <button
                onClick={() => addItem(product)}
                style={{
                  padding: "8px 12px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              {/* 
                KADA KORISNIK KLIKNE "Add":
                - Poziva se addItem(product) funkcija
                - addItem šalje dispatch({ type: "ADD_ITEM", payload: product })
                - Reducer dodaje proizvod u korpu
                - State se ažurira i komponenta se re-renderuje
              */}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Cart</h2>
        <div style={{ marginBottom: "10px", color: "#444" }}>
          Items: <b>{totalCount}</b> | Total: <b>${totalPrice.toFixed(2)}</b>
        </div>
        {items.length === 0 ? (
          <p style={{ color: "#777" }}>Cart is empty</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600" }}>{item.name}</div>
                  <div style={{ color: "#555" }}>${item.price}</div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <button
                    onClick={() => decrement(item.id)}
                    style={{
                      padding: "6px 10px",
                      background: "#e0e0e0",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  {/* 
                    KADA KORISNIK KLIKNE "-":
                    - Poziva se decrement(item.id)
                    - Reducer smanjuje qty za 1
                    - Ako qty padne na 0, proizvod se uklanja iz korpe
                  */}
                  <span style={{ minWidth: "24px", textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    style={{
                      padding: "6px 10px",
                      background: "#e0e0e0",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                  {/* 
                    KADA KORISNIK KLIKNE "+":
                    - Poziva se increment(item.id)
                    - Reducer povećava qty za 1
                    - State se ažurira i qty se prikazuje u UI-u
                  */}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>${(item.qty * item.price).toFixed(2)}</div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: "6px 10px",
                      background: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                  {/* 
                    KADA KORISNIK KLIKNE "Remove":
                    - Poziva se removeItem(item.id)
                    - Reducer potpuno uklanja proizvod iz korpe (bez obzira na qty)
                    - Proizvod nestaje iz liste
                  */}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* 
          KADA KORISNIK KLIKNE "Clear Cart":
          - Poziva se clearCart()
          - Reducer vraća prazan items niz
          - Cela korpa se briše
          - UI se ažurira i prikazuje "Cart is empty"
        */}
        {items.length > 0 && (
          <button
            onClick={clearCart}
            style={{
              marginTop: "10px",
              padding: "10px 14px",
              background: "#000",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        )}
      </section>
    </div>
  );
};

export default CartExample;
