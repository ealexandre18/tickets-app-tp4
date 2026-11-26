import Ticket from "./Ticket";

function TicketList({ tickets, onSupprimer, onChangerStatut }) {
  if (tickets.length === 0) {
    return <p className="aucun-ticket">Aucun ticket à afficher.</p>;
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          onSupprimer={onSupprimer}
          onChangerStatut={onChangerStatut}
        />
      ))}
    </div>
  );
}

export default TicketList;
