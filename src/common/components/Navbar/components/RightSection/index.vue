<script setup lang="ts">
import Features from "../../components/Features/index.vue";
import MenuIcon from "../../../../Icons/MenuIcon.vue";
import CloseIcon from "../../../../Icons/CloseIcon.vue";

import { onBeforeUnmount, onMounted, ref } from "vue";

// const isVisible = ref(true);
// const myEventHandler = () => {
//   if (window.innerWidth < 768 && isVisible) {
//     isVisible.value = !isVisible;
//   } else if (window.innerWidth > 768) {
//     isVisible.value = true;
//   }
// };

// onMounted(() => {
//   if (window.innerWidth < 768 && isVisible) {
//     isVisible.value = !isVisible;
//   }
//   window.addEventListener("resize", myEventHandler);
// });

// onBeforeUnmount(() => {
//   window.removeEventListener("resize", myEventHandler);
// });
</script>
<template>
  <!-- <div class="flex gap-[4rem]">
    <Features v-if="isVisible" />
    <div class="max-md:hidden"><span class="text-white">Login</span></div>
    <div @click="isVisible = !isVisible" class="block md:hidden cursor-pointer">
      <MenuIcon v-if="!isVisible" />
      <CloseIcon v-if="isVisible" />
    </div>
  </div> -->
  <div class="md:hidden transition ease-in duration-200">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-[15px]">
      <a
        class="hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md font-medium"
        href="/#"
      >
        Home
      </a>
      <a
        class="dark:text-white block px-3 py-2 rounded-md font-medium"
        href="/#"
      >
        Gallery
      </a>
      <a
        class="hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md font-medium"
        href="/#"
      >
        Content
      </a>
      <a
        class="hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md font-medium"
        href="/#"
      >
        Contact
      </a>
    </div>
  </div>
</template>
