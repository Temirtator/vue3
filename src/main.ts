import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import { createAppRouter } from "./router";
import './style.css'

const app = createApp(App);
const pinia = createPinia();
const router = createAppRouter(false);
app.use(pinia);
app.use(router);

app.mount('#app')
