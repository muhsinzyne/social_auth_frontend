<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import { getSingleUser } from "@/core/services/routes/user";
import { onMounted, ref } from "vue";
import Navbar from "@/common/components/Navbar/index.vue";
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
