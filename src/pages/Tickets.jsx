import { useState, useMemo } from "react";
import TicketList from "../components/TicketList";
import { useTickets } from "../context/TicketsContext";
import { useDebounce } from "../hooks/useDebounce";
import { filtrerTickets } from "../utils/tickets";

function Tickets() {
  const { tickets, supprimerTicket, changerStatut, chargement, erreur } = useTickets();
  const [recherche, setRecherche] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("Tous");
  const [triPriorite, setTriPriorite] = useState(false);

  const rechercheDebounced = useDebounce(recherche, 300);

  const ticketsAffiches = useMemo(
    () =>
      filtrerTickets(tickets, {
        recherche: rechercheDebounced,
        statut: statutFiltre,
        tri: triPriorite,
      }),
    [tickets, rechercheDebounced, statutFiltre, triPriorite]
  );

  return (
    <div className="page-tickets">
      <div className="tickets-toolbar">
        <div className="toolbar-search">
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        <div className="toolbar-filtres">
          <label>
            Statut :{" "}
            <select
              value={statutFiltre}
              onChange={(e) => setStatutFiltre(e.target.value)}
            >
              <option value="Tous">Tous</option>
              <option value="Ouvert">Ouvert</option>
              <option value="En cours">En cours</option>
              <option value="Résolu">Résolu</option>
            </select>
          </label>

          <button
            type="button"
            className={`btn-tri ${triPriorite ? "actif" : ""}`}
            onClick={() => setTriPriorite(!triPriorite)}
          >
            {triPriorite ? "Tri priorité : Haute > Basse" : "Trier par priorité"}
          </button>
        </div>
      </div>

      <div className="tickets-compteur">
        {ticketsAffiches.length} ticket(s) affiché(s) sur {tickets.length}
      </div>

      {chargement && <p className="message-info">Chargement des tickets...</p>}
      {erreur && <p className="message-erreur">Erreur : {erreur}</p>}

      {!chargement && !erreur && (
        <TicketList
          tickets={ticketsAffiches}
          onSupprimer={supprimerTicket}
          onChangerStatut={changerStatut}
        />
      )}
    </div>
  );
}

export default Tickets;
