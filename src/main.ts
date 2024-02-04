import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./core/services/APIService";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import DashboardLayout from "./layouts/Dashboard.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";

const app = createApp(App);

ApiService.init(app);
app.use(router);
app.use(store);
app.use(PrimeVue);

app.component("DefaultLayout", DashboardLayout);
app.component("EmptyLayout", EmptyLayout);

app.mount("#app");
