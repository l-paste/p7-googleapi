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
// Formulaire d'ajout de commentaire sur la fiche d'un restaurant.
export default {
  props: ["place-id"],
  data: function() {
    return {
      // Notre objet contenant le commentaire.
      rating: {
        author: "",
        comment: "",
        stars: 0
      }
    };
  },
  methods: {
    // À la confirmation du formulaire, on fait passer le commentaire sur la fonction addRating du store.
    sendNewRating(e) {
      e.preventDefault(); // On empêche la page de reload après confirmation du formulaire.
      this.$store.commit("addRating", {
        placeIdToAdd: this.placeId,
        rating: this.rating
      });
      // On ferme le collapse et on vide les champs après envoi.
      this.$emit('close-collapse')
      this.rating.author = "";
      this.rating.comment = "";
      this.rating.stars = 0
    }
  },
  computed: {
    // On désactive le bouton d'envoi tant que tous les champs ne sont pas remplis.
    isDisabled() {
      return !this.rating.author || !this.rating.comment || !this.rating.stars;
    }
  }
};
</script>