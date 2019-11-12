<template>
  <section class="rate-slider">
    <b-field>
      <b-slider 
        v-model="numbers"
        :min="1"
        :max="5"
        :step="1"
        @change="applyRange"
        type="is-danger"
        :tooltip="false"
        ticks
        rounded
      >
        <template v-for="val of [1, 2, 3, 4, 5]">
          <b-slider-tick :value="val" :key="`tick-${val}`"><small>{{ val }}</small></b-slider-tick>
        </template>
      </b-slider>
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
.rate-slider {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
}
</style>