<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

import Navbar from "../Navbar/index.vue";

defineProps<{ msg: string }>();

const count = ref(0);

// Define a reactive variable to store the users
const users = ref([]);

// Define the getUsers function
const getUsers = async () => {
  try {
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your getUsers API
    const response = await axios.get("http://localhost:5006/api/user");

    // Update the users variable with the response data
    users.value = response.data;

    console.log(response);
  } catch (error) {
    // Handle the error here
    console.error("Error fetching users:");
  }
};

// Call getUsers when the component is created
getUsers();
</script>

<template>
  <!-- <h1>{{ msg }}</h1>

  <div class="card flex">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->

  <!-- <div class="h-screen w-screen bg-white"> -->
  <Navbar />
  <!-- </div> -->
</template>
<!-- 
<style scoped>
.read-the-docs {
  color: #888;
}
</style> -->
