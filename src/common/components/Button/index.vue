<script setup lang="ts">
import { defineProps } from "vue";

enum ButtonType {
  primary = "primary",
  close = "close",
}

const props = defineProps({
  type: {
    type: String as () => keyof typeof ButtonType,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});
</script>
<template>
  <button
    @click="onClick && onClick()"
    type="submit"
    class="flex items-center px-2 py-2 focus:outline-none"
    :class="{
      'font-medium tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:bg-blue-500':
        type === 'primary',
      'mr-2 text-blue-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-blue-400':
        type === 'close',
    }"
    v-bind:class="{
      'dark:bg-blue-500 cursor-not-allowed dark:hover:bg-blue-500':
        disabled && type === 'primary',
      'dark:bg-blue-200 cursor-not-allowed dark:hover:bg-blue-200 text-slate-100 dark:hover:text-slate-100':
        disabled && type === 'close',
    }"
    :disabled="disabled"
  >
    <span class="mx-1">{{ text }}</span>
  </button>
</template>
