<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import EmptyState from "../Apps/Components/EmptyState/index.vue";
import AppsRender from "../Apps/Components/AppsRender/index.vue";
import { state, RootState } from "@/store";
import { AppType } from "@/common/types/types";
import { getAllAppsFiltered } from "@/core/services/routes/app";
import Swall from "@/core/helpers/swal";

const { userPreferences } = state as RootState;

console.log(userPreferences, "userPREF");
const isLoading = ref<boolean>(true);
const appsFetching = ref<boolean>(true);
const apps = ref<Array<AppType>>([]);
const appsCount = ref<number>(0);
const page = ref<number>(1);
const itemsPerPage = ref<number>(8);

watchEffect(async () => {
  try {
    appsFetching.value = true;

    const response = await getAllAppsFiltered({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
    });
    apps.value = response.data.apps;
    appsCount.value = response.data.count;
    console.log(apps);
  } catch (error) {
    console.error(error);
    Swall.Timer("Something went wrong! try after some time.", "warning");
  } finally {
    isLoading.value = false;
    appsFetching.value = false;
  }
});

const onPageChange = (newPage: number) => (page.value = newPage);

const removeApp = (appIdToDelete: string) => {
  const index = apps.value.findIndex((app) => app.appId === appIdToDelete);
  if (index !== -1) {
    apps.value.splice(index, 1);
    appsCount.value = appsCount.value - 1;
  }
};
</script>

<template>
  <div v-show="!isLoading" class="h-full">
    <EmptyState v-if="!Boolean(apps.length > 0)" />
    <AppsRender
      v-if="Boolean(apps.length > 0)"
      :apps="apps"
      :appsCount="appsCount"
      :page="page"
      :itemsPerPage="itemsPerPage"
      :removeApp="removeApp"
      :onPageChange="onPageChange"
      :appsFetching="appsFetching"
    />
  </div>
</template>
