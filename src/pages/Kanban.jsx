import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";
import { filtrerTicketsKanban } from "../utils/tickets";

const COLONNES = ["Ouvert", "En cours", "Résolu"];

function Kanban() {
  const { tickets, chargement, erreur, deplacerTicket } = useTickets();
  const [searchParams, setSearchParams] = useSearchParams();
  const [annonce, setAnnonce] = useState("");
  const [colonneSurvolee, setColonneSurvolee] = useState(null);

  const recherche = searchParams.get("q") || "";
  const priorite = searchParams.get("priorite") || "Toutes";

  const ticketsFiltres = filtrerTicketsKanban(tickets, recherche, priorite);

  const ticketsOuverts = ticketsFiltres.filter((t) => t.statut === "Ouvert");
  const ticketsEnCours = ticketsFiltres.filter((t) => t.statut === "En cours");
  const ticketsResolus = ticketsFiltres.filter((t) => t.statut === "Résolu");

  const ticketsParColonne = {
    Ouvert: ticketsOuverts,
    "En cours": ticketsEnCours,
    Résolu: ticketsResolus,
  };

  const mettreAJourFiltres = (nouvelleRecherche, nouvellePriorite) => {
    const params = new URLSearchParams();
    if (nouvelleRecherche.trim() !== "") {
      params.set("q", nouvelleRecherche);
    }
    if (nouvellePriorite !== "Toutes") {
      params.set("priorite", nouvellePriorite);
    }
    setSearchParams(params);
  };

  const gererDeplacement = async (ticketId, nouveauStatut) => {
    const ticket = tickets.find((t) => String(t.id) === String(ticketId));
    if (!ticket || ticket.statut === nouveauStatut) {
      return;
    }

    const succes = await deplacerTicket(ticket.id, nouveauStatut);
    if (succes) {
      setAnnonce(`Ticket ${ticket.titre} déplacé vers ${nouveauStatut}.`);
    } else {
      setAnnonce(`Déplacement annulé pour le ticket ${ticket.titre}.`);
    }
  };

  const gererDrop = (e, colonne) => {
    e.preventDefault();
    setColonneSurvolee(null);
    const ticketId = e.dataTransfer.getData("text/plain");
    if (ticketId) {
      gererDeplacement(ticketId, colonne);
    }
  };

  if (chargement) {
    return <p className="message-info">Chargement du tableau Kanban...</p>;
  }

  return (
    <div className="page-kanban">
      <div className="page-header">
        <h2>Tableau Kanban</h2>
        <Link to="/tickets/nouveau" className="btn-primary">
          Nouveau ticket
        </Link>
      </div>

      <div className="kanban-filtres">
        <div className="form-group">
          <label htmlFor="kanban-recherche">Rechercher</label>
          <input
            id="kanban-recherche"
            type="text"
            placeholder="Titre ou auteur..."
            value={recherche}
            onChange={(e) => mettreAJourFiltres(e.target.value, priorite)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="kanban-priorite">Priorité</label>
          <select
            id="kanban-priorite"
            value={priorite}
            onChange={(e) => mettreAJourFiltres(recherche, e.target.value)}
          >
            <option value="Toutes">Toutes</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </div>
      </div>

      {erreur && (
        <div className="message-erreur" role="alert">
          {erreur}
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {annonce}
      </div>

      <div className="kanban-board">
        {COLONNES.map((colonne) => {
          const liste = ticketsParColonne[colonne];
          return (
            <section
              key={colonne}
              className={`kanban-colonne ${colonneSurvolee === colonne ? "kanban-colonne-active" : ""}`}
              aria-label={colonne}
              onDragOver={(e) => {
                e.preventDefault();
                setColonneSurvolee(colonne);
              }}
              onDragLeave={() => setColonneSurvolee(null)}
              onDrop={(e) => gererDrop(e, colonne)}
            >
              <div className="kanban-colonne-header">
                <h3>{colonne}</h3>
                <span className="kanban-compteur">{liste.length}</span>
              </div>

              <div className="kanban-liste">
                {liste.length === 0 ? (
                  <p className="kanban-vide">Aucun ticket</p>
                ) : (
                  liste.map((ticket) => (
                    <article
                      key={ticket.id}
                      className="kanban-carte"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", String(ticket.id));
                      }}
                    >
                      <div className="kanban-carte-top">
                        <Link to={`/tickets/${ticket.id}`} className="kanban-carte-titre">
                          {ticket.titre}
                        </Link>
                        <span className={`badge badge-${ticket.priorite.toLowerCase()}`}>
                          {ticket.priorite}
                        </span>
                      </div>
                      <p className="kanban-carte-auteur">Auteur : {ticket.auteur}</p>
                      <div className="kanban-carte-action">
                        <label htmlFor={`deplacer-${ticket.id}`}>Déplacer vers</label>
                        <select
                          id={`deplacer-${ticket.id}`}
                          value={ticket.statut}
                          onChange={(e) => gererDeplacement(ticket.id, e.target.value)}
                        >
                          {COLONNES.map((statutOption) => (
                            <option key={statutOption} value={statutOption}>
                              {statutOption}
                            </option>
                          ))}
                        </select>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Kanban;
