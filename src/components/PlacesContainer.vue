<template>
  <div class="column is-marginless places-list">
    <rating-slider></rating-slider>
    <div
      v-for="(restaurant, index) in getSelectedPlacesList"
      :key="`place-${index}`"
      :class="{even: index % 2, odd: !(index % 2)}"
    >
      <places-list :restaurant="restaurant" :index="index"></places-list>
    </div>

    <b-modal
      :active.sync="isPlaceModalActive"
      :width="640" scroll="keep"
    >
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
      }
    },
  computed: {
    // Getters du Store qui retourne selectedPlaces.
    getSelectedPlacesList() {
      // eslint-disable-next-line
      return _.orderBy(
        this.$store.getters.getSelectedPlacesList,
        "avgRate",
        "desc"
      );
    },
    getModalId() {
      return this.$store.getters.getModalId;
    }
  },
  watch: {
    getModalId() {
      this.modalId = this.$store.getters.getModalId;
      this.isPlaceModalActive = this.$store.getters.getModalState;
    }
  }
};
</script>

<style>
.even {
  background: #F46363;
}
.odd {
  background: #DFA47C;
}
.odd:hover {
  background-color: #A87148;
}
.even:hover {
  background: #D63B3A;
}
.places-list {
  height: calc(100vh - 3.25rem);
  overflow: scroll;
}
</style>