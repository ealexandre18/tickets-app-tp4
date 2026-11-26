import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CommentairesTicket from "./CommentairesTicket";
import { apiFetch } from "../api/client";

vi.mock("../api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("CommentairesTicket", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le HTML saisi comme du texte brut sans l'interpréter", async () => {
    const payloadXss = '<img src=x onerror="alert(\'XSS\')">';
    apiFetch.mockResolvedValue([{ id: "1", ticketId: "1", texte: payloadXss }]);

    const { container } = render(<CommentairesTicket ticketId="1" />);

    await waitFor(() => {
      expect(screen.getByText(payloadXss)).toBeInTheDocument();
    });

    expect(container.querySelector("img")).toBeNull();
  });
});
