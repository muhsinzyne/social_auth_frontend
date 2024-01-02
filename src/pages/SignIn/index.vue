<template>
  <div class="grid place-items-center p-4">
    <div class="flex flex-col">
      <header class="pb-11 grid place-items-center">
        <span class="font-bold pb-4 text-2xl">Sign In</span>
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
        @submit="onSubmitLogin"
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
        <div
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
          <span class="text-blue-700 hover:cursor-pointer">&nbsp;Sign Up</span>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "../../core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const submitButton = ref<HTMLButtonElement | null>(null);
    const router = useRouter();

    const registration = Yup.object().shape({
      email: Yup.string().min(4).required().email().label("Email"),
      password: Yup.string().required().label("Password"),
    });

    const onSubmitLogin = async (values: any) => {
      console.log(values, "[VALUES]");
      submitButton.value!.disabled = true;

      if (true) {
        Swal.fire({
          text: "You have successfully Logged In!",
          icon: "success",
          buttonsStyling: false,
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        }).then(function () {
          router.push({ name: "sign-in" });
        });
      }
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitLogin,
      submitButton,
      getAssetPath,
    };
  },
});
</script>
