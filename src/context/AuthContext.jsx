import { createContext, useState, useMemo } from "react";

/**
 * AuthContext - Centralno mesto za podatke o korisniku i login/logout logiku.
 *
 * ZAŠTO CONTEXT ZA AUTH?
 * - Podaci o prijavljenom korisniku (user) su potrebni na više mesta (Header, ProtectedRoute, stranice).
 * - Ne želimo prop drilling (prosleđivanje user-a kroz svaki nivo).
 * - Provider "obavija" aplikaciju, a useContext nam daje pristup podacima gde god zatrebaju.
 */
export const AuthContext = createContext({
  user: null, // Ako je null → nema prijavljenog korisnika
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

/**
 * AuthProvider - Drži state o korisniku i nudi login/logout funkcije.
 *
 * Struktura upotrebe:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * Sve child komponente mogu da pozovu useContext(AuthContext) i dobiju:
 * - user (objekat ili null)
 * - isAuthenticated (boolean)
 * - login(email, password)
 * - logout()
 */
export function AuthProvider({ children }) {
  /**
   * Inicijalno učitavamo korisnika iz localStorage da bismo zadržali sesiju
   * nakon refresh-a. Ako nema snimljenog korisnika, state je null.
   */
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  /**
   * login - jednostavna (mock) logika za prijavu
   * - Proverava email/password sa fiksnim kredencijalima
   * - Ako uspe, čuva user u state + localStorage
   * - Ako ne uspe, baca grešku da je komponenta može prikazati
   */
  const login = (email, password) => {
    const validEmail = "admin@test.com";
    const validPassword = "admin123";

    if (email === validEmail && password === validPassword) {
      const loggedInUser = { email, name: "Admin User" };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return loggedInUser;
    }

    throw new Error("Pogrešan email ili lozinka.");
  };

  /**
   * logout - briše korisnika iz state-a i localStorage-a
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // useMemo da ne kreiramo novi objekat na svaki render (optimizacija)
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

