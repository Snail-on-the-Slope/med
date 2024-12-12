<template>
  <v-app-bar app elevation="1">
    <div class="header-container">
      <v-toolbar-title class="text-h6 font-weight-medium pl-4"> Учет сотрудников </v-toolbar-title>

      <div class="buttons-container">
        <template v-for="item in menuItems" :key="item.path">
          <v-btn
            :to="item.path"
            variant="text"
            :prepend-icon="item.icon"
            :class="['menu-btn', { active: isActive(item.path) }]"
          >
            {{ item.title }}
          </v-btn>
        </template>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface MenuItem {
  title: string
  path: '/doctors' | '/nurses'
  icon: string
}

const menuItems: MenuItem[] = [
  {
    title: 'Врачи',
    path: '/doctors',
    icon: 'mdi-doctor',
  },
  {
    title: 'Медсестры',
    path: '/nurses',
    icon: 'mdi-mother-nurse',
  },
]

const route = useRoute()
const isActive = (path: MenuItem['path']) => route.path === path
</script>

<style scoped>
.menu-btn {
  margin: 0 4px;
  transition: all 0.3s ease;
}

.menu-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
  transform: translateY(-2px);
}

.active {
  font-weight: 500;
  background-color: rgba(var(--v-theme-primary), 0.1);
  position: relative;
}

.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background-color: rgb(var(--v-theme-primary));
}

.header-container {
  width: 100%;
  display: flex;
  align-items: center;
}

.buttons-container {
  margin-left: auto;
}

@media (max-width: 600px) {
  .header-container {
    flex-direction: column;
  }

  .buttons-container {
    margin-left: 0;
    margin-top: 4px;
  }

  .text-h6 {
    font-size: 1.1rem !important;
    margin-bottom: 4px;
  }

  .v-toolbar-title {
    padding: 0;
  }

  .menu-btn {
    padding: 0 12px !important;
    height: 36px !important;
  }

  :deep(.v-toolbar__content) {
    height: auto !important;
    padding-top: 8px;
    padding-bottom: 8px;
  }
}
</style>
