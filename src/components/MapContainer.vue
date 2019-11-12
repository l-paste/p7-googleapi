<template>
  <div class="column is-three-quarters">
    
    <!-- Container carte -->
    <places-map
      :center="customCenter"
      :defaultCenter="defaultCenter"
      @map-initialized="initialize"
      @map-bounds-changed="selectVisibleMarker"
      @drag-ended="updateLocationsList"
      @map-clicked="openAddRestaurant"
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
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>

    <!-- Modal pour ajouter des restaurants -->
    <b-modal
      :active.sync="isAddPlaceModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <add-place :place-lat="addPlaceLat" :place-lng="addPlaceLng"></add-place>
    </b-modal>

  </div>
</template>

<script>
// import MarkerClusterer from "@google/markerclusterer";
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
      position: {
        lat: null,
        lng: null
      },
      defaultCenter: {
        lat: 48.842702,
        lng: 2.328434
      },
      customCenter: {
        lat: null,
        lng: null
      },
      isLoading: true,
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
            this.selectVisibleMarker();
          },
          () => {
            this.handleLocationError(true, this.defaultCenter);
            this.setPlaces(this.defaultCenter);
            this.selectVisibleMarker();
          }
        );
      } else {
        this.handleLocationError(false, this.defaultCenter);
        this.setPlaces(this.defaultCenter);
        this.selectVisibleMarker();
      }
    },

    handleLocationError(browserHasGeolocation, pos) {
      this.map.setCenter(pos);
      this.selectVisibleMarker();
    },

    // selectVisibleRestaurant dépend du tri et de la zone d'affichage de la carte, et est utilisé par Map et List
    selectVisibleMarker() {
      this.$store.commit("setBoundsValue", this.map.getBounds());
      this.$store.commit("selectVisibleRestaurant");
    },

    updateLocationsList() {
      // console.log("fonction dragend");
      // const location = this.map.getCenter();
      // const service = new this.google.maps.places.PlacesService(this.map);
      //   service,
      //   location
      // });
    },

    openAddRestaurant(event) {
      this.addPlaceLat = event.latLng.lat();
      this.addPlaceLng = event.latLng.lng();
      this.isAddPlaceModalActive = true;
    },

    setPlaces(location) {
      const service = new this.google.maps.places.PlacesService(this.map);
      // Appel l'action getData du Store
      this.$store.dispatch("getData", {
        service,
        location
      });
      this.isLoading = false;
    }
  },

  computed: {
    // Génère les markers
    markers() {
      const markersArray = [
        ...this.$store.getters.getRestaurantList.map(restaurant => {
          return {
            id: restaurant.ID,
            position: {
              lat: parseFloat(restaurant.lat),
              lng: parseFloat(restaurant.long)
            },
            type: "restaurant"
          };
        })
      ];
      if (this.userMarker !== {}) {
        markersArray.push(this.userMarker);
      }
      return markersArray;
    }
  }
};
</script>

<style>
</style>