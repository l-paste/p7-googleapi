<template>
  <b-navbar fixed-top class="navbar-background">
    <template slot="brand">
      <b-navbar-item>
        <img src="../assets/logo.png" alt="Lightweight UI components for Vue.js based on Bulma" />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
          <add-place-switch></add-place-switch>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import AddPlaceSwitch from "./AddPlaceSwitch";

export default {
    components: {
    AddPlaceSwitch
  }
};
</script>

<style scoped>
.navbar-background {
  background-color: #ffece2;
}
</style>