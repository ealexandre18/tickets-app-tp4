import { memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function getStatutClass(statut) {
  if (statut === "Ouvert") return "badge-ouvert";
  if (statut === "En cours") return "badge-encours";
  if (statut === "Résolu") return "badge-resolu";
  return "";
}

function getPrioriteClass(priorite) {
  if (priorite === "Haute") return "badge-haute";
  if (priorite === "Moyenne") return "badge-moyenne";
  return "badge-basse";
}

const Ticket = memo(function Ticket({ ticket, onSupprimer, onChangerStatut }) {
  const { utilisateur } = useAuth();
  const estAdmin = utilisateur?.role === "admin";

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-titre">
          <Link to={`/tickets/${ticket.id}`}>{ticket.titre}</Link>
        </div>
        <div className="ticket-badges">
          <span className={`badge ${getPrioriteClass(ticket.priorite)}`}>
            {ticket.priorite}
          </span>
          <span className={`badge ${getStatutClass(ticket.statut)}`}>
            {ticket.statut}
          </span>
        </div>
      </div>
      <p className="ticket-auteur">
        Déclaré par : <strong>{ticket.auteur}</strong>
      </p>
      {ticket.description && <p className="ticket-desc">{ticket.description}</p>}
      <div className="ticket-actions">
        <label>
          Statut :{" "}
          <select
            value={ticket.statut}
            onChange={(e) => onChangerStatut(ticket.id, e.target.value)}
          >
            <option value="Ouvert">Ouvert</option>
            <option value="En cours">En cours</option>
            <option value="Résolu">Résolu</option>
          </select>
        </label>
        <div className="ticket-buttons">
          <Link to={`/tickets/${ticket.id}/modifier`} className="btn-secondary btn-sm">
            Modifier
          </Link>
          {estAdmin && (
            <button
              type="button"
              className="btn-danger"
              onClick={() => onSupprimer(ticket.id)}
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default Ticket;
