<template>
  <div>
    <div v-for="place of jsonPlaces" :key="place.id" class="card">
      <!-- Image StreetView -->
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            :src="'https://maps.googleapis.com/maps/api/streetview?size=400x400&location='+place.lat+','+place.long+'&fov=80&heading=70&pitch=0&key=AIzaSyDWjR8Rt6VNWdTjznzLanMbGWALoewrLeo'"
            alt="Photo Google Street View"
          />
        </figure>
      </div>

      <div class="card-content">
        <!-- Titres -->
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ place.restaurantName }}</p>
            <p class="subtitle is-6">{{ place.address }}</p>
          </div>
        </div>

        <!-- Contenu -->
        <div class="content">
          <H4>Commentaires :</H4>
          <ul>
            <li v-for="rating of place.ratings">
              <p>{{ rating.comment }}</p>
              <b-rate 
            v-model="rating.stars"
            :icon-pack="packs"
            :icon="icons" 
            :max="maxs" 
            :size="sizes"
            :show-score="score"
            :custom-text="custom"
            :rtl="isRtl"
            :spaced="isSpaced"
            :disabled="isDisabled">
        </b-rate>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: 4.6,
      maxs: 5,
      sizes: "",
      packs: "mdi",
      icons: "star",
      score: false,
      custom: "",
      isRtl: false,
      isSpaced: false,
      isDisabled: true
    };
  },

  created() {
    this.$store.dispatch("getData"); // on récupère notre jSon placé dans le store

    for (const place of this.jsonPlaces) {
      const notes = [];
      place.ratings.forEach(element => {
        notes.push(element.stars);
      });
      const calculAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      place.moyenneNotes = calculAvg(notes);
      console.log(place.moyenneNotes);
    }
  },

  computed: {
    jsonPlaces() {
      return this.$store.state.jsonPlaces;
    }
    // avgCalcul() {
    //   for (const place of this.jsonPlaces) {
    //   let notes = [];
    //   place.ratings.forEach(element => {
    //   notes.push(element.stars);
    //   });
    //   const calculAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    //   return place.moyenneNotes = calculAvg(notes);
    // }
    // }
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
  margin-right: 10px;
}
</style>