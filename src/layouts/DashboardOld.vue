<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div
      class="grid grid-cols-custom h-[100vh] w-[100vw] max-md:grid-cols-none"
    >
      <Sidebar />
      <div class="bg-blue-100 max-md:w-[100vw] h-full w-auto">
        <Header />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSingleUser } from "@/core/services/routes/user";
import { onMounted, ref } from "vue";
import Sidebar from "@/common/components/SidebarOld/index.vue";
import Header from "@/common/components/HeaderOld/index.vue";
import { handleNavigate } from "@/core/helpers/path";
import { dispatch } from "@/store";
import { getCookie } from "@/core/services/JwtService";

const loading = ref(true);

const userId = getCookie("userId");

onMounted(async () => {
  if (userId) {
    try {
      const { data } = await getSingleUser(userId);
      dispatch("addUserPrefferences", data?.user);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  } else {
    handleNavigate("sign-in");
  }
});
</script>
