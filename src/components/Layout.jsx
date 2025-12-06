import { useContext } from "react";
import Header from "./Header";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Layout - Glavna layout komponenta koja obavija sadržaj stranice
 * 
 * Ova komponenta demonstrira kako se koristi React Context za pristup podacima
 * bez prop drilling-a.
 * 
 * @param {any} nekiProp - Primer prop-a koji se prosleđuje Header komponenti
 * @param {React.ReactNode} children - Sadržaj koji se prikazuje u glavnom delu layout-a
 * 
 * KAKO SE KORISTI CONTEXT?
 * ========================
 * 
 * 1. Importujemo useContext hook i Context objekat:
 *    import { useContext } from "react";
 *    import { ThemeContext } from "../context/ThemeContext";
 * 
 * 2. U komponenti pozivamo useContext sa Context objektom:
 *    const { theme, themeToggle } = useContext(ThemeContext);
 * 
 * 3. Sada možemo koristiti theme i themeToggle direktno u komponenti!
 * 
 * Prednosti:
 * - Ne moramo prosleđivati theme kroz props
 * - Bilo koja komponenta unutar ThemeProvider može pristupiti podacima
 * - Kod je čistiji i lakši za održavanje
 * 
 * ŠTA JE CHILDREN?
 * ================
 * children je poseban prop koji predstavlja sadržaj prosleđen između otvorene
 * i zatvorene tag komponente.
 * 
 * Primer:
 * <Layout nekiProp={true}>
 *   <Alert type="success">
 *     <p>Poruka</p>
 *   </Alert>
 * </Layout>
 * 
 * U ovom primeru, <Alert> komponenta je children Layout komponente.
 * Layout će je prikazati na mestu gde se nalazi {children} u JSX-u.
 */
export const Layout = ({ nekiProp, children }) => {
  /**
   * useContext(ThemeContext) - Hook za pristup podacima iz Context-a
   * 
   * Ova linija koda "izvlači" theme i themeToggle iz ThemeContext-a.
   * Ovo radi samo zato što je Layout komponenta unutar ThemeProvider-a u App.jsx.
   * 
   * Destructuring: { theme, themeToggle } znači da izvlačimo ova dva svojstva
   * iz objekta koji vraća useContext.
   */
  const { theme, themeToggle } = useContext(ThemeContext);

  return (
    <div>
      {/* Header komponenta prima nekiProp kao prop */}
      <Header nekiProp={nekiProp} />
      
      {/* 
        {children} - Ovo je mesto gde se prikazuje sadržaj prosleđen Layout komponenti.
        Na primer, ako u App.jsx imamo:
        <Layout>
          <Alert type="success">...</Alert>
        </Layout>
        Onda će se Alert prikazati ovde.
      */}
      {children}
      
      {/* 
        Footer sa temom koja se menja na osnovu theme state-a iz Context-a.
        Koristimo ternarni operator da odredimo boju pozadine.
      */}
      <footer 
        style={{ 
          backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
          color: theme === "dark" ? "white" : "black",
          padding: "20px",
          marginTop: "20px"
        }}
      >
        <h2>Footer</h2>
      </footer>
      
      {/* 
        Dugme za promenu teme. themeToggle funkcija dolazi direktno iz Context-a,
        ne moramo je prosleđivati kroz props!
      */}
      <button onClick={themeToggle}>
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};
