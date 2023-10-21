<script setup lang="ts">
defineProps<{
  tool: any;
  image: string;
}>();
</script>

<template>
  <article class="tool-card">
    <header>
      <h2>{{ tool.name }}</h2>
      <a :href="tool.url"><img :src="image" :href="tool.url" /></a>
    </header>
    <p>{{ tool.description }}</p>
  </article>
</template>

<style scoped>
.tool-card:hover {
  transform: scale(1.01);
  box-shadow: 0px 0px 10px #1ab2e6;
  border: #1ab2e6 solid 1px;
  transition: all 0.2s ease-in-out;
}
</style>
