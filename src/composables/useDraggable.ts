import { ref } from "vue";
import type { Ref } from "vue";

export default function useDraggable<T>() {
  const items: Ref<T[]> = ref([]);
  let draggedItem: Ref<T | null> = ref(null);

  const dragStart = (index: number): void => {
    draggedItem.value = items.value[index];
  };

  const drop = (index: number): void => {
    if (draggedItem.value !== null) {
      const draggedItemIndex = items.value.indexOf(draggedItem.value);
      if (draggedItemIndex !== -1) {
        // Remove the dragged item from its original location
        items.value.splice(draggedItemIndex, 1);
        // Insert the dragged item at the drop location
        items.value.splice(index, 0, draggedItem.value);
      }
    }
  };

  return { items, dragStart, drop };
}