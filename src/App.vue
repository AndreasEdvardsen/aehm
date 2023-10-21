<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header class="fluid">
    <NavBar />
  </header>
  <main class="">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 0 2rem;
}
main {
  padding: 0 2rem;
}
</style>
