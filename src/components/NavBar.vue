<template>
  <nav>
    <ul>
      <li>
        <strong>AEhm... Hello! &#x1F431;</strong>
      </li>
    </ul>
    <ul>
      <li>
        <a href="/" :class="{ active: currentPage === '/' }">Tools</a>
      </li>
      <li>
        <a href="/about" :class="{ active: currentPage === '/about' }">About</a>
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
.active {
  color: white;
}
</style>
