import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Doctor } from '@/utils/types/EmployeeTypes'
import doctorsMock from '@/utils/mocks/doctors.json'

export const useDoctorsStore = defineStore('doctors', () => {
  const doctors = ref<Doctor[]>(doctorsMock)

  async function addDoctor(doctor: Doctor) {
    doctors.value.push(doctor)
  }

  async function editDoctor(updatedDoctor: Doctor) {
    const index = doctors.value.findIndex((d) => d.id === updatedDoctor.id)
    if (index !== -1) {
      doctors.value[index] = updatedDoctor
    }
  }

  async function deleteDoctor(id: number) {
    doctors.value = doctors.value.filter((d) => d.id !== id)
  }

  return {
    doctors,
    addDoctor,
    editDoctor,
    deleteDoctor,
  }
})
