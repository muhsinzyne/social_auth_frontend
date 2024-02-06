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

const isLoading = ref<boolean>(true);

const apps = ref<Array<AppType>>([]);

onMounted(async () => {
  try {
    const response = await getAllApps();
    apps.value = response.data;
    console.log(apps);
  } catch (error) {
    console.error(error);
    Swall.Timer("Somethig went wrong! try after some time.", "warning");
  } finally {
    isLoading.value = false;
  }
});

const removeApp = (appIdToDelete) => {
  const index = apps.value.findIndex((app) => app.appId === appIdToDelete);
  if (index !== -1) {
    apps.value.splice(index, 1);
  }
};
</script>

<template>
  <div v-if="!isLoading" class="h-full">
    <EmptyState v-if="!Boolean(apps.length > 0)" />
    <AppsRender
      v-if="Boolean(apps.length > 0)"
      :apps="apps"
      :removeApp="removeApp"
    />
  </div>
</template>
