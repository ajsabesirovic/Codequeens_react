import Alert from "./components/Alert";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

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
  /**
   * AuthProvider i ThemeProvider obavijaju aplikaciju:
   * - AuthProvider nudi user/isAuthenticated/login/logout svim child komponentama
   * - ThemeProvider nudi theme/themeToggle svim child komponentama
   *
   * Redosled: AuthProvider spolja (da bi npr. Header imao pristup i auth i temi).
   */
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* 
          Layout komponenta prima nekiProp i children.
          children je Alert komponenta koja se prikazuje unutar Layout-a.
          nekiProp više nije simulacija login-a; pravi status dolazi iz AuthContext-a (unutar Header-a).
        */}
        <Layout nekiProp={true}>
          <Alert type="success">
            <p>Uspesno ste se ulogovali.</p>
          </Alert>
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
