# Déploiement sur GitHub Pages

Cette version est une SPA React/Vite statique. Elle ne dépend plus de TanStack Start/Nitro côté serveur.

## 1. Créer le dépôt GitHub

Pousser le contenu de ce dossier sur la branche `main`.

## 2. Activer GitHub Pages

Dans **Settings → Pages → Build and deployment**, sélectionner **GitHub Actions**.

Le workflow `.github/workflows/deploy.yml` construit automatiquement le site et publie `dist/` à chaque push sur `main`.

## 3. URL

Pour un dépôt nommé `joker-barber`, l'URL sera généralement :

`https://<utilisateur>.github.io/joker-barber/`

Le `base: "./"` de Vite permet aux assets (CSS, JS et images) de fonctionner sous ce chemin de projet.
