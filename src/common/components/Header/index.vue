<script lang="ts" setup>
import { handleNavigate, removeFromSessionStorage } from "@/core/helpers/path";
import { userLogout } from "@/core/services/routes/auth";
import { ref } from "vue";

const showProfileOptions = ref(false);

const handleShowProfileOptions = () =>
  (showProfileOptions.value = !showProfileOptions.value);

// Function for handling user logout
const handleLogout = async () => {
  try {
    await userLogout();
    // Removing userId from session
    removeFromSessionStorage("userId");
    // Navigating to sign-in page
    handleNavigate("sign-in");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <header class="md:hidden sticky top-0 z-50 h-[10%]">
    <div class="flex flex-row justify-between gap-6 p-4 text-white bg-blue-950">
      <div class="flex justify-start items-center gap-2">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8"
          alt="Flowbite Logo"
        />
        <h1
          class="text-base font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
        >
          SocialAuth
        </h1>
      </div>

      <div
        class="bg-blue-900 cursor-pointer w-8 h-8 grid place-items-center rounded-full"
        @click="handleShowProfileOptions"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#fff"
          height="14"
          width="14"
        >
          <path
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
          />
        </svg>
      </div>
    </div>
  </header>
  <div
    v-if="showProfileOptions"
    class="mb-4 absolute right-0 mr-1 top-[66px] md:hidden w-44 p-2 text-sm font-medium text-gray-900 bg-white dark:text-gray-900 border border-gray-200 rounded-lg shadow dark:bg-white dark:border-white"
  >
    <button
      type="button"
      class="w-40 p-2 font-medium text-left rtl:text-right border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-indigo-100"
    >
      Profile
    </button>
    <button
      @click="handleLogout"
      type="button"
      class="w-40 p-2 font-medium text-left rtl:text-right border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-indigo-100"
    >
      Logout
    </button>
  </div>
</template>
