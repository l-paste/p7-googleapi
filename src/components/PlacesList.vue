<template>
<article class="media" @click="openModal(restaurant.id)">
  <div class="media-content">
    <div class="content">
      <p>
        <span class="format-font is-size-4">{{ restaurant.restaurantName }}</span>
        <br>
        <small>{{ restaurant.address }}</small>
      </p>
    </div>
  </div>
  <div class="media-right">
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