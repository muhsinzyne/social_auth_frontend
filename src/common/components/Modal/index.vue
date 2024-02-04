<script setup lang="ts">
import { defineProps } from "vue";
import Button from "@/common/components/Button/index.vue";
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  setOpen: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  okButtonProps: {
    type: Object as () => { disabled?: boolean },
    default: () => ({}),
  },
  cancelButtonProps: {
    type: Object as () => { disabled?: boolean },
    default: () => ({}),
  },
});
</script>

<template>
  <div>
    <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="setOpen(!open)"
      />

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">{{ title }}</p>
            <div
              class="z-50 cursor-pointer modal-close"
              @click="setOpen(!open)"
            >
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot name="body">Default Body</slot>
          </div>

          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <Button
              type="close"
              text="Close"
              :disabled="cancelButtonProps.disabled"
              :onClick="() => setOpen(!open)"
            />
            <Button
              type="primary"
              text="Save"
              :disabled="okButtonProps.disabled"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
