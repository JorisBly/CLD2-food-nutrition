# 🍎 NutriTrack - Application de Suivi Nutritionnel

NutriTrack est une application moderne de suivi de santé permettant de gérer son journal alimentaire et l'évolution de son poids. Le projet utilise une architecture Cloud hybride pour garantir performance et scalabilité.

## 🚀 Technologies utilisées

* **Framework :** SvelteKit 5 (Mode PaaS via Vercel)
* **Base de données :** PostgreSQL avec Drizzle ORM (Hébergé sur Neon - PaaS)
* **Gestion d'images :** Cloudinary (SaaS/PaaS)
* **Style :** Tailwind CSS
* **Gestionnaire de paquets :** pnpm

## 🛠️ Installation et Configuration

### 1. Cloner le projet
```sh
git clone git@github.com:JorisBly/CLD2-food-nutrition.git
cd CLD2-food-nutrition
```

### 2. Installer les dépendances
```sh
pnpm install
```

### 3. Variables d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```env
# Database (Neon.tech)
DATABASE_URL="neon_url"

# Cloudinary Config
CLOUDINARY_CLOUD_NAME="cloudinary_cloud_name"
CLOUDINARY_API_KEY="cloudinary_api_key"
CLOUDINARY_API_SECRET="cloudinary_api_secret"

# Public Cloudinary (pour l'affichage client)
VITE_CLOUDINARY_CLOUD_NAME="cloudinary_cloud_name"
```

### 4. Initialiser la base de données
Pour synchroniser votre schéma et remplir la base avec des données de test réalistes :
```sh
# Générer les migrations et pousser le schéma
pnpm drizzle-kit push

# Lancer le script de seeding (nettoie et remplit la DB)
pnpm run db:seed
```

## 💻 Développement

Pour lancer le serveur de développement local :
```sh
pnpm run dev
```
L'application sera disponible sur `http://localhost:5173`.

## ☁️ Architecture Cloud

[cite_start]Conformément aux exigences du projet[cite: 5, 20], NutriTrack repose sur trois modèles :
* **IaaS :** L'infrastructure physique gérée par AWS (utilisée indirectement par Neon et Vercel).
* **PaaS :** **Vercel** pour l'hébergement du code et **Neon** pour la base de données relationnelle. Cela permet de se concentrer sur le code métier sans gérer les serveurs.
* **SaaS :** **Cloudinary** pour le stockage et l'optimisation automatique des images de nourriture.

## 📊 Fonctionnalités clés
* **Authentification :** Gestion sécurisée des sessions utilisateurs.
* **Journal Alimentaire :** Calcul dynamique des calories via la formule Atwater (4-4-9).
* **Suivi du poids :** Graphiques de progression interactifs (LayerChart/D3.js).
* [cite_start]**Architecture DB :** Modèle relationnel strict assurant l'intégrité des données[cite: 5].

---