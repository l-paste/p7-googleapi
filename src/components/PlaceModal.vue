<template>
<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img :src="'https://maps.googleapis.com/maps/api/streetview?size=128x128&location='+getPlace.lat+','+getPlace.long+'&fov=80&heading=70&pitch=0&key=AIzaSyDWjR8Rt6VNWdTjznzLanMbGWALoewrLeo'" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-3 is-size-4-mobile format-font beige">{{ getPlace.restaurantName}}</p>
        <p class="subtitle is-6 beige">{{ getPlace.address }}</p>
        <p><stars :maxs="5" size="default" :rate="getPlace.avgRate" is-disabled></stars></p>
      </div>
    </div>
    <div class="content">
    <b-collapse :open="false" position="is-bottom" aria-id="addRatingForm">
          <a slot="trigger" slot-scope="props" aria-controls="addRatingForm">
            <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
            {{ !props.open ? 'Ajouter un commentaire' : 'Fermer' }}
          </a>
          <add-rating-form :place-id="getPlace.id"></add-rating-form>
        </b-collapse>
  <article class="media" v-for="(rating,index) of getPlace.ratings" :key="index">
  <div class="media-content">
    <div class="content">

        <p><strong>{{ rating.author }}</strong><br>
          
          {{ rating.comment }}</p>
    </div>
  </div>
  <div class="media-right">
    <stars :maxs="5" size="default" :rate="rating.stars" is-disabled></stars>
  </div>
</article>
    </div>
  </div>
</div>
</template>

<script>
import Stars from "./Stars";
import AddRatingForm from "./AddRatingForm";

export default {
  components: {
    Stars,
    AddRatingForm
  },
  props: ["place-id"],
  computed: {
    getPlace() {
      // Pour afficher les données du restaurant en fonction de l'id de celui-ci
      return this.$store.getters.getPlaceById(this.placeId);
    }
  },
  beforeDestroy() {
      this.$store.commit("resetModal");
  }
};
</script>

<style scoped>
.card {
  background-color: #eef7d4;
}
/* 

.media {
  background: #d61415;
} 
.media-content {
  padding: 5px;
}

.beige {
  color:#ecfac4;
} */
</style>