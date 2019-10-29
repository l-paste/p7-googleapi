<template>
  <div id="app">
    <navbar></navbar>
    <div class="columns">
      <gmap></gmap>
      <places-list></places-list>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Gmap from "./components/MapContainer.vue";
import PlacesList from "./components/PlacesList.vue";

export default {
  name: "app",
  components: {
  Navbar,
  Gmap,
  PlacesList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.testscroll {
  overflow: auto;
  height: 90vh;
}
</style>
