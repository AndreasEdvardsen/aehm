<template>
  <div class="dashboard">
    <div
      v-for="(widget, index) in widgets"
      :key="widget.id"
      draggable="true"
      @dragstart="dragStart(index)"
      @dragover.prevent
      @drop="drop(index)">
      <DataWidget :label="widget.label" :data="widget.data"></DataWidget>
    </div>
  </div>
</template>

<script setup lang="ts">
import PocketBase from "pocketbase";
import { ref } from "vue";
import type { Ref } from "vue";
import useDraggable from "../composables/useDraggable";
import DataWidget from "../components/DataWidget.vue";

interface Widget {
  id: string;
  positionId: string;
  label: string;
  data: number;
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

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard > * {
  flex-grow: 1;
}
</style>
