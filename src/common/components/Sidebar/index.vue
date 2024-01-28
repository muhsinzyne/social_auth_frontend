<template lang="html">
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
            @click="
              updateCurrentPage && updateCurrentPage(`${item.toLowerCase()}`)
            "
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
          class="bg-blue-900 cursor-pointer w-8 h-8 grid place-items-center rounded-full"
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

<script lang="ts" setup>
import { defineProps } from "vue";

const pages = ["Apps", "Organisations"];

defineProps({
  updateCurrentPage: Function,
});
</script>
