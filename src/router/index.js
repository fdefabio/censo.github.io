import { createRouter, createWebHashHistory } from "vue-router";
import FormContent from "../components/FormContent.vue";
import Tabla from "../components/Tabla.vue";
import Registrar from "../views/Registrar.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  {
    path: "/form",
    name: "Form",
    component: FormContent,
  },

  {
    path: "/registrar",
    name: "Registrar",
    component: Registrar,
  },

  {
    path: "/tabla",
    name: "Tabla",
    component: Tabla,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
