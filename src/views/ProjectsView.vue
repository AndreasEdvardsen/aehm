<template>
  <div class="dashboard">
    <Card v-for="project in projects" class="widget-small">
      <template #header>
        <h2>{{ project.name }}</h2>
        <img :src="getImageUrl(project)" />
      </template>
      <template #content>
        <p>{{ project.description }}</p>
        <button
          v-if="project.page"
          @click="$router.push(project.page)"
          class="outline">
          Go To
        </button>
        <a v-else-if="project.url" :href="project.url">
          <button class="outline">Go To</button>
        </a>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref } from "vue";
import Card from "../components/Card.vue";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
const projects = ref();

pb.collection("projects")
  .getFullList({
    sort: "-created",
  })
  .then((data) => {
    projects.value = data;
  });

//function that get image urls from filename
function getImageUrl(tool: any) {
  var url = pb.files.getUrl(tool, tool.image);
  return url;
}
</script>

<style scoped></style>
