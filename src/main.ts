import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { DragAndDrop } from "./directives/DragAndDropDirective";

const app = createApp(App);

app.use(router);

app.directive("drag-and-drop", DragAndDrop);

app.mount("#app");
