import CartExample from "./components/CartExample";
import { CartProvider } from "./context/CartContext";

/**
 * ====================================================================================
 * KOMPLETAN FLOW: useContext + useReducer kao Mini Global State Manager
 * ====================================================================================
 * 
 * OVAJ PRIMER POKAZUJE KAKO SE KOMBINUJU useContext I useReducer ZA GLOBAL STATE
 * 
 * ------------------
 * 
 * 1. App.jsx
 *    ↓
 *    - CartProvider obavija CartExample komponentu
 *    - CartProvider je komponenta iz CartContext.jsx koja kreira Context i upravlja state-om
 *    - Sve komponente unutar CartProvider-a mogu pristupiti cart state-u
 * 
 * 2. CartContext.jsx
 *    ↓
 *    - Kreira se CartContext (createContext)
 *    - Kreira se cartReducer (useReducer funkcija koja menja state)
 *    - CartProvider komponenta:
 *      * Koristi useReducer da upravlja state-om (items: [])
 *      * Kreira funkcije (addItem, removeItem, itd.) koje šalju dispatch akcije
 *      * Računa totalCount i totalPrice iz state.items
 *      * Prosleđuje sve to kroz Context.Provider value prop
 *    - useCart hook omogućava komponentama da pristupe Context-u
 * 
 * 3. CartExample.jsx
 *    ↓
 *    - Koristi useCart() hook da pristupi state-u i funkcijama
 *    - Prikazuje proizvode i korpu
 *    - Kada korisnik klikne "Add", poziva se addItem(product)
 *    - addItem šalje dispatch({ type: "ADD_ITEM", payload: product })
 *    - Reducer obrađuje akciju i vraća novi state
 *    - React automatski re-renderuje komponentu sa novim state-om
 * 
 * DETALJAN TOK KADA KORISNIK KLIKNE "Add" DUGME:
 * ----------------------------------------------
 * 
 * 1. Korisnik klikne "Add" na proizvodu u CartExample.jsx
 *    ↓
 * 2. Poziva se onClick={() => addItem(product)}
 *    ↓
 * 3. addItem je funkcija iz CartContext-a koja poziva:
 *    dispatch({ type: "ADD_ITEM", payload: product })
 *    ↓
 * 4. React poziva cartReducer(state, action) sa:
 *    - state = trenutni state (npr. { items: [] })
 *    - action = { type: "ADD_ITEM", payload: product }
 *    ↓
 * 5. Reducer proverava action.type i vraća NOVI state:
 *    return { ...state, items: [...state.items, { ...product, qty: 1 }] }
 *    ↓
 * 6. useReducer ažurira state sa novom vrednošću
 *    ↓
 * 7. CartProvider se re-renderuje sa novim state-om
 *    ↓
 * 8. useMemo ponovo računa totalCount i totalPrice
 *    ↓
 * 9. value objekat se ažurira sa novim items, totalCount, totalPrice
 *    ↓
 * 10. Context.Provider prosleđuje novi value svim child komponentama
 *     ↓
 * 11. CartExample komponenta se re-renderuje jer je dobila novi value iz Context-a
 *     ↓
 * 12. UI se ažurira - korisnik vidi novi proizvod u korpi!
 * 
 * ZAŠTO OVA KOMBINACIJA (useContext + useReducer)?
 * ------------------------------------------------
 * 
 * - useReducer: Centralizovana logika za promene state-a (sve akcije na jednom mestu)
 * - useContext: Globalni pristup state-u bez prop drilling-a
 * - Rezultat: Mini Redux-like state management bez dodatnih biblioteka!
 * 
 * PREDNOSTI:
 * ----------
 * - State je globalno dostupan svim komponentama unutar Provider-a
 * - Logika promene state-a je centralizovana u reducer-u
 * - Lako za testiranje i održavanje
 * - Predvidljiv tok: dispatch → reducer → novi state → re-render
 */
const App = () => {
  /**
   * CartProvider obavija CartExample komponentu.
   * 
   * Ovo znači da CartExample (i sve njene child komponente) mogu koristiti
   * useCart() hook da pristupe cart state-u i funkcijama.
   * 
   * BEZ Provider-a, useCart() bi bacio grešku jer ne bi našao Context!
   */
  return (
    <CartProvider>
      <CartExample />
    </CartProvider>
  );
};

export default App;
