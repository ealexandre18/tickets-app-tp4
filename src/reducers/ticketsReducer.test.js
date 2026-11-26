import { ticketsReducer, etatInitial } from "./ticketsReducer";

describe("ticketsReducer", () => {
  it("ajoute un ticket sans muter l'état précédent", () => {
    const avant = { ...etatInitial, tickets: [{ id: "1", titre: "Bug" }] };
    const apres = ticketsReducer(avant, {
      type: "AJOUT",
      ticket: { id: "2", titre: "Panne" },
    });

    expect(apres.tickets).toHaveLength(2);
    expect(avant.tickets).toHaveLength(1);
  });

  it("supprime un ticket par son identifiant", () => {
    const avant = {
      ...etatInitial,
      tickets: [
        { id: "1", titre: "Ticket 1" },
        { id: "2", titre: "Ticket 2" },
      ],
    };
    const apres = ticketsReducer(avant, { type: "SUPPRESSION", id: "1" });

    expect(apres.tickets).toHaveLength(1);
    expect(apres.tickets[0].id).toBe("2");
  });

  it("modifie un ticket existant", () => {
    const avant = {
      ...etatInitial,
      tickets: [{ id: "1", titre: "Ancien titre", statut: "Ouvert" }],
    };
    const apres = ticketsReducer(avant, {
      type: "MODIFICATION",
      ticket: { id: "1", titre: "Nouveau titre", statut: "Résolu" },
    });

    expect(apres.tickets[0].titre).toBe("Nouveau titre");
    expect(apres.tickets[0].statut).toBe("Résolu");
  });

  it("réinitialise l'état avec RESET", () => {
    const avant = { tickets: [{ id: "1" }], chargement: false, erreur: "Err" };
    const apres = ticketsReducer(avant, { type: "RESET" });

    expect(apres).toEqual(etatInitial);
  });

  it("lève une erreur pour une action inconnue", () => {
    expect(() => ticketsReducer(etatInitial, { type: "INCONNUE" })).toThrow(
      /Action inconnue/i
    );
  });
});
