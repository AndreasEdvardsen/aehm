<template>
  <div class="dashboard">
    <div v-for="tool in tools">
      <Card>
        <template #header>
          <h2>{{ tool.name }}</h2>
          <img :src="getImageUrl(tool)" />
        </template>
        <template #content>
          <p>{{ tool.description }}</p>
          <a :href="tool.url"><button class="outline">Go To</button></a>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref } from "vue";
import Card from "../components/Card.vue";

const pb = new PocketBase("https://pocketbase.aehm.cloud");
const tools = ref();

pb.collection("tools")
  .getFullList({
    sort: "-created",
  })
  .then((data) => {
    tools.value = data;
  });

//function that get image urls from filename
function getImageUrl(tool: any) {
  var url = pb.files.getUrl(tool, tool.image);
  return url;
}
</script>

<style scoped></style>
