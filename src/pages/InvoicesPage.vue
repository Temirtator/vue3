<template>
  <div>
    <h2>Счета</h2>

    <button class='go-back' @click="goBack">Назад</button>
    <input class='search-input' v-model="search" placeholder="Search" />
    <button class='reload-button' @click="load">Перезагрузка</button>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" style="color:red">{{ error }}</div>

    <table>
      <tr v-for="inv in filtered" :key="inv.id">
        <td>{{ inv.number }}</td>
        <td>{{ inv.customer }}</td>
        <td>{{ formatAmount(inv.amount, inv.currency) }}</td>
        <td>{{ inv.status }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';

import { fetchInvoices } from "../services/invoices";
import { formatAmount } from "../utils/formatAmount";
import type { Invoice } from "../types/Invoice";

const router = useRouter();

const items = ref<Invoice[]>([]);
const search = ref("");
const loading = ref(false);
const error = ref("");

async function load() {
  try {
    loading.value = true;
    error.value = "";
    items.value = await fetchInvoices();
  } catch {
    error.value = "Не удалось загрузить";
  } finally {
    loading.value = false;
  }
}

load();

const filtered = computed(() =>
  items.value.filter(i => i.number.includes(search.value))
);

function goBack() {
  router.push('/');
}

</script>

<style>
.reload-button, .search-input {
  margin-left: 16px;
}
</style>
