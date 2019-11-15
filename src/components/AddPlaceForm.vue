<template>
  <form action>
    <div class="modal-card" style="width: auto; margin-left: 10px; margin-right: 10px;">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <b-icon icon="silverware"></b-icon>Ajouter un restaurant
        </p>
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
// Formulaire d'ajout de restaurant à la carte.
export default {
  // On récupère la lattitude et longitude de l'endroit cliqué, communiquées en props.
  props: ["place-lat", "place-lng"],

  data: function() {
    return {
      // Objet pour stocker le nouveau restaurant.
      newPlace: {
        restaurantName: "",
        address: "",
        lat: this.placeLat,
        long: this.placeLng,
        google: this.google
      }
    };
  },
  methods: {
    // À la confirmation du formulaire, on lance la fonction d'ajout de restaurant du store.
    sendnewPlace(e) {
      e.preventDefault(); // On empêche la page de reload après confirmation du formulaire.
      this.$store.commit("addPlace", { // Ajout du nouveau restaurant au Store
        newPlace: this.newPlace
      });
    }
  },
  computed: {
    // On bloque le bouton d'envoi si les champs ne sont pas remplis.
    isDisabled() {
      return !this.newPlace.restaurantName || !this.newPlace.address;
    }
  },
  mounted() {
    // Geocoding de l'endroit cliqué pour faire apparaître l'adresse dans le champ correspondant. Tout de même modifiable en cas d'erreur.
    const geocoder = new this.google.maps.Geocoder();
    const latLng = { lat: this.placeLat, lng: this.placeLng }; // On formate correctement les coordonnées.
    geocoder.geocode({ location: latLng }, (results, status) => {
      // En cas d'erreur, on met un placeholder par défaut et on récupère l'erreur en console.
      if (status !== `OK` || !results[0]) { 
        /* eslint-disable no-console */
        console.log("Erreur de geocoding : " + status);
        this.newPlace.address = "Adresse";
        // Si tout est OK, on stock l'adresse la plus pertinente (première entrée de l'array) dans le champ après avoir coupé un morceau inutile.
      } else {
        const geocodedAddress = results[0].formatted_address.replace(
          ", France",
          ""
        );
        this.newPlace.address = geocodedAddress;
      }
    });
  }
};
</script>