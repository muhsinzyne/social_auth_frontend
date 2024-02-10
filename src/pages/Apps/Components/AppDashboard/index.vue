<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getSingleApp } from "@/core/services/routes/app";
import { AppType } from "@/common/types/types";
import Swal from "@/core/helpers/swal";
import Card from "@/common/components/Card/index.vue";

const route = useRoute();
const appId = route.params.appId;

const isLoading = ref<boolean>(true);
const app = ref<AppType>();

onMounted(async () => {
  if (appId) {
    try {
      const response = await getSingleApp(appId as string);
      app.value = response.data;
      console.log(app, "Hhh");
    } catch (error) {
      console.error(error);
      Swal.Timer("Somethig went wrong! try after some time.", "warning");
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
<template>
  <div class="grid grid-rows-[50px_auto]">
    <div>
      <h2 class="text-xl font-semibold leading-tight">Dashboard</h2>
    </div>

    <div class="flex sm:justify-between gap-2 max-sm:grid">
      <Card width="full">
        <template v-slot:card-body
          ><div>
            <span class="font-normal">Total Subscriptions</span>
            <p class="font-medium text-lg">0</p>
          </div></template
        >
      </Card>
      <Card width="full">
        <template v-slot:card-body
          ><div>
            <span class="font-normal">Total Subscriptions</span>
            <p class="font-medium text-lg">0</p>
          </div></template
        >
      </Card>
      <Card width="full">
        <template v-slot:card-body
          ><div>
            <span class="font-normal">Total Subscriptions</span>
            <p class="font-medium text-lg">0</p>
          </div></template
        >
      </Card>
    </div>
  </div>
</template>
