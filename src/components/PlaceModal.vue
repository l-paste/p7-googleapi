<template>
  <div class="modal-card" style="width: auto; margin-left: 10px; margin-right: 10px;">
    <header class="modal-card-head">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <!-- Intégration de Google Street View avec les coordonnées du restaurant -->
            <img
              :src="'https://maps.googleapis.com/maps/api/streetview?size=128x128&location='+getPlace.lat+','+getPlace.long+'&fov=80&heading=70&pitch=0&key=AIzaSyDWjR8Rt6VNWdTjznzLanMbGWALoewrLeo'"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="media-content">
          <p
            class="modal-card-title format-font title is-3 is-size-4-mobile"
          >{{ getPlace.restaurantName}}</p>
          <p class="subtitle is-6">{{ getPlace.address }}</p>
          <p>
            <stars :maxs="5" size="default" :rate="getPlace.avgRate" is-disabled></stars>
          </p>
        </div>
      </div>
    </header>
    <section class="modal-card-body">
      <!-- Intégration du formulaire d'ajout d'avis -->
      <b-collapse
        class="space-bottom"
        :open.sync="isCollapseOpen"
        position="is-bottom"
        aria-id="addRatingForm"
      >
        <a slot="trigger" slot-scope="props" aria-controls="addRatingForm">
          <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
          {{ !props.open ? 'Ajouter un commentaire' : 'Fermer' }}
        </a>
        <add-rating-form :place-id="getPlace.id" @close-collapse="closeCollapse"></add-rating-form>
      </b-collapse>
      <!-- Boucle pour récupérer les avis -->
      <article class="media" v-for="(rating,index) of getPlace.ratings" :key="`place-${index}`">
        <div class="media-content">
          <div class="content">
            <p>
              <span class="is-hidden-tablet">
                <strong>{{ rating.author }}</strong>
                <stars
                  class="is-hidden-tablet is-inline"
                  :maxs="5"
                  size="default"
                  :rate="rating.stars"
                  is-disabled
                ></stars>
              </span>
              <span class="is-hidden-mobile">
                <strong>{{ rating.author }}</strong>
                <br />
              </span>
              {{ rating.comment }}
            </p>
          </div>
        </div>
        <div class="media-right is-hidden-mobile">
          <stars :maxs="5" size="default" :rate="rating.stars" is-disabled></stars>
        </div>
      </article>
    </section>
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
  data() {
    return {
      isCollapseOpen: false
    };
  },
  props: ["place-id"],
  methods: {
    // Gestion de la fermeture du collapse.
    closeCollapse() {
      this.isCollapseOpen = false;
    }
  },
  computed: {
    // On récupère le restaurant correspondant à l'ID via le store.
    getPlace() {
      // Pour afficher les données du restaurant en fonction de l'id de celui-ci
      return this.$store.getters.getPlaceById(this.placeId);
    }
  },
  // On reset la modale à la fermeture, via mutation du store.
  beforeDestroy() {
    this.$store.commit("resetModal");
  }
};
</script>

<style scoped>
.space-bottom {
  margin-bottom: 1em;
}
</style>