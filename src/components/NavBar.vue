<template>
  <nav>
    <ul>
      <li>
        <strong>AEhm... Hello! &#x1F431;</strong>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="/">Tools</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
//Get current page
const currentPage = ref(window.location.pathname);
</script>

<style scoped>
/* Styles for active links */
.router-link-active {
  color: white;
}
</style>
