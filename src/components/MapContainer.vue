<template>
  <div class="column is-three-quarters">
    
    <!-- Container carte -->
    <places-map
      :center="customCenter"
      :defaultCenter="defaultCenter"
      @map-initialized="initialize"
      @map-bounds-changed="selectVisibleMarker"
      @drag-ended="updateCurrentCenter"
      @map-clicked="openaddPlace"
    >
      <template v-slot:default="{ google, map }">
        <markers
          v-for="marker in markers"
          :key="marker.id"
          :marker="marker"
          :map="map"
          :google="google"
        ></markers>
        <markers v-if="userMarker !== {}" :marker="userMarker" :map="map" :google="google"></markers>
      </template>
    </places-map>

    <!-- Loader -->
    <b-loading :is-full-page="isFullPage" :active.sync="loadingStatus" :can-cancel="true"></b-loading>

    <!-- Modal pour ajouter des restaurants -->
    <b-modal
      :active.sync="isAddPlaceModalActive"
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <add-place :place-lat="addPlaceLat" :place-lng="addPlaceLng"></add-place>
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
      mapName: this.name + "-map",
      userCoord: {},
      userMarker: {
        type: "user"
      },
      marker: null,
      map: null,
      bounds: null,
      defaultCenter: {
        lat: 48.842702,
        lng: 2.328434
      },
      customCenter: {
        lat: null,
        lng: null
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

    askGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // console.log(pos);
            this.customCenter = pos;
            this.userCoord = pos;
            this.userMarker = {
              ...this.userMarker,
              position: pos
            };
            this.map.setCenter(this.customCenter);
            this.setPlaces(pos);
            this.$store.commit("setCurrentBounds", this.map.getBounds());
          },
          () => {
            this.handleLocationError(true, this.defaultCenter);
            this.setPlaces(this.defaultCenter);
            this.$store.commit("setCurrentBounds", this.map.getBounds());
          }
        );
      } else {
        this.handleLocationError(false, this.defaultCenter);
        this.setPlaces(this.defaultCenter);
        this.$store.commit("setCurrentBounds", this.map.getBounds());
      }
    },

    handleLocationError(browserHasGeolocation, pos) {
      this.map.setCenter(pos);
      this.$store.commit("setCurrentBounds", this.map.getBounds());
    },

    // placesSelection dépend du tri et de la zone d'affichage de la carte, et est utilisé par Map et List
    selectVisibleMarker() {
      this.$store.commit("setCurrentBounds", this.map.getBounds());
      this.$store.commit("placesSelection");
    },

    openaddPlace(event) {
      if (this.addPlaceMode) {
      this.addPlaceLat = event.latLng.lat();
      this.addPlaceLng = event.latLng.lng();
      this.isAddPlaceModalActive = true;
      }
    },

    setPlaces(location) {
      const service = new this.google.maps.places.PlacesService(this.map);
      // Appel l'action getData du Store
      this.$store.dispatch("getData", {
        service,
        location
      });
    },

      updateCurrentCenter() {
        this.$store.commit("updateCurrentCenter", this.map.getCenter(), this.map);
      }


  },

  computed: {
    // Génère les markers
    markers() {
      const markersArray = [
        ...this.$store.getters.getSelectedPlacesList.map(place => {
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
      if (this.userMarker !== {}) {
        markersArray.push(this.userMarker);
      }
      return markersArray;
    },
    
    loadingStatus() {
        return this.$store.getters.getLoadingStatus;
    },

    addPlaceMode() {
      return this.$store.getters.getAddPlaceMode;
    },

    updateWatcher() {
      return this.$store.getters.isUpdateNeeded;
    }
  },
  watch: {
    updateWatcher() {
      this.setPlaces(this.map.getCenter());
      console.log("clicked!!!");
    }
  }
};
</script>

<style>
</style>