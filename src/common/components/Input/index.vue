<script setup lang="ts">
import { ErrorMessage, Field } from "vee-validate";
import * as Yup from "yup";

const { name, placeHolder, validationCallback, value, type, id } = defineProps([
  "name",
  "value",
  "placeHolder",
  "validationCallback",
  "type",
  "id",
]);

const validation = Yup.object().shape({
  [name]: Yup.string().min(3).required().label(placeHolder),
});

// validationCallback(validation);
</script>

<template>
  <Field
    :type="type"
    :name="name"
    :id="id"
    v-bind="value"
    class="w-full mt-2 border-gray-200 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
    :placeholder="placeHolder"
    autocomplete="off"
    required
  />
  <div>
    <ErrorMessage :name="name" class="text-red-600 text-sm" />
  </div>
</template>
