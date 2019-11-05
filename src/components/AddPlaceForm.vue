<template>
  <form action>
    <div class="modal-card" style="width: auto">
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
        <button class="button is-primary" @click="checkForm">Confirmer</button>
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
      checkForm: function(e) {
        // Contrôle les champs required du formulaire
        if (this.newRestaurant.restaurantName && this.newRestaurant.address) {
          this.sendNewRestaurant();
        } else {
          window.alert('Merci de renseigner le formulaire au complet');
        }
        e.preventDefault();
      },
      sendNewRestaurant() {
        // Ajout du nouveau restaurant au Store
        this.$store.commit('addRestaurant', {
          newRestaurant: this.newRestaurant
        });
        // Ferme le composant AddRestaurant, évite de pouvoir envoyer plusieurs fois les mêmes données
        this.$parent.close()
      },
      restore() {
        this.placeToAdd.placeName = '';
        this.placeToAdd.placeAddress = '';
      },
    }
    
};
</script>

<style>
</style>