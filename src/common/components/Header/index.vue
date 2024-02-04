<script setup lang="ts">
import { ref } from "vue";
import { useSidebar } from "../../composables/useSidebar";
import { handleNavigate } from "@/core/helpers/path";
import { deleteCookie } from "@/core/services/JwtService";
import { userLogout } from "@/core/services/routes/auth";

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();

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
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-2 shadow border-gray-200 dark:border-gray-200"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          class="relative z-10 grid w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none place-items-center"
          @click="dropdownOpen = !dropdownOpen"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              fill="#d3d3d3"
              d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z"
              clip-rule="evenodd"
              height="28"
              width="28"
            />
          </svg>
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
              >Profile</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
              >Products</a
            >
            <div
              @click="handleLogout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
            >
              Log out
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
