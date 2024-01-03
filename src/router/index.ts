import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home/index.vue";
import SignIn from "@/pages/SignIn/index.vue";
import SignUp from "@/pages/SignUp/index.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Dashboard from "@/pages/Dashboard/index.vue";

const routes = [
  {
    path: "/sign-up",
    component: AuthLayout,
    children: [
      {
        path: "/sign-up",
        name: "sign-up",
        component: SignUp,
        meta: {
          pageTitle: "Sign Up",
        },
      },
    ],
  },
  {
    path: "/sign-in",
    component: AuthLayout,
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: SignIn,
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  { path: "/", name: "home", component: Home },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
