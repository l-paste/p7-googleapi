<template>
<!-- Composant Navbar de Buefy -->
  <b-navbar fixed-top class="navbar-background">
    <template slot="brand">
      <b-navbar-item>
        <img src="../assets/logo.png" alt="Trouvez rapidement où casser la croûte avec Casse-croûte !" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <!-- Intégration du composant switch -->
      <b-navbar-item tag="div" class="switch-margin">
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
.switch-margin {
  margin-top: 5px;
}
</style>