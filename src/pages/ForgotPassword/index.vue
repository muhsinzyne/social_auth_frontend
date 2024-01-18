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
          ref="submitButton"
          id="kt_password_reset_submit"
          class="my-2 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span class="indicator-label">Submit</span>
        </button>

        <router-link
          to="/sign-in"
          class="my-2 text-blue-700 bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-200 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-200"
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

const submitButton = ref<HTMLButtonElement | null>(null);

//Create form validation object
const submitForgotPassword = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

//Form submit function
const onSubmitForgotPassword = async (values: any) => {
  if (values && values.email) {
    try {
      submitButton.value!.disabled = true;
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
            return Swal.Timer("User Not Found!", "error");
          default:
            return Swal.Timer("Something went wrong!", "error");
        }
      }
    }
  }
};
</script>
