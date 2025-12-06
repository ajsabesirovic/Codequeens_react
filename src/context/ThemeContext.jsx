import { createContext, useState } from "react";

/**
 * ŠTA JE REACT CONTEXT?
 * =====================
 * 
 * React Context je mehanizam za deljenje podataka između komponenti bez potrebe
 * da prosleđujemo props kroz svaki nivo komponenti (prop drilling).
 * 
 * Problem koji Context rešava:
 * ----------------------------
 * Zamisli da imaš App → Layout → Header → Button komponente.
 * Ako želiš da prosleđeš "theme" iz App do Button, moraš da ga prosleđuješ
 * kroz Layout i Header, čak i ako oni ne koriste taj podatak.
 * 
 * App (theme) → Layout (theme) → Header (theme) → Button (theme)
 * 
 * Sa Context-om:
 * App (ThemeProvider) → Layout → Header → Button
 * Button može direktno da pristupi theme podatku bez prop drilling-a!
 * 
 * Kako Context radi:
 * ------------------
 * 1. createContext() - kreira Context objekat
 * 2. Provider - komponenta koja "obavija" (wrap-uje) deo aplikacije i čini
 *    podatke dostupnim svim child komponentama
 * 3. useContext() - hook koji omogućava komponentama da pristupe podacima iz Context-a
 * 
 * Primer strukture:
 * <ThemeProvider>          ← Provider komponenta
 *   <Layout>               ← Može koristiti theme
 *     <Header>             ← Može koristiti theme
 *       <Button />         ← Može koristiti theme
 *     </Header>
 *   </Layout>
 * </ThemeProvider>
 */

/**
 * ThemeContext - Context objekat za upravljanje temom aplikacije
 * 
 * createContext() kreira novi Context objekat. Prosleđujemo mu default vrednosti
 * koje će se koristiti ako komponenta koristi Context van Provider-a.
 * 
 * Ove default vrednosti su samo "fallback" - u praksi će Provider obezbediti
 * stvarne vrednosti.
 */
export const ThemeContext = createContext({
  theme: "light",           // Default tema
  themeToggle: () => {},    // Default funkcija (prazna)
});

/**
 * ThemeProvider - Provider komponenta koja obezbeđuje theme podatke svim child komponentama
 * 
 * @param {React.ReactNode} children - Sve komponente unutar ThemeProvider-a mogu pristupiti theme podacima
 * 
 * Kako radi:
 * 1. Čuva trenutnu temu u state-u (uz učitavanje iz localStorage-a)
 * 2. Obezbeđuje funkciju za promenu teme (themeToggle)
 * 3. Prosleđuje ove podatke svim child komponentama kroz Context.Provider
 * 
 * ŠTA JE CHILDREN?
 * ================
 * children je poseban prop koji predstavlja sve komponente koje se nalaze
 * između otvorene i zatvorene ThemeProvider tag-a.
 * 
 * Primer:
 * <ThemeProvider>
 *   <Layout />        ← Ovo je children
 *   <Header />        ← Ovo je takođe children
 * </ThemeProvider>
 * 
 * Sve komponente unutar ThemeProvider-a mogu koristiti useContext(ThemeContext)
 * da pristupe theme i themeToggle podacima.
 */
export function ThemeProvider({ children }) {
  /**
   * useState sa funkcijom za inicijalizaciju
   * 
   * Funkcija se izvršava samo jednom prilikom prvog renderovanja komponente.
   * Proveravamo localStorage da vidimo da li postoji sačuvana tema.
   * Ako postoji, koristimo je; ako ne, koristimo "light" kao default.
   */
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  /**
   * themeToggle - Funkcija za promenu teme između "light" i "dark"
   * 
   * Koristi funkcionalni update (prevValue => ...) da osiguramo da uvek
   * radimo sa najnovijom vrednošću state-a.
   * 
   * Takođe čuva novu temu u localStorage da bi se sačuvala i nakon osvežavanja stranice.
   */
  const themeToggle = () => {
    setTheme((prevValue) => {
      const newTheme = prevValue === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  /**
   * Context.Provider - Komponenta koja "obavija" child komponente i čini podatke dostupnim
   * 
   * value prop sadrži sve podatke koje želimo da podelimo sa child komponentama.
   * Sve komponente unutar Provider-a mogu koristiti useContext(ThemeContext) da pristupe
   * theme i themeToggle podacima.
   * 
   * {children} - renderuje sve komponente koje su prosleđene kao children prop
   */
  return (
    <ThemeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
