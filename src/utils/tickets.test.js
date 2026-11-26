import { filtrerTickets, filtrerTicketsKanban } from "./tickets";

const jeuTests = [
  { id: "1", titre: "Imprimante en panne", auteur: "M. Durand", statut: "Ouvert", priorite: "Basse" },
  { id: "2", titre: "Accès VPN bloqué", auteur: "Mme Martin", statut: "En cours", priorite: "Haute" },
  { id: "3", titre: "Imprimante réseau lente", auteur: "M. Petit", statut: "Résolu", priorite: "Moyenne" },
  { id: "4", titre: "VPN instable", auteur: "Mme Leroy", statut: "Ouvert", priorite: "Haute" },
];

describe("filtrerTickets", () => {
  it("effectue une recherche insensible à la casse", () => {
    const res = filtrerTickets(jeuTests, { recherche: "vpn" });
    expect(res).toHaveLength(2);
    expect(res.map((t) => t.id)).toEqual(["2", "4"]);
  });

  it("filtre par statut", () => {
    const res = filtrerTickets(jeuTests, { statut: "Ouvert" });
    expect(res).toHaveLength(2);
    expect(res.every((t) => t.statut === "Ouvert")).toBe(true);
  });

  it("trie par priorité (Haute > Moyenne > Basse)", () => {
    const res = filtrerTickets(jeuTests, { tri: true });
    expect(res.map((t) => t.priorite)).toEqual([
      "Haute",
      "Haute",
      "Moyenne",
      "Basse",
    ]);
  });

  it("cumule recherche, statut et tri", () => {
    const res = filtrerTickets(jeuTests, {
      recherche: "imprimante",
      statut: "Ouvert",
      tri: true,
    });
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe("1");
  });
});

describe("filtrerTicketsKanban", () => {
  it("filtre par recherche et priorité et gère les valeurs absentes", () => {
    expect(filtrerTicketsKanban(jeuTests)).toHaveLength(4);
    expect(filtrerTicketsKanban(jeuTests, "vpn", "Toutes")).toHaveLength(2);
    expect(filtrerTicketsKanban(jeuTests, "", "Haute")).toHaveLength(2);
    expect(filtrerTicketsKanban(jeuTests, "leroy", "Haute")).toHaveLength(1);
  });
});
