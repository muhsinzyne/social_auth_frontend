<template lang="html">
  <div class="p-8">
    <div class="flex items-center justify-between">
      <div class="font-medium text-2xl"><h1>Your Apps</h1></div>
      <div>
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          New App
        </button>
      </div>
    </div>
    <div>
      <div class="card">
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
          <Column field="country.name" header="Country"></Column>
          <Column field="company" header="Company"></Column>
          <Column field="representative.name" header="Representative"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<style lang="css">
.card {
  background: var(--surface-card);
  border-radius: 10px;
  margin-top: 1rem;
  padding: 5px;
}
</style>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref } from "vue";

const selectedProduct = ref();
const metaKey = ref(true);

const customers = [
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    company: "Benton, John B Jr",
    date: "2015-09-13",
    status: "unqualified",
    verified: true,
    activity: 17,
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    balance: 70663,
  },
];
</script>
