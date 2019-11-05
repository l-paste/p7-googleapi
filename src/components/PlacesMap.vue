<template>
  <div class="main">
    <div class="google-map" v-bind:id="mapName" ref="mainMap">
    </div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map"></slot>
    </template>
  </div>
</template>

<script>
  // Utilisation du plugin pour charger de manière asynchrone l'API
  const apiLoad = require("google-maps-api-loader");

  export default {
    name: 'google-map',
    props: [
      'name',
      'defaultCenter'
    ],
    data: function() {
      return {
        google: null,
        mapName: this.name + "-map",
        userCoord: {},
        markers: [],
        map: null,
        bounds: null,
        infoWindow: null,
      }
    },
    // Petit plugin pour loader de manière asynchrone l'API Google et éviter des erreurs
    async mounted() {
      const google = await apiLoad({
        libraries: ['places'],
        apiKey: 'AIzaSyDWjR8Rt6VNWdTjznzLanMbGWALoewrLeo'
      })
      this.google = google
      // Appel de InitMap, et des listeners
      this.initMap();
      this.addChangeBoundsListener();
      this.openAddRestaurant();
      this.dragEndListener();
    },
    methods: {
      // Initialise la carte
      initMap() {
        // Pour y faire référence plus facilement
        const element = this.$refs.mainMap
        const options = {
          center: this.defaultCenter,
          zoom: 18,
        }
        this.map = new this.google.maps.Map(element, options);
        this.infoWindow = new this.google.maps.InfoWindow;
        // Emet google et map à MainMap
        this.$emit('map-initialized', {
          google: this.google,
          map: this.map
        })
      },
      addChangeBoundsListener() {
        // Pour utiliser les bounds pour l'affichage des restaurants dans la liste
        this.google.maps.event.addListener(this.map, 'bounds_changed', () => {
          this.$emit('map-bounds-changed')
        })
      },

      dragEndListener() {
        // Détection de la fin du drag, pour déclencher la mise à jour des restaurants.
        this.google.maps.event.addListener(this.map, 'dragend', () => {
          this.$emit('drag-ended')
        })
      },

      openAddRestaurant() {
        // Emet l'event pour ajouter un restaurant au click sur la carte
        this.google.maps.event.addListener(this.map, 'click', (event) => {
          this.$emit('map-clicked', event);
        })
      },
    }
  };
</script>

<style>
.google-map {
  height: 90vh;
  border: 1px dashed green;
}
</style>