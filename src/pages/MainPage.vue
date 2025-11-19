<template>
  <button @click='goToUsers'>Users</button>
  <button class='invoices-button' @click='goToInvoices'>Invoices</button>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToUsers() {
  router.push('/users');
}

function goToInvoices() {
  router.push('/invoices');
}
</script>

<style>
.invoices-button {
  margin-left: 16px;
}
</style>