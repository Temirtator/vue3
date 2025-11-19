<template>
  <button @click="goBack">← Назад</button>
  <input class='search-input' v-model="store.search" placeholder="Поиск" />
  <button class='update-button' @click="updateList">Обновить</button>

  <div v-if="store.loading">Загрузка...</div>
  <div v-else-if="store.error">{{ store.error }}</div>

  <UserTable
    :columns="[
      { key: 'name', label: 'Имя' },
      { key: 'email', label: 'Email' },
      { key: 'company', label: 'Компания', render: u => u.company.name },
      { key: 'city', label: 'Город', render: u => u.address.city }
    ]"
    :data="store.filtered"
    @select="openUser"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUsersStore } from "../store/users";
import UserTable from "../components/UserTable.vue";
import type { User } from "../types/User";

const router = useRouter();
const store = useUsersStore();
store.load();
const selected = ref<User | null>(null);

function openUser(u: User) { 
  selected.value = u;
  router.push(`/users/${u.id}`);
}

function updateList() {
  store.load(true);
}

function goBack() {
  router.push('/');
}

</script>

<style>
.update-button {
  margin-left: 16px;
}
.search-input {
  padding: 9px;
  margin-left: 16px;
}
</style>