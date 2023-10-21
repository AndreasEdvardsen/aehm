<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref } from "vue";
import ToolCard from "../components/ToolCard.vue";

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

<template>
  <div class="row">
    <div v-for="tool in tools" class="col-md-4">
      <ToolCard :image="getImageUrl(tool)" :tool="tool" />
    </div>
  </div>
</template>

<style scoped></style>
