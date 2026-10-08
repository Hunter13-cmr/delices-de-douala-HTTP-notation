# Délices de Douala — Portfolio Restaurant (Angular)

Application Angular moderne pour découvrir, explorer et noter les restaurants de Douala. Design premium, mode sombre, icônes SVG personnalisées et architecture réactive basée sur les Signals.

## Fonctionnalités

- **Accueil** : en-tête immersif, compteur de restaurants notés, note moyenne globale et filtre des meilleures tables (≥ 4 étoiles)
- **Cartes restaurants** : image, quartier, spécialité, notation interactive 1 à 5 étoiles, lien vers le menu
- **Notation intelligente** : survol avec messages dynamiques, confirmation, persistance locale via service, mise à jour temps réel des statistiques
- **Carte du jour** : menu chargé depuis `/api/plats.json` (états chargement / erreur / données), filtre par catégorie, recherche instantanée, badge « Épuisé », plat du jour rotatif toutes les 5 s
- **Mode sombre / clair** : bascule persistée, variables CSS unifiées, cartes sombres contrastées, bascule accessible au clavier
- **Responsive** : grilles `auto-fit`, images `object-fit: cover`, typographie `clamp()`, mobile-first

## Stack

- **Angular 22** (standalone, Signals, `httpResource`, SSR)
- **TypeScript**, **RxJS** (`interval` → `toSignal` pour le plat du jour)
- **Vitest** pour les tests unitaires
- Aucune bibliothèque UI externe : design system maison + icônes SVG inline (`app-icon`)

## Architecture

```text
src/
├── app/
│   ├── app.ts                # racine : toggle thème + footer
│   ├── shared/
│   │   └── icon.component.ts # 16 icônes SVG (currentColor)
│   ├── components/
│   │   ├── header/           # hero + 2 cartes stats
│   │   ├── home/             # états + filtre + liste
│   │   ├── restaurant-list/  # grille responsive
│   │   ├── restaurant-card/  # carte + notation + lien menu
│   │   ├── star-rating/      # 5 étoiles interactives
│   │   └── carte-du-jour/    # menu, filtres, recherche
│   ├── models/               # restaurant.ts, plat.ts
│   ├── services/             # restaurant, menu, rating, theme
│   └── environments/
├── styles.css                # tokens, thèmes, base, footer
└── index.html                # lang=fr, meta, favicon SVG inline
```

- **État** : Signals (`signal`, `computed`) ; `RestaurantService` et `MenuService` exposent des `httpResource`, `RatingService` centralise notes et moyennes, `ThemeService` gère `data-theme` sur `<html>`
- **Données** : `public/api/restaurants.json`, `public/api/plats.json`

## Installation

```bash
git clone https://github.com/Hunter13-cmr/delices-de-douala-HTTP-notation
cd delices-de-douala-HTTP-notation
npm install
ng serve
```

Accès : http://localhost:4200

## Build & déploiement

```bash
ng build --configuration production
```

Sortie dans `dist/`. Déployable tel quel sur Vercel / Netlify / GitHub Pages (SSR optionnel via `serve:ssr`).

> **Images** : toutes les photos de `public/images` sont copiées dans `dist/.../browser/images` au build.
> Si une image n'apparaît pas en dev, redémarrez `ng serve` (cache) ; en cas d'URL cassée, les cartes et plats basculent automatiquement sur `/images/restaurant.webp` via `onImageError`.
> Piste d'optimisation : `poulets.webp` (1,5 Mo) gagnerait à être recompressé.

## Feuille de route

- Authentification et favoris
- Commentaires clients
- Géolocalisation et tri par distance
- PWA installable et cache hors-ligne
- Backend temps réel (avis synchronisés)

## Auteur & licence

Développé par **ELOCK SADRACK FIDELE** — Formation Angular Talent Lab 2026 (Orange Digital Center).

Projet académique — libre d'utilisation à des fins éducatives.


