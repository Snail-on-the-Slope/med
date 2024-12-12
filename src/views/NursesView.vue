<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="container-title">
        <div class="text-h5">Список медсестер</div>
        <v-btn color="primary" @click="openAddNurseDialog">Добавить медсестру</v-btn>
      </v-card-title>

      <NursesTable
        :nurses="nurses"
        :loading="loading"
        @edit="openEditNurseDialog"
        @delete="deleteNurse"
      />
    </v-card>

    <NurseFormDialog
      v-model:dialog="dialog"
      :formData="formData"
      :departments="departments"
      :editingNurse="editingNurse"
      :loading="loading"
      @save="saveNurse"
      @close="closeDialog"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNursesStore } from '@/stores/nursesStore'
import type { Nurse } from '@/utils/types/EmployeeTypes'
import { DepartmentsEnum } from '@/utils/enums'
import NursesTable from '@/components/nurses/NursesTable.vue'
import NurseFormDialog from '@/components/nurses/NurseFormDialog.vue'

const nursesStore = useNursesStore()
const loading = ref(false)
const nurses = computed(() => nursesStore.nurses)

const dialog = ref(false)
const defaultFormData = {
  id: nurses.value.length + 1,
  name: '',
  department: undefined,
}
const formData = ref<Nurse>(defaultFormData)
const editingNurse = ref<Nurse | null>(null)

const departments: string[] = Object.values(DepartmentsEnum)

function openAddNurseDialog() {
  editingNurse.value = null
  formData.value = { ...defaultFormData }
  dialog.value = true
}

function openEditNurseDialog(nurse: Nurse) {
  editingNurse.value = nurse
  formData.value = { ...nurse }
  dialog.value = true
}

async function saveNurse(data: Nurse) {
  try {
    loading.value = true
    if (editingNurse.value) {
      await nursesStore.editNurse(data)
    } else {
      await nursesStore.addNurse({ ...data, id: Date.now() })
    }
    closeDialog()
  } catch (error) {
    console.error('Error saving nurse:', error)
  } finally {
    loading.value = false
  }
}

function closeDialog() {
  dialog.value = false
}

async function deleteNurse(id: number) {
  try {
    loading.value = true
    await nursesStore.deleteNurse(id)
  } catch (error) {
    console.error('Error deleting nurse:', error)
  } finally {
    loading.value = false
  }
}
</script>
