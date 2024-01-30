<script lang="ts" setup>
import EmptyState from "../Apps/Components/EmptyState/index.vue";
import AppsRender from "../Apps/Components/AppsRender/index.vue";

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
];
</script>

<template>
  <EmptyState v-if="!Boolean(customers.length > 0)" />
  <AppsRender v-if="Boolean(customers.length > 0)" :customers="customers" />
</template>
