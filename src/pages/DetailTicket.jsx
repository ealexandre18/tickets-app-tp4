import { useParams, Link } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";
import CommentairesTicket from "../components/CommentairesTicket";

function DetailTicket() {
  const { id } = useParams();
  const { tickets } = useTickets();
  const ticket = tickets.find((t) => t.id.toString() === id.toString());

  if (!ticket) {
    return (
      <div className="page-detail">
        <h2>Ticket introuvable</h2>
        <p>Le ticket demandé avec l'identifiant #{id} n'existe pas ou a été supprimé.</p>
        <Link to="/tickets" className="btn-primary">
          Retour à la liste des tickets
        </Link>
      </div>
    );
  }

  const getStatutClass = (statut) => {
    if (statut === "Ouvert") return "badge-ouvert";
    if (statut === "En cours") return "badge-encours";
    if (statut === "Résolu") return "badge-resolu";
    return "";
  };

  const getPrioriteClass = (priorite) => {
    if (priorite === "Haute") return "badge-haute";
    if (priorite === "Moyenne") return "badge-moyenne";
    return "badge-basse";
  };

  return (
    <div className="page-detail">
      <div className="detail-card">
        <div className="detail-header">
          <h2>{ticket.titre}</h2>
          <div className="ticket-badges">
            <span className={`badge ${getPrioriteClass(ticket.priorite)}`}>
              Priorité : {ticket.priorite}
            </span>
            <span className={`badge ${getStatutClass(ticket.statut)}`}>
              Statut : {ticket.statut}
            </span>
          </div>
        </div>

        <div className="detail-meta">
          <p>
            Identifiant technique : <code>#{ticket.id}</code>
          </p>
          <p>
            Déclaré par : <strong>{ticket.auteur}</strong>
          </p>
        </div>

        <div className="detail-body">
          <h3>Description de l'incident</h3>
          <p className="detail-description">
            {ticket.description || "Aucune description détaillée fournie."}
          </p>
        </div>

        <div className="detail-actions">
          <Link to={`/tickets/${ticket.id}/modifier`} className="btn-primary">
            Modifier
          </Link>
          <Link to="/tickets" className="btn-secondary">
            Retour à la liste des tickets
          </Link>
        </div>

        <CommentairesTicket ticketId={ticket.id} />
      </div>
    </div>
  );
}

export default DetailTicket;
