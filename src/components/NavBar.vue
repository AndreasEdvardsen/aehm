<template>
  <nav>
    <h2>AEhm... Hello! &#x1F431;</h2>
    <div class="links">
      <router-link to="/">My Projects</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/tools">Tools I Use</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
//Get current page
const currentPage = ref(window.location.pathname);
</script>

<style scoped>
/* Styles for active links */
</style>
