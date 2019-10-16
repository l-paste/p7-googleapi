<template>
  <div id="mapgoogle"></div>
</template>

<script>
import gmapsInit from "../utils/gmaps";
import MarkerClusterer from "@google/markerclusterer";

const locations = [
  {
    position: {
      lat: 48.699961,
      lng: 2.41909
    }
  },
  {
    position: {
      lat: 48.7,
      lng: 2.425799999999981
    }
  }
];

export default {
  data() {
    return {
      errors: []
    };
  },
  async mounted() {
    try {
      const google = await gmapsInit(); // attend la résolution de la promesse dans gmaps.js
      const geocoder = new google.maps.Geocoder(); // fonction pour transformer texte en coordonnées et vice versa
      const map = new google.maps.Map(document.getElementById("mapgoogle"), {
        center: { lat: 48.70518, lng: 2.42771 },
        zoom: 14
      });

      const markerClickHandler = marker => {
        map.setZoom(18);
        map.setCenter(marker.getPosition());
      };

      const markers = locations.map(location => {
        const marker = new google.maps.Marker({ ...location, map });
        marker.addListener(`click`, () => markerClickHandler(marker));
        return marker;
      });

      // eslint-disable-next-line no-new
      new MarkerClusterer(map, markers, {
        imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};
</script>

<style>
#mapgoogle {
  margin-left: 5px;
  height: 100vh;
}
</style>