<template>
  <b-field>
    <b-switch class="switch-tag tag is-large" size="is-medium" type="is-danger" v-model="isSwitched">
      <b-icon icon="silverware"></b-icon>
      <span>Ajouter un restaurant</span>
    </b-switch>
  </b-field>
</template>

<script>
// Switch qui permet d'activer l'ajout de restaurant.
export default {
  data: function() {
    return {
      isSwitched: false // Désactivé par défaut.
    };
  },
  watch: {
    // Surveille si le switch est activé.
    isSwitched() {
      // On change l'état du switch dans le store pour récupérer cet état dans un autre composant.
      this.$store.commit("setAddPlaceMode", this.isSwitched); 
      // Si le switch est activé, on affiche le toast pour donner les instructions à l'utilisateur.
      if (this.isSwitched === true) {
        this.$buefy.toast.open({
          duration: 4000,
          message: `Cliquez à l'endroit de la carte où vous souhaitez ajouter le restaurant.`,
          position: "is-bottom",
          type: "is-warning"
        });
      }
    }
  }
};
</script>

<style scoped>
.switch-tag:hover {
  background-color: rgb(167, 118, 80);
}
</style>