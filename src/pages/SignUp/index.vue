<template>
  <div class="grid place-items-center p-4">
    <div class="flex flex-col">
      <header class="pb-11 grid place-items-center">
        <span class="font-bold pb-4 text-2xl">Sign Up</span>
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
        @submit="onSubmitRegister"
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
        <div class="flex items-center">
          <button
            id="kt_sign_up_submit"
            ref="submitButton"
            type="submit"
            class="w-full flex items-center justify-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
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
import { ref, watch } from "vue";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { registerUser, accountCheck } from "@/core/services/routes/auth";
import { handleNavigate } from "@/core/helpers/path";
import { ErrorMessage, Field, Form } from "vee-validate";
import { ERRORS } from "@/utils/constants";
import { AccountCheckType } from "@/common/types/types";
import Swal from "@/core/helpers/swal";

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

const handleAccountCheck = async (
  email: string,
  source: "google" | "manual",
  fn: Function
) => {
  const accountCheckPayload: AccountCheckType = {
    source,
    email,
  };

  try {
    const accountCheckRes = await accountCheck(accountCheckPayload);

    const { linkAccount, login } = accountCheckRes.data;

    if (login) {
      Swal.ConfirmCancel(
        "Already Registered Email!, Sign In",
        "warning",
        true,
        "Ok"
      ).then(function () {
        return handleNavigate("sign-in");
      });
    } else if (linkAccount) {
      Swal.ConfirmCancel(
        "Email is Already Registered with an Account!, Do you want to Link it?",
        "warning",
        true,
        "Yes",
        true,
        "No"
      ).then(function (result) {
        if (result.isConfirmed) {
          fn();
        } else {
          window.location.reload();
        }
        return;
      });
    } else {
      fn();
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Handling signUp functionalities
const onSubmitRegister = async (values: any) => {
  if (values) {
    try {
      submitButton.value!.disabled = true;

      await handleAccountCheck(
        values.email,
        "manual",
        startRegistrationProcess
      );

      async function startRegistrationProcess() {
        const hashedPassword = await bcrypt.hash(values.password, 10);

        const payload = {
          email: values.email,
          password: hashedPassword,
        };

        //Calling endpoint for registering the user
        const response = await registerUser(payload);

        const { success } = response;

        if (success) {
          Swal.ConfirmCancel(
            "You have successfully Registered, Sign In!",
            "success",
            true,
            "Ok"
          ).then(function () {
            handleNavigate("sign-in");
          });
        } else {
          Swal.ConfirmCancel("Something went wrong!", "error", true, "Ok");
        }
      }
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data) {
        if (!error.response.data.success && error.response.data.error) {
          switch (error.response.data.error) {
            case ERRORS.DUPLIACTE_USER.message:
              return Swal.Timer(
                "Email Already Registered!, Sign In",
                "warning"
              );
            default:
              return Swal.Timer("Something went wrong!", "error");
          }
        }
      }
    } finally {
      submitButton.value!.disabled = false;
    }
  }
};

const signinWithGoogle = async () => {
  const email = await Swal.Email();

  if (email) {
    handleAccountCheck(email, "google", startSigninWithGoogle);
  }
};

function startSigninWithGoogle() {
  window.location.href = import.meta.env.VITE_APP_BASE_URL + "/auth/google";
}
</script>

<style>
.active {
  background-color: green;
}
</style>
