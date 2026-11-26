# WebDev Solutions - Application de suivi de tickets (`tickets-app`)

Application React de gestion des tickets d'assistance informatique développée dans le cadre du BTS SIO option SLAM (TP1, TP2 et TP3).

## Prérequis

- Node.js (v20+ recommandé)
- npm

## Installation

```bash
npm install
```

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3001
```

## Lancement en développement

1. Démarrer l'API sécurisée (port 3001) :

```bash
npm run api
```

2. Démarrer l'application React avec Vite :

```bash
npm run dev
```

## Comptes de test

| Rôle | Email | Mot de passe |
|---|---|---|
| Administrateur | `admin@webdev.fr` | *(défini localement lors du hachage bcrypt dans `db.json`)* |
| Technicien | `tech@webdev.fr` | *(défini localement lors du hachage bcrypt dans `db.json`)* |

## Tests, qualité et production

- Lancer les tests unitaires et composants : `npm test` (ou `npx vitest run`)
- Vérifier le code avec le linter : `npm run lint`
- Générer le build de production dans `dist/` : `npm run build`
- Prévisualiser le build : `npm run preview`

## Structure du projet

```text
├── server.cjs               # API locale sécurisée (JWT + bcrypt + contrôle des rôles)
├── db.json                  # Base JSON (tickets et utilisateurs hachés)
├── vite.config.js           # Configuration Vite et Vitest
└── src/
    ├── api/client.js        # Client HTTP centralisé (apiFetch + gestion 401)
    ├── components/          # Header, RouteProtegee, Ticket, TicketForm, TicketList
    ├── context/             # AuthContext/Provider et TicketsContext/Provider
    ├── hooks/               # useDebounce.js
    ├── pages/               # Accueil, Login, Tickets, NouveauTicket, DetailTicket, ModifierTicket, Page404
    ├── reducers/            # ticketsReducer.js
    └── utils/               # filtrerTickets (tickets.js)
```
