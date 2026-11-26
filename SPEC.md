# Spécification — Tableau Kanban (TP4)

## 1. User stories et critères d'acceptation

### Story 1 : Voir et déplacer un ticket
En tant que technicien, je veux voir les tickets dans 3 colonnes (Ouvert, En cours, Résolu) et déplacer un ticket, afin de suivre l'avancement.

Critères d'acceptation :
- La page `/kanban` affiche 3 colonnes avec le nombre de tickets.
- Chaque carte affiche le titre, l'auteur et la priorité.
- Je peux déplacer une carte à la souris (glisser-déposer) et au clavier (liste déroulante « Déplacer vers... »).
- Une zone `aria-live` annonce chaque déplacement réussi ou annulé.

### Story 2 : Mise à jour optimiste et retour arrière
En tant que technicien, je veux que la carte bouge tout de suite et revienne en arrière si l'API échoue, afin d'avoir une interface fluide et fiable.

Critères d'acceptation :
- La carte change de colonne immédiatement dès le déplacement.
- Si le serveur renvoie une erreur, la carte revient dans sa colonne d'origine et un message d'erreur s'affiche.

### Story 3 : Filtres dans l'URL
En tant que technicien, je veux filtrer par recherche (`?q=`) et par priorité (`?priorite=`) dans l'URL, afin de garder mes filtres au rechargement et pouvoir partager le lien.

Critères d'acceptation :
- La recherche et la priorité modifient l'URL (`?q=vpn`, `?priorite=Haute`).
- Si je recharge la page, les filtres et la liste affichée restent les mêmes.

## 2. Cas limites

- Déplacement dans la même colonne : aucune requête API envoyée.
- Panne de l'API : la carte revient à sa place et un message d'erreur s'affiche.
- Ticket supprimé pendant le déplacement : erreur gérée et déplacement annulé.
- Liste vide : les 3 colonnes restent affichées avec `0`.
- Utilisateur non connecté : redirection vers `/login`.
- Erreur dans le composant : `ErrorBoundary` affiche un message et un bouton « Réessayer ».

## 3. Exigences non fonctionnelles

- Accessibilité clavier : liste déroulante « Déplacer vers » avec `<label>` sur chaque carte et zone `aria-live`.
- Sécurité : aucun secret (token, mot de passe, `.env`) exposé.
- Fluidité : aucun rechargement de page.
