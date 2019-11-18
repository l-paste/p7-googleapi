<template>
  <div class="column is-three-quarters">
    <!-- Intégration du component de la carte -->
    <places-map
      @map-initialized="initialize"
      @map-bounds-changed="selectVisibleMarker"
      @map-clicked="openaddPlace"
    >
      <!-- Boucle d'affichage des markers. -->
      <markers
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :map="map"
        :google="google"
      ></markers>
      <!-- Affichage du marker de l'utilisateur si on est géolocalisé. -->
      <markers v-if="userMarker !== {}" :marker="userMarker" :map="map" :google="google"></markers>
    </places-map>

    <!-- Loader qui disparaît une fois les restaurants chargés. -->
    <b-loading :is-full-page="isFullPage" :active.sync="loadingStatus" :can-cancel="false">
      <b-icon pack="fas" icon="sync-alt" size="is-large" type="is-danger" custom-class="fa-spin"></b-icon>
    </b-loading>

    <!-- Modale pour l'ajout de restaurants -->
    <b-modal :active.sync="isAddPlaceModalActive" trap-focus aria-role="dialog" aria-modal>
      <add-place :place-lat="addPlaceLat" :place-lng="addPlaceLng" @close-modale="closeModale"></add-place>
    </b-modal>
  </div>
</template>

<script>
import PlacesMap from "./PlacesMap";
import Markers from "./Markers";
import AddPlace from "./AddPlaceForm";

export default {
  components: {
    PlacesMap,
    Markers,
    AddPlace
  },
  data: function() {
    return {
      google: null,
      userLatLng: {},
      userMarker: {
        type: "user"
      },
      map: null,
      defaultCenter: {
        lat: 48.704439,
        lng: 2.460114
      },
      isFullPage: true,
      isAddPlaceModalActive: false,
      addPlaceLat: null,
      addPlaceLng: null
    };
  },

  // METHODS //

  methods: {
    initialize(data) {
      this.map = data.map;
      this.google = data.google;
      this.askGeolocation();
    },

    closeModale() {
      this.isAddPlaceModalActive = false;
    },

    askGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const geolocalizedPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // On stock la position géolocalisée.
            this.userLatLng = geolocalizedPosition;
            // On remplit le marker utilisateur avec la position géolocalisée.
            this.userMarker = {
              ...this.userMarker,
              position: geolocalizedPosition
            };
            // Positionnement de la carte sur l'emplacement géolocalisé.
            this.map.setCenter(this.userLatLng);
            // Lancement de la récupération des restaurants.
            this.setPlaces(geolocalizedPosition);
            // On récupère les limites de la carte pour la sélection des restaurants visibles.
            this.$store.commit("setCurrentBounds", this.map.getBounds());
          },
          () => {
            // Gestion de l'erreur si géolocalisation désactivée.
            this.handleLocationError(true, this.defaultCenter); // Si le navigateur n'a pas la géolocalisation activée.
          }
        );
      } else {
        // Gestion de l'erreur dans d'autres cas.
        this.handleLocationError(false, this.defaultCenter);
      }
    },

    handleLocationError(isBrowserOk, defaultCenter) {
      if(isBrowserOk === true) {
        // Positionnement sur les coordonnées par défaut.
        this.map.setCenter(defaultCenter);
        this.setPlaces(this.defaultCenter);
        this.$store.commit("setCurrentBounds", this.map.getBounds());
        this.$store.commit("setCurrentBounds", this.map.getBounds());
        // Toast d'information.
        this.$buefy.toast.open({
        duration: 4000,
        message: `Merci d'activer la géolocalisation de votre navigateur.`,
        position: "is-bottom",
        type: "is-danger"
      });
      }
      else {
        // Positionnement sur les coordonnées par défaut.
        this.map.setCenter(defaultCenter);
        this.setPlaces(this.defaultCenter);
        this.$store.commit("setCurrentBounds", this.map.getBounds());
        // Toast d'information.
        this.$buefy.toast.open({
        duration: 4000,
        message: `La géolocalisation a rencontré une erreur, merci de bien vouloir réactualiser l'application.`,
        position: "is-bottom",
        type: "is-danger"
      });
      }
    },

    // Récupération des limites, restriction de la liste de restaurants à cette zone.
    selectVisibleMarker() {
      this.$store.commit("setCurrentBounds", this.map.getBounds());
      this.$store.commit("placesSelection");
    },

    // Ouverture de la modale si le switch est activé.
    openaddPlace(event) {
      if (this.addPlaceMode) {
        this.addPlaceLat = event.latLng.lat();
        this.addPlaceLng = event.latLng.lng();
        this.isAddPlaceModalActive = true;
      }
    },

    // Lancement de la récupération des données selon la localisation.
    setPlaces(location) {
      const service = new this.google.maps.places.PlacesService(this.map);
      this.$store.dispatch("getData", {
        service,
        location
      });
    }
  },

  computed: {
    // Génération des markers en fonction des lieux sélectionnés.
    markers() {
      const markersList = [
        ...this.$store.getters.getSelectedPlacesList.map(place => { // Pour chaque entrée on renvoi les informations.
          return {
            id: place.id,
            position: {
              lat: parseFloat(place.lat),
              lng: parseFloat(place.long)
            },
            type: "restaurant"
          };
        })
      ];
      if (this.userMarker !== {}) { // Si géolocalisé, on ajoute le marker utilisateur à la liste.
        markersList.push(this.userMarker);
      }
      return markersList;
    },

    // Récupération du statut du chargement dans le store.
    loadingStatus() {
      return this.$store.getters.getLoadingStatus;
    },

    // Récupération du statut du switch dans le store.
    addPlaceMode() {
      return this.$store.getters.getAddPlaceMode;
    }
  }
};
</script>