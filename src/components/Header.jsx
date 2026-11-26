import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { utilisateur, seDeconnecter } = useAuth();

  return (
    <header className="header">
      <div className="header-logo">
        <h1>WebDev Solutions</h1>
        <span>Gestion des tickets</span>
      </div>
      <nav className="header-nav">
        {utilisateur ? (
          <>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Accueil
            </NavLink>
            <NavLink to="/tickets" end className={({ isActive }) => (isActive ? "active" : "")}>
              Tickets
            </NavLink>
            <NavLink to="/kanban" className={({ isActive }) => (isActive ? "active" : "")}>
              Kanban
            </NavLink>
            <NavLink to="/tickets/nouveau" className={({ isActive }) => (isActive ? "active" : "")}>
              Nouveau ticket
            </NavLink>
          </>
        ) : null}
      </nav>
      <div className="header-user">
        {utilisateur ? (
          <>
            <span className="user-badge">
              {utilisateur.nom} ({utilisateur.role})
            </span>
            <button type="button" className="btn-logout" onClick={seDeconnecter}>
              Se déconnecter
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-login-link">
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
