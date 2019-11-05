<template>
  <section>
    <b-rate
      v-model="rate"
      :size="size"
      :disabled="isDisabled"
    ></b-rate>
  </section>
</template>

<script>
export default {
  props: ['rate', 'size', 'isDisabled']
};
</script>

<style>
</style>