<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { ref, defineProps } from "vue";
import { handleNavigate } from "@/core/helpers/path";

const selectedProduct = ref();
const metaKey = ref(true);

defineProps({
  apps: Array,
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
          :value="apps"
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
          <Column field="appName" header="Name"></Column>
          <Column field="" header="Plan"
            ><template #body=""> Free </template></Column
          >
          <Column field="organization" header="Organization"></Column>
          <Column field="source" header="Source"></Column>
          <Column field="userId" header="Platforms"></Column>
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
