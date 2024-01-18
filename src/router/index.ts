import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home/index.vue";
import SignIn from "@/pages/SignIn/index.vue";
import SignUp from "@/pages/SignUp/index.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Dashboard from "@/pages/Dashboard/index.vue";
import ForgotPassword from "@/pages/ForgotPassword/index.vue";
import ResetPassword from "@/pages/ResetPassword/index.vue";

import { checkIfIsAuthenticated } from "@/core/services/JwtService";

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
  {
    path: "/forgot-password",
    component: AuthLayout,
    children: [
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: ForgotPassword,
        meta: {
          pageTitle: "Forgot Password",
        },
      },
    ],
  },
  {
    path: "/reset-password/:id/:token",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "reset-password",
        component: ResetPassword,
        meta: {
          pageTitle: "Reset Password",
        },
      },
    ],
  },
  { path: "/", name: "home", component: Home },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a navigation guard to check authentication before each route change
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) next(); // Proceed to the next route

  const isAuthenticated = await checkIfIsAuthenticated();
  if (!isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page or another route
    next("/sign-in");
  } else {
    next(); // Proceed to the next route
  }
});

export default router;
