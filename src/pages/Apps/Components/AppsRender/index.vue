<script lang="ts" setup>
// import DataTable from "primevue/datatable";
// import Column from "primevue/column";
import { ref, defineProps } from "vue";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import Modal from "@/common/components/Modal/index.vue";
import Button from "@/common/components/Button/index.vue";
import { AppType } from "@/common/types/types";
import { updateApp, deleteApp } from "@/core/services/routes/app";
import Swall from "@/core/helpers/swal";
import { useRouter } from "vue-router";
import Loader from "@/common/Icons/LoaderIcon.vue";

const { apps, removeApp } = defineProps({
  apps: Array<AppType>,
  removeApp: Function,
  appsCount: Number,
  page: Number,
  itemsPerPage: Number,
  onPageChange: Function,
  appsFetching: Boolean,
});

const route = useRouter();

const navigateToApp = (appId: string) => {
  route.push(`/dashboard/apps/${appId}`);
};

const navigateToCreateApp = (step: number, appId: string) => {
  route.push(`/dashboard/apps/new/${step + 1}?appId=${appId}`);
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
          @click="route.push(`/dashboard/apps/new/1`)"
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

            <tbody v-if="!appsFetching">
              <tr
                v-for="(data, index) in apps"
                :key="index"
                class="cursor-pointer bg-white"
              >
                <td class="px-5 text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.appName }}
                  </span>
                </td>

                <td class="text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">Free</span>
                </td>
                <td class="text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.organization }}
                  </span>
                </td>
                <td class="text-sm e border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.source }}
                  </span>
                </td>
                <td class="text-sm border-b border-gray-200">
                  <span class="text-gray-900 whitespace-nowrap">
                    {{ data.userId }}
                  </span>
                </td>
                <td class="text-sm e border-b border-gray-200">
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
                          @click="
                            data.step === 3
                              ? navigateToApp(data.appId)
                              : navigateToCreateApp(data.step, data.appId)
                          "
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                        >
                          {{ data.step === 3 ? "Dashboard" : "Continue Setup" }}
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

          <div
            v-if="appsFetching"
            class="flex justify-center items-center bg-white w-full p-3 pt-4"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline animate-spin text-[#1C64F2CC] w-[20px] h-[20px]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div
            v-show="!appsFetching"
            class="flex flex-col items-center p-2 bg-white"
          >
            <span class="text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">{{
                itemsPerPage && (page || 0) * itemsPerPage - itemsPerPage + 1
              }}</span>
              to
              <span class="font-semibold text-gray-900 dark:text-white">{{
                apps && page && appsCount && itemsPerPage
                  ? apps.length !== itemsPerPage &&
                    apps.length * page <= appsCount
                    ? appsCount
                    : (page || 0) * itemsPerPage
                  : 0
              }}</span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">{{
                appsCount
              }}</span>
              Entries
            </span>
            <div
              v-show="appsCount && itemsPerPage && appsCount > itemsPerPage"
              class="inline-flex mt-2 xs:mt-0"
            >
              <button
                @click="onPageChange && page && onPageChange(page - 1)"
                :disabled="Boolean(page && page === 1)"
                :class="{
                  'cursor-not-allowed !bg-blue-500': Boolean(
                    page && page === 1
                  ),
                }"
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-s dark:hover:text-white"
              >
                Prev
              </button>
              <button
                @click="onPageChange && page && onPageChange(page + 1)"
                :disabled="
                  Boolean(
                    (apps && page && appsCount && itemsPerPage
                      ? apps.length !== itemsPerPage &&
                        apps.length * page <= appsCount
                        ? appsCount
                        : (page || 0) * itemsPerPage
                      : 0) === appsCount
                  )
                "
                :class="{
                  'cursor-not-allowed !bg-blue-500': Boolean(
                    (apps && page && appsCount && itemsPerPage
                      ? apps.length !== itemsPerPage &&
                        apps.length * page <= appsCount
                        ? appsCount
                        : (page || 0) * itemsPerPage
                      : 0) === appsCount
                  ),
                }"
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-e border-0 border-s border-gray-300 dark:hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
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
