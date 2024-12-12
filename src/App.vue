<template>
  <v-app>
    <HeaderMenu />
    <RouterView />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderMenu from '@/components/HeaderMenu.vue'
</script>

<style>
body {
  background-color: #f5f5f5;
}

#app {
  max-width: 100vw;
  padding: 0 !important;
}

.v-container {
  max-width: 100%;
  width: 100vw;
  padding-top: 72px;
}

.container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-data-table.custom-table .v-table__wrapper {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.v-data-table.custom-table .v-table {
  --v-table-header-height: 48px;
}

@media (max-width: 600px) {
  .v-container {
    padding-top: 96px;
  }

  .container-title {
    flex-direction: column;
    align-items: flex-start;
  }

  .container-title .text-h5 {
    margin-bottom: 8px;
  }

  .v-data-table.custom-table .v-table__wrapper {
    max-height: calc(100vh - 270px);
  }
}
</style>
