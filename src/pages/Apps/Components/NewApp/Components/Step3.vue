<script setup lang="ts">
import * as Yup from "yup";
import Card from "@/common/components/Card/index.vue";
import Button from "@/common/components/Button/index.vue";
import LeftArrowIcon from "@/common/Icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/common/Icons/RightArrowIcon.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import LoaderIcon from "@/common/Icons/LoaderIcon.vue";

const { handleData } = defineProps({
  handleData: Function,
  previousStep: Function,
  isLoading: Boolean,
});

const validation = Yup.object().shape({
  domain: Yup.string()
    .matches(
      /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/,
      "Domain is in an invalid format"
    )
    .required("Domain Name is required")
    .label("send.yourdomain.com"),
});

const handleStepThree = (values: any) => {
  values && handleData && handleData(values, 3);
};
</script>

<template>
  <div class="mt-4">
    <Form
      novalidate
      @submit="handleStepThree"
      id="app_registration_step_1_form"
      :validation-schema="validation"
    >
      <Card width="full">
        <template v-slot:card-body
          ><div class="flex justify-center items-center p-5" v-if="isLoading">
            <div class="flex justify-center items-center">
              <LoaderIcon color="#1C64F2CC" size="20px" />
            </div>
          </div>
          <div v-else class="grid gap-2">
            <div class="font-normal text-lg">Set your sending domain</div>
            <div>
              A sending domain is the address that your emails will use to send
              emails. We recommend using a subdomain (e.g. send.yourdomain.com
              instead of yourdomain.com).
            </div>
            <a href="" class="text-blue-600 hover:underline w-fit"
              >Sending domain documentation</a
            >
            <div class="py-4">
              <div class="grid gap-6 lg:grid-cols-2">
                <div>
                  <label for="domain" class="text-gray-700"
                    >Sending domain name
                    <span class="text-red-600">*</span></label
                  >
                  <Field
                    type="text"
                    id="domain"
                    name="domain"
                    class="w-full mt-2 border-gray-200 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
                    placeholder="send.yourdomain.com"
                    autocomplete="off"
                    required
                  />
                  <div>
                    <ErrorMessage name="domain" class="text-red-600 text-sm" />
                  </div>
                </div>
              </div>
            </div></div
        ></template>
      </Card>
      <div class="py-3 flex - gap-2">
        <Button
          variant="primary"
          type="button"
          text="Back"
          :disabled="isLoading"
          :on-click="previousStep"
          ><template v-slot:left-icon>
            <LeftArrowIcon />
          </template>
        </Button>
        <Button
          variant="primary"
          type="submit"
          text="Next Step"
          :disabled="isLoading"
          ><template v-slot:right-icon>
            <RightArrowIcon />
          </template>
        </Button>
      </div>
    </Form>
  </div>
</template>
