<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref } from "vue";

const pb = new PocketBase("http://pocketbase.aehm.cloud");
const tools = ref();

pb.collection("tools")
  .getFullList({
    sort: "-created",
  })
  .then((data) => {
    tools.value = data;
  });

//function that get image urls from filename
function getImageUrl(project: any) {
  var url = pb.files.getUrl(project, project.image);
  return url;
}
</script>

<template>
  <div class="row">
    <div v-for="project in tools" class="col-md-6">
      <article class="tool-card">
        <header>
          <h2>{{ project.name }}</h2>
          <img
            :src="getImageUrl(project)"
            :href="project.url"
            class="project-thumbnail" />
        </header>
        <p>{{ project.description }}</p>
        <a :href="project.url" target="_blank" role="button" class="outline"
          >Go To</a
        >
      </article>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  min-width: 20rem;
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>
