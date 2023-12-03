<script setup lang="ts">
import MenuIcon from "../../../../Icons/MenuIcon.vue";
import CloseIcon from "../../../../Icons/CloseIcon.vue";

import { defineProps, defineEmits, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(["isVisible"]);
const emit = defineEmits();

const updateVisibility = () => {
  emit("updateVisibility", !props.isVisible);
};

const activeTab = ref("calendar"); // Set the initial active tab

// Get the current route and router
const route = useRoute();
const router = useRouter();

console.log(route?.params.tab, "TAB");
// Watch for changes in the route and update the activeTab accordingly
watch(
  () => route?.params.tab,
  (newTab) => {
    console.log(route?.params.tab, "TAB");
  }
);
</script>

<template>
  <!-- <div><span class="text-white">SocialAuth</span></div> -->
  <div class="px-8 mx-auto max-w-7xl">
    <div class="flex items-center justify-between h-16">
      <div class="w-full justify-between flex items-center">
        <div class="flex justify-center items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1c0d02"
            width="32px"
            height="32px"
          >
            <path d="M12 2L1 21h22L12 2zm0 5l4.5 12H7L12 7z" />
            <path
              d="M12 2L1 21h22L12 2z"
              class="hover:opacity-100 opacity-0 transition ease-in duration-200"
            />
          </svg>

          <a
            class="flex-shrink-0 font-bold font-sen pr-2 tracking-[.03em] text-[1.5em] text-[#1c0d02]"
            href="/"
          >
            SocialAuth
          </a>
        </div>
        <div class="flex gap-20 items-center justify-center">
          <div class="hidden md:block">
            <!-- <div class="flex items-baseline ml-10 space-x-4">
              <a
                class="tracking-[.06em] hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                href="/#"
              >
                Home
              </a>
              <a
                class="tracking-[.06em] dark:text-white hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                href="/#"
              >
                Gallery
              </a>
              <a
                class="tracking-[.06em] hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                href="/#"
              >
                Content
              </a>
              <a
                class="tracking-[.06em] hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                href="/#"
              >
                Contact
              </a>
            </div> -->

            <div class="text-[15px] text-center">
              <ul class="flex flex-wrap -mb-px">
                <li class="mr-2">
                  <a
                    href="/Home"
                    class="inline-block p-4 text-[#1c0d02] border-b-2 hover:border-[#1c0d02] rounded-t-lg active"
                  >
                    Home
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    href="/Calendar"
                    class="inline-block p-4 text-[#1c0d02] border-b-2 hover:border-[#1c0d02] rounded-t-lg"
                    aria-current="page"
                  >
                    Calendar
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    href="/Results"
                    class="inline-block p-4 text-[#1c0d02] border-b-2 hover:border-[#1c0d02] rounded-t-lg"
                  >
                    Results
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    href="#"
                    class="inline-block p-4 text-[#000] border-b-2 hover:border-[#1c0d02] rounded-t-lg"
                  >
                    Live
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button
            class="tracking-[.06em] px-4 py-1 transition ease-in duration-200 rounded-full hover:bg-[#1c0d02] hover:text-white border-2 border-[#1c0d02] focus:outline-none text-[15px]"
          >
            Login
          </button>
        </div>
      </div>
      <div class="block">
        <div class="flex items-center ml-4 md:ml-6"></div>
      </div>
      <div class="flex -mr-2 md:hidden">
        <button
          @click="updateVisibility"
          class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition ease-in duration-200"
        >
          <MenuIcon v-if="!props.isVisible" />
          <CloseIcon v-if="props.isVisible" />
        </button>
      </div>
    </div>
  </div>
</template>
