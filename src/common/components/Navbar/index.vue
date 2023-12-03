<script setup lang="ts">
import LeftSection from "./components/LeftSection/index.vue";
import RightSection from "./components/RightSection/index.vue";

import { ref } from "vue";

const isVisible = ref(false);

const updateVisibility = (value: boolean) => {
  isVisible.value = value;
};
</script>

<template>
  <!-- <div
    class="bg-black fixed z-50 w-full h-[4rem] flex justify-between items-center p-5"
  >
    <LeftSection />
    <RightSection /> -->
  <nav class="bg-[#e3f2fd] dark:bg-gray-800 shadow fixed w-full">
    <LeftSection :isVisible="isVisible" @updateVisibility="updateVisibility" />
    <RightSection v-if="isVisible" />
  </nav>
  <!-- <div class="flex-1 flex items-center justify-center">
    <div
      class="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <p
        class="font-plex font-bold lg:text-[4rem] md:text-[3.5rem] max-md:text-[3rem] max-sm:text-[2.5rem] leading-[1.2em] text-white"
      >
        Connect with your Customers without OTPs.
      </p>
    </div>
  </div> -->
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-tr to-[#1dadd800] from-indigo-900 p-10"
  >
    <div class="w-max max-w-[73em]">
      <h1
        class="font-plex lg:text-[4rem] md:text-[3.5rem] max-md:text-[3rem] max-sm:text-[2.5rem] leading-[1.2em] overflow-hidden pr-5 text-5xl text-white font-bold"
      >
        Connect with your Customers without OTPs.
      </h1>
    </div>
  </div>
</template>
