import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { TicketsProvider } from "./TicketsProvider";
import { useTickets } from "./TicketsContext";
import { apiFetch } from "../api/client";

vi.mock("../api/client", () => ({
  apiFetch: vi.fn(),
}));

const { utilisateurTest } = vi.hoisted(() => ({
  utilisateurTest: { id: 1, role: "technicien", nom: "Tom" },
}));

vi.mock("./AuthContext", () => ({
  useAuth: () => ({ utilisateur: utilisateurTest }),
}));

const ticketsInitiaux = [
  { id: "1", titre: "Imprimante", auteur: "M. Durand", priorite: "Haute", statut: "Ouvert" },
  { id: "2", titre: "VPN", auteur: "Mme Martin", priorite: "Moyenne", statut: "En cours" },
];

describe("useTickets - deplacerTicket", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("met à jour immédiatement le statut puis confirme après la réponse API", async () => {
    let resoudrePatch;
    apiFetch.mockImplementation((chemin, options) => {
      if (chemin === "/tickets") {
        return Promise.resolve(ticketsInitiaux);
      }
      if (options && options.method === "PATCH") {
        return new Promise((resolve) => {
          resoudrePatch = resolve;
        });
      }
      return Promise.resolve([]);
    });

    const { result } = renderHook(() => useTickets(), { wrapper: TicketsProvider });

    await waitFor(() => {
      expect(result.current.chargement).toBe(false);
    });

    let promesseDeplacement;
    act(() => {
      promesseDeplacement = result.current.deplacerTicket("1", "En cours");
    });

    expect(result.current.tickets.find((t) => t.id === "1").statut).toBe("En cours");

    await act(async () => {
      resoudrePatch({ ...ticketsInitiaux[0], statut: "En cours" });
      await promesseDeplacement;
    });

    expect(result.current.tickets.find((t) => t.id === "1").statut).toBe("En cours");
    expect(result.current.erreur).toBeNull();
  });

  it("revient au statut d'origine et affiche une erreur en cas d'échec API", async () => {
    apiFetch.mockImplementation((chemin, options) => {
      if (chemin === "/tickets") {
        return Promise.resolve(ticketsInitiaux);
      }
      if (options && options.method === "PATCH") {
        return Promise.reject(new Error("Panne simulée"));
      }
      return Promise.resolve([]);
    });

    const { result } = renderHook(() => useTickets(), { wrapper: TicketsProvider });

    await waitFor(() => {
      expect(result.current.chargement).toBe(false);
    });

    await act(async () => {
      await result.current.deplacerTicket("1", "Résolu");
    });

    expect(result.current.tickets.find((t) => t.id === "1").statut).toBe("Ouvert");
    expect(result.current.erreur).toContain("Déplacement annulé");
  });

  it("n'envoie aucune requête si le ticket est déplacé dans la même colonne", async () => {
    apiFetch.mockResolvedValue(ticketsInitiaux);

    const { result } = renderHook(() => useTickets(), { wrapper: TicketsProvider });

    await waitFor(() => {
      expect(result.current.chargement).toBe(false);
    });

    await act(async () => {
      await result.current.deplacerTicket("1", "Ouvert");
    });

    expect(apiFetch).toHaveBeenCalledTimes(1);
  });
});
