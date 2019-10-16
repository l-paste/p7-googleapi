<template>
  <div id="app">
    <div class="columns">
      <div class="column is-three-quarters">
        <gmap></gmap>
      </div>
      <div class="column testscroll">
        <places-list></places-list>
      </div>
    </div>
  </div>
</template>

<script>
import Gmap from "./components/Gmap.vue";
import PlacesList from "./components/PlacesList.vue";

export default {
  name: "app",
  components: {
  'Gmap': Gmap,
  'places-list': PlacesList
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
  margin: 5px;
  height: 98vh;
}
</style>
