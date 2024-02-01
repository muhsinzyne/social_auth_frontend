<script lang="ts" setup>
import { ref, onMounted } from "vue";
import EmptyState from "../Apps/Components/EmptyState/index.vue";
import AppsRender from "../Apps/Components/AppsRender/index.vue";
import { state, RootState } from "@/store";
import { AppType } from "@/common/types/types";
import { getAllApps } from "@/core/services/routes/app";
import Swall from "@/core/helpers/swal";

const { userPreferences } = state as RootState;

console.log(userPreferences, "userPREF");

const apps = ref<Array<AppType>>([]);

onMounted(async () => {
  try {
    const response = await getAllApps();
    apps.value = response.data;
    console.log(apps);
  } catch (error) {
    console.error(error);
    Swall.Timer("Somethig went wrong! try after some time.", "warning");
  }
});
</script>

<template>
  <EmptyState v-if="!Boolean(apps.length > 0)" />
  <AppsRender v-if="Boolean(apps.length > 0)" :apps="apps" />
</template>
