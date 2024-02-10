<script lang="ts" setup>
// import DataTable from "primevue/datatable";
// import Column from "primevue/column";
import { ref, defineProps } from "vue";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { handleNavigate } from "@/core/helpers/path";
import Modal from "@/common/components/Modal/index.vue";
import Button from "@/common/components/Button/index.vue";
import { AppType } from "@/common/types/types";
import { updateApp, deleteApp } from "@/core/services/routes/app";
import Swall from "@/core/helpers/swal";
import { useRouter } from "vue-router";

const route = useRouter();

const navigateToApp = (appId: string) => {
  route.push(`/dashboard/apps/${appId}`);
};

// const selectedProduct = ref();
// const metaKey = ref(true);
const selectedRow = ref<string>("");
const openEditModal = ref<boolean>(false);
const currentData = ref<AppType | any>({});
const disabled = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);

let currentAppName = currentData.value.appName || "";

const appHeaders = ["Name", "Plan", "Organization", "Source", "Platforms", ""];

const appNameValidation = Yup.object().shape({
  appName: Yup.string().min(3).required().label("App Name"),
});

const setCurrentData = (data: AppType, action: "edit" | "delete") => {
  currentData.value = data;
  switch (action) {
    case "edit":
      currentAppName = data.appName;
      openEditModal.value = true;
      break;

    case "delete":
      showDeleteModal.value = true;
      break;

    default:
      break;
  }
};

const { apps, removeApp } = defineProps({
  apps: Array<AppType>,
  removeApp: Function,
});
console.log(apps, selectedRow);

const setEditOpen = (val: boolean) => (openEditModal.value = val);
const setShowDeleteModal = (val: boolean) => (showDeleteModal.value = val);

const handleEditAppName = async (values: any) => {
  if (values && currentData.value.appId) {
    const payload: Partial<AppType> = {
      appId: currentData.value.appId,
      appName: values.appName,
    };

    try {
      disabled.value = true;
      await updateApp(payload);
      currentData.value.appName = payload.appName;
      openEditModal.value = false;
      selectedRow.value = "";
      Swall.Toast("App Name Changed Successfully!", "success");
    } catch (error) {
      console.error(error);
      Swall.Toast("Something went wrong, try after some time", "error");
    } finally {
      disabled.value = false;
    }
  }
};

const handleDeleteApp = async () => {
  if (currentData.value.appId && removeApp) {
    try {
      disabled.value = true;
      await deleteApp(currentData.value.appId);
      removeApp(currentData.value.appId);
      showDeleteModal.value = false;
      selectedRow.value = "";
      Swall.Toast("App Deleted Successfully!", "success");
    } catch (error) {
      console.error(error);
      Swall.Toast("Something went wrong, try after some time", "error");
    } finally {
      disabled.value = false;
    }
  }
};
</script>

<template>
  <div class="mt-8">
    <div class="mt-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold leading-tight">Apps</h2>
        <button
          @click="handleNavigate('newApp')"
          class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          <svg
            class="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          <span class="mx-1">New App</span>
        </button>
      </div>
      <div class="flex flex-col mt-3 sm:flex-row">
        <div class="relative block mt-2 sm:mt-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              />
            </svg>
          </span>

          <input
            placeholder="Search"
            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  v-for="(header, index) in appHeaders"
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  :key="index"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in apps"
                :key="index"
                class="cursor-pointer bg-white"
              >
                <td class="px-5 py-5 text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.appName }}
                  </span>
                </td>

                <td class="px-5 py-5 text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">Free</span>
                </td>
                <td class="px-5 py-5 text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.organization }}
                  </span>
                </td>
                <td class="px-5 py-5 text-sm e border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.source }}
                  </span>
                </td>
                <td class="px-5 py-5 text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.userId }}
                  </span>
                </td>
                <td class="px-5 py-5 text-sm e border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    <Button
                      :on-click="() => (selectedRow = data.appId)"
                      variant="none"
                      type="button"
                      ><template v-slot:left-icon>
                        <svg
                          class="w-[21px] h-[21px] text-gray-800 dark:text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="3"
                            d="M12 6h0m0 6h0m0 6h0"
                          />
                        </svg>
                      </template>
                    </Button>

                    <div
                      v-show="selectedRow === data.appId"
                      class="fixed inset-0 z-10 w-full h-full"
                      @click="selectedRow = ''"
                    />
                    <transition
                      enter-active-class="transition duration-150 ease-out transform"
                      enter-from-class="scale-95 opacity-0"
                      enter-to-class="scale-100 opacity-100"
                      leave-active-class="transition duration-150 ease-in transform"
                      leave-from-class="scale-100 opacity-100"
                      leave-to-class="scale-95 opacity-0"
                    >
                      <div
                        v-show="selectedRow === data.appId"
                        class="fixed right-0 z-20 w-48 py-2 mt-2 mr-10 bg-white rounded shadow-xl border"
                      >
                        <div
                          @click="navigateToApp(data.appId)"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                        >
                          Dashboard
                        </div>
                        <div
                          @click="setCurrentData(data, 'edit')"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                        >
                          Rename
                        </div>
                        <div
                          @click="setCurrentData(data, 'delete')"
                          class="block px-4 py-2 text-sm text-red-600 hover:bg-blue-600 hover:text-white"
                        >
                          Delete
                        </div>
                      </div>
                    </transition>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <Form
            novalidate
            @submit="handleEditAppName"
            :validation-schema="appNameValidation"
          >
            <Modal
              :open="openEditModal"
              :setOpen="setEditOpen"
              :title="'Edit App Name'"
              :closable="true"
              :cancel-button-props="{ disabled }"
              :ok-button-props="{ disabled }"
              :on-cancel="() => (selectedRow = '')"
              ><template v-slot:body>
                <div>
                  <Field
                    variant="text"
                    id="appName"
                    name="appName"
                    v-model="currentAppName"
                    class="w-full mt-2 border-gray-200 rounded-md focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
                    placeholder="App Name"
                    autocomplete="off"
                    required
                  />
                  <div>
                    <ErrorMessage name="appName" class="text-red-600 text-sm" />
                  </div>
                </div> </template
            ></Modal>
          </Form>
          <Modal
            :open="showDeleteModal"
            :setOpen="setShowDeleteModal"
            :title="'Delete App'"
            :closable="true"
            :cancel-button-props="{ disabled, text: 'No' }"
            :ok-button-props="{ disabled, text: 'Yes', variant: 'danger' }"
            :on-cancel="() => (selectedRow = '')"
            :on-ok="handleDeleteApp"
            ><template v-slot:body> <div>Are you sure?</div> </template></Modal
          >
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <DataTable
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
            class="text-sm bg-white border-b border-gray-200"
          >
            <Column
              field="appName"
              header="Name"
              class="px-5 py-5 text-sm bg-white border-b border-gray-200"
            ></Column>
            <Column
              field=""
              header="Plan"
              class="px-5 py-5 text-sm bg-white border-b border-gray-200"
              ><template #body=""> Free </template></Column
            >
            <Column
              field="organization"
              header="Organization"
              class="px-5 py-5 text-sm bg-white border-b border-gray-200"
            ></Column>
            <Column
              field="source"
              header="Source"
              class="px-5 py-5 text-sm bg-white border-b border-gray-200"
            ></Column>
            <Column
              field="userId"
              header="Platforms"
              class="px-5 py-5 text-sm bg-white border-b border-gray-200"
            ></Column>
            <Column
              style="flex: 0 0 4rem"
              class="px-5 py-5 text-sm bg-white border-b border-gray-200"
            >
              <template #body="{ data }">
                <Button
                  @click="selectedRow = data.appId"
                  type="button"
                  :icon="'pi pi-ellipsis-v'"
                  text
                  size="small"
                />

                <div
                  v-show="selectedRow === data.appId"
                  class="fixed inset-0 z-10 w-full h-full"
                  @click="selectedRow = ''"
                />
                <transition
                  enter-active-class="transition duration-150 ease-out transform"
                  enter-from-class="scale-95 opacity-0"
                  enter-to-class="scale-100 opacity-100"
                  leave-active-class="transition duration-150 ease-in transform"
                  leave-from-class="scale-100 opacity-100"
                  leave-to-class="scale-95 opacity-0"
                >
                  <div
                    v-show="selectedRow === data.appId"
                    class="fixed right-0 z-20 w-48 py-2 mt-2 mr-10 bg-white rounded shadow-xl border"
                  >
                    <div
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                    >
                      Dashboard
                    </div>
                    <div
                      @click="setCurrentData(data)"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                    >
                      Rename
                    </div>
                    <div
                      href="#"
                      class="block px-4 py-2 text-sm text-red-600 hover:bg-blue-600 hover:text-white"
                    >
                      Delete
                    </div>
                  </div>
                </transition>
              </template>
            </Column>
          </DataTable> -->
