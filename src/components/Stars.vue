<template>
  <!-- Composant Buefy permettant d'intégrer des étoiles pour la notation -->
  <section class="stars-rating">
    <b-rate v-model="rate" :size="size" :disabled="isDisabled" icon="silverware-fork"></b-rate>
  </section>
</template>

<script>
export default {
  props: ["rate", "size", "isDisabled"]
};
</script>

<style>
.stars-rating {
  text-shadow: 0px 0px 5px black;
}
</style>