import { useState } from "react";

function TicketForm({ onSoumettre }) {
  const [form, setForm] = useState({
    titre: "",
    auteur: "",
    priorite: "Moyenne",
    description: "",
  });
  const [erreurs, setErreurs] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nouvellesErreurs = {};

    if (!form.titre.trim()) {
      nouvellesErreurs.titre = "Le titre est obligatoire.";
    } else if (form.titre.trim().length < 5) {
      nouvellesErreurs.titre = "Le titre doit comporter au moins 5 caractères.";
    }

    if (!form.auteur.trim()) {
      nouvellesErreurs.auteur = "L'auteur est obligatoire.";
    }

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
      return;
    }

    setErreurs({});
    onSoumettre({
      titre: form.titre.trim(),
      auteur: form.auteur.trim(),
      priorite: form.priorite,
      description: form.description.trim(),
      statut: "Ouvert",
    });

    setForm({
      titre: "",
      auteur: "",
      priorite: "Moyenne",
      description: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Créer un nouveau ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="titre">Titre du ticket *</label>
          <input
            id="titre"
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
            placeholder="Ex : Imprimante bloquée"
          />
          {erreurs.titre && <span className="erreur-message">{erreurs.titre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="auteur">Auteur du ticket *</label>
          <input
            id="auteur"
            type="text"
            name="auteur"
            value={form.auteur}
            onChange={handleChange}
            placeholder="Ex : M. Durand"
          />
          {erreurs.auteur && <span className="erreur-message">{erreurs.auteur}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priorite">Priorité</label>
          <select
            id="priorite"
            name="priorite"
            value={form.priorite}
            onChange={handleChange}
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description détaillée</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Décrivez précisément le problème rencontré..."
          />
        </div>

        <button type="submit" className="btn-primary">
          Ajouter le ticket
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
