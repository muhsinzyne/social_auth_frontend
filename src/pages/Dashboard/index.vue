<template>
  <Navbar />
</template>

<script setup lang="ts">
import { getSingleUser } from "@/core/services/routes/user";
import { onMounted } from "vue";
import Navbar from "@/common/components/Navbar/index.vue";

onMounted(async () => {
  await getSingleUser("1");
});
</script>
