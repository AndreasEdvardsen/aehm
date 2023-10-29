import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/ProjectsView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "projects",
      component: HomeView,
      alias: "/projects",
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("../views/ToolsView.vue"),
    },
    {
      path: `/dashboard`,
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
  ],
});

//Add visited pages to local storage
router.afterEach((to, from) => {
  if (!to.name) return;
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages") || "[]");
  if (!visitedPages.includes(to.name)) {
    visitedPages.push(to.name);
    if (visitedPages.length > 5) {
      visitedPages.shift();
    }
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
  } else {
    const index = visitedPages.indexOf(to.name);
    visitedPages.splice(index, 1);
    visitedPages.push(to.name);
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
  }
});

export default router;
