import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const { seConnecter } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.depuis || "/tickets";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur(null);

    try {
      await seConnecter(email, motDePasse);
      navigate(destination, { replace: true });
    } catch (err) {
      setErreur(err.message);
    }
  };

  return (
    <div className="form-container login-container">
      <h2>Connexion à l'espace WebDev</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: admin@webdev.fr"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe</label>
          <input
            id="motDePasse"
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Votre mot de passe"
            required
          />
        </div>

        {erreur && <p className="erreur-message">{erreur}</p>}

        <button type="submit" className="btn-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
