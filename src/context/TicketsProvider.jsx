import { useReducer, useEffect, useState, useCallback } from "react";
import { TicketsContext } from "./TicketsContext";
import { ticketsReducer, etatInitial } from "../reducers/ticketsReducer";
import { useAuth } from "./AuthContext";
import { apiFetch } from "../api/client";

export function TicketsProvider({ children }) {
  const [etat, dispatch] = useReducer(ticketsReducer, etatInitial);
  const [notification, setNotification] = useState(null);
  const { utilisateur } = useAuth();

  const afficherNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!utilisateur) {
      dispatch({ type: "RESET" });
      return;
    }

    let annule = false;
    async function charger() {
      try {
        const donnees = await apiFetch("/tickets");
        if (!annule) {
          dispatch({ type: "CHARGEMENT_OK", tickets: donnees });
        }
      } catch (e) {
        if (!annule) {
          dispatch({ type: "ERREUR", message: e.message });
        }
      }
    }
    charger();

    return () => {
      annule = true;
    };
  }, [utilisateur]);

  const ajouterTicket = useCallback(
    async (nouveauTicket) => {
      const ticketCree = await apiFetch("/tickets", {
        method: "POST",
        body: JSON.stringify(nouveauTicket),
      });
      dispatch({ type: "AJOUT", ticket: ticketCree });
      afficherNotification("Ticket ajouté avec succès.");
      return ticketCree;
    },
    [afficherNotification]
  );

  const supprimerTicket = useCallback(
    async (id) => {
      await apiFetch(`/tickets/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "SUPPRESSION", id });
      afficherNotification("Ticket supprimé.");
    },
    [afficherNotification]
  );

  const modifierTicket = useCallback(
    async (id, modifications) => {
      const ticketModifie = await apiFetch(`/tickets/${id}`, {
        method: "PATCH",
        body: JSON.stringify(modifications),
      });
      dispatch({ type: "MODIFICATION", ticket: ticketModifie });
      afficherNotification("Ticket mis à jour.");
      return ticketModifie;
    },
    [afficherNotification]
  );

  const changerStatut = useCallback(
    async (id, nouveauStatut) => {
      await modifierTicket(id, { statut: nouveauStatut });
    },
    [modifierTicket]
  );

  return (
    <TicketsContext.Provider
      value={{
        tickets: etat.tickets,
        chargement: etat.chargement,
        erreur: etat.erreur,
        notification,
        ajouterTicket,
        supprimerTicket,
        modifierTicket,
        changerStatut,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
}
