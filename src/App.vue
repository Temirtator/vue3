<script setup lang="ts">
</script>

<template>
  <h1>Users App</h1>
  <router-view />
</template>

<style>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 36px;
}
.user-table th {
  background: #f5f5f5;
  padding: 8px;
  text-align: left;
}
.user-table td {
  padding: 8px;
  border-top: 1px solid #ddd;
  text-align: left;
}
.row:hover {
  background: #f0f8ff;
  cursor: pointer;
}
</style>