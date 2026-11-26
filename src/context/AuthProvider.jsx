import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../api/client";

function lireUtilisateurInitial() {
  try {
    const brut = localStorage.getItem("utilisateur");
    return brut ? JSON.parse(brut) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(lireUtilisateurInitial);

  const seConnecter = useCallback(async (email, motDePasse) => {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, motDePasse }),
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
    setUtilisateur(data.utilisateur);
    return data.utilisateur;
  }, []);

  const seDeconnecter = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    setUtilisateur(null);
  }, []);

  useEffect(() => {
    const gererExpiration = () => {
      seDeconnecter();
    };
    window.addEventListener("session-expiree", gererExpiration);
    return () => {
      window.removeEventListener("session-expiree", gererExpiration);
    };
  }, [seDeconnecter]);

  return (
    <AuthContext.Provider value={{ utilisateur, seConnecter, seDeconnecter }}>
      {children}
    </AuthContext.Provider>
  );
}
