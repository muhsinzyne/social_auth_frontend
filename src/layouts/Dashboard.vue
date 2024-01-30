<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div
      class="grid grid-cols-custom h-[100vh] w-[100vw] max-md:grid-cols-none"
    >
      <Sidebar />
      <div class="bg-blue-100 max-md:w-[100vw] h-full w-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSingleUser } from "@/core/services/routes/user";
import { onMounted, ref } from "vue";
import Sidebar from "@/common/components/Sidebar/index.vue";

const loading = ref(true);

onMounted(async () => {
  try {
    await getSingleUser("1");
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});
</script>
