<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRouteAuthenticated } from "@/common/composables/routeAuthenticated";

const defaultLayout = "default";

const { currentRoute } = useRouter();

const { routeAuthenticated } = useRouteAuthenticated();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>

<template>
  <component :is="layout" v-if="routeAuthenticated">
    <router-view />
  </component>
</template>
