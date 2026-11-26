import { filtrerTickets } from "./tickets";

const jeuTests = [
  { id: "1", titre: "Imprimante en panne", statut: "Ouvert", priorite: "Basse" },
  { id: "2", titre: "Accès VPN bloqué", statut: "En cours", priorite: "Haute" },
  { id: "3", titre: "Imprimante réseau lente", statut: "Résolu", priorite: "Moyenne" },
  { id: "4", titre: "VPN instable", statut: "Ouvert", priorite: "Haute" },
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
