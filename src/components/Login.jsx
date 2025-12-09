import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Login - Komponenta za prijavu korisnika
 *
 * Ovde koristimo AuthContext da pozovemo login(email, password).
 * Kada login uspe, context čuva user i ostatak aplikacije zna da je korisnik prijavljen.
 */
export const Login = () => {
  // Lokalni state za formu i poruke
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Izvlačimo login funkciju iz AuthContext-a
  const { login } = useContext(AuthContext);

  /**
   * handleSubmit - poziva login iz AuthContext-a
   * Ako kredencijali nisu tačni, hvata grešku i prikazuje poruku.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const user = login(email, password);
      setMessage(`Uspešno ste se ulogovali kao ${user.email}`);
    } catch (err) {
      setError(err.message || "Greška pri loginu");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Login</h2>
      <p style={{ fontSize: "14px", color: "#555" }}>
        Demo kredencijali: <b>admin@test.com</b> / <b>admin123</b>
      </p>

      {/* Forma koja koristi lokalni state i AuthContext.login */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@test.com"
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <button type="submit" style={{ padding: "10px", marginTop: "4px" }}>
          Login
        </button>
      </form>

      {/* Prikaz poruka o uspehu/grešci */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
