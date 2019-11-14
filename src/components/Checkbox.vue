<template>
  <b-field>
    <b-checkbox-button v-model="checkbox" native-value="false" type="is-danger" @change.native="setAddPlaceMode">
      <b-icon icon="close"></b-icon>
      <span>Ajouter un restaurant</span>
    </b-checkbox-button>
  </b-field>
</template>

<script>
export default {
    data: function() {
    return {
      checkbox: Boolean
    };
  },
  methods: {
      setAddPlaceMode() {

        if (this.checkbox === true) {
        console.log(this.checkbox);
        this.$store.commit("setAddPlaceMode", this.checkbox);
        }
        else {
        console.log(this.checkbox);
        this.$store.commit("setAddPlaceMode", this.checkbox);
        }
      }
  }
};
</script>