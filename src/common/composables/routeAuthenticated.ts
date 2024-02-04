import { ref } from "vue";

const routeAuthenticated = ref(false);

export function useRouteAuthenticated() {
  return {
    routeAuthenticated,
  };
}
