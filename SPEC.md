# Spécification fonctionnelle — Tableau Kanban (TP4)

## 1. User Stories et critères d'acceptation

### Story 1 : Visualiser et déplacer un ticket sur le tableau Kanban
**En tant que** technicien,  
**je veux** voir les tickets répartis dans trois colonnes (« Ouvert », « En cours », « Résolu ») et déplacer un ticket d'une colonne à une autre,  
**afin de** suivre facilement l'avancement des interventions.

**Critères d'acceptation :**
- La page `/kanban` affiche 3 colonnes : `Ouvert`, `En cours` et `Résolu`, chacune avec le nombre de tickets qu'elle contient.
- Chaque carte affiche le titre du ticket, son auteur et sa priorité.
- Je peux déplacer une carte par glisser-déposer (API HTML5 native) ou au clavier grâce à une liste déroulante « Déplacer vers » présente sur chaque carte.
- Une zone `aria-live` annonce chaque déplacement réussi ou annulé pour les lecteurs d'écran.

### Story 2 : Mise à jour optimiste et retour arrière en cas de panne
**En tant que** technicien,  
**je veux** que la carte change de colonne immédiatement lors du déplacement et revienne à sa place si le serveur renvoie une erreur,  
**afin de** garder une interface fluide tout en évitant d'afficher de fausses informations.

**Critères d'acceptation :**
- Dès le dépôt ou le choix dans la liste déroulante, le ticket apparaît dans la nouvelle colonne sans attendre la réponse du serveur.
- Si l'API renvoie une erreur (ex: erreur 500 simulée avec `TAUX_PANNE=0.5`), le ticket revient automatiquement dans sa colonne d'origine et un message d'erreur clair s'affiche.
- Si je déplace un ticket dans la même colonne, aucune requête réseau n'est envoyée.

### Story 3 : Filtrer les tickets via l'URL
**En tant que** technicien,  
**je veux** filtrer le Kanban par recherche texte et par priorité avec des paramètres dans l'URL (`?q=...` et `?priorite=...`),  
**afin de** conserver mes filtres au rechargement de la page et pouvoir partager le lien.

**Critères d'acceptation :**
- Quand je tape dans la barre de recherche ou que je choisis une priorité, l'URL est mise à jour (`?q=vpn`, `?priorite=Haute`).
- Si je recharge la page ou ouvre le lien dans un nouvel onglet, les filtres et les résultats affichés restent identiques.

---

## 2. Cas limites pris en compte

- **Déplacement dans la même colonne :** aucune requête `PATCH` n'est envoyée vers l'API.
- **Panne de l'API :** la carte revient dans son statut initial et un message explique l'annulation.
- **Ticket supprimé pendant le déplacement :** si l'API renvoie 404, le déplacement est annulé et un message d'erreur s'affiche.
- **Liste vide / aucun résultat après filtrage :** les trois colonnes restent affichées avec un compteur à `0` et un message « Aucun ticket ».
- **Utilisateur non connecté :** la route `/kanban` est protégée par `RouteProtegee` et redirige vers `/login`.
- **Erreur JavaScript dans le Kanban :** un composant `ErrorBoundary` entoure le Kanban et affiche un message de secours avec un bouton « Réessayer ».

---

## 3. Exigences non fonctionnelles

- **Accessibilité clavier :** chaque carte dispose d'une liste déroulante `<select>` associée à un `<label>` pour changer de colonne sans souris, plus une zone `aria-live="polite"`.
- **Sécurité :** aucun secret (token JWT, mot de passe, `.env`) n'est affiché dans la console ou transmis à une IA ; les commentaires utilisateur sont affichés en texte brut (pas de `dangerouslySetInnerHTML`).
- **Fluidité :** aucun rechargement de page lors des déplacements, du filtrage ou de l'ajout de commentaires (`e.preventDefault()`).
