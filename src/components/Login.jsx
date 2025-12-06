import React from "react";

/**
 * Login - Komponenta za prijavu korisnika
 * 
 * Ova komponenta će u budućnosti koristiti AuthContext za autentifikaciju korisnika.
 * 
 * Primer kako će se koristiti sa AuthContext-om:
 * - Korisnik unosi email i password
 * - Klikom na "Login" dugme, poziva se login funkcija iz AuthContext-a
 * - AuthContext čuva informacije o autentifikovanom korisniku
 * - Nakon uspešne prijave, korisnik se preusmerava na zaštićene stranice
 */
export const Login = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      {/* 
        Ovde će se dodati forma za prijavu koja će koristiti AuthContext
        za autentifikaciju korisnika.
      */}
    </div>
  );
};
