<template>
  <v-container>
    <v-card width="100%">
      <v-card-title class="container-title">
        <div class="text-h5">Список врачей</div>
        <v-btn color="primary" @click="openAddDoctorDialog">Добавить врача</v-btn>
      </v-card-title>

      <DoctorsTable
        :doctors="doctors"
        :loading="loading"
        @edit="openEditDoctorDialog"
        @delete="deleteDoctor"
      />
    </v-card>

    <DoctorFormDialog
      v-model:dialog="dialog"
      :formData="formData"
      :departments="departments"
      :isEditing="!!editingDoctor"
      :loading="loading"
      @save="saveDoctor"
      @close="closeDialog"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDoctorsStore } from '@/stores/doctorsStore'
import type { CreateDoctor, Doctor } from '@/utils/types/EmployeeTypes'
import { DepartmentsEnum } from '@/utils/enums'
import DoctorsTable from '@/components/doctors/DoctorsTable.vue'
import DoctorFormDialog from '@/components/doctors/DoctorFormDialog.vue'

const doctorsStore = useDoctorsStore()
const loading = ref(false)
const doctors = computed(() => doctorsStore.doctors)

const dialog = ref(false)
const defaultFormData = {
  id: doctors.value.length + 1,
  name: '',
  department: undefined,
  isHead: false,
}
const formData = ref<CreateDoctor>(defaultFormData)
const editingDoctor = ref<Doctor | null>(null)

const departments: string[] = Object.values(DepartmentsEnum)

function openAddDoctorDialog() {
  editingDoctor.value = null
  formData.value = { ...defaultFormData }
  dialog.value = true
}

function openEditDoctorDialog(doctor: Doctor) {
  editingDoctor.value = doctor
  formData.value = { ...doctor }
  dialog.value = true
}

async function saveDoctor(data: Doctor) {
  try {
    loading.value = true
    if (editingDoctor.value) {
      await doctorsStore.editDoctor(data)
    } else {
      await doctorsStore.addDoctor({ ...data, id: Date.now() })
    }
    closeDialog()
  } catch (error) {
    console.error('Error saving doctor:', error)
  } finally {
    loading.value = false
  }
}

function closeDialog() {
  dialog.value = false
}

async function deleteDoctor(id: number) {
  try {
    loading.value = true
    await doctorsStore.deleteDoctor(id)
  } catch (error) {
    console.error('Error deleting doctor:', error)
  } finally {
    loading.value = false
  }
}
</script>
