<script setup lang="ts">
import { defineProps } from "vue";

enum ButtonVariant {
  primary = "primary",
  none = "none",
  danger = "danger",
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
    default: ButtonVariant.primary,
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

const commonClassForColors =
  "font-medium tracking-wide text-white transition-colors duration-200 transform rounded-md";

const VARIANT_COLOR = {
  [ButtonVariant.primary]:
    commonClassForColors + " bg-blue-600 hover:bg-blue-500 focus:bg-blue-500",
  [ButtonVariant.none]:
    "mr-2 text-blue-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-blue-400",
  [ButtonVariant.danger]:
    commonClassForColors + " bg-red-600  hover:bg-red-500 focus:bg-red-500",
};

const VARIANT_COLOR_DISABLED = {
  [ButtonVariant.primary]:
    commonClassForColors +
    " bg-blue-500 cursor-not-allowed dark:hover:bg-blue-500",
  [ButtonVariant.none]:
    commonClassForColors +
    " bg-blue-200 cursor-not-allowed dark:hover:bg-blue-200 text-slate-100 dark:hover:text-slate-100",
  [ButtonVariant.danger]:
    commonClassForColors +
    " dark:bg-red-500 cursor-not-allowed dark:hover:bg-red-500",
};
</script>
<template>
  <button
    @click="onClick && onClick()"
    :type="type"
    class="flex items-center px-2 py-2 focus:outline-none"
    v-bind:class="
      (disabled && VARIANT_COLOR_DISABLED[variant]) || VARIANT_COLOR[variant]
    "
    :disabled="disabled"
  >
    <slot name="left-icon" /> <span v-if="text" class="mx-1">{{ text }}</span>
    <slot name="right-icon" />
  </button>
</template>
