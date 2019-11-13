<template>
  <form action>
    <div class="level">
      <div class="level-left">
        <b-field label="Votre pseudo">
          <b-input v-model="rating.author" placeholder="Votre pseudo" required></b-input>
        </b-field>
      </div>
      <div class="level-right"></div>
      <b-rate v-model="rating.stars" size="default" custom-text="Votre note" icon="silverware-fork"></b-rate>
    </div>
    <b-field label="Commentaire">
      <b-input v-model="rating.comment" maxlength="200" type="textarea" required></b-input>
    </b-field>
    <button class="button is-primary" @click="sendNewRating" :disabled="isDisabled">Confirmer</button>
  </form>
</template>

<script>

export default {
  props: ["place-id"],
  data: function() {
    return {
      rating: {
        author: "",
        comment: "",
        stars: 0
      }
    };
  },
  methods: {
    // reset des valeurs des input
    restore() {
      this.rating.author = "";
      this.rating.comment = "";
      this.rating.stars = 0;
      // https://michaelnthiessen.com/force-re-render, permet de reloader le composant si une valeur du key change, donc reset du score (stars)
    },
    // Envoie le nouveau commentaire au store
    sendNewRating(e) {
      e.preventDefault();
      this.$store.commit("addRating", {
        placeIdToAdd: this.placeId,
        rating: this.rating
      });
    }
  },
  computed: {
    isDisabled() {
      return !this.rating.author || !this.rating.comment || !this.rating.stars;
    }
  }
};
</script>

