import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home/index.vue";
import SignIn from "../pages/SignIn/index.vue";
import SignUp from "../pages/SignUp/index.vue";

const routes = [
  { path: "/signin", component: SignIn },
  { path: "/signup", component: SignUp },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
