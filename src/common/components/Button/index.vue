<script setup lang="ts">
import { defineProps } from "vue";

enum ButtonVariant {
  primary = "primary",
  none = "none",
}

enum ButtonType {
  submit = "submit",
  button = "button",
  reset = "rest",
}

const props = defineProps({
  variant: {
    type: String as () => keyof typeof ButtonVariant,
    required: true,
  },
  type: {
    type: String as () => keyof typeof ButtonType,
    required: false,
  },
  text: {
    type: String,
    required: false,
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
    :type="type"
    class="flex items-center px-2 py-2 focus:outline-none"
    :class="{
      'font-medium tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:bg-blue-500':
        variant === 'primary',
      'mr-2 text-blue-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-blue-400':
        variant === 'none',
    }"
    v-bind:class="{
      'dark:bg-blue-500 cursor-not-allowed dark:hover:bg-blue-500':
        disabled && variant === 'primary',
      'dark:bg-blue-200 cursor-not-allowed dark:hover:bg-blue-200 text-slate-100 dark:hover:text-slate-100':
        disabled && variant === 'none',
    }"
    :disabled="disabled"
  >
    <slot name="left-icon" /> <span v-if="text" class="mx-1">{{ text }}</span>
    <slot name="right-icon" />
  </button>
</template>
