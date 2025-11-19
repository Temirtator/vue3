import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createAppRouter } from './router';

import "./components/Modal.vue";
import "./components/UserForm.vue";
import "./components/UserTable.vue";
import "./style.css";

export function init(selector: string) {
  const container = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!container) {
    throw new Error(`Container not found: ${selector}`);
  }
  const app = createApp(App);
  const router = createAppRouter(true);
  app.use(createPinia());
  app.use(router);
  app.mount(container as Element);
}

declare global {
  interface Window { UsersWidget?: any }
}

window.UsersWidget = window.UsersWidget ?? {};
window.UsersWidget.init = window.UsersWidget.init ?? init;
