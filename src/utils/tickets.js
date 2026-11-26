const ordrePriorite = {
  Haute: 1,
  Moyenne: 2,
  Basse: 3,
};

export function filtrerTickets(tickets, { recherche = "", statut = "Tous", tri = false } = {}) {
  const terme = recherche.trim().toLowerCase();

  const filtres = tickets.filter((ticket) => {
    const correspondTitre = ticket.titre.toLowerCase().includes(terme);
    const correspondStatut = statut === "Tous" || ticket.statut === statut;
    return correspondTitre && correspondStatut;
  });

  if (!tri) {
    return filtres;
  }

  return [...filtres].sort(
    (a, b) => (ordrePriorite[a.priorite] || 99) - (ordrePriorite[b.priorite] || 99)
  );
}
