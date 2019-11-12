<template>
  <section class="stars-rating">
    <b-rate
      v-model="rate"
      :size="size"
      :disabled="isDisabled"
      icon="silverware-fork"
    ></b-rate>
  </section>
</template>

<script>
export default {
  props: ['rate', 'size', 'isDisabled']
};
</script>

<style>
/* .stars-rating {
  
} */
</style>