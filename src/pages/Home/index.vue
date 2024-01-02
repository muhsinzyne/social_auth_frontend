<template>
  <div class="relative h-full overflow-hidden auto scroll-smooth flex flex-col">
    <Navbar />
    <div
      class="relative w-full flex justify-center items-center bg-[#fbfcfd] mt-[72px]"
    >
      <div class="max-w-[1500px] mx-auto w-full">
        <div
          class="h-[calc(100vh - 76.5px)] w-full relative"
          style="height: calc(100vh - 72px)"
        >
          <div
            class="w-full h-full flex flex-col justify-between md:px-16 md:flex md:items-center md:w-full md:flex-row"
          >
            <div class="flex flex-col gap-36 md:w-[35%] max-md:p-10">
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                  <div class="pb-4 max-md:mt-6">
                    <!-- ANIMATION BLOCK -->
                    <div class="gif" id="g1">
                      <div
                        class="text-center flex justify-center items-center gap-2"
                      >
                        <img
                          src="../../assets/whatsapp.svg"
                          alt="whatsapp-logo"
                        />
                        <p
                          class="m-0 leading-1.5 text-green-600 text-[42px] font-semibold"
                        >
                          Whatsapp
                        </p>
                      </div>
                    </div>
                    <div class="gif" id="g2">
                      <div
                        class="text-center flex justify-center items-center gap-2"
                      >
                        <img src="../../assets/google.svg" alt="google-logo" />
                        <p
                          class="m-0 leading-1.5 text-blue-500 text-[42px] font-bold"
                        >
                          Google
                        </p>
                      </div>
                    </div>
                    <div class="gif" id="g3">
                      <div
                        class="text-center flex justify-center items-center gap-2"
                      >
                        <img src="../../assets/upi.svg" alt="upi-logo" />
                        <p
                          class="m-0 leading-1.5 text-orange-500 text-[42px] font-bold"
                        >
                          UPI
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="m-0 leading-1.5 text-[42px] font-semibold">
                    Connect with your
                    <br />
                    <span class="whitespace-normal"
                      >Customers without OTPs.</span
                    >
                  </p>
                  <p class="m-0 font-normal leading-1.5 text-base">
                    Let your customers sign in without passwords or OTPs. <br />
                    Go live in minutes.
                  </p>
                  <button
                    @click="handleNavigate('sign-up')"
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 md:w-fit"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div
              class="p-5 md:flex md:flex-col md:items-end md:h-85 md:self-center md:w-90 md:relative md:h-[85%] md:justify-end sm:flex sm:flex-col sm:items-end sm:h-85 sm:self-center sm:w-90 sm:relative sm:min-h-[56.25vh] sm:justify-end md:align-self-end md:w-auto md:min-h-0"
            >
              <img
                src="../../assets/Otpless.webp"
                class="w-auto h-full static"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Navbar from "@/common/components/Navbar/index.vue";

const router = useRouter();

const handleNavigate = (page: string) => {
  router.push({ name: page });
};
</script>

<style lang="css" scoped>
.gif {
  position: absolute;
  -webkit-animation: fadeslideUp 12s infinite; /* Chrome, Opera 15+, Safari 5+ */
  -moz-animation: fadeslideUp 12s infinite; /* Fx 5+ */
  -o-animation: fadeslideUp 12s infinite; /* Opera 12+ */
  animation: fadeslideUp 12s infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

.gif h2 {
  text-align: center;
}

#g1 {
  animation-delay: 0s;
  -webkit-animation-delay: 0s;
}

#g2 {
  animation-delay: -4s;
  -webkit-animation-delay: -4s;
}

#g3 {
  animation-delay: -8s;
  -webkit-animation-delay: -8s;
}

@-webkit-keyframes fadeslideUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-40%);
  }
  10% {
    opacity: 1;
    -webkit-transform: translateY(-50%);
  }
  20% {
    opacity: 1;
    -webkit-transform: translateY(-50%);
  }
  25% {
    opacity: 0;
    -webkit-transform: translateY(-60%);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-60%);
  }
}

@-moz-keyframes fadeslideUp {
  0% {
    opacity: 0;
    transform: translateY(-40%);
  }
  10% {
    opacity: 1;
    transform: translateY(-50%);
  }
  20% {
    opacity: 1;
    transform: translateY(-50%);
  }
  25% {
    opacity: 0;
    transform: translateY(-60%);
  }
  100% {
    opacity: 0;
    transform: translateY(-60%);
  }
}

@-o-keyframes fadeslideUp {
  0% {
    opacity: 0;
    transform: translateY(-40%);
  }
  10% {
    opacity: 1;
    transform: translateY(-50%);
  }
  20% {
    opacity: 1;
    transform: translateY(-50%);
  }
  25% {
    opacity: 0;
    transform: translateY(-60%);
  }
  100% {
    opacity: 0;
    transform: translateY(-60%);
  }
}

@keyframes fadeslideUp {
  0% {
    opacity: 0;
    transform: translateY(-40%);
    -ms-transform: translateY(-40%);
  }
  10% {
    opacity: 1;
    transform: translateY(-50%);
    -ms-transform: translateY(-50%);
  }
  20% {
    opacity: 1;
    transform: translateY(-50%);
    -ms-transform: translateY(-50%);
  }
  25% {
    opacity: 0;
    transform: translateY(-60%);
    -ms-transform: translateY(-60%);
  }
  100% {
    opacity: 0;
    transform: translateY(-60%);
    -ms-transform: translateY(-60%);
  }
}
</style>
