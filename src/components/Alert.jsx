/**
 * Alert - Komponenta za prikazivanje poruka korisniku
 * 
 * Ova komponenta prikazuje poruke različitih tipova (greška, uspeh, informacija)
 * sa različitim bojama pozadine.
 * 
 * @param {string} type - Tip poruke: "error" (crvena), "success" (zelena), "info" (plava)
 * @param {React.ReactNode} children - Sadržaj koji se prikazuje unutar Alert komponente
 * 
 * ŠTA JE CHILDREN?
 * ================
 * "children" je poseban prop u React-u koji predstavlja sadržaj koji se prosleđuje
 * između otvorene i zatvorene tag komponente.
 * 
 * Primer:
 * <Alert type="success">
 *   <p>Uspesno ste se ulogovali.</p>  ← Ovo je "children"
 * </Alert>
 * 
 * U ovom primeru, <p>Uspesno ste se ulogovali.</p> je children prop koji se
 * prosleđuje Alert komponenti i prikazuje se unutar <div> elementa.
 * 
 * Zašto koristiti children?
 * - Omogućava fleksibilnost - možemo proslediti bilo koji sadržaj
 * - Čini komponente reusabilnim (ponovno upotrebljivim)
 * - Čita se kao HTML (prirodnije za razumevanje)
 */
const Alert = ({ type, children }) => {
  // Inicijalizujemo promenljivu za boju
  let color;

  // Određujemo boju na osnovu tipa poruke
  if (type === "error") {
    color = "red";
  } else if (type === "success") {
    color = "green";
  } else if (type === "info") {
    color = "blue";
  }

  // Renderujemo div sa bojom pozadine i children sadržajem unutar njega
  // {children} se zamenjuje sa stvarnim sadržajem koji je prosleđen komponenti
  return (
    <div style={{ backgroundColor: color, padding: "10px", borderRadius: "5px", color: "white" }}>
      {children}
    </div>
  );
};

export default Alert;
