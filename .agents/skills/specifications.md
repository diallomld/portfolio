# Spécifications Fonctionnelles - Portfolio developeur Full Stack & DevOps

## 1. Vision du Projet
Créer une plateforme vitrine démontrant mon expertise en développement Full Stack.
et pour le styles je veux que ce soit user friendly avec une meilleur ui/ux.


## 2. Architecture des Données (Supabase / PostgreSQL)

### Table: `projects` (Le catalogue technique)
- `id`: uuid (Primary Key)
- `title`: text (Nom du projet)
- `slug`: text (URL unique pour le SEO)
- `description`: text (Résumé court)
- `content_md`: text (Description détaillée en Markdown)
- `tech_stack`: text[] (Array: ex: ['Java', 'Spring', 'Docker', 'AWS'])
- `github_url`: text
- `demo_url`: text
- `priority`: int (Pour l'ordre d'affichage)

### Table: `skills` (Le référentiel de compétences)
- `id`: uuid
- `name`: text (ex: 'Kubernetes')
- `category`: text (Enum: 'backend', 'frontend', 'devops')
- `icon_name`: text (Nom de l'icône Lucide React)
- `level`: int (1 à 5, pour trier par expertise)

### Table: `messages` (Contact & Lead)
- `id`: uuid
- `created_at`: timestamp with time zone
- `email`: text (Validation Regex requise)
- `subject`: text
- `body`: text
- `status`: text (Default: 'unread')

## 3. Fonctionnalités Clés par Pilier

### Frontend (User Experience)
- **Mode Sombre/Clair :** Respect des préférences système.
- **Loading States :** Utilisation systématique de `Skeletons` pendant le fetch Supabase.
- **Filtrage Dynamique :** Filtrer les projets par catégorie de `skills` sans rechargement de page.

### Backend (Data & Security)
- **Edge Functions / Hooks :** Centraliser la logique Supabase dans des custom hooks React.
- **Sécurité RLS :** - `projects` & `skills` : Lecture publique, écriture interdite (Admin via Dashboard).
    - `messages` : Écriture publique autorisée, lecture strictement interdite au public.

### DevOps & Qualité (Engineering)
- **Section "Lab" :** Un dashboard affichant :
    1. Un schéma d'architecture interactif.
    2. Le statut réel des services (Health Check).
- **Tests :** Couverture unitaire pour chaque composant UI (Vitest).

## 4. Règles de Design (Vibe)
- **Style :** je veux le meilleur design possible (ui/ux), moderne, épuré et professionnel.
- **Composants :** Utiliser Shadcn/UI (Button, Card, Input, Toast, Skeleton).
- **Animations :** Transitions fluides entre les pages avec Framer Motion (si possible).

## 6. UI/UX & Styling Guidelines
- **Palette de couleurs :** Thème sombre par défaut (Zinc/Slate) avec une couleur d'accent (ex: Indigo-500 ou Emerald-500) pour les boutons et liens.
- **Radius :** Utiliser des arrondis généreux (`rounded-xl` ou `rounded-2xl`) pour un aspect moderne et doux.
- **Effet Glassmorphism :** Utiliser `backdrop-blur` sur la barre de navigation et les modales pour donner de la profondeur.
- **Empty States :** Toujours prévoir un affichage propre si une liste est vide ("Aucun projet trouvé").
- **Toasts :** Utiliser `Sonner` (Shadcn) pour confirmer l'envoi du formulaire de contact avec une animation fluide.