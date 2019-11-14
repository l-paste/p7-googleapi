<template>
  <b-navbar fixed-top class="navbar-background">
    <template slot="brand">
      <b-navbar-item>
        <img src="../assets/logo.png" alt="Lightweight UI components for Vue.js based on Bulma" />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
          <b-tooltip label="Une fois cette option activée, cliquez sur la carte pour ajouter un restaurant à cet emplacement."
            position="is-bottom">
          <checkbox></checkbox>
          </b-tooltip>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Checkbox from "./Checkbox";

export default {
    components: {
    Checkbox
  }
};
</script>

<style scoped>
.navbar-background {
  background-color: #ffece2;
}
</style>