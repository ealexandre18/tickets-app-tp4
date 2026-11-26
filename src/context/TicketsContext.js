import { createContext, useContext } from "react";

export const TicketsContext = createContext(null);

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) {
    throw new Error("useTickets doit être utilisé dans un TicketsProvider");
  }
  return ctx;
}
