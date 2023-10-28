<template>
  <article>
    <h3>Recently Visited:</h3>
    <router-link
      v-for="(page, index) in recentlyVisited"
      :key="index"
      :to="page"
      >{{ page }}</router-link
    >
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const recentlyVisited = ref(
  filterPages(JSON.parse(localStorage.getItem("visitedPages") || "[]"))
);
function filterPages(unfilteredPages: string[]) {
  return unfilteredPages
    .filter((page: string) => {
      return useRouter().hasRoute(page);
    })
    .reverse();
}
</script>

<style scoped lang="scss">
@import "../../assets/variables.scss";
article {
  h3 {
    margin: $spacing;
  }
  a {
    margin: 0;
    padding: $spacing;
    border-top: 1px solid $bg;
  }
  a:hover {
    background-color: $bg;
    &:last-child {
      border-radius: 0 0 $border-radius $border-radius;
    }
  }
}
</style>
