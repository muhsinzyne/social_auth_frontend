<template>
  <!--begin::Authentication Layout -->
  <div
    class="flex flex-col lg:flex-row w-full h-screen max-lg:justify-center max-lg:items-center"
  >
    <!--begin::Body-->
    <div
      class="flex flex-col lg:flex-row lg:w-1/2 order-2 lg:order-1 justify-center items-center"
    >
      <!--begin::Form-->
      <div
        class="flex items-center justify-center flex-col lg:flex-row md:w-full"
      >
        <!--begin::Wrapper-->
        <div class="md:w-full">
          <router-view></router-view>
        </div>
        <!--end::Wrapper-->
      </div>
    </div>
    <!--end::Body-->

    <!--begin::Aside-->
    <div
      class="flex lg:flex-row lg:w-1/2 bg-cover bg-center order-1 lg:order-2 max-lg:hidden"
      :style="`background-image: url('public/media/misc/auth-bg.png')`"
    >
      <!--begin::Content-->
      <div
        class="flex flex-col items-center justify-center py-7 py-lg-15 px-5 md:px-14 w-full"
      >
        <!--begin::Logo-->
        <router-link to="/" class="mb-0 lg:mb-4">
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
        </router-link>
        <!--end::Logo-->
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
        >
          SocialAuth
        </h1>
      </div>
      <!--end::Content-->
    </div>
    <!--end::Aside-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from "../core/helpers/assets";
import { defineComponent } from "vue";
export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
