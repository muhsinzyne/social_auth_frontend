import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import store from "./store";
import ApiService from "./core/services/APIService";
// import "primevue/resources/themes/lara-light-blue/theme.css";
// import "primeicons/primeicons.css";
import DashboardLayout from "./layouts/Dashboard.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";

const app = createApp(App);

ApiService.init(app);
app.use(router);
app.use(store);
// app.use(PrimeVue, {
//   pt: Lara,
// });
// app.use(ToastService);

app.component("DefaultLayout", DashboardLayout);
app.component("EmptyLayout", EmptyLayout);

app.mount("#app");
