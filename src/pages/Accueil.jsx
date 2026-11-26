import { Link } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";

function Accueil() {
  const { tickets } = useTickets();
  const total = tickets.length;
  const ouverts = tickets.filter((t) => t.statut === "Ouvert").length;
  const enCours = tickets.filter((t) => t.statut === "En cours").length;
  const resolus = tickets.filter((t) => t.statut === "Résolu").length;

  return (
    <div className="page-accueil">
      <div className="hero">
        <h2>Bienvenue sur l'application WebDev Solutions</h2>
        <p>Gérez facilement les incidents et demandes d'assistance informatique.</p>
        <div className="hero-actions">
          <Link to="/tickets" className="btn-primary">
            Voir tous les tickets
          </Link>
          <Link to="/tickets/nouveau" className="btn-secondary">
            Créer un nouveau ticket
          </Link>
        </div>
      </div>

      <div className="stats-section">
        <h3>Statistiques du parc de tickets</h3>
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total tickets</span>
          </div>
          <div className="stat-card stat-ouvert">
            <span className="stat-number">{ouverts}</span>
            <span className="stat-label">Ouvert(s)</span>
          </div>
          <div className="stat-card stat-encours">
            <span className="stat-number">{enCours}</span>
            <span className="stat-label">En cours</span>
          </div>
          <div className="stat-card stat-resolu">
            <span className="stat-number">{resolus}</span>
            <span className="stat-label">Résolu(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
