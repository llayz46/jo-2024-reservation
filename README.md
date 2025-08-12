# Manuel d’utilisation de l’application

## 1. Connexion et création de compte
- Rendez-vous sur la page d’accueil.
- Cliquez sur l'icône de connexion en haut à droite.
- Remplissez le formulaire et validez.

## 2. Navigation
- Utilisez le menu principal pour accéder aux différentes sections :
  - Accueil
  - Mon panier (accessible depuis toutes les pages)
  - Mon profil (dashboard)
    - Mes commandes
    - Paramètres du profil
    - Modifier le mot de passe
    - Thème (clair/sombre)

## 3. Ajouter des billets au panier
- Parcourez la liste des offres disponibles.
- Cliquez sur « Ajouter au panier » pour ajouter une offre au panier.
- Consultez votre panier à tout moment via le bouton dans le header.
- Vérifiez le contenu du panier :
  - Modifiez la quantité des billets.
  - Supprimez des billets si nécessaire.
  - Le total du panier est mis à jour automatiquement et dynamiquement.

## 4. Passer une commande
- Accédez à votre panier.
- Vérifiez le récapitulatif des billets sélectionnés.
- Cliquez sur « Passer à la caisse » pour finaliser l’achat.

## 5. Consulter ses commandes et billets
- Rendez-vous dans votre dashboard pour voir l’historique de vos achats.
- Sur la page des commandes, vous pouvez :
  - Voir chacune de vos commandes.
  - Consulter les détails de chaque commande.

## 6. Déconnexion
- Cliquez sur votre profil puis « Se déconnecter » pour quitter l’application en toute sécurité.

# Utilisation en local

Pour utiliser l’application en local, suivez ces étapes :

1. **Installation**
   - Clonez le projet : `git clone https://github.com/llayz46/jo-2024-reservation.git`
   - Installez les dépendances PHP : `composer install`
   - Installez les dépendances front-end : `npm install`
   - Copiez le fichier d’exemple d’environnement : `cp .env.example .env`
   - Configurez vos variables dans `.env` (base de données, mail, etc.)
   - Générez la clé d’application : `php artisan key:generate`
   - Lancez les migrations et le seeder : `php artisan migrate --seed`

2. **Démarrage**
   - Lancez l'application : `composer run dev`
   - Accédez à l’application sur [http://127.0.0.1:8000](http://127.0.0.1:8000)

3. **Tests**
   - Exécutez les tests : `./vendor/bin/pest` ou `php artisan test`

4. **Compte de test**
   - Un compte de test avec le rôle admin est préconfiguré depuis le seeder :
     - Email : `admin@user.fr`
     - Mot de passe : `$x^#u!Bg4JTVwtNskNeB`
