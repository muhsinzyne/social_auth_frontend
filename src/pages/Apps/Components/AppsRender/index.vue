<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { ref, defineProps } from "vue";
import { handleNavigate } from "@/core/helpers/path";

const selectedProduct = ref();
const metaKey = ref(true);

defineProps({
  customers: Array,
});
</script>

<template>
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div class="font-normal text-2xl"><h1>Your Apps</h1></div>
      <div>
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          @click="handleNavigate('newApp')"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center gap-2"
        >
          <span class="pi pi-plus-circle text-white"></span>
          <span>New App </span>
        </button>
      </div>
    </div>
    <div class="pt-5">
      <div
        class="w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-white"
      >
        <DataTable
          :value="customers"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          scrollable
          scrollHeight="500px"
          v-model:selection="selectedProduct"
          selectionMode="single"
          :metaKeySelection="metaKey"
          dataKey="id"
        >
          <Column field="name" header="Name"></Column>
          <Column field="country.name" header="Plan"></Column>
          <Column field="company" header="Total Subs"></Column>
          <Column field="company" header="Active Subs"></Column>
          <Column field="representative.name" header="Platforms"></Column>
          <Column style="flex: 0 0 4rem">
            <template #body="">
              <Button
                type="button"
                :icon="'pi pi-ellipsis-v'"
                text
                size="small"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
