import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * NasaKomponenta - Primer komponente koja koristi Context
 * 
 * Ova komponenta demonstrira kako se koristi useContext hook za pristup
 * podacima iz Context-a.
 * 
 * PRIMER KORIŠĆENJA CONTEXT-A:
 * =============================
 * 
 * 1. Importujemo useContext hook i Context objekat
 * 2. Pozivamo useContext(ThemeContext) da pristupimo podacima
 * 3. Koristimo podatke direktno u komponenti
 * 
 * Napomena: Ova komponenta može pristupiti theme podacima samo zato što je
 * unutar ThemeProvider-a u App.jsx. Ako bi bila van Provider-a, koristila bi
 * default vrednosti iz createContext().
 */
export const NasaKomponenta = ({ nekiProp }) => {
  /**
   * useContext(ThemeContext) - Pristupamo podacima iz ThemeContext-a
   * 
   * Ovo je primer kako bilo koja komponenta unutar ThemeProvider-a može
   * pristupiti theme podacima bez potrebe da ih prosleđujemo kroz props.
   */
  const { theme } = useContext(ThemeContext);

  // Primer: Ako je nekiProp true, prikaži jedan sadržaj
  if (nekiProp === true) {
    return (
      <div style={{ 
        padding: "10px", 
        backgroundColor: theme === "dark" ? "#444" : "#e0e0e0" 
      }}>
        Nesto
      </div>
    );
  }

  // Inače prikaži default sadržaj
  return (
    <div style={{ 
      padding: "10px",
      backgroundColor: theme === "dark" ? "#444" : "#e0e0e0"
    }}>
      NasaKomponenta
    </div>
  );
};
