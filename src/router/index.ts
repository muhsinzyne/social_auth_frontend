import { createRouter, createWebHistory } from "vue-router";
import { checkIfIsAuthenticated } from "@/core/services/JwtService";
import { handleNavigate } from "@/core/helpers/path";
import { useRouteAuthenticated } from "@/common/composables/routeAuthenticated";

import Home from "@/pages/Home/index.vue";
import SignIn from "@/pages/SignIn/index.vue";
import SignUp from "@/pages/SignUp/index.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import ForgotPassword from "@/pages/ForgotPassword/index.vue";
import ResetPassword from "@/pages/ResetPassword/index.vue";
import Apps from "@/pages/Apps/index.vue";
import NewApp from "@/pages/Apps/Components/NewApp/index.vue";
import Organisations from "@/pages/Organisations/index.vue";

const { routeAuthenticated } = useRouteAuthenticated();

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
          layout: "empty",
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
          layout: "empty",
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
          layout: "empty",
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
          layout: "empty",
        },
      },
    ],
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      pageTitle: "Home",
      layout: "empty",
    },
  },
  {
    path: "/dashboard/apps",
    name: "apps",
    component: Apps,
    meta: {
      pageTitle: "Apps",
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  {
    path: "/dashboard/apps/new",
    name: "newApp",
    component: NewApp,
    meta: {
      pageTitle: "New App",
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  {
    path: "/dashboard/organisations",
    name: "organisations",
    component: Organisations,
    meta: {
      pageTitle: "Organisations",
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a navigation guard to check authentication before each route change
router.beforeEach(async (to, _, next) => {
  if (to.fullPath === "/dashboard") {
    return handleNavigate("apps");
  }

  if (!to.meta.requiresAuth) {
    routeAuthenticated.value = true;
    return next();
  }
  // Proceed to the next route

  const isAuthenticated = await checkIfIsAuthenticated();
  routeAuthenticated.value = true;

  if (!isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page or another route
    next("/sign-in");
  } else {
    next(); // Proceed to the next route
  }
});

export default router;
