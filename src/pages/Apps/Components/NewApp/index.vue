<script lang="ts" setup>
import { addApp, getSingleApp } from "@/core/services/routes/app";
import { AppType } from "@/common/types/types";
import Swall from "@/core/helpers/swal";
import { handleNavigate } from "@/core/helpers/path";
import { ref, onMounted } from "vue";
import Step1 from "./Components/Step1.vue";
import Step2 from "./Components/Step2.vue";
import Step3 from "./Components/Step3.vue";
import Step4 from "./Components/Step4.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const currentStep = ref(Number(route.params.step) || 4);
const currentData = ref<AppType | Partial<AppType>>();
const isLoading = ref(false);
const appId = ref<string>(route.query.appId ? String(route.query.appId) : "");
const domain = ref<string>();

const handleData = async (values: Partial<AppType>, step: number) => {
  console.log(values);

  if (values) {
    currentData.value = {
      appId: appId.value,
      ...currentData.value,
      ...values,
      step,
    };
    if (values.domain) {
      domain.value = values.domain;
    }
  }
  nextStep();
  if (currentData.value) {
    isLoading.value = true;
    try {
      const { data } = await addApp(currentData.value);
      if (data.appId) appId.value = data.appId;
      console.log(data.appId);

      router.push(
        `/dashboard/apps/new/${currentStep.value + 1}?appId=${appId.value}`
      );

      if (step === 5) {
        Swall.Toast("App Created Succesfully.", "success");
        handleNavigate("apps");
      }
      currentData.value = undefined;
    } catch (error) {
      console.error(error);
      Swall.Toast("Somethig went wrong! try after some time.", "warning");
    } finally {
      isLoading.value = false;
    }
  }
};

const nextStep = () => {
  currentStep.value = currentStep.value + 1;
};

const previousStep = () => {
  if (currentStep.value === 1) return handleNavigate("apps");
  router.push(
    `/dashboard/apps/new/${currentStep.value - 1}?appId=${appId.value}`
  );
  currentStep.value = currentStep.value - 1;
};

onMounted(async () => {
  if (appId.value) {
    try {
      const response = await getSingleApp(appId.value);
      domain.value = response.data.domain;
      console.log("hhh", response.data);
    } catch (error) {
      console.error(error);
      Swall.Timer("Somethig went wrong! try after some time.", "warning");
    } finally {
      isLoading.value = false;
    }
  }
});
</script>

<template>
  <div class="mt-8">
    <div class="mt-6">
      <div>
        <span class="text-xl font-semibold leading-tight">New App</span>
        <span class="pl-1 text-gray-500 text-base"
          >> Step {{ currentStep }}</span
        >
      </div>
      <Step1
        :previousStep="previousStep"
        :handleData="handleData"
        :isLoading="isLoading"
        v-show="currentStep === 1"
      />
      <Step2
        :previousStep="previousStep"
        :handleData="handleData"
        :isLoading="isLoading"
        v-show="currentStep === 2"
      />
      <Step3
        :previousStep="previousStep"
        :handleData="handleData"
        :isLoading="isLoading"
        v-show="currentStep === 3"
      />
      <Step4
        :previousStep="previousStep"
        :handleData="handleData"
        :isLoading="isLoading"
        :domain="domain"
        v-show="currentStep === 4"
      />
    </div>
  </div>
</template>
