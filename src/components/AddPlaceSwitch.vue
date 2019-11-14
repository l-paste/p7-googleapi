<template>
  <b-field>
    <b-switch size="is-medium" type="is-danger" v-model="isSwitched">
      <span class="icon">
        <i class="mdi mdi-silverware"></i>
      </span>

      <span>Ajouter un restaurant</span>
    </b-switch>
  </b-field>
</template>

<script>
export default {
  data: function() {
    return {
      isSwitched: false
    };
  },
  watch: {
    isSwitched() {
      this.$store.commit("setAddPlaceMode", this.isSwitched);
      if (this.isSwitched === true) {
        this.$buefy.toast.open({
          duration: 4000,
          message: `Cliquez sur un emplacement pour y ajouter un restaurant.`,
          position: "is-bottom",
          type: "is-warning"
        });
      }
    }
  }
};
</script>

<style scoped>
</style>