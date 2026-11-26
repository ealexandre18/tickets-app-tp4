import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import { useTickets } from "../context/TicketsContext";

function NouveauTicket() {
  const { ajouterTicket } = useTickets();
  const navigate = useNavigate();

  const handleSoumettre = async (nouveauTicket) => {
    await ajouterTicket(nouveauTicket);
    navigate("/tickets");
  };

  return <TicketForm onSoumettre={handleSoumettre} />;
}

export default NouveauTicket;
