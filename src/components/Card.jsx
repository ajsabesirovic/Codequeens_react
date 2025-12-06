/**
 * Card - Komponenta za prikazivanje sadržaja u okviru kartice
 * 
 * Ova komponenta je primer "wrapper" komponente koja omata (wrap-uje) drugi sadržaj
 * i daje mu određeni stil (padding, margin, border, pozadinu).
 * 
 * @param {React.ReactNode} children - Sadržaj koji se prikazuje unutar Card komponente
 * 
 * ŠTA JE CHILDREN?
 * ================
 * "children" je poseban prop u React-u koji predstavlja sve što se nalazi između
 * otvorene i zatvorene tag komponente.
 * 
 * Primer korišćenja:
 * <Card>
 *   <h2>Naslov</h2>
 *   <p>Tekst paragrafa</p>
 *   <button>Klikni me</button>
 * </Card>
 * 
 * U ovom primeru, sve između <Card> i </Card> (h2, p, button) je children prop.
 * Card komponenta će sve to prikazati unutar svog div elementa sa stilizovanim okvirom.
 * 
 * Zašto je ovo korisno?
 * - Ne moramo da definišemo sve moguće propove za svaki mogući sadržaj
 * - Komponenta je fleksibilna - možemo proslediti bilo šta
 * - Kod je čitljiviji i prirodniji
 */
export const Card = ({ children }) => {
  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        border: "2px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* 
        {children} se zamenjuje sa stvarnim sadržajem koji je prosleđen Card komponenti
        Ovo može biti tekst, druge komponente, ili kombinacija oba
      */}
      {children}
    </div>
  );
};
