<template>
  <div>
    <div class="google-map" ref="appMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <!-- Si l'API est chargée, envoi au composant parent -->
      <slot :google="google" :map="map"></slot>
    </template>
  </div>
</template>

<script>
// On charge l'intégration de l'API Google
import gmapsInit from "../utils/loadapi";

export default {
  props: ["name", "defaultCenter"],
  data: function() {
    return {
      google: null,
      map: null
    };
  },
  // Petit plugin pour loader de manière asynchrone l'API Google et éviter des erreurs
  async mounted() {
    const google = await gmapsInit(); // On attend l'intégration de l'API.
    this.google = google;
    // Une fois terminé on lance ces fonctions :
    this.initMap();
    this.boundsListener();
    this.openAddPlace();
  },
  methods: {
    // Initialisation de la carte
    initMap() {
      // Pour y faire référence plus facilement
      const element = this.$refs.appMap; // Emplacement de la carte dans le DOM
      const options = {
        // Options de la création de carte
        center: this.defaultCenter, // Centre par défaut (avant géolocalisation ou si désactivée)
        zoom: 17, // Zoom par défaut
        minZoom: 17, // Zoom minimum
        maxZoom: 19, // Zoom maximum
        fullscreenControl: false, // Masquage d'options pour simplifier
        mapTypeControl: false,
        styles: [
          // Personnalisation de la carte
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#523735"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",

            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#fdfcf8"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#f8c967"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#e9bc62"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#e98d58"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#db8555"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#806b63"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#b9bfd3"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8d9199"
              }
            ]
          }
        ]
      };

      // Création de la carte avec les options précédemment établies
      this.map = new this.google.maps.Map(element, options);
      // Envoi de google et map au composant parent (MapContainer)
      this.$emit("map-initialized", {
        google: this.google,
        map: this.map
      });
    },

    // Détection des déplacements sur la carte pour récupérer les limites et les envoyer au store.
    boundsListener() {
      // Pour utiliser les bounds pour l'affichage des restaurants dans la liste
      this.google.maps.event.addListener(this.map, "bounds_changed", () => {
        this.$emit("map-bounds-changed");
      });
    },

    // Gestion du clic sur la carte pour ajouter un restaurant.
    openAddPlace() {
      // Emet l'event pour ajouter un restaurant au click sur la carte
      this.google.maps.event.addListener(this.map, "click", event => {
        this.$emit("map-clicked", event);
      });
    }
  }
};
</script>

<style>
/* Map full height moins la navbar */
.google-map {
  min-height: calc(100vh - 3.25rem); 
}
</style>