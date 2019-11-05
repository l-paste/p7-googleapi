<template>
  <section>
    <b-field>
      <b-slider v-model="numbers" size="is-large" :min="1" :max="5" :step="1" @change="applyRange"></b-slider>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      numbers: [0, 5]
    };
  },
  methods: {
    applyRange(numbers) {
      this.$store.commit("setSortValue", numbers);
      this.$store.commit("selectVisibleRestaurant");
      this.$emit("input", numbers);
    }
  }
};
</script>

<style>

</style>