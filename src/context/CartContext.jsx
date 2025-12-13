import { createContext, useReducer, useContext, useMemo } from "react";

/**
 * ====================================================================================
 * KORAK 1: KREIRANJE CONTEXT-A
 * ====================================================================================
 * 
 * createContext() kreira Context objekat sa default vrednostima.
 * Ove vrednosti se koriste samo ako komponenta koristi Context VAN Provider-a
 * (što bi bilo greška - uvek koristimo Context unutar Provider-a).
 * 
 * Ovo je samo "template" - prave vrednosti dolaze iz CartProvider komponente.
 */
const CartContext = createContext({
  items: [],              // Lista proizvoda u korpi
  addItem: () => {},      // Funkcija za dodavanje proizvoda
  removeItem: () => {},   // Funkcija za uklanjanje proizvoda
  increment: () => {},    // Funkcija za povećanje količine
  decrement: () => {},    // Funkcija za smanjenje količine
  clearCart: () => {},    // Funkcija za brisanje cele korpe
  totalCount: 0,          // Ukupan broj proizvoda u korpi
  totalPrice: 0,          // Ukupna cena korpe
});

/**
 * ====================================================================================
 * KORAK 2: KREIRANJE REDUCER-A
 * ====================================================================================
 * 
 * Reducer je čista funkcija koja prima trenutni state i action, i vraća NOVI state.
 * 
 * PRAVILA REDUCER-A:
 * ------------------
 * 1. Uvek vraća NOVI objekat (nikad ne mutira postojeći state)
 * 2. Koristi spread operator (...state) da kopira postojeći state
 * 3. Action ima type (šta želimo da uradimo) i payload (podaci)
 * 4. Default case vraća state bez promene (ako action.type nije prepoznat)
 * 
 * KAKO RADI:
 * ----------
 * - React poziva reducer kada se pozove dispatch(action)
 * - Reducer proverava action.type i odlučuje kako da promeni state
 * - Vraća NOVI state objekat
 * - React ažurira state i re-renderuje komponente
 * 
 * PRIMER TOKA:
 * ------------
 * 1. Korisnik klikne "Add" → dispatch({ type: "ADD_ITEM", payload: product })
 * 2. React poziva: cartReducer(currentState, { type: "ADD_ITEM", payload: product })
 * 3. Reducer proverava: action.type === "ADD_ITEM"
 * 4. Reducer vraća: { ...state, items: [...state.items, noviProizvod] }
 * 5. React ažurira state sa novom vrednošću
 * 6. Komponente se re-renderuju sa novim state-om
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      /**
       * Dodavanje proizvoda u korpu.
       * 
       * Ako proizvod već postoji u korpi, povećavamo qty za 1.
       * Ako ne postoji, dodajemo ga sa qty: 1.
       * 
       * action.payload = { id: "p1", name: "Laptop", price: 1200 }
       */
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        // Proizvod već postoji - povećaj qty
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      // Proizvod ne postoji - dodaj ga sa qty: 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case "INCREMENT": {
      /**
       * Povećanje količine određenog proizvoda.
       * 
       * action.payload = id proizvoda (npr. "p1")
       */
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    }
    case "DECREMENT": {
      /**
       * Smanjenje količine određenog proizvoda.
       * 
       * Ako qty padne na 0 ili manje, uklanjamo proizvod iz korpe.
       * 
       * action.payload = id proizvoda (npr. "p1")
       */
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0), // Ukloni ako je qty <= 0
      };
    }
    case "REMOVE_ITEM": {
      /**
       * Potpuno uklanjanje proizvoda iz korpe (bez obzira na qty).
       * 
       * action.payload = id proizvoda (npr. "p1")
       */
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case "CLEAR_CART": {
      /**
       * Brisanje cele korpe - vraćamo prazan niz items.
       */
      return { ...state, items: [] };
    }
    default:
      /**
       * Ako action.type nije prepoznat, vraćamo state bez promene.
       * Ovo je dobra praksa - reducer mora uvek da vrati state.
       */
      return state;
  }
};

/**
 * ====================================================================================
 * KORAK 3: KREIRANJE PROVIDER KOMPONENTE
 * ====================================================================================
 * 
 * CartProvider je komponenta koja:
 * 1. Koristi useReducer da upravlja state-om
 * 2. Kreira funkcije koje šalju dispatch akcije
 * 3. Računa izvedene vrednosti (totalCount, totalPrice)
 * 4. Prosleđuje sve to kroz Context.Provider
 * 
 * @param {React.ReactNode} children - Komponente unutar Provider-a mogu koristiti Context
 * 
 * DETALJAN TOK:
 * -------------
 * 1. useReducer inicijalizuje state sa { items: [] }
 * 2. Kreiraju se funkcije (addItem, removeItem, itd.) koje šalju dispatch
 * 3. useMemo računa totalCount i totalPrice samo kada se state.items promeni
 * 4. useMemo kreira value objekat sa svim podacima i funkcijama
 * 5. Context.Provider prosleđuje value svim child komponentama
 */
export const CartProvider = ({ children }) => {
  /**
   * useReducer povezuje reducer funkciju sa početnim state-om.
   * 
   * state = trenutni state objekat (npr. { items: [{ id: "p1", name: "Laptop", qty: 2 }] })
   * dispatch = funkcija za slanje akcija reducer-u
   * 
   * Kada pozovemo dispatch({ type: "ADD_ITEM", payload: product }):
   * - React poziva cartReducer(state, action)
   * - Reducer vraća novi state
   * - useReducer ažurira state i re-renderuje komponentu
   */
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  /**
   * KREIRANJE FUNKCIJA KOJE ŠALJU AKCIJE
   * ------------------------------------
   * 
   * Ove funkcije su "wrapper" funkcije koje pozivaju dispatch sa odgovarajućom akcijom.
   * Komponente pozivaju ove funkcije umesto direktnog dispatch-a.
   * 
   * PRIMER:
   * - addItem(product) → dispatch({ type: "ADD_ITEM", payload: product })
   * - increment(id) → dispatch({ type: "INCREMENT", payload: id })
   * 
   * Zašto ovo radimo?
   * - Skriva detalje implementacije (komponente ne znaju za action.type)
   * - Lakše za korišćenje (samo pozovi addItem(product))
   * - Mogućnost dodavanja dodatne logike (npr. validacija) pre dispatch-a
   */
  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const increment = (id) => dispatch({ type: "INCREMENT", payload: id });
  const decrement = (id) => dispatch({ type: "DECREMENT", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  /**
   * IZVEDENE VREDNOSTI - useMemo za optimizaciju
   * --------------------------------------------
   * 
   * useMemo računa totalCount i totalPrice samo kada se state.items promeni.
   * 
   * Zašto useMemo?
   * - Sprečava nepotrebno računanje pri svakom re-render-u
   * - Računa se samo kada se state.items promeni
   * - Poboljšava performanse aplikacije
   * 
   * Kako radi:
   * - Prvi parametar: funkcija koja računa vrednost
   * - Drugi parametar: dependency array [state.items]
   * - Re-računava se samo kada se state.items promeni
   */
  const totals = useMemo(() => {
    // Saberi sve qty vrednosti iz items niza
    const totalCount = state.items.reduce((sum, item) => sum + item.qty, 0);
    // Saberi sve cene (qty * price) iz items niza
    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    return { totalCount, totalPrice };
  }, [state.items]);

  /**
   * KREIRANJE VALUE OBJEKTA ZA CONTEXT
   * -----------------------------------
   * 
   * value objekat sadrži sve što želimo da podelimo sa child komponentama:
   * - state.items (lista proizvoda u korpi)
   * - Funkcije za manipulaciju (addItem, removeItem, itd.)
   * - Izvedene vrednosti (totalCount, totalPrice)
   * 
   * useMemo optimizuje kreiranje value objekta:
   * - Kreira se novi objekat samo kada se dependencies promene
   * - Sprečava nepotrebne re-render-e child komponenti
   */
  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      increment,
      decrement,
      clearCart,
      totalCount: totals.totalCount,
      totalPrice: totals.totalPrice,
    }),
    [state.items, totals.totalCount, totals.totalPrice]
  );

  /**
   * Context.Provider prosleđuje value svim child komponentama.
   * 
   * Sve komponente unutar <CartProvider>...</CartProvider> mogu koristiti
   * useCart() hook da pristupe ovom value objektu.
   * 
   * {children} - renderuje sve komponente koje su prosleđene kao children prop
   * (u ovom slučaju, CartExample komponenta iz App.jsx)
   */
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * ====================================================================================
 * KORAK 4: KREIRANJE CUSTOM HOOK-A
 * ====================================================================================
 * 
 * useCart je custom hook koji omogućava komponentama da pristupe CartContext-u.
 * 
 * Zašto custom hook umesto direktnog useContext(CartContext)?
 * - Lakše za korišćenje (samo pozovi useCart())
 * - Ako promenimo ime Context-a, menjamo samo ovde
 * - Možemo dodati dodatnu logiku (npr. error handling)
 * 
 * KAKO SE KORISTI:
 * ----------------
 * const { items, addItem, totalCount } = useCart();
 * 
 * Ovo je ekvivalentno sa:
 * const { items, addItem, totalCount } = useContext(CartContext);
 * 
 * Ali useCart() je čitljiviji i lakši za korišćenje.
 */
export const useCart = () => useContext(CartContext);

products: [{ name: "laptop", id: "a" }];

items: [
  { name: "laptop", qty: 2, id: "a" },
  { name: "headphones", qty: 3, id: "b" },
];
