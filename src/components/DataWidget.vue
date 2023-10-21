<template>
  <div class="widget">
    <div class="data">{{ data }}</div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  data: Number,
});
</script>

<style scoped>
.widget {
  background-color: #18232c;
  padding: 1rem;
  border-radius: 10px;
  min-width: 10rem;
}
.data {
  font-size: larger;
  font-weight: bolder;
}
</style>
