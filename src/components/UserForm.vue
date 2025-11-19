<template>
  <form @submit.prevent="onSubmit" class="user-form">
    <div class="row">
      <label>Имя</label>
      <input v-model="model.name" required />
    </div>

    <div class="row">
      <label>Email</label>
      <input v-model="model.email" type="email" required />
    </div>

    <div class="row">
      <label>Телефон</label>
      <input v-model="model.phone" />
    </div>

    <div class="row">
      <label>Город</label>
      <input v-model="model.address.city" />
    </div>

    <div class="row">
      <label>Улица</label>
      <input v-model="model.address.street" />
    </div>

    <div class="row">
      <label>Название компании</label>
      <input v-model="model.company.name" />
    </div>

    <div class="row">
      <label>Вебсайт</label>
      <input v-model="model.website" />
    </div>

    <div class="actions">
      <button type="submit" :disabled="saving">Сохранить</button>
      <button type="button" @click="$emit('cancel')" :disabled="saving">Отмена</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { User } from "../types/User";

const props = defineProps<{ user: User }>();
const emit = defineEmits<{
  (e: "save", payload: Partial<User>): void;
  (e: "cancel"): void;
}>();

const model = reactive({
  id: props.user.id,
  name: props.user.name ?? "",
  email: props.user.email ?? "",
  phone: props.user.phone ?? "",
  address: props.user.address ?? {
    city: "",
    street: ""
  },
  company: props.user.company ?? {
    name: ""
  },
  website: props.user.website ?? ""
});

watch(() => props.user, (nu) => {
  model.id = nu.id;
  model.name = nu.name ?? "";
  model.email = nu.email ?? "";
  model.phone = nu.phone ?? "";
  model.address = nu.address ?? {
    city: "",
    street: ""
  },
  model.company = nu.company ?? {
    name: ""
  },
  model.website = nu.website ?? ""
});

const saving = false as unknown as boolean;
let error = "";

function onSubmit() {
  error = "";
  if (!model.name || !model.email) {
    error = "Name and email required";
    return;
  }
  emit("save", {
    name: model.name,
    email: model.email,
    phone: model.phone,
    address: model.address,
    company: model.company,
    website: model.website
  });
}
</script>

<style scoped>
.user-form .row { margin-bottom: 0.6rem; display:flex; flex-direction:column; }
.user-form label { font-weight:600; margin-bottom:0.25rem; }
.actions { display:flex; gap:0.5rem; margin-top:0.5rem;}
.error { color: red; margin-top:0.5rem; }
</style>
