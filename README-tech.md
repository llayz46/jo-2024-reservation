# Documentation technique du projet

## Structure du projet
- **app/** : Logique métier (Actions, Factories, Http, Models, Providers)
- **database/** : Migrations, seeders et factories pour la base de données
- **public/** : Fichiers accessibles publiquement (assets...)
- **resources/** : Front-end (CSS, JS, Pages)
- **routes/** : Définition des routes
- **tests/** : Tests unitaires et fonctionnels (Pest)

## Principaux modèles
- **User** : Utilisateur
- **Cart** : Panier d'achat
- **CartItem** : Article du panier
- **Order** : Commande
- **OrderItem** : Article de commande
- **Ticket** : Billet pour l'événement

## Fonctionnalités principales
- Authentification et gestion des utilisateurs
- Création et gestion de paniers
- Passage de commandes et gestion des tickets
- Intégration front-end avec Inertia.js

## Sécurité
L'application applique les bonnes pratiques de sécurité Laravel :
- Utilisation du système d'authentification Laravel avec vérification de l'email et 2FA
- Protection CSRF sur les formulaires
- Validation des données côté serveur via Form Requests
- Gestion des permissions et accès via middleware
- Protection contre les injections SQL
- Mise à jour régulière des dépendances

## Tests
- Les tests sont situés dans le dossier `tests/`
- Exécution des tests : `./vendor/bin/pest`
- Pourcentage de couverture : 85.6%

## Évolutions futures
Plusieurs axes d'amélioration sont envisagés :
- Ajout d'un module de paiement en ligne sécurisé
- Système de notifications (email, SMS, push)
- Statistiques et reporting sur les ventes et tickets
- Internationalisation et traduction complète de l'interface
- Optimisation des performances et scalabilité

## Ressources utiles
- [Documentation Laravel](https://laravel.com/docs)
- [Documentation Inertia.js](https://inertiajs.com/)
- [Documentation Pest](https://pestphp.com/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation React](https://reactjs.org/docs/getting-started.html)

