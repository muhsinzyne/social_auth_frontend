<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div
      class="grid grid-cols-[265px_auto] h-[100vh] w-[100vw] max-md:grid-cols-none"
    >
      <Sidebar :updateCurrentPage="updateCurrentPage" />
      <div class="bg-blue-100 w-auto h-full">
        <Header />
        <Apps v-if="currentPage === 'apps'" />
        <Organisations v-if="currentPage === 'organisations'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSingleUser } from "@/core/services/routes/user";
import { onMounted, ref } from "vue";
import Apps from "../Dashboard/Components/Apps/index.vue";
import Organisations from "../Dashboard/Components/Organisations/index.vue";
import Sidebar from "@/common/components/Sidebar/index.vue";
import Header from "@/common/components/Header/index.vue";

const loading = ref(true);

const currentPage = ref("apps");

const updateCurrentPage = (newPage: string) => {
  currentPage.value = newPage;
};

onMounted(async () => {
  try {
    await getSingleUser("1");
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});
</script>
