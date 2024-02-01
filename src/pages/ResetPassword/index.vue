<template>
  <!--begin::Wrapper-->
  <div class="p-10 mx-auto">
    <!--begin::Form-->
    <VForm
      class="form w-full max-w-md mx-auto"
      @submit="onSubmitResetPassword"
      id="kt_login_password_reset_form"
      :validation-schema="submitResetPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-5 grid place-items-start">
        <!--begin::Title-->
        <h1 class="text-gray-900 text-3xl mb-3">Setup New Password</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-500 font-semibold text-sm">
          Have you already reset the password ?
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="grid mb-5">
        <Field
          type="password"
          name="password"
          :value="password"
          @input="handlePasswordChange"
          class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder="Password"
          autocomplete="off"
          required
        />
        <div>
          <ErrorMessage name="password" class="text-red-600 text-sm" />
        </div>
      </div>

      <div
        class="flex items-center mb-3"
        data-kt-password-meter-control="highlight"
      >
        <div
          class="flex-grow bg-gray-200 active:bg-green-600 rounded h-1"
          v-for="i in 4"
          :key="i"
          :class="{
            active: passwordStrength >= i,
            'mx-2': i === 2 || i === 3,
          }"
        ></div>
      </div>
      <div class="text-gray-400 font-semibold text-sm w-full mb-5">
        Use 8 or more characters with a mix of letters, numbers & symbols.
      </div>
      <div class="grid mb-5">
        <Field
          type="password"
          name="password_confirmation"
          class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder="Repeat Password"
          autocomplete="off"
          required
        />
        <div>
          <ErrorMessage
            name="password_confirmation"
            class="text-red-600 text-sm"
          />
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="flex items-center flex-wrap justify-start pb-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          class="flex items-center justify-center my-2 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { useRoute } from "vue-router";
import { resetPassword } from "@/core/services/routes/auth";
import { ResetPasswordType } from "@/common/types/types";
import Swal from "@/core/helpers/swal";
import { handleNavigate } from "@/core/helpers/path";
import { ERRORS } from "@/utils/constants";

const submitButtonDisabled = ref<boolean>(false);

//Create form validation object
const submitResetPassword = Yup.object().shape({
  password: Yup.string().required().label("Password"),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Password Confirmation"),
});

const password = ref("");
const passwordStrength = ref(0);

watch(password, (newPassword) => {
  calculatePasswordStrength(newPassword);
});

function calculatePasswordStrength(passwordValue: string) {
  const conditionsMet = [
    /(?=.*[a-z])/.test(passwordValue),
    /(?=.*[A-Z])/.test(passwordValue),
    /(?=.*\d)/.test(passwordValue),
    /(?=.*[@$!%*?&])/.test(passwordValue),
    passwordValue.length >= 8,
  ];

  // Count the number of conditions met and update passwordStrength
  const value = conditionsMet.filter((condition) => condition).length;
  passwordStrength.value =
    value > 3 && passwordValue.length < 8
      ? 3
      : value > 1 && passwordValue.length < 4
      ? 1
      : value;
}

function handlePasswordChange(event: any) {
  password.value = event.target.value;
}

const { id, token } = useRoute().params;

//Form submit function
const onSubmitResetPassword = async (values: any) => {
  submitButtonDisabled.value = true;

  if (values && values.password_confirmation && id && token) {
    try {
      const hashedPassword = await bcrypt.hash(
        values.password_confirmation,
        10
      );

      const payload: ResetPasswordType = {
        id: id as string,
        token: token as string,
        newPassword: hashedPassword,
      };

      const response = await resetPassword(payload);

      const { data } = response;

      if (data.resetPassword) {
        Swal.Timer("Password Updated Successfully", "success");
        handleNavigate("sign-in");
      }
    } catch (error: any) {
      console.log(error);
      if (
        error?.response?.data &&
        !error.response.data.success &&
        error.response.data.error
      ) {
        switch (error.response.data.error) {
          case ERRORS.INVALID_TOKEN.ACCESS.expired:
            return Swal.ConfirmCancel(
              "Link Expired, Try with new Link!",
              "warning",
              true,
              "Ok"
            ).then(() => {
              handleNavigate("forgot-password");
            });
          default:
            return Swal.Timer("Something went wrong!", "error");
        }
      }
    } finally {
      submitButtonDisabled.value = false;
    }
  }
};
</script>
