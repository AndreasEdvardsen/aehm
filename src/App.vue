<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header class="container">
    <NavBar />
  </header>
  <main class="container c-bod">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding-bottom: 0;
}
main {
  padding-top: 0;
}
</style>
