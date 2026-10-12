# Délices de Douala — Portfolio Restaurant (Angular)

![Angular](https://img.shields.io/badge/Angular-22-DB413D?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.0-6E91F0?logo=vitest&logoColor=white)
![Status](https://img.shields.io/badge/Status-Projet%20acad%C3%A9mique-blue?logo=none)

[![Démo](https://img.shields.io/badge/D%C3%A9mo-Studio_Pr%C3%A9sentation-blue)](https://hunter13-cmr.github.io/delices-de-douala-HTTP-notation/)
[![API](https://img.shields.io/badge/API-REST_public-FFC107?logo=none)]

> Application Angular 22 (standalone, Signals, SSR optionnel) qui présente les restaurants de Douala avec un design premium : mode sombre, icônes SVG, notation interactive et « carte du jour » factice.  
> Les captures d'écran et `dist/` sont signalés en fin de document.

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Architecture & design system](#architecture--design-system)
- [Structure du projet](#structure-du-projet)
- [Données et API](#donnees-et-api)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Build, test et budgets](#build--test--budgets)
- [Serveur SSR](#serveur-ssr)
- [Déploiement](#deploiement)
- [Performance & accessibilité](#performance--accessibilite)
- [Contribution](#contribution)
- [Auteur & licence](#auteur--licence)
- [Feuille de route](#feuille-de-route)
## Vue d'ensemble

Application web monopage (SPA) construite avec **Angular 22**, ciblée sur la présentation et la notation des restaurants de Douala. L'application allie un vrai système de design (tokens CSS, typographie `clamp()`, grilles fluides, modes clair/sombre) et des choix techniques modernes :

- **Standalone** : aucun module racine importé, arborescence de composants claire.
- **Signals** : état local réactif sans bibliothèque externe.
- **SSR optionnel** : rendu coté serveur pour le SEO et le chargement initial (voir [Serveur SSR](#serveur-ssr)).
## Fonctionnalités

- **Accueil** : en-tête immersif, compteur de restaurants notés, note moyenne globale et filtre « meilleures tables » (≥ 4 étoiles).
- **Cartes restaurants** : image, quartier, spécialité, notation interactive et lien vers la fiche menu.
- **Notation intelligente** : survol avec message dynamique, confirmation, persistance locale et mise à jour des statistiques.
- **Carte du jour** : menu chargé depuis `/api/plats.json` avec états chargement/erreur/données, filtre par catégorie, recherche instantanée, badge « Épuisé » et plat du jour rotatif toutes les 5 s.
- **Mode sombre / clair** : bascule persistée, variables unifiées, cartes sombres contrastées, bascule accessible au clavier.
- **Responsive** : grilles `auto-fit`, `object-fit: cover` sur les images, typographie `clamp()`, mobile-first.

## Stack technique

| Couche | Choix |
| --- | --- |
| Framework | Angular 22 (standalone, Signals, `httpResource`) |
| Langage | TypeScript |
| RxJS | `~7.8` (`interval` → `toSignal` pour le plat du jour) |
| Tests | Vitest 4 |
| Style | CSS custom properties (sans framework UI) |
| Icônes | SVG inline via `app-icon` |
| Données | JSON statique sous `public/api/` |

## Architecture & design system

Le composant racine `App` délègue à plusieurs composants organiques. L'état est fragmenté par domaine : restaurants (`RestaurantService`), menu (`MenuService`), notation (`RatingService`), thème (`ThemeService`). Les données sont consommées via `httpResource` (chargement avec états `loading | resolved | error`), et la notation est centralisée pour mettre à jour les moyennes de façon réactive.

```text
src/
├── app/
│   ├── app.ts                # racine : toggle thème + footer
│   ├── app.routes.ts         # '/' et 'restaurant/:id'
│   ├── shared/
│   │   └── icon.component.ts # 16 icônes SVG (currentColor)
│   ├── components/
│   │   ├── header/           # héros + 2 cartes statistiques
│   │   ├── home/             # états, filtre, liste
│   │   ├── restaurant-list/  # grille responsive
│   │   ├── restaurant-card/  # carte + notation + lien menu
│   │   ├── star-rating/      # 5 étoiles interactives
│   │   └── carte-du-jour/    # menu, filtres, recherche
│   ├── models/               # restaurant.ts, plat.ts
│   ├── services/             # restaurant, menu, rating, theme
│   └── environments/
├── assets/
│   ├── images/               # photos des restaurants
│   ├── screenshots/          # captures officielles (à valider)
│   └── demo/                 # versions AVIF/GIF/WebP
├── styles.css                # tokens, thèmes, base, footer
└── index.html                # lang=fr, favicon SVG, meta
```

Principes d'architecture :

- **Séparation des concerns** : composants UI, services de domaine, fichiers de modèles.
- **Données réactives** : `httpResource` expose les états de chargement.
- **Notation** : `RatingService` centralise les notes et recalcule les moyennes à chaque nouvelle note.
- **Thème** : `ThemeService` applique `data-theme="dark"` sur `<html>` et le conserve dans `localStorage`.

## Structure du projet

Le dossier `src/` est organisé en couches : composants réutilisables, services, modèles, ressources et styles globaux.

## Données et API

Deux fichiers JSON statiques alimentent l'application. Ils sont fournis dans `public/api/` et copiés tels quels dans le build ; aucune intégration backend n'est requise en local.

### `restaurants.json`

Tableau de 6 restaurants avec les champs `id`, `name`, `district`, `specialty`, `image`, `headerImage`.

Exemple (`id: 1`) :

```json
{
  "id": 1,
  "name": "Le Calao Doré",
  "district": "Akwa",
  "specialty": "Ndolé aux crevettes",
  "image": "/images/ndole-crevettes.webp",
  "headerImage": "/images/calao-dore.webp"
}
```

### `plats.json`

Tableau de 20 plats avec les champs `id`, `nom`, `prix`, `categorie`, `disponible`, `image`, `restaurantId`.

Exemple (`d1`) :

```json
{
  "id": "d1",
  "nom": "Ndolè aux crevettes",
  "prix": 3500,
  "categorie": "Plats",
  "disponible": true,
  "image": "/images/ndole-crevettes.webp",
  "restaurantId": 1
}
```

## Installation

```bash
git clone https://github.com/Hunter13-cmr/delices-de-douala-HTTP-notation
cd delices-de-douala-HTTP-notation
npm install        # si vous utilisez Yarn : yarn install
npm start
```

Accès à l'application : [http://localhost:4200](http://localhost:4200).

> `ng serve` sert les fichiers statiques de `src/assets` et `public` ; les images sont disponibles à la racine du projet.

## Scripts disponibles

| Commande | Rôle |
| --- | --- |
| `npm start` / `ng serve` | Serveur de développement sur le port 4200 |
| `npm run build` | Build production (`ng build --configuration production`) |
| `npm test` | Exécute `ng test` (Karma) |
| `npx vitest run` | Exécute la suite de tests unitaires Vitest |
| `npm run serve:ssr:delices-tp` | Lance le serveur Express 5 pour la version SSR |
| `npx tsc --noEmit` | Vérification des types pour l'application |

## Build, test et budgets

- **Build** : `npm run build` démarre `@angular/build:application` en mode production, avec `outputHashing: all` et les budgets définis dans `angular.json`.
- **Types** : `npx tsc --noEmit -p tsconfig.app.json` ne renvoie aucune erreur.
- **Budgets** : `initial` 500 kB warning / 1 MB error ; `anyComponentStyle` 8 kB warning / 12 kB error. Le composant `CarteDuJour` (`carte-du-jour.css`) est suivi attentivement pour rejoindre le budget warning.
- **Tests** : `npx vitest run` exécute la suite Vitest (dont `app.spec.ts` et `header.spec.ts`).

## Serveur SSR

L'application est aussi servie sous forme de single-page application classique, et peut être exportée en serveur. `src/server.ts` exporte un moteur Express (`AngularNodeAppEngine`) qui sert les fichiers statiques du dossier `browser` et rend le reste via le moteur Angular. Pour le lancer :

```bash
npm run serve:ssr:delices-tp
```

Le serveur écoute le port défini par la variable `PORT`, ou `4000` par défaut.

## Auteur & licence

Projet académique `delices-tp` (Angular Talent Lab 2026, Semaine 3, Jour 5). Le sujet de travail est `TP_Jour8_Delices_Douala_Sujet.pdf` et n'est pas modifié. Le site est publié sur GitHub Pages à l'adresse https://hunter13-cmr.github.io/delices-de-douala-HTTP-notation/.

## Feuille de route

- Valider et remplacer les captures d'écran (`src/assets/screenshots/`) par des captures réelles corrigées.
- Finaliser `dist/`, les budgets et la publication sur GitHub Pages.
- Poursuivre l'hébergement et l'accessibilité du site.

