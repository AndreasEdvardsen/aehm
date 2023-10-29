<template>
  <div class="dashboard drop-zone">
    <template v-for="(widget, index) in widgets">
      <DataWidget
        v-if="widget.type == 'numerical'"
        class="widget-small"
        :label="widget.label"
        :data="widget.data"
        @dragover.prevent
        v-drag-and-drop="{ items: widgets, item: widget }" />
      <RecentlyVisitedWidget
        v-else-if="widget.type == 'recent-pages'"
        class="widget-large"
        @dragover.prevent
        v-drag-and-drop="{ items: widgets, item: widget }" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref, onMounted } from "vue";
import DataWidget from "../components/Widgets/Numerical.vue";
import RecentlyVisitedWidget from "../components/Widgets/RecentlyVisited.vue";

interface Widget {
  id: string;
  positionId: string;
  label: string;
  data: number;
  type: string;
}

const pb = new PocketBase("https://pocketbase.aehm.cloud");
const widgets = ref<Widget[]>([]);

pb.collection("test_widget_positions")
  .getFullList({
    sort: "position",
    expand: "widget",
  })
  .then(async (items) => {
    widgets.value = items.map((item) => ({
      id: item.expand?.widget.id,
      positionId: item.id,
      label: item.expand?.widget.label,
      data: item.expand?.widget.data,
      type: item.expand?.widget.type,
    }));
  });

import { watch } from "vue";

watch(
  widgets,
  (newVal, oldVal) => {
    if (oldVal.length < 1 || newVal.length < 1) return;
    //loop trough widgets in interface, and update db positions based on index
    newVal.forEach((widget, index) => {
      pb.collection("test_widget_positions")
        .update(widget.positionId, { widged: widget, position: index })
        .catch((error) => console.error(error));
    });
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";
.dashboard {
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  @media screen and (max-width: $x-small) {
    grid-template-columns: 1fr;
  }
}
.dragging {
  opacity: 0.3;
}
.dropzone {
  box-shadow: 0 0 0 2px $primary;
  transition: border 0.2s ease-in-out;
}
</style>
