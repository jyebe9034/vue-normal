import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addItem",
    name: "AddItem",
    component: () => import("../components/AddItem.vue"),
  },
  {
    path: "/itemDetail/:id",
    name: "ItemDetail",
    component: () => import("../components/ItemDetail"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
