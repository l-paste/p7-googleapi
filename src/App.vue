<template>
  <div id="app">
    <!-- Navbar -->
    <navbar></navbar>
    <div class="columns is-gapless">
      <!-- Colonne de gauche : carte -->
      <map-container></map-container>
      <!-- Colonne de droite : liste des restaurants -->
      <places-container></places-container>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import MapContainer from "./components/MapContainer.vue";
import PlacesContainer from "./components/PlacesContainer.vue";

export default {
  name: "app",
  components: {
    Navbar,
    MapContainer,
    PlacesContainer
  }
};
</script>

<style>
@font-face {
  font-family: "Format 1452";
  src: url("./assets/fonts/Format_1452.eot") format("embedded-opentype"),
    url("./assets/fonts/Format_1452.woff") format("woff"),
    url("./assets/fonts/Format_1452.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

.format-font {
  font-family: "Format 1452";
  text-transform: uppercase;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191919;
}

.columns {
  background-color: #ffece2;
}
</style>

<style lang="scss">
@import "@/scss/style.scss";
</style>