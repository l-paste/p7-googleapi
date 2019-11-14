<template>
  <div id="app">
    <navbar></navbar>
    <div class="columns is-gapless">
      <map-container></map-container>
      <places-container></places-container>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import MapContainer from "./components/MapContainer.vue";
import PlacesContainer from "./components/PlacesContainer.vue";
// import Buefy from "./style.scss";

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
  background-color: #FFECE2;
} 

.ketchup {
  color: #F46363;
}
</style>

<style lang="scss">
@import "@/scss/style.scss";
</style>