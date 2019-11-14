<template>
  <form action>
    <div class="modal-card" style="width: auto; margin-left: 10px; margin-right: 10px;">
      <header class="modal-card-head">
        <p class="modal-card-title"><b-icon icon="silverware"></b-icon> Ajouter un restaurant</p>
      </header>

      <section class="modal-card-body">
        <b-field label="Nom de l'établissement">
          <b-input v-model="newPlace.restaurantName" placeholder="Nom" required></b-input>
        </b-field>

        <b-field label="Adresse">
          <b-input v-model="newPlace.address" placeholder="Adresse" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Fermer</button>
        <button class="button is-primary" @click="sendnewPlace" :disabled="isDisabled">Confirmer</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
    props: ['place-lat', 'place-lng'],
    data: function() {
      return {
        newPlace: {
          restaurantName: '',
          address: '',
          lat: this.placeLat,
          long: this.placeLng
        }
      }
    },
    methods: {
      sendnewPlace(e) {
        e.preventDefault();
        // Ajout du nouveau restaurant au Store
        this.$store.commit('addPlace', {
          newPlace: this.newPlace
        });
        // Ferme le composant addPlace, évite de pouvoir envoyer plusieurs fois les mêmes données
        
      }
    },
    computed: {
    isDisabled() {
      return !this.newPlace.restaurantName || !this.newPlace.address;
    }
  } 
};
</script>

<style>
</style>