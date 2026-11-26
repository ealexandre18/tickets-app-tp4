import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Kanban from "./Kanban";

const mockDeplacerTicket = vi.fn();

const { mockUseTickets } = vi.hoisted(() => ({
  mockUseTickets: vi.fn(),
}));

vi.mock("../context/TicketsContext", () => ({
  useTickets: mockUseTickets,
}));

const ticketsExemple = [
  { id: "1", titre: "Imprimante", auteur: "M. Durand", priorite: "Haute", statut: "Ouvert" },
  { id: "2", titre: "VPN", auteur: "Mme Martin", priorite: "Moyenne", statut: "Ouvert" },
  { id: "3", titre: "Écran", auteur: "M. Petit", priorite: "Basse", statut: "Résolu" },
];

describe("Kanban", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDeplacerTicket.mockResolvedValue(true);
    mockUseTickets.mockReturnValue({
      tickets: ticketsExemple,
      chargement: false,
      erreur: null,
      deplacerTicket: mockDeplacerTicket,
    });
  });

  it("affiche les tickets dans la bonne colonne avec le bon compteur", () => {
    render(
      <MemoryRouter>
        <Kanban />
      </MemoryRouter>
    );

    const colOuvert = screen.getByRole("region", { name: "Ouvert" });
    const colEnCours = screen.getByRole("region", { name: "En cours" });
    const colResolu = screen.getByRole("region", { name: "Résolu" });

    expect(within(colOuvert).getByText("2")).toBeInTheDocument();
    expect(within(colOuvert).getByText("Imprimante")).toBeInTheDocument();
    expect(within(colOuvert).getByText("VPN")).toBeInTheDocument();

    expect(within(colEnCours).getByText("0")).toBeInTheDocument();
    expect(within(colResolu).getByText("1")).toBeInTheDocument();
    expect(within(colResolu).getByText("Écran")).toBeInTheDocument();
  });

  it("appelle deplacerTicket quand on choisit une colonne dans la liste Déplacer vers", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Kanban />
      </MemoryRouter>
    );

    const colOuvert = screen.getByRole("region", { name: "Ouvert" });
    const selects = within(colOuvert).getAllByLabelText("Déplacer vers");

    await user.selectOptions(selects[0], "En cours");

    expect(mockDeplacerTicket).toHaveBeenCalledWith("1", "En cours");
  });
});
