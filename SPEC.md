# SPEC - Tableau Kanban (TP4)

## User stories

1. En tant que technicien, je veux voir les tickets dans 3 colonnes (Ouvert, En cours, Résolu) et pouvoir déplacer un ticket, afin de suivre le travail en cours.
   -> Pour que ça marche : on doit voir les 3 colonnes avec le nombre de tickets, chaque carte affiche le titre, l'auteur et la priorité, on peut déplacer à la souris (glisser-déposer) ou au clavier avec la liste "Déplacer vers...", et une zone aria-live annonce si le déplacement a réussi ou pas.

2. En tant que technicien, je veux que la carte bouge tout de suite quand je la déplace et qu'elle revienne à sa place si le serveur plante, afin de ne pas attendre mais de garder les bonnes infos.
   -> Pour que ça marche : quand je déplace un ticket, il change de colonne direct. Si l'API renvoie une erreur, il revient dans sa colonne d'avant avec un message d'erreur.

3. En tant que technicien, je veux filtrer les tickets par recherche (?q=) et priorité (?priorite=) dans l'URL, afin de garder mes filtres si je recharge la page ou si j'envoie le lien.
   -> Pour que ça marche : quand je tape une recherche ou que je choisis une priorité, ça change l'URL (?q=vpn, ?priorite=Haute) et si je recharge la page, je retrouve les mêmes résultats.

## Cas limites

- Déplacement dans la même colonne : on n'envoie aucune requête vers le serveur.
- Panne de l'API : la carte revient dans son ancienne colonne et un message explique l'erreur.
- Ticket supprimé pendant le déplacement : le déplacement est annulé et on affiche une erreur.
- Liste vide : les 3 colonnes s'affichent quand même avec 0.
- Utilisateur non connecté : on renvoie vers /login.
- Erreur dans la page Kanban : l'ErrorBoundary affiche un message et un bouton "Réessayer".

## Autres règles importantes

- Accessible au clavier (liste "Déplacer vers" avec un label sur chaque carte, plus zone aria-live).
- Aucun secret affiché ou envoyé (pas de token, mot de passe ou .env).
- Pas de rechargement de page quand on déplace un ticket ou qu'on filtre.
