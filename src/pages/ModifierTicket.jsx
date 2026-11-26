import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";

function ModifierTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, modifierTicket } = useTickets();
  const ticket = tickets.find((t) => t.id.toString() === id.toString());

  const [form, setForm] = useState(() => ({
    titre: ticket ? ticket.titre : "",
    auteur: ticket ? ticket.auteur : "",
    priorite: ticket ? ticket.priorite : "Moyenne",
    statut: ticket ? ticket.statut : "Ouvert",
    description: ticket ? ticket.description || "" : "",
  }));
  const [erreur, setErreur] = useState(null);

  if (!ticket) {
    return (
      <div className="page-detail">
        <h2>Ticket introuvable</h2>
        <Link to="/tickets" className="btn-primary">
          Retour aux tickets
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.titre.trim().length < 5) {
      setErreur("Le titre doit comporter au moins 5 caractères.");
      return;
    }
    try {
      await modifierTicket(ticket.id, {
        titre: form.titre.trim(),
        auteur: form.auteur.trim(),
        priorite: form.priorite,
        statut: form.statut,
        description: form.description.trim(),
      });
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      setErreur(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Modifier le ticket #{ticket.id}</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="titre">Titre du ticket *</label>
          <input
            id="titre"
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="auteur">Auteur *</label>
          <input
            id="auteur"
            type="text"
            name="auteur"
            value={form.auteur}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priorite">Priorité</label>
          <select name="priorite" value={form.priorite} onChange={handleChange}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="statut">Statut</label>
          <select name="statut" value={form.statut} onChange={handleChange}>
            <option value="Ouvert">Ouvert</option>
            <option value="En cours">En cours</option>
            <option value="Résolu">Résolu</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {erreur && <p className="erreur-message">{erreur}</p>}

        <div className="detail-actions">
          <button type="submit" className="btn-primary">
            Enregistrer les modifications
          </button>
          <Link to={`/tickets/${ticket.id}`} className="btn-secondary">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ModifierTicket;
