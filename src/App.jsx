import Alert from "./components/Alert";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";

/**
 * App - Glavna komponenta aplikacije
 * 
 * Ova komponenta demonstrira kako se koristi Context Provider.
 * 
 * KAKO RADI PROVIDER?
 * ====================
 * 
 * ThemeProvider "obavija" (wrap-uje) deo aplikacije i čini theme podatke
 * dostupnim svim komponentama unutar njega.
 * 
 * Struktura:
 * <ThemeProvider>          ← Provider komponenta
 *   <Layout>               ← Može koristiti useContext(ThemeContext)
 *     <Alert />            ← Može koristiti useContext(ThemeContext)
 *   </Layout>
 * </ThemeProvider>
 * 
 * Sve komponente unutar ThemeProvider-a mogu pristupiti theme podacima
 * bez potrebe da ih prosleđujemo kroz props.
 */
const App = () => {
  // Primer: simulacija statusa prijave (u praksi bi ovo dolazilo iz AuthContext-a)
  const isLoggedIn = true;

  return (
    /**
     * ThemeProvider - Provider komponenta koja obezbeđuje theme podatke
     * 
     * Sve komponente unutar ThemeProvider-a (Layout, Alert, itd.) mogu koristiti
     * useContext(ThemeContext) da pristupe theme i themeToggle podacima.
     * 
     * Napomena: AuthProvider je uklonjen jer još nije kreiran.
     * Studenti će ga kreirati kao deo domaćeg zadatka.
     */
    <ThemeProvider>
      {/* 
        Layout komponenta prima nekiProp i children.
        children je Alert komponenta koja se prikazuje unutar Layout-a.
      */}
      <Layout nekiProp={isLoggedIn}>
        <Alert type="success">
          <p>Uspesno ste se ulogovali.</p>
        </Alert>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
