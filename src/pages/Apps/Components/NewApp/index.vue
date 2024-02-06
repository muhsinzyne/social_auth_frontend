<script lang="ts" setup>
import * as Yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import { addApp } from "@/core/services/routes/app";
import { AppType } from "@/common/types/types";
import Swall from "@/core/helpers/swal";
import { handleNavigate } from "@/core/helpers/path";

const organizationOptions = [
  { value: "US", label: "Organisation 1" },
  { value: "CA", label: "Organisation 2" },
  { value: "FR", label: "Organisation 3" },
  { value: "DE", label: "Organisation 4" },
];

const stepOneValidation = Yup.object().shape({
  app_name: Yup.string().min(3).required().label("App Name"),
  organization: Yup.string().required("Organization is a required field"),
  source: Yup.string().required("Source is a required field!"),
});

const handleStepOne = async (values: any) => {
  if (values) {
    const payload: AppType = {
      ...values,
      appName: values.app_name,
    };
    try {
      await addApp(payload);
      Swall.Toast("App Created Succesfully.", "success");
      handleNavigate("apps");
    } catch (error) {
      console.error(error);
      Swall.Toast("Somethig went wrong! try after some time.", "warning");
    }
  }
};
</script>

<template>
  <div class="mt-8">
    <div class="mt-6">
      <h2 class="text-xl font-semibold leading-tight">New App</h2>
      <Form
        novalidate
        @submit="handleStepOne"
        id="app_registration_step_1_form"
        :validation-schema="stepOneValidation"
      >
        <div
          class="mt-4 p- rounded-md shadow-md w-auto p-6 bg-white border border-gray-200 dark:bg-white dark:border-white md:max-h-[70vh] md:overflow-y-auto"
        >
          <div class="grid gap-6 mb-6 lg:grid-cols-2">
            <div class="pr-6">
              <label for="app_name" class="text-gray-700"
                >Name of your app</label
              >
              <Field
                type="text"
                id="app_name"
                name="app_name"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
                placeholder="App Name"
                autocomplete="off"
                required
              />
              <div>
                <ErrorMessage name="app_name" class="text-red-600 text-sm" />
              </div>
            </div>
            <div class="max-md:hidden"></div>
            <div class="pr-6">
              <label for="organization" class="text-gray-700"
                >What organization should it belong to?
              </label>
              <Field
                id="organizations"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
                name="organization"
                as="select"
                :value="organizationOptions[0].value"
              >
                <option
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
                  v-for="(option, index) in organizationOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </Field>
              <div>
                <ErrorMessage
                  name="organization"
                  class="text-red-600 text-sm"
                />
              </div>
            </div>
            <div class="max-md:hidden"></div>
            <div>
              <label for="source" class="text-gray-700"
                >Set up web push or mobile push. You can set up more later.
              </label>
              <div>
                <ErrorMessage name="source" class="text-red-600 text-sm" />
              </div>
              <ul class="flex w-full gap-3 flex-wrap mt-3">
                <li class="max-sm:w-full">
                  <Field
                    type="radio"
                    id="source_1"
                    name="source"
                    value="source_1"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="source_1"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border rounded-lg cursor-pointer dark:border-gray-200 hover:border-indigo-400 peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label for="organization" class="text-gray-700"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
                <li class="max-sm:w-full">
                  <Field
                    type="radio"
                    id="source_2"
                    name="source"
                    value="source_2"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="source_2"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border rounded-lg cursor-pointer dark:border-gray-200 hover:border-indigo-400 peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label for="organization" class="text-gray-700"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
                <li class="max-sm:w-full">
                  <Field
                    type="radio"
                    id="source_3"
                    name="source"
                    value="source_3"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="source_3"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border rounded-lg cursor-pointer dark:border-gray-200 hover:border-indigo-400 peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label for="organization" class="text-gray-700"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
                <li class="max-sm:w-full">
                  <Field
                    type="radio"
                    id="source_4"
                    name="source"
                    value="source_4"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="source_4"
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border rounded-lg cursor-pointer dark:border-gray-200 hover:border-indigo-400 peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label for="organization" class="text-gray-700"
                        >Whatsapp
                      </label>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pt-3">
          <button
            type="submit"
            class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            <span class="mx-1">Next Step</span>
            <svg
              class="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
