export const etatInitial = {
  tickets: [],
  chargement: true,
  erreur: null,
};

export function ticketsReducer(etat, action) {
  switch (action.type) {
    case "CHARGEMENT_OK":
      return {
        ...etat,
        tickets: action.tickets,
        chargement: false,
        erreur: null,
      };
    case "ERREUR":
      return {
        ...etat,
        erreur: action.message,
        chargement: false,
      };
    case "AJOUT":
      return {
        ...etat,
        tickets: [...etat.tickets, action.ticket],
      };
    case "SUPPRESSION":
      return {
        ...etat,
        tickets: etat.tickets.filter((t) => t.id !== action.id),
      };
    case "MODIFICATION":
      return {
        ...etat,
        tickets: etat.tickets.map((t) =>
          t.id === action.ticket.id ? action.ticket : t
        ),
      };
    case "RESET":
      return etatInitial;
    default:
      throw new Error("Action inconnue : " + action.type);
  }
}
