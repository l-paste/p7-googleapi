<template>
  <form action>
    <div class="modal-card" style="width: auto; margin-left: 10px; margin-right: 10px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Ajouter un restaurant</p>
      </header>

      <section class="modal-card-body">
        <b-field label="Nom">
          <b-input v-model="newRestaurant.restaurantName" placeholder="Nom du restaurant" required></b-input>
        </b-field>

        <b-field label="Adresse">
          <b-input v-model="newRestaurant.address" placeholder="Adresse du restaurant" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Fermer</button>
        <button class="button is-primary" @click="sendNewRestaurant" :disabled="isDisabled">Confirmer</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
    props: ['place-lat', 'place-lng'],
    data: function() {
      return {
        newRestaurant: {
          restaurantName: '',
          address: '',
          lat: this.placeLat,
          long: this.placeLng
        }
      }
    },
    methods: {
      sendNewRestaurant(e) {
        e.preventDefault();
        // Ajout du nouveau restaurant au Store
        this.$store.commit('addRestaurant', {
          newRestaurant: this.newRestaurant
        });
        // Ferme le composant AddRestaurant, évite de pouvoir envoyer plusieurs fois les mêmes données
        this.$parent.close()
        
      }
    },
    computed: {
    isDisabled() {
      return !this.newRestaurant.restaurantName || !this.newRestaurant.address;
    }
  } 
};
</script>

<style>
</style>