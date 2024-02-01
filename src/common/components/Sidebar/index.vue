<script lang="ts" setup>
import { handleNavigate } from "@/core/helpers/path";
import { deleteCookie } from "@/core/services/JwtService";
import { userLogout } from "@/core/services/routes/auth";
import { ref } from "vue";

const showProfileOptions = ref(false);

const handleShowProfileOptions = () =>
  (showProfileOptions.value = !showProfileOptions.value);

// Function for handling user logout
const handleLogout = async () => {
  try {
    await userLogout();
    // Removing userId from cookie
    deleteCookie("userId");
    // Navigating to sign-in page
    handleNavigate("sign-in");
  } catch (error) {
    console.error(error);
  }
};

const pages = ["Apps", "Organisations"];
</script>

<template>
  <div
    class="bg-blue-950 w-auto h-full max-md:hidden grid grid-rows-[0fr_1fr_0fr]"
  >
    <header class="flex justify-start items-center p-8 gap-2">
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
    </header>
    <section>
      <div class="p-8 text-blue-100 font-normal">
        <ul class="inline-block text-left">
          <li
            v-for="(item, index) in pages"
            class="cursor-pointer hover:text-white"
            v-bind:class="{ 'mb-4': index === 0 }"
            @click="handleNavigate(`${item.toLowerCase()}`)"
          >
            {{ item }}
          </li>
        </ul>
        <div
          class="w-full border-t-[1px] border-blue-900 mt-10 my-6 self-center"
        ></div>
      </div>
    </section>

    <footer>
      <div class="p-8">
        <div
          v-if="showProfileOptions"
          class="mb-4 max-md:hidden w-44 p-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-white dark:border-gray-600 dark:text-gray-900"
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
    </footer>
  </div>
</template>
