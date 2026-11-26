import { useState, useEffect } from "react";
import { apiFetch } from "../api/client";

export default function CommentairesTicket({ ticketId }) {
  const [commentaires, setCommentaires] = useState([]);
  const [texte, setTexte] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    let annule = false;

    async function chargerCommentaires() {
      try {
        setErreur("");
        const donnees = await apiFetch(`/commentaires?ticketId=${ticketId}`);
        if (!annule) {
          setCommentaires(donnees);
        }
      } catch {
        if (!annule) {
          setErreur("Impossible de charger les commentaires.");
        }
      }
    }

    chargerCommentaires();

    return () => {
      annule = true;
    };
  }, [ticketId]);

  const ajouter = async (e) => {
    e.preventDefault();
    if (!texte.trim()) {
      return;
    }

    try {
      setErreur("");
      const nouveau = await apiFetch("/commentaires", {
        method: "POST",
        body: JSON.stringify({
          ticketId,
          texte: texte.trim(),
          date: new Date().toISOString(),
        }),
      });
      setCommentaires([...commentaires, nouveau]);
      setTexte("");
    } catch {
      setErreur("Impossible d'ajouter le commentaire.");
    }
  };

  return (
    <div className="commentaires-section">
      <h3>Commentaires</h3>
      {erreur && (
        <p className="message-erreur" role="alert">
          {erreur}
        </p>
      )}
      {commentaires.length === 0 ? (
        <p>Aucun commentaire pour le moment.</p>
      ) : (
        <ul className="commentaires-liste">
          {commentaires.map((c) => (
            <li key={c.id} className="commentaires-item">
              {c.texte}
            </li>
          ))}
        </ul>
      )}
      <form className="commentaires-form" onSubmit={ajouter}>
        <div className="form-group">
          <label htmlFor="nouveau-commentaire">Ajouter un commentaire</label>
          <input
            id="nouveau-commentaire"
            type="text"
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Votre commentaire..."
          />
        </div>
        <button type="submit" className="btn-primary">
          Envoyer
        </button>
      </form>
    </div>
  );
}
