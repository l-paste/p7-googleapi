# Projet 7 - Lancez votre propre site d'avis de restaurants
**Formation OpenClassrooms, parcours Développeur d'application front-end**

## Installation
```
npm install
```

### Serveur local avec hot-reload pour le développement
```
npm run serve
```

### Build de production (répertoire dist)
```
npm run build
```

**Consignes  :** 
>Vous avez choisi de vous lancer dans le business des avis de restaurants. Votre objectif : créer un service simple et utile qui permet d'avoir des avis sur des restaurants autour de soi.
> Pour ce projet, vous allez devoir apprendre à utiliser des API externes, telles que celles de Google Maps et de Google Places (votre plus gros concurrent ). Et ce n'est pas tout : vous allez devoir orchestrer toutes ces informations de manière cohérente dans votre application !
> #### Etape 1 : la carte des restaurants Commencez par les fondations de votre application. Il y aura 2 sections principales :
> -   Une carte Google Maps, chargée avec l'[API de Google Maps](https://developers.google.com/maps/?hl=fr).
> -   Une liste de restaurants correspondant à la zone affichée sur la carte Google Maps.
> 
> Vous placerez ces éléments côte à côte. La carte Google Maps sera
> centrée immédiatement sur la position de l'utilisateur. Vous
> utiliserez l'API de géolocalisation de JavaScript. Un marqueur de
> couleur spécifique sera placé à l'emplacement de l'utilisateur.
> 
> Une liste de restaurants est fournie sous forme de données JSON
> présentées dans un fichier à part. [...] Affichez ces restaurants
> grâce à leurs coordonnées GPS sur la carte. Les restaurants qui sont
> actuellement visibles sur la carte doivent être affichés sous forme de
> liste sur le côté de la carte. Vous afficherez la moyenne des
> commentaires de chaque restaurant (qui va de 1 à 5 étoiles).
> 
> Lorsqu'on clique sur un restaurant, la liste des avis enregistrés
> s'affiche avec les commentaires. Affichez aussi  [la photo Google
> Street View grâce à l'API
> correspondante](https://developers.google.com/maps/documentation/streetview/?hl=fr).
> 
> Un outil de filtre permet d'afficher uniquement les restaurants ayant
> entre X et Y étoiles. La mise à jour de la carte s'effectue en temps
> réel.
> 
> #### Etape 2 : ajoutez des restaurants et des avis !
> 
> Vos visiteurs aimeraient eux aussi donner leur avis sur des
> restaurants !Proposez-leur :
> -   D'ajouter un avis sur un restaurant existant
> -   D'ajouter un restaurant, en cliquant sur un lieu spécifique de la carte
>      Une fois un avis ou un restaurant ajouté, il apparaît immédiatement sur la carte. Un nouveau marqueur apparaît pour indiquer
> la position du nouveau restaurant. Les informations ne seront pas
> sauvegardées si on quitte la page (elles restent juste en mémoire le
> temps de la visite).
> #### Etape 3 : intégration avec l'API de Google Places Pour l'instant, il n'y a pas beaucoup de restaurants et pas beaucoup d'avis.
> Heureusement, Google Places propose une API pour récupérer des
> restaurants et des avis. Servez-vous en pour afficher des restaurants
> et avis supplémentaires sur votre carte ! Ici la documentation : 
> [https://developers.google.com/places/](https://developers.google.com/places/).
> Vous utiliserez la search api pour trouver des restaurants dans la
> zone affichée.

**Choix personnels :**
- Apprentissage du framework Vue.js avec les outils suivants en plus : Vue CLI, Vuex.
- Utilisation du framework CSS Buefy, qui est une version Vue.js de Bulma.

**Compétences évaluées :**
-   Développer une application JavaScript complète en respectant un cahier des charges.
-   Utiliser une API externe en JavaScript.

**Livrable :**
 -   [CASSE-CROÛTE — Trouvez rapidement où casser la croûte !]([https://lpaste.alwaysdata.net/)