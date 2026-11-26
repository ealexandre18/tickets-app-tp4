import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TicketForm from "./TicketForm";

describe("TicketForm", () => {
  it("affiche des erreurs et n'envoie rien si le formulaire est vide", async () => {
    const onSoumettre = vi.fn();
    render(<TicketForm onSoumettre={onSoumettre} />);

    await userEvent.click(
      screen.getByRole("button", { name: /ajouter le ticket/i })
    );

    expect(screen.getByText(/le titre est obligatoire/i)).toBeInTheDocument();
    expect(screen.getByText(/l'auteur est obligatoire/i)).toBeInTheDocument();
    expect(onSoumettre).not.toHaveBeenCalled();
  });

  it("affiche une erreur si le titre contient moins de 5 caractères", async () => {
    const onSoumettre = vi.fn();
    render(<TicketForm onSoumettre={onSoumettre} />);

    await userEvent.type(screen.getByLabelText(/titre du ticket/i), "Bug");
    await userEvent.type(screen.getByLabelText(/auteur du ticket/i), "Tom");
    await userEvent.click(
      screen.getByRole("button", { name: /ajouter le ticket/i })
    );

    expect(screen.getByText(/au moins 5 caractères/i)).toBeInTheDocument();
    expect(onSoumettre).not.toHaveBeenCalled();
  });

  it("appelle onSoumettre avec les bonnes valeurs quand le formulaire est valide", async () => {
    const onSoumettre = vi.fn();
    render(<TicketForm onSoumettre={onSoumettre} />);

    await userEvent.type(
      screen.getByLabelText(/titre du ticket/i),
      "Panne serveur mail"
    );
    await userEvent.type(screen.getByLabelText(/auteur du ticket/i), "Alice");
    await userEvent.selectOptions(screen.getByLabelText(/priorité/i), "Haute");
    await userEvent.type(
      screen.getByLabelText(/description détaillée/i),
      "Impossible d'envoyer des e-mails."
    );
    await userEvent.click(
      screen.getByRole("button", { name: /ajouter le ticket/i })
    );

    expect(onSoumettre).toHaveBeenCalledTimes(1);
    expect(onSoumettre).toHaveBeenCalledWith({
      titre: "Panne serveur mail",
      auteur: "Alice",
      priorite: "Haute",
      description: "Impossible d'envoyer des e-mails.",
      statut: "Ouvert",
    });
  });
});
