import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ApiService from "./core/services/APIService";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

const app = createApp(App);

ApiService.init(app);
app.use(router);
app.use(PrimeVue);

app.mount("#app");
