<template>
  <div class="column is-marginless places-list">
    <!-- Intégration du slider pour trier par note -->
    <rating-slider></rating-slider>
    <!-- Boucle pour lister les restaurants -->
    <div
      v-for="(restaurant, index) in getSelectedPlacesList"
      :key="`place-${index}`"
      :class="{even: index % 2, odd: !(index % 2)}"
    >
      <!-- Composant d'élément de la liste -->
      <places-list :restaurant="restaurant" :index="index"></places-list>
    </div>

    <!-- Modale pour la fiche restaurant -->
    <b-modal :active.sync="isPlaceModalActive" :width="640" scroll="keep">
      <place-modal :place-id="modalId"></place-modal>
    </b-modal>
  </div>
</template>


<script>
import RatingSlider from "./RatingSlider.vue";
import PlacesList from "./PlacesList.vue";
import PlaceModal from "./PlaceModal";

export default {
  components: {
    PlacesList,
    RatingSlider,
    PlaceModal
  },
  data: function() {
    return {
      isPlaceModalActive: false,
      modalId: null
    };
  },
  computed: {
    // Récupération des restaurants visibles.
    getSelectedPlacesList() {
      // eslint-disable-next-line
      return _.orderBy(
        // Tri par note via Lodash
        this.$store.getters.getSelectedPlacesList,
        "avgRate",
        "desc"
      );
    },
    // Récupération de l'ID du restaurant cliqué, pour ouvrir la modale.
    getModalId() {
      return this.$store.getters.getModalId;
    }
  },
  watch: {
    // À chaque changement de l'ID dans le store, on récupère cette dernière et on active la modale.
    getModalId() {
      this.modalId = this.$store.getters.getModalId;
      this.isPlaceModalActive = this.$store.getters.getModalState;
    }
  }
};
</script>

<style>
.even {
  background: #f46363;
}
.odd {
  background: #dfa47c;
}
.odd:hover {
  background-color: #ddb499;
}
.even:hover {
  background: #d63b3a;
}
.places-list {
  height: calc(100vh - 3.25rem);
  overflow: scroll;
}
</style>