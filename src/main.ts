import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ApiService from "./core/services/APIService";

const app = createApp(App);

ApiService.init(app);
app.use(router);

app.mount("#app");
