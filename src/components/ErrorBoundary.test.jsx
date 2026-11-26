import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

function ComposantQuiPlante() {
  throw new Error("Erreur de test");
}

describe("ErrorBoundary", () => {
  it("affiche le message de secours si un composant enfant lève une erreur", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ComposantQuiPlante />
      </ErrorBoundary>
    );

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Réessayer" })).toBeInTheDocument();

    spy.mockRestore();
  });
});
