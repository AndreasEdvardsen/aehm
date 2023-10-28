<template>
  <article class="widget">
    <h1 class="data">{{ data }}</h1>
    <h3 class="label">{{ label }}</h3>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  data: Number,
});
</script>

<style scoped lang="scss">
article {
  padding: 1rem;
  h1 {
    margin: 0;
  }
  h3 {
    margin: 0;
    font-weight: lighter;
    font-style: italic;
    opacity: 0.5;
  }
}
</style>
