<template>
  <!-- Élément de la liste de restaurant -->
  <article class="media" @click="openModal(restaurant.id)">
    <!-- On envoi l'ID pour l'ouverture de la modale -->
    <div class="media-content">
      <div class="content">
        <p>
          <span class="format-font is-size-4">{{ restaurant.restaurantName }}</span>
          <br />
          <small>{{ restaurant.address }}</small>
        </p>
      </div>
    </div>
    <div class="media-right">
      <!-- Intégration du composant pour la notation -->
      <stars :maxs="5" size="default" :rate="restaurant.avgRate" is-disabled></stars>
    </div>
  </article>
</template>

<script>
import Stars from "./Stars.vue";

export default {
  components: {
    Stars
  },
  props: ["restaurant"],
  methods: {
    // Au clic, on envoi l'ID du restaurant pour l'ouverture de la modale.
    openModal(id) {
      this.$store.commit("modalSetup", id);
    }
  }
};
</script>

<style scoped>
.media {
  padding: 5px;
  cursor: pointer;
  color: #191919;
}
</style>