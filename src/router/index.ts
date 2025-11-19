import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import UsersPage from "../pages/UsersPage.vue";
import UserDetailsPage from "../pages/UserDetailsPage.vue";
import InvoicesPage from '../pages/InvoicesPage.vue';
import MainPage from '../pages/MainPage.vue';

const routes = [
  { path: "/", component: MainPage },

  { path: "/users", component: UsersPage },
  { path: "/users/:id", component: UserDetailsPage, props: true },

  { path: "/invoices", component: InvoicesPage },
];

export function createAppRouter(useHash = false) {
  const history = useHash ? createWebHashHistory() : createWebHistory();
  return createRouter({
    history,
    routes,
  });
}