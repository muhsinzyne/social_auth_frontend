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
          ref="submitButton"
          id="kt_password_reset_submit"
          class="my-2 mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
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

const submitButton = ref<HTMLButtonElement | null>(null);

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
  submitButton.value!.disabled = true;

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
    }
  }
};
</script>
