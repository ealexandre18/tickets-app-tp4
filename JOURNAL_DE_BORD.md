# Journal de bord - TP n°3 React (`tickets-app`)

**Élève :** ALEXANDRE Ewan (BTS SIO SLAM - Groupe 1)  
**Date :** 19/11/2026

## 1. Blocages rencontrés et solutions
- **Compatibilité `json-server` v1.0.0-beta.15 vs CommonJS (`server.cjs`) :** Le projet utilisait `json-server@1.0.0-beta.15` qui est uniquement en ESM et n'expose pas `jsonServer.create()` ni `router.db.get()`. Solution : passage sur `json-server@0.17.4` (`npm install -D json-server@0.17.4`) pour faire fonctionner `server.cjs` normalement avec `require("json-server")`.
- **Variables d'environnement Vite :** Au démarrage de `apiFetch`, `import.meta.env.VITE_API_URL` renvoyait `undefined` tant que le serveur Vite n'avait pas été redémarré après création du fichier `.env`. Solution : relancer `npm run dev`.
- **Tests React Testing Library :** Vérification que `globals: true` et `setupFiles: "./src/setupTests.js"` sont bien déclarés dans `vite.config.js` pour disposer de `describe`, `it`, `expect`, `vi` et `.toBeInTheDocument()`.

## 2. Recherches et vérifications effectuées
- Vérification de l'API `Profiler` de React (`onRender(id, phase, actualDuration, baseDuration)`) pour mesurer les rendus avec 500 tickets dans `db.json` avant et après ajout de `useDebounce`, `useMemo`, `React.memo` et `useCallback`.
- Vérification du découpage des chunks dans `dist/assets/` après `npm run build` suite à la mise en place de `React.lazy` et `<Suspense>`.
- Test complet des codes HTTP `401` et `403` avec `curl` dans CMD et avec `fetch` dans la console DevTools en session technicien.

## 3. Usage de l'IA
- **Aide demandée :** Explication des écarts entre `json-server` v0.17 et v1 beta, fonctionnement interne de la mémorisation (`React.memo` + `useCallback`), et rédaction de l'architecture des contextes séparés (`AuthContext.js` / `AuthProvider.jsx`) pour respecter la règle `oxlint` `react/only-export-components`.
- **Ce que j'ai retenu et vérifié moi-même :** Masquer le bouton « Supprimer » dans React ne protège rien si le serveur ne bloque pas la requête `DELETE` (vérifié en console avec `fetch` -> erreur `403`), et les variables `VITE_*` sont compilées en clair dans `dist/`, donc il ne faut jamais y stocker de secret.
