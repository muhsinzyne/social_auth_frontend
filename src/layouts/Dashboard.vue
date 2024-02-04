<script setup lang="ts">
import Sidebar from "@/common/components/Sidebar/index.vue";
import Header from "@/common/components/Header/index.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8 pt-2 max-h-[80%]">
          <slot />
          <!-- <router-view></router-view> -->
        </div>
      </main>
    </div>
  </div>
</template>
