<template>
<div class="column is-three-quarters">
  <places-map
    :center="customCenter"
    :defaultCenter="defaultCenter"
    @map-initialized="initialize"
    @map-bounds-changed="selectVisibleMarker"
    @drag-ended="updateLocationsList"
  >
    <template v-slot:default="{ google, map }">
      <markers v-for="marker in markers" :key="marker.id" :marker="marker" :map="map" :google="google"></markers>
      <markers v-if="userMarker !== {}" :marker="userMarker" :map="map" :google="google"></markers>
    </template>
  </places-map>
</div>
</template>

<script>
// import MarkerClusterer from "@google/markerclusterer";
import PlacesMap from "./PlacesMap";
import Markers from "./Markers";

export default {
  components: {
    PlacesMap,
    Markers
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
      infoWindow: null,
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
      }
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
      console.log("fonction dragend");
      const location = this.map.getCenter();
      const service = new this.google.maps.places.PlacesService(this.map);
      // this.$store.dispatch("getData", {
      //   service,
      //   location
      // });
    },

    setPlaces(location) {
      const service = new this.google.maps.places.PlacesService(this.map);
      // Appel l'action getData du Store
      this.$store.dispatch("getData", {
        service,
        location
      });
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
#mapgoogle {
  border: 1px dashed green;
  margin: 10px;
  height: 90vh;
}
</style>