<script lang="ts" setup>
import { handleNavigate } from "@/core/helpers/path";
</script>

<template>
  <div class="flex items-center justify-center max-md:h-[80%] h-full">
    <div class="grid gap-3 p-6">
      <div>
        <img
          src="../../../../../../assets/Otpless.webp"
          class="w-[30rem] h-full max-w-xs static lg:max-w-[90%]"
          alt="logo"
        />
      </div>
      <div class="font-normal text-2xl">
        <h1>Create New App</h1>
      </div>
      <button
        id="kt_sign_up_submit"
        ref="submitButton"
        type="submit"
        @click="handleNavigate('newApp')"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center gap-2"
      >
        <span class="pi pi-plus-circle text-white"></span>
        <span>New App </span>
      </button>
    </div>
  </div>
</template>
