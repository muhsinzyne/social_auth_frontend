<template>
  <div class="grid place-items-center p-4">
    <div class="flex flex-col">
      <header class="pb-11 grid place-items-center">
        <span class="font-bold pb-4 text-2xl">Sign In</span>
        <div class="text-gray-500 font-medium">Your Social Campaigns</div>
      </header>

      <section class="pb-9 flex items-center justify-center">
        <div class="flex items-center justify-center gap-2">
          <button
            @click="signinWithGoogle"
            type="button"
            class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2 gap-2"
          >
            <img
              src="../../assets/google.svg"
              class="w-[22px]"
              alt="google-logo"
            /><span>Sign In With Google</span>
          </button>
        </div>
      </section>

      <section>
        <div
          class="separator separator-content flex items-center border-b-0 text-center"
        >
          <div
            class="w-1/2 border-b border-solid border-gray-400 before:content-[''] before:w-full before:absolute before:bottom-0 before:left-0 mr-5"
          ></div>
          <span class="text-gray-400 font-semibold text-sm w-32"
            >Or with email</span
          >
          <div
            class="w-1/2 border-b border-solid border-gray-400 after:content-[''] after:w-full after:absolute after:bottom-0 after:right-0 ml-5"
          ></div>
        </div>
      </section>

      <Form
        novalidate
        @submit="onSubmitLogin"
        id="kt_login_signup_form"
        :validation-schema="registration"
      >
        <div class="grid mb-5 mt-8">
          <Field
            type="email"
            name="email"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Email"
            autocomplete="off"
            required
          />
          <div><ErrorMessage name="email" class="text-red-600 text-sm" /></div>
        </div>
        <div class="grid mb-5">
          <Field
            type="password"
            name="password"
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
          @click="handleNavigate('forgot-password')"
          class="flex justify-end items-center text-blue-700 hover:cursor-pointer font-semibold text-sm w-full mb-5"
        >
          Forgot Password?
        </div>
        <div class="flex items-center">
          <button
            id="kt_sign_up_submit"
            ref="submitButton"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        </div>
        <div
          class="p-6 flex justify-center items-center font-semibold text-gray-600"
        >
          Not a member yet?
          <span
            @click="handleNavigate('sign-up')"
            class="text-blue-700 hover:cursor-pointer"
            >&nbsp;Sign Up</span
          >
        </div>
        <div class="text-gray-400 font-semibold text-sm w-full mb-5 invisible">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as Yup from "yup";
import { ERRORS } from "@/utils/constants";
import { addToSessionStorage, handleNavigate } from "@/core/helpers/path";
import { saveToken } from "@/core/services/JwtService";
import { userLogin } from "@/core/services/routes/auth";
import { ErrorMessage, Field, Form } from "vee-validate";
import { RegistrationCredsType } from "@/common/types/types";
import Swall from "@/core/helpers/swal";

const submitButton = ref<HTMLButtonElement | null>(null);

// Validation stages
const registration = Yup.object().shape({
  email: Yup.string().min(4).required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

// Handling login functionalities
const onSubmitLogin = async (values: RegistrationCredsType | unknown) => {
  if (values) {
    submitButton.value!.disabled = true;
    try {
      const response = await userLogin(values as RegistrationCredsType);

      const { success, data } = response;

      if (success) {
        data && saveToken(data.accessToken);

        data && addToSessionStorage("userId", data.user.id.toString());

        Swall.Timer("You have successfully Logged In!", "success");

        handleNavigate("apps");
      }
    } catch (error: any) {
      console.error(error);

      if (error?.response?.data) {
        if (!error.response.data.success && error.response.data.error) {
          switch (error.response.data.error) {
            case ERRORS.USER_NOT_FOUND.message:
              return Swall.Timer("Invalid Email!", "error");
            case ERRORS.INVALID_CREDS.message:
              return Swall.Timer("Invalid Password!", "error");
            default:
              return Swall.Timer("Something went wrong!", "error");
          }
        }
      }
    } finally {
      submitButton.value!.disabled = false;
    }
  }
};

const signinWithGoogle = () => {
  window.location.href = import.meta.env.VITE_APP_BASE_URL + "/auth/google";
};
</script>
