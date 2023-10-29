import { ref } from "vue";
import type { Directive, DirectiveBinding, Ref } from "vue";

interface item {
  id: number;
  data: number;
}

const eventListeners: ((e: DragEvent) => void)[] = [];

export const DragAndDrop: Directive = {
  created(el: HTMLElement, binding, vnode) {
    el.setAttribute("draggable", "true");
  },
  mounted(el: HTMLElement, binding, vnode) {
    addEventListeners(binding, el);
  },
  updated(el: HTMLElement, binding, vnode) {
    removeEventListeners(el);
    addEventListeners(binding, el);
  },
  unmounted(el: HTMLElement) {
    removeEventListeners(el);
  },
};

function addEventListeners(binding: DirectiveBinding, el: HTMLElement) {
  const items: item[] = binding.value.items;
  const item: item = binding.value.item;
  const index: number = items.indexOf(item as item);
  let counter: Ref<number> = ref(0);

  var dragStartHandler = (e: DragEvent) => {
    dragStart(el, e, index, item as item);
  };

  var dragEndHandler = (e: DragEvent) => {
    dragEnd(el);
  };

  var dragEnterHandler = (e: DragEvent) => {
    dragEnter(el, counter);
  };

  var dragLeaveHandler = (e: DragEvent) => {
    dragLeave(el, counter);
  };

  var dropHandler = (e: DragEvent) => {
    drop(el, e, index, items);
  };

  el.addEventListener("dragstart", dragStartHandler);
  el.addEventListener("dragend", dragEndHandler);
  el.addEventListener("dragenter", dragEnterHandler);
  el.addEventListener("dragleave", dragLeaveHandler);
  el.addEventListener("drop", dropHandler);

  eventListeners.push(dragStartHandler);
  eventListeners.push(dragEndHandler);
  eventListeners.push(dragEnterHandler);
  eventListeners.push(dragLeaveHandler);
  eventListeners.push(dropHandler);
}

function removeEventListeners(el: HTMLElement) {
  eventListeners.forEach((eventListener) => {
    el.removeEventListener("dragstart", eventListener);
    el.removeEventListener("dragend", eventListener);
    el.removeEventListener("dragenter", eventListener);
    el.removeEventListener("dragleave", eventListener);
    el.removeEventListener("drop", eventListener);
  });
}

function drop(el: HTMLElement, e: DragEvent, index: number, items: item[]) {
  el.classList.remove("dropzone");
  const draggedItemIndex = Number(e.dataTransfer?.getData("text/plain"));
  const draggedItem = items[draggedItemIndex];
  items.splice(draggedItemIndex, 1);
  items.splice(index, 0, draggedItem);
}

function dragLeave(el: HTMLElement, counter: Ref<number>) {
  counter.value--;
  if (counter.value === 0) {
    el.classList.remove("dropzone");
  }
}

function dragEnter(el: HTMLElement, counter: Ref<number>) {
  counter.value++;
  if (counter.value === 1 && !el.classList.contains("dragging")) {
    el.classList.add("dropzone");
  }
}

function dragEnd(el: HTMLElement) {
  el.classList.remove("dragging");
}

function dragStart(el: HTMLElement, e: DragEvent, index: number, item: item) {
  el.classList.add("dragging");
  e.dataTransfer?.setData("text/plain", String(index));
}
