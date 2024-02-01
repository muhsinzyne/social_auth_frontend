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
      Swall.Timer("App Created Succesfully.", "success");
      handleNavigate("apps");
    } catch (error) {
      console.error(error);
      Swall.Timer("Somethig went wrong! try after some time.", "warning");
    }
  }
};
</script>

<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div class="font-normal text-2xl"><h1>New App</h1></div>
    </div>
    <div class="pt-5">
      <Form
        novalidate
        @submit="handleStepOne"
        id="app_registration_step_1_form"
        :validation-schema="stepOneValidation"
      >
        <div
          class="w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-white md:max-h-[70vh] md:overflow-y-auto"
        >
          <div class="grid gap-6 mb-6 lg:grid-cols-2">
            <div class="pr-6">
              <label
                for="app_name"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Name of your app</label
              >
              <Field
                type="text"
                id="app_name"
                name="app_name"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 focus:placeholder-gray-600"
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
              <label
                for="organization"
                class="block mb-2 text-sm font-medium text-gray-900"
                >What organization should it belong to?
              </label>
              <Field
                id="organizations"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 focus:placeholder-gray-600"
                name="organization"
                as="select"
                :value="organizationOptions[0].value"
              >
                <option
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
              <label
                for="source"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Set up web push or mobile push. You can set up more later.
              </label>
              <div>
                <ErrorMessage name="source" class="text-red-600 text-sm" />
              </div>
              <ul class="flex w-full gap-3 flex-wrap">
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
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
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
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
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
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
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
                    class="max-sm:w-full inline-flex items-center justify-center text-gray-500 bg-white border border-gray-50 rounded-lg cursor-pointer dark:border-gray-300 hover:dark:border-indigo-400 dark:peer-checked:bg-indigo-100 peer-checked:border-indigo-400 peer-checked:text-blue-600 hover:bg-indigo-100 dark:text-gray-400"
                  >
                    <div
                      class="flex flex-col gap-2 items-center justify-center p-8"
                    >
                      <img
                        class="px-6 rounded-t-lg"
                        src="../../../../assets/whatsapp.svg"
                        alt="product image"
                      />
                      <label
                        for="organization"
                        class="block text-sm font-medium text-gray-900"
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
            id="app_registration_step_1_form"
            ref="submitButton"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center gap-2"
          >
            <span>Next Step </span>
            <span class="pi pi-angle-right text-white"></span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
