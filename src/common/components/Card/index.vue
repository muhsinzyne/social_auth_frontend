<script setup lang="ts">
import { defineProps } from "vue";

enum Width {
  auto = "auto",
  full = "full",
}

enum JustifyContent {
  center = "center",
  start = "start",
}

defineProps({
  width: {
    type: String as () => keyof typeof Width,
    required: false,
    default: Width.auto,
  },
  justifyContent: {
    type: String as () => keyof typeof JustifyContent,
    required: false,
    default: JustifyContent.start,
  },
});
</script>

<template>
  <div
    class="rounded-md shadow-md flex items-center p-6 bg-white border border-gray-200 dark:bg-white dark:border-white md:max-h-[70vh] md:overflow-y-auto"
    :class="`w-${width} justify-${justifyContent}`"
  >
    <slot name="card-body" />
  </div>
</template>
