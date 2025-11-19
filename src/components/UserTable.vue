<template>
  <table class="user-table">

    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="row in data"
        :key="row.id"
        @click="$emit('select', row)"
        class="row"
      >
        <td v-for="col in columns" :key="col.key">
          <span v-if="col.render">{{ col.render(row) }}</span>
          <span v-else>{{ (row as any)[col.key] }}</span>
        </td>
      </tr>
    </tbody>

  </table>
</template>

<script setup lang="ts">
import type { User } from "../types/User";

export interface TableColumn {
  key: string;
  label: string;
  render?: (row: User) => string | number;
}

defineProps<{
  data: User[];
  columns: TableColumn[];
}>();

defineEmits<{
  (e: "select", user: User): void;
}>();
</script>
