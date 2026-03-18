# Standards du Projet Portfolio (Enterprise React)

## 1. Stack Technique
- **Framework :** React 18+ (Vite) avec TypeScript.
- **Styling :** Tailwind CSS uniquement.
- **Backend :** Supabase (PostgreSQL).
- **Tests :** Vitest + React Testing Library.
- **Linting :** ESLint (règles strictes) + Prettier.

## 2. Architecture & Structure (Rigueur Backend)
- **Composants :** `src/components/[Name].tsx` (Plat).
- **Logique :** Hooks dans `src/hooks/use[Name].ts`.
- **Tests :** `src/__tests__/[Name].test.tsx` (Miroir de src).
- **Types :** Centralisés dans `src/types/database.ts` (générés par Supabase) ou `src/types/ui.ts`.
- **Composants :** Utiliser uniquement des Functional Components avec `const`.

## 3. Règles de Code (Clean Code)
- **Typage :** Interdiction du type `any`. Utiliser des interfaces explicites pour les props et les retours d'API.
- **Props :** Toujours destructurer les props dans les arguments du composant.
- **Naming :** - Composants : PascalCase (ex: `ProjectCard`).
  - Fonctions/Variables : camelCase.
- **Immuabilité :** Ne jamais modifier l'état directement ; utiliser les setters de `useState` ou `useReducer`.

## 4. Stratégie de Tests (Mandatoire)
- **Unité :** Chaque fichier `.tsx` doit avoir son fichier `.test.tsx` adjacent.
- **Pattern AAA :** Arrange (préparer), Act (agir), Assert (vérifier).
- **Sélecteurs :** Priorité aux `getByRole` et `getByLabelText` pour garantir l'accessibilité.

## 5. Design & UI
- **Tailwind :** Utiliser les classes utilitaires. Pas de styles inline. 
- **Responsive :** Approche "Mobile First" systématique.
- **Accessibilité :** Utiliser les balises sémantiques (`<nav>`, `<main>`, `<header>`, `<footer>`).