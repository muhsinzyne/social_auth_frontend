<template>
  <!--begin::Wrapper-->
  <div class="p-10 mx-auto">
    <!--begin::Form-->
    <VForm
      class="form w-full max-w-md mx-auto"
      @submit="onSubmitForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="submitForgotPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-5 grid place-items-start">
        <!--begin::Title-->
        <h1 class="text-gray-900 text-3xl mb-3">Forgot Password ?</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-500 font-semibold text-sm">
          Enter your email to reset your password.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="mb-5">
        <Field
          class="w-full border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          type="email"
          placeholder="Email"
          name="email"
          autocomplete="off"
          required
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" class="text-red-600 text-sm" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="flex items-center flex-wrap justify-start pb-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          class="flex items-center justify-center my-2 mr-2 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          v-bind:class="{
            'dark:bg-blue-500 cursor-not-allowed dark:hover:bg-blue-500':
              submitButtonDisabled,
          }"
          :disabled="submitButtonDisabled"
        >
          <svg
            v-if="submitButtonDisabled"
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-2 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          <span class="indicator-label">Submit</span>
        </button>

        <router-link
          to="/sign-in"
          class="my-2 text-blue-700 bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-200 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-200"
          v-bind:class="{
            'dark:bg-blue-200 cursor-not-allowed dark:hover:bg-blue-200 text-slate-100 dark:hover:text-slate-100':
              submitButtonDisabled,
          }"
          :disabled="submitButtonDisabled"
        >
          Cancel
        </router-link>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { forgotPassword } from "@/core/services/routes/auth";
import * as Yup from "yup";
import Swal from "@/core/helpers/swal";
import { ERRORS } from "@/utils/constants";
import { handleNavigate } from "@/core/helpers/path";

const submitButtonDisabled = ref<boolean>(false);

//Create form validation object
const submitForgotPassword = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

//Form submit function
const onSubmitForgotPassword = async (values: any) => {
  if (values && values.email) {
    try {
      submitButtonDisabled.value = true;
      const response = await forgotPassword({ email: values.email });

      const { data } = response;

      if (data.mailSent) {
        Swal.ConfirmCancel(
          "Password Reset Link Send to your gmail",
          "success",
          true,
          "Ok"
        ).then(() => {
          handleNavigate("sign-in");
        });
      }
    } catch (error: any) {
      console.log(error);
      if (
        error?.response?.data &&
        !error.response.data.success &&
        error.response.data.error
      ) {
        switch (error.response.data.error) {
          case ERRORS.USER_NOT_FOUND.message:
            Swal.Timer("User Not Found!", "error");
            return (submitButtonDisabled.value = false);
          default:
            return Swal.Timer("Something went wrong!", "error");
        }
      }
    }
  }
};
</script>
