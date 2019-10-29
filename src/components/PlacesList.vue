<template>
  <div class="column testscroll">
    <div v-for="(restaurant, index) in getRestaurantList" :key="restaurant.restaurantName">
      <place-detail :restaurant="restaurant" :index="index"></place-detail>
    </div>
  </div>
</template>


<script>
import PlaceDetail from "./PlaceDetail.vue";

export default {
components: {
      PlaceDetail,
    },
computed: {
     // Getters du Store qui retourne visibleRestaurant.
     getRestaurantList() {
       return _.orderBy(this.$store.getters.getRestaurantList, 'avgRating', 'desc');
     }
   }
};
</script>

<style scoped>
</style>