import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/index.vue";
import Detail from "./views/detail/index.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/detail", component: Detail },
];
Vue.use(Router);
const router = new Router({
  routes,
});
export default router;
