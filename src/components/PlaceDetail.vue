<template>
  <div class="card-place">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="'https://maps.googleapis.com/maps/api/streetview?size=400x400&location='+restaurant.lat+','+restaurant.long+'&fov=80&heading=70&pitch=0&key=AIzaSyDWjR8Rt6VNWdTjznzLanMbGWALoewrLeo'"
          alt="Photo Google Street View"
        />
      </figure>
    </div>
    <div class="card-content">
      <!-- Titres -->
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ restaurant.restaurantName }}</p>
          <p class="subtitle is-6">{{ restaurant.address }}</p>
          <b-rate v-model="restaurant.avgRating"></b-rate>
        </div>
      </div>

      <!-- Contenu -->
      <div class="content">
        <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
          <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
            <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
            {{ !props.open ? 'Voir les commentaires' : 'Masquer les commentaires' }}
          </a>
          <ul>
            <li v-for="rating of restaurant.ratings" :key="rating.author">
              <p>{{ rating.comment }}</p>
              <stars :maxs="5" size="is-small" :rate="rating.stars" is-disabled></stars>
              <!-- <b-rate v-model="rating.stars"></b-rate> -->
            </li>
          </ul>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceModal from "./PlaceModal.vue";
import Stars from "./Stars.vue";

export default {
  components: {
    PlaceModal,
    Stars
  },
  props: ["restaurant"]
};
</script>

<style scoped>
.card-place {
  border: 1px dashed green;
}
</style>