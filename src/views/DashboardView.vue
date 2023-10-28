<template>
  <div class="dashboard">
    <template v-for="(widget, index) in widgets" :key="widget.id">
      <DataWidget
        v-if="widget.type == 'numerical'"
        class="widget-small"
        draggable="true"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)"
        :label="widget.label"
        :data="widget.data" />
      <RecentlyVisitedWidget
        v-else-if="widget.type == 'recent-pages'"
        class="widget-large"
        draggable="true"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref, onMounted } from "vue";
import useDraggable from "../composables/useDraggable";
import DataWidget from "../components/Widgets/Numerical.vue";
import RecentlyVisitedWidget from "../components/Widgets/RecentlyVisited.vue";

interface Widget {
  id: string;
  positionId: string;
  label: string;
  data: number;
  type: string;
}
const { items: widgets, dragStart, drop } = useDraggable<Widget>();

const pb = new PocketBase("https://pocketbase.aehm.cloud");

pb.collection("test_widget_positions")
  .getFullList({
    sort: "position",
    expand: "widget",
  })
  .then(async (items) => {
    console.log(items);

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
</style>
