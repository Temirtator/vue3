<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { User } from "../types/User";
import { useUsersStore } from '../store/users';
import Modal from '../components/Modal.vue';
import UserForm from '../components/UserForm.vue';

const route = useRoute();
const router = useRouter();
const store = useUsersStore();

const user = ref<User | null>(null);
const loading = ref(false);
const error = ref("");
const isEdit = ref(false);

function goBack() {
  router.push("/users");
}

async function loadUser() {
  loading.value = true;
  try {
    const id = Number(route.params.id);
    let u = store.getById(id);
    if (!u) {
      await store.load();
      u = store.getById(id);
    }
    user.value = u;
  } catch {
    error.value = "Не удалось загрузить";
  } finally {
    loading.value = false;
  }
}

onMounted(loadUser);

function openEdit() {
  isEdit.value = true;
}

async function saveFromDetails(payload: Partial<User>) {
  if (!user.value) return;
  await store.saveUser(user.value.id, payload);
  user.value = store.getById(user.value.id);
  isEdit.value = false;
}

</script>

<template>
  <div>
    <button @click="goBack">← Назад</button>
    <button class='edit-button' @click="openEdit">Редактировать</button>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="user">
      <h2>Детальная информация</h2>
      
      <table class="user-table">
        <thead>
          <tr class="row">
            <th>Имя</th>
            <th>Почта</th>
            <th>Телефон</th>
            <th>Город</th>
            <th>Улица</th>
            <th>Вебсайт</th>
            <th>Компания</th>
          </tr>
        </thead>
        <tbody>
          <tr class="row">
            <td>
              <span>{{ user.name }}</span>
            </td>
            <td>
              <span>{{ user.email }}</span>
            </td>
            <td>
              <span>{{ user.phone }}</span>
            </td>
            <td>
              <span>{{ user.address.city }}</span>
            </td>
            <td>
              <span>{{ user.address.street }}</span>
            </td>
            <td>
              <span>{{ user.website }}</span>
            </td>
            <td>
              <span>{{ user.company.name }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal v-model:modelValue="isEdit" @close="isEdit = false">
        <template #header><h3>Редактировать</h3></template>
        <UserForm v-if="user" :user="user" @save="saveFromDetails" @cancel="()=>isEdit=false" />
      </Modal>
    </div>
  </div>
</template>

<style scoped>
.edit-button {
  margin-left: 16px;
}
</style>
