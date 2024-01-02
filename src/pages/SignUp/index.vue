<template>
  <div class="grid place-items-center p-4">
    <div class="flex flex-col">
      <header class="pb-11 grid place-items-center">
        <span class="font-bold pb-4 text-2xl">Sign Up</span>
        <div class="text-gray-500 font-medium">Your Social Campaigns</div>
      </header>

      <section class="pb-9 flex">
        <div class="flex items-center justify-center gap-2">
          <button
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
        <div class="flex items-center justify-center gap-2">
          <button
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
        @submit="onSubmitRegister"
        id="kt_login_signup_form"
        :validation-schema="registration"
      >
        <div class="flex items-center mb-5 mt-8">
          <Field
            type="email"
            name="email"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Email"
            autocomplete="off"
            required
          />
        </div>
        <div><ErrorMessage name="email" /></div>
        <div class="flex items-center mb-5">
          <Field
            type="password"
            name="password"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Password"
            autocomplete="off"
            required
          />
        </div>
        <div><ErrorMessage name="password" /></div>
        <div class="text-gray-400 font-semibold text-sm w-full mb-5">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
        <div class="flex items-center mb-5">
          <Field
            type="password"
            name="password_confirmation"
            class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Repeat Password"
            autocomplete="off"
            required
          />
        </div>
        <div><ErrorMessage name="password_confirmation" /></div>
        <div class="flex items-center">
          <button
            id="kt_sign_up_submit"
            ref="submitButton"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
        </div>
        <div
          class="p-6 flex justify-center items-center font-semibold text-gray-600"
        >
          Already have an Account?
          <span
            @click="handleNavigate('sign-in')"
            class="text-blue-700 hover:cursor-pointer"
            >&nbsp;Sign In</span
          >
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { registerUser } from "@/core/services";
import { handleNavigate } from "@/core/helpers/path";
import { ErrorMessage, Field, Form } from "vee-validate";

const submitButton = ref<HTMLButtonElement | null>(null);

// Validation stages
const registration = Yup.object().shape({
  email: Yup.string().min(4).required().email().label("Email"),
  password: Yup.string().required().label("Password"),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Password Confirmation"),
});

// Handling signUp functionalities
const onSubmitRegister = async (values: any) => {
  console.log(values, "[VALUES]");

  if (values) {
    try {
      submitButton.value!.disabled = true;

      const hashedPassword = await bcrypt.hash(values.password, 10);

      const payload = {
        email: values.email,
        password: hashedPassword,
      };

      //Calling endpoint for registering the user
      const response = await registerUser(payload);

      const { success } = response;

      if (success) {
        Swal.fire({
          text: "You have successfully Registered!",
          icon: "success",
          buttonsStyling: false,
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        }).then(function () {
          handleNavigate("sign-in");
        });
      } else {
        Swal.fire({
          text: "Something went wrong!",
          icon: "error",
          buttonsStyling: false,
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      submitButton.value!.disabled = false;
    }
  }
};
</script>
