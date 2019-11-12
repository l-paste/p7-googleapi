<template>
  <div>
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
        bounds: null
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
          minZoom: 17,
          fullscreenControl: false,
          styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
        }
        this.map = new this.google.maps.Map(element, options);
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
    min-height: calc(100vh - 3.25rem);
}
</style>